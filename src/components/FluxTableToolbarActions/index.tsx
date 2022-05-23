import FluxSchemaForm from "@/components/FluxSchemaForm";
import {Button} from "antd";

export type FluxTableToolbarActionsProps = {
  projectionName: string
  actions: API.action[]
  reloadTable: () => void;
  setModalTitle: (title: string) => void,
  setModalKey: (key: string|number) => void,
  setModalContent: (content: JSX.Element | undefined) => void,
  setIsModalVisible: (isVisible: boolean) => void,
  setLoadingState: (state: boolean) => void;
}

const FluxTableToolbarActions = (props: FluxTableToolbarActionsProps): JSX.Element[] => {

  const setLoadingState = (state: boolean) => {
    console.log("setLoading state")
    props.setLoadingState(state);
  }
  const reloadTable = () => {
    props.reloadTable();
  }
  const getActionByKey = (key: string, actions: API.action[]) => {
    let action = actions.filter((obj) => (
      obj.key == key
    ));
    return action[0];
  }

  const handleToolbarButtonOnClick = (
    key: string,
    actions: API.action[],
    projectionName: string
  ) => {

    const action = getActionByKey(key, actions);

    switch (action.actionType) {
      case "openForm":
        props.setModalTitle(action.form.formTitle);
        props.setModalContent(FluxSchemaForm({
            enums: [],
            sections: action.form.sections,
            projectionName: projectionName,
            projectionId: "",
            itemData: [],
            setIsModalVisible: props.setIsModalVisible,
            reloadTable,
            setLoadingState,
            message: undefined
          }
        ))
        props.setIsModalVisible(true)
        break;
      default:
        console.log("actionType not found " + action.actionType)
    }
  };

  return props.actions.map((action: API.action) => {
    return <Button key={action.key} type='primary'
                   onClick={() => handleToolbarButtonOnClick(action.key, props.actions, props.projectionName)}>{action.title}</Button>
  });
};

export default FluxTableToolbarActions;
