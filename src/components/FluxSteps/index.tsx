import {Steps} from "antd";
import {FluxSchemaFormProps} from "@/components/FluxSchemaForm";

export type FluxStepsProps = {
  currentStepKey: number
  Steps: [{
    title: string,
    description: string
  }]
  changeStep: ();
}

const { Step } = Steps;

const FluxSteps = (props: FluxStepsProps) => {
  const stepsList = props.Steps.map((StepItem, key) => {
    return (<Step key={key} title={StepItem.title} description={StepItem.description}/>)
  });

 return (
   <Steps current={props.currentStepKey} onChange={props.changeStep()}>
    {stepsList}
  </Steps>
 );
}
export default FluxSteps;


