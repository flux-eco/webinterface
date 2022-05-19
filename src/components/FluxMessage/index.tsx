import {Alert} from "antd";

export type FluxMessageProps = {
  message: string
}

const FluxMessage = (props: FluxMessageProps) => {
  return (
    <Alert type="warning" message={props.message}/>
  )
};

export default FluxMessage;
