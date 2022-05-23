import {Button, message} from 'antd';
import {deleteItem} from "@/services/flux-eco-system/api";

const handleRemove = async (
  projectionName: string,
  projectionId: string,
  reloadTable: () => void,
  setLoadingState: (state: boolean) => void
  ) => {
  try {
    setLoadingState(true)
    await deleteItem({
      projectionName: projectionName,
      projectionId: projectionId
    }).then(
      () => { setTimeout(function(){
        reloadTable() //eventual consistency
        setLoadingState(false)
      }, 1000)}
    ).then(() => {
      message.success('Deleted successfully and will refresh soon')
    })
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
  reloadTable: () => void,
  setLoadingState: (state: boolean) => void
}

const DeleteForm = (props: DeleteFormProps) => (
  <>
    <h1>Are you sure?</h1>
    <Button key="cancel" onClick={() => props.setIsModalVisible(false)}>Cancel</Button>
    <Button key="delete" type='primary' danger onClick={async () => {
      const success = await handleRemove(
        props.projectionName,
        props.projectionId,
        props.reloadTable,
        props.setLoadingState
      );
      if (success) {
        props.setIsModalVisible(false);
      }
    }}>Delete</Button>
  </>
);

export default DeleteForm;
