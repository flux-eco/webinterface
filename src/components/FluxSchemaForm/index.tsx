import {BetaSchemaForm, ProForm} from "@ant-design/pro-form";
import {handleUpdate, handleCreate} from "@/adapters/Data";
import {Collapse, message, Space} from "antd";
import type { ProFormInstance } from '@ant-design/pro-components';
import { useRef } from 'react';

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
  reloadTable: () => void;
  setLoadingState: (state: boolean) => void;
  message: JSX.Element | undefined;
}

const FluxSchemaForm = (props: FluxSchemaFormProps) => {
  let sectionForms = props.sections.map((section, index) => {
    const {Panel} = Collapse;

    return <>
      <h2>{section.title}</h2>
      <BetaSchemaForm<API.item>
        key={index}
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
          key={props.projectionId}
          onFinish={async (values, close = () => {
            props.setIsModalVisible(false)
          }, reload = () => {
            props.reloadTable()
          }, setLoading = (state: boolean) => {
              props.setLoadingState(state);
          }) => {
            if (props.projectionId) {
              setLoading(true)
              await handleUpdate(props.projectionName, props.projectionId, values as API.item).then(
                () => { setTimeout(function(){
                  reload() //eventual consistency
                  setLoading(false)
                }, 1000)}
              ).then(() => {
                close();
                message.success('Updated successfully')
              })

            } else {
              setLoading(true)
              await handleCreate(props.projectionName, values as API.item).then(
                () => { setTimeout(function(){
                  reload() //eventual consistency
                  setLoading(false)
                }, 1000)}
              ).then(() => {
                close();
                message.success('Created successfully')
              })
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
