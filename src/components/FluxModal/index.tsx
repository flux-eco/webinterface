import {Layout, Modal} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {Content} from "antd/lib/layout/layout";

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
    width="1200px"
    onCancel={() => props.setIsModalVisible(false)}
    destroyOnClose={true}
    footer={false}
  >
    {props.modalContent}
  </Modal>

);

export default FluxModal;
