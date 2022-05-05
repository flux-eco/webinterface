import ProForm from '@ant-design/pro-form';
import {FluxProFormColumn} from "@/adapters/FluxProForm/FluxProForm";

export type FluxProFormProps = {
  pageMetadata: API.pageMetadata;
  columns: FluxProFormColumn[];
}


const FluxProForm = (props: FluxProFormProps) => (
  <ProForm
    //onFinish={}
    // formRef={}
    // params={}
    //formKey={props.pageMetadata.projectionName}
    // request={}
    // autoFocusFirstInput
  >
    {props.columns}
  </ProForm>
);

export default FluxProForm;
