import FluxSteps, {FluxStepsProps} from "@/components/FluxSteps";
import React, {useEffect, useState} from "react";
import {fetchHtmlPage} from "@/adapters/Page";
import {useParams} from "react-router";
import {getPage} from "@/services/flux-eco-system/api";

export type FluxHtmlContentProps = {
  pageName: string,
  projectionId: string
}

const FluxHtmlContent = (props: FluxHtmlContentProps) => {
  const [currentHtml, setCurrentHtml] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentSteps, setCurrentSteps] = useState<API.step[]>([]);

  const fetchHtmlContent = (key: number) => {
    getPage(
      {pageName: props.pageName, projectionId: props.projectionId, contentId: key}
    ).then(page => {
      setCurrentHtml(page.html)
      setCurrentSteps(page.steps)
    })
  };

  const stepChanged = (key: number) => {
    setCurrentStep(key)
    fetchHtmlContent(key)
  };


  useEffect(() => {
    fetchHtmlContent(0)
  }, [])

  return (
    <>
    <span dangerouslySetInnerHTML={
      {
        __html: currentHtml
      }
    }
    />
    <br/>
    <br/>
      <FluxSteps currentStepKey={currentStep} Steps={currentSteps} stepChanged={stepChanged} />
    </>
  );
};

export default FluxHtmlContent;



