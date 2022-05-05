import {ProFormText} from '@ant-design/pro-form';
import {FluxProFormColumn} from "@/adapters/FluxProForm/FluxProForm";

export type FluxProFormTextProps = {
  dataIndex: string
  title: string
}

const FluxProFormText = (props: FluxProFormTextProps) => (
  //todo width={props.width}
  <ProFormText name={props.dataIndex} label={props.title} />
);

export default FluxProFormText;
