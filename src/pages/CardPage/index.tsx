import {fetchCardPage} from "@/adapters/Page";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import FluxCards from "@/components/FluxCards";
import ProLayout, {PageContainer} from "@ant-design/pro-layout";
import { PageHeader } from "antd";
import {Content} from "antd/lib/layout/layout";


export default () => {

  const params: any = useParams();
  const [currentPage, setCurrentPage] = useState<API.cardPage>();

  const fetchPage = async (): Promise<API.cardPage> => {
    const page = await fetchCardPage(params.page);
    console.log(page)
    return page;
  }

  useEffect(() => {
    fetchPage().then(page => setCurrentPage(page))
  }, [])


  return (
    <>
      <ProLayout siderWidth={0}>
        <PageHeader ghost={false} onBack={() => window.history.back()} title={currentPage?.pageMetadata?.projectionName}>
          <Content style={{padding: '0 50px'}}>
        <FluxCards projectionName={params.page} cardList={currentPage?.cardList}/>
          </Content>
        </PageHeader>
      </ProLayout>
    </>

  );
};
