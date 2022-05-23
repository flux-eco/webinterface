import React, {useEffect, useRef, useState} from "react";
import {Spin} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {getCardList, getPage} from "@/services/flux-eco-system/api";
import {useParams} from "react-router";
import FluxCards from "@/components/FluxCards";
import FluxTable, {FluxTableProps} from "@/components/FluxTable";
import FluxList, {FluxListProps} from "@/components/FluxList";
import FluxHtmlContent, {FluxHtmlContentProps} from "@/components/FluxHtmlContent";

const FluxPage: React.FC = () => {
  const params: any = useParams();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [currentPageContent, setCurrentPageContent] = useState<JSX.Element>();
  const [currentPageTitle, setCurrentPageTitle] = useState<string>(" ");

  const setCardListContent = (props: API.getCardListParams): void => {
      getCardList(props).then((cardList) => {
        setCurrentPageContent(<FluxCards cards={cardList.data} />);
      });
  }
  const setTableContent = (props: FluxTableProps): void => {
      setCurrentPageContent(<FluxTable projectionName={props.projectionName} table={props.table} setLoadingState={props.setLoadingState}/>);
  }
  const setListContent = (props: FluxListProps): void => {
    setCurrentPageContent(<FluxList projectionName={props.projectionName} projectionId={props.projectionId} listProps={props.listProps} />);
  }

  const setHtmlContent = (props: FluxHtmlContentProps): void => {
    setCurrentPageContent(<FluxHtmlContent projectionId={props.projectionId} pageName={props.pageName}/>);
  }

  const fetchPage = () => {
    getPage(
      {pageName: params.pageName, projectionId: params.id, contentId: params.contentId}
    ).then(
      (page) => {

      setCurrentPageTitle(page.pageMetadata.title)
      const projectionName = page.pageMetadata.projectionName;

      switch (page.pageMetadata.pageType) {
        case 'cardPage':
              setCardListContent({projectionName: projectionName})
          break;
        case 'tablePage':
              const tablePage = page as API.tablePage
              setTableContent({projectionName: projectionName, table: tablePage.table, setLoadingState: setLoadingState})
          break;
        case 'listPage':
              const listPage = page as API.listPage
              setListContent({projectionName:projectionName,  projectionId: params.id, listProps: listPage.fluxListProps})
          break;
        case 'htmlPage':
              setHtmlContent({pageName:params.pageName,  projectionId: params.id})
          break;
      }
    }).then(
      () => setLoadingState(false)
    )
  }

  useEffect(() => {
    fetchPage()
  }, [])


  return (
    <>
      <Spin spinning={loadingState}>
        <PageContainer title={currentPageTitle}>
          {currentPageContent}
        </PageContainer>
      </Spin>
    </>
  );
};
export default FluxPage;


