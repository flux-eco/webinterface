import {Modal} from "antd";

export type FluxModalProps = {
  title: string;
  modalContent: JSX.Element|undefined;
  setIsModalVisible: (visible: boolean) => void;
  isModalVisible: boolean;
}

const FluxModal = (props:FluxModalProps ) => (
  <Modal
    title={props.title}
    visible={props.isModalVisible}
    width="800px"
    onCancel={() => props.setIsModalVisible(false)}
    destroyOnClose={true}
    footer={false}
  >
    {props.modalContent}
  </Modal>
);

export default FluxModal;
