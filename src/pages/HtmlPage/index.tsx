import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import ProLayout, {PageContainer} from '@ant-design/pro-layout';
import FluxHtmlContent from "@/components/FluxHtmlContent";
import {fetchHtmlPage} from "@/adapters/Page";
import {PageHeader} from 'antd';
import {Content} from "antd/lib/layout/layout";
import FluxSteps from "@/components/FluxSteps";


export default () => {
  const params: any = useParams();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<API.htmlPage>();
  const [steps, setSteps] = useState<API.step[]>();

  const fetch = (key: number) => {
    fetchHtmlPage(params.page, params.parentId, key).then(page => {
      setCurrentPage(page)
      setSteps(page.steps)
    })
  };

  useEffect(() => {
    fetch(0)
  }, [])

  const stepChanged = (key: number) => {
        fetch(key)
        setCurrentStep(key)
  };

  return (
    <ProLayout siderWidth={0}>
      <PageHeader ghost={false} onBack={() => window.history.back()} title={params.parentId}>
        <Content style={{padding: '0 50px'}}>
          <FluxHtmlContent html={currentPage?.html}/>
          <FluxSteps currentStepKey={currentStep} Steps={steps} stepChanged={stepChanged}/>
        </Content>
      </PageHeader>
    </ProLayout>
  )
}
