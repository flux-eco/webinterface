import {ProFormRate} from '@ant-design/pro-form';

export type FluxProFormRateProps = {
  formColumn: API.formColumn
}

const FluxProFormRate = (props: FluxProFormRateProps) => (
  <ProFormRate name={props.formColumn.dataIndex} label={props.formColumn.title} />
);

export default FluxProFormRate;
