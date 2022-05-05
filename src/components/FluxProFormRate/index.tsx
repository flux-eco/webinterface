import {ProFormRate} from '@ant-design/pro-form';
import {FluxProFormColumn} from "@/adapters/FluxProForm/FluxProForm";

export type FluxProFormRateProps = {
  dataIndex: string
  title: string
}

const FluxProFormRate = (props: FluxProFormRateProps) => (
  <ProFormRate name={props.dataIndex} label={props.title} />
);

export default FluxProFormRate;
