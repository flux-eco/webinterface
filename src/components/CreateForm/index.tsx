import {Divider, message, Modal} from 'antd';
import React from 'react';
import {BetaSchemaForm, ProFormColumnsType} from "@ant-design/pro-form";
import {create} from "@/services/flux-eco-system/api";


export type ModalFormProps = {
  title: string;
  columns: ProFormColumnsType[];
  projectionName: string;
  params: any;
}

const handleAdd = async (
  projectionName: string,
  properties: any,
  params: any
) => {
  const hide = message.loading('loading');
  try {
    const createParameter = {projectionName};
    properties.parentId = params.parentId;
    if (createParameter.projectionName) {
      await create(createParameter, properties);
    }
    hide();
    //todo translate by api
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    //todo translate by api
    message.error('Adding failed, please try again!');
    return false;
  }
};


const CreateForm: React.FC<ModalFormProps> = (props ) => (
  <Modal
    title={props.title}
    visible={true}
    /*onCancel={() => (false)}*/
    destroyOnClose={true}
    footer={false}
    bodyStyle={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: '1em'
    }}
    width='60vw'
  >

    <BetaSchemaForm
      layoutType={'Form'}
      onFieldsChange={(changedField, allFields) => {
        console.log(changedField, allFields);
      }}
      onFinish={async (values) => {
        const success = await handleAdd(props.projectionName, values, props.params);
        if (success) {
          //setModalVisible(false);
        }
      }}
      columns={props.columns}
    />

    <Divider type='vertical' style={{height: '100%'}}/>
  </Modal>
);

export default CreateForm;
