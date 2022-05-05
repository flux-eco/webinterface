import {ProFormText} from '@ant-design/pro-form';

export type FluxProFormTextProps = {
  formColumn: API.formColumn
}

const FluxProFormText = (props: FluxProFormTextProps) => (
  //todo width={props.width}
  <ProFormText name={props.formColumn.dataIndex} label={props.formColumn.title} />
);

export default FluxProFormText;
