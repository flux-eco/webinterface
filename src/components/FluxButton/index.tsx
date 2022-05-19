import { Button } from 'antd';

export type FluxButtonProps = {
    title: string
    key: string
    onButtonClick: () => void;
}

const FluxButton = (props: FluxButtonProps) => {
  return <Button type="primary" key={props.key} onClick={() => {props.onButtonClick()}}>{props.title}</Button>
}
export default FluxButton;
