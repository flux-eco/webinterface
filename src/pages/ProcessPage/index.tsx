import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {List, PageHeader} from 'antd';
import ProLayout  from '@ant-design/pro-layout';
import {Content} from "antd/lib/layout/layout";
import {fetchProcessPage} from "@/adapters/Page";
import FluxButton from "@/components/FluxButton";
import {update} from "@/services/flux-eco-system/api";




export default () => {
  const params: any = useParams();
  const [currentPage, setCurrentPage] = useState<API.processPage>();

  const onClickSubmitButton = () => {
    update(params.page, params.projectionId, []).then(() =>
      {
        fetchProcessPage(params.page, params.transactionId).then(page => setCurrentPage(page))
      }
    )
  }

  useEffect(() => {
    //fetchItem(params.page, params.parentId).then(item => setDataSource(item.data))
    fetchProcessPage(params.page, params.transactionId).then(page => setCurrentPage(page))
  }, [])



  return (
    <ProLayout siderWidth={0}>
      <PageHeader ghost={false} onBack={() => window.history.back()} title={params.parentId}>
        <Content style={{padding: '0 50px'}}>
          <h1>{currentPage?.pageMetadata.title}</h1>


          <FluxButton title={"Update"} key={"update"} onButtonClick={() => {onClickSubmitButton()}} />

        </Content>
      </PageHeader>
    </ProLayout>
  )
}
