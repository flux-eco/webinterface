import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import ProLayout, {PageContainer} from '@ant-design/pro-layout';
import FluxHtmlContent from "@/components/FluxHtmlContent";
import {fetchHtmlPage} from "@/adapters/Page";
import { PageHeader } from 'antd';
import {Content} from "antd/lib/layout/layout";

export default () => {
  const params: any = useParams();
  const [currentPage, setCurrentPage] = useState<API.htmlPage>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    fetchHtmlPage(params.page, params.parentId, urlParams.get('contentId')).then(page => setCurrentPage(page))
  }, [])

  return (
    <ProLayout siderWidth={0}>
      <PageHeader ghost={false} onBack={() => window.history.back()} title={params.parentId}>
        <Content style={{padding: '0 50px'}}>
      <FluxHtmlContent html={currentPage?.html}/>
        </Content>
      </PageHeader>
    </ProLayout>
  )
}
