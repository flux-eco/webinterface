import {Button, message} from 'antd';
import React from 'react';
import {deleteItem} from "@/services/flux-eco-system/api";

const handleRemove = async (projectionName: string, projectionId: string) => {
  try {
    await deleteItem({
      projectionName: projectionName,
      projectionId: projectionId
    });
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    message.error('Delete failed, please try again');
    return false;
  }
};

export type DeleteFormProps = {
  projectionName: string;
  projectionId: string;
  setIsModalVisible: (visible: boolean) => void;
}

const DeleteForm = (props: DeleteFormProps) => (
  <>
    <h1>Are you sure?</h1>
    <Button key="cancel" onClick={() => props.setIsModalVisible(false)}>Cancel</Button>
    <Button key="delete" type='primary' danger onClick={async () => {
      const success = await handleRemove(
        props.projectionName,
        props.projectionId
      );
      if (success) {
        props.setIsModalVisible(false);
      }
    }}>Delete</Button>
  </>
);

export default DeleteForm;
