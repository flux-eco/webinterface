import {BetaSchemaForm, ProForm} from "@ant-design/pro-form";
import {handleUpdate, handleCreate} from "@/adapters/Data";
import {Collapse, message, Space} from "antd";
import {ActionType} from "@ant-design/pro-table";


export type FluxSchemaFormProps = {
  enums: any;
  sections: [{
    title: string,
    columns: API.formColumn[]
  }],
  projectionName: string;
  projectionId: string | undefined;
  itemData: any[] | undefined;
  setIsModalVisible: (visible: boolean) => void;
  message: JSX.Element | undefined;
}

const FluxSchemaForm = (props: FluxSchemaFormProps) => {

  let sectionForms = props.sections.map((section, index) => {
    const { Panel } = Collapse;

    return <>

      <h2>{section.title}</h2>
      <BetaSchemaForm<API.item>
        layoutType="Embed"
        shouldUpdate={(newVal, oldVal) => {
          return true;
        }}

        syncToInitialValues={true}

        columns={section.columns}/>

    </>
  })


  return (
    <>
      <ProForm
        onFinish={async (values, close = () => { props.setIsModalVisible(false)}) => {
          if(props.projectionId) {
            await handleUpdate(props.projectionName, props.projectionId, values as API.item);
            close();
            message.success('Updated successfully');
          } else {
            await handleCreate(props.projectionName, values as API.item);
            close()
            message.success('Created successfully');
          }
        }}
        initialValues={props.itemData}
      >
      {props.message}

      {sectionForms}

      </ProForm>
    </>
  )
};

export default FluxSchemaForm;
