import {message, Modal} from 'antd';
import React from 'react';
import {BetaSchemaForm, ProFormColumnsType} from "@ant-design/pro-form";
import {update} from "@/services/flux-eco-system/api";

const handleUpdate = async (
  projectionName: string,
  projectionId: string,
  properties: any,
  parentId: string
) => {
  const hide = message.loading('Configuring');
  try {
    const updateParameter = {projectionName, projectionId};
    properties.parentId = parentId;
    properties.image = null;

    await update(
      updateParameter, properties
    );
    hide();

    message.success('Configuration is successful');
    await fetchData();
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

export type ModalFormProps = {
  title: string;
  columns: ProFormColumnsType[];
  projectionName: string;
  params: any;
}

const EditForm: React.FC<ModalFormProps> = (props ) => (
  <Modal
    title={props.title}
    visible={true}
    width="400px"
    onCancel={() => closeModal()}
    destroyOnClose={true}
    footer={false}
  >
      <BetaSchemaForm<API.item>
        layoutType={'Form'}
        shouldUpdate={(newVal, oldVal) => {
          return true
        }
        }
        initialValues={currentEditForm}
        syncToInitialValues={true}
        onFinish={async (values) => {
          const success = await handleUpdate(currentProjectionAction, currentEditForm.projectionId, values as API.item, props.params.parentId);
          if (success) {
            closeModal();
          }
        }}
        columns={props.columns}
      />
  </Modal>
);

export default EditForm;
