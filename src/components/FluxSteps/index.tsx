import {Steps} from "antd";

export type FluxStepsProps = {
  currentStepKey: number
  Steps: [{
    title: string,
    description: string
    key: number
  }]|undefined
  stepChanged: (key: number ) => void;
}

const { Step } = Steps;

const FluxSteps = (props: FluxStepsProps) => {
  if(props.Steps === undefined) {
    return <div/>
  }
  const stepsList = props.Steps.map((StepItem, key) => {
    return (<Step key={key} title={StepItem.title} description={StepItem.description}/>)
  });

 return (
   <Steps current={props.currentStepKey} onChange={(key: number) => props.stepChanged(key)}>
    {stepsList}
  </Steps>
 );
}
export default FluxSteps;


