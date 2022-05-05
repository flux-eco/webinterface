import ProForm from '@ant-design/pro-form';

export type FluxProFormProps = {
  formKey: string
  formItems: any,
}

const FluxProForm = (props: FluxProFormProps) => (
  <ProForm
    //onFinish={}
    // formRef={}
    // params={}
    formKey={props.formKey}
    // request={}
    // autoFocusFirstInput
  >
    {props.formItems}
  </ProForm>
);

export default FluxProForm;
