import {Button, message, Modal} from 'antd';
import React from 'react';
import {deleteItem} from "@/services/flux-eco-system/api";

const handleRemove = async (projectionName: string, projectionId: string) => {
  const hide = message.loading('Loading');

  try {
    await deleteItem({
      projectionName: projectionName,
      projectionId: projectionId
    });

    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

export type ModalFormProps = {
  title: string;
  projectionName: string;
  projectionId: string;
  params: any;
}

const DeleteForm: React.FC<ModalFormProps> = (props ) => (
  <Modal
    //Delete Form as Modal
    title="Delete"
    width="400px"
    visible={true}
    onCancel={() => closeModal()}
    destroyOnClose={true}
    footer={[
      <Button key="cancel" onClick={() => closeModal()}>Cancel</Button>,
      <Button key="delete" type='primary' danger onClick={async () => {
        const success = await handleRemove(
          props.projectionName,
          props.projectionId
        );
        if (success) {
          closeModal();
        }
      }}>Delete</Button>
    ]}
  >
    <h1>Are you sure?</h1>
  </Modal>
);

export default DeleteForm;
