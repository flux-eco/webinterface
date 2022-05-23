import {TableDropdown} from "@ant-design/pro-table";
import {evaluateRules} from "@/adapters/RuleEvaluator";
import {request} from "umi";
import FluxSchemaForm from "@/components/FluxSchemaForm";
import FluxCreateIliasCourse from "@/components/FluxCreateIliasCourse";
import DeleteForm from "@/components/DeleteForm";

export type FluxTableRowActionsProps = {
  projectionName: string,
  projectionId: string,
  row: [],
  actions: API.action[],
  reloadTable: () => void,
  setModalTitle: (title: string) => void,
  setModalContent: (content: JSX.Element|undefined) => void,
  setIsModalVisible: (isVisible: boolean) => void,
  setLoadingState: (state: boolean) => void
}

const FluxTableRowActions = (props: FluxTableRowActionsProps) => {

  const reloadTable = () => {
    props.reloadTable();
  }

  const getActionByKey = (key: string, actions: API.action[]) => {
    let action = actions.filter((obj)=> (
      obj.key == key
    ));
    return action[0];
  }

  const handleSelect = (
    key: string,
    menuActions: API.action[],
    projectionName: string,
    projectionId: string,
    row: []
  ) => {

    const action = getActionByKey(key, menuActions);

    switch (action.actionType) {
      case "backendAction":
        request(`/api/v1/command/${projectionName}/item/${projectionId}/${action.operation}`, {
          method: 'GET'
        }).then(() => {props.reloadTable()});
        break;
      case "openForm":
        let formTitle = ""
        if(action.form?.formTitle?.dataIndex) {
           formTitle = row[action.form?.formTitle?.dataIndex]
        }
        props.setModalTitle(formTitle);
        props.setModalContent(FluxSchemaForm({
            enums: [],
            sections: action.form.sections,
            projectionName: projectionName,
            projectionId: projectionId,
            itemData: row,
            setIsModalVisible: props.setIsModalVisible,
            reloadTable: reloadTable,
            setLoadingState: props.setLoadingState,
            message: undefined
          }
        ))
        props.setIsModalVisible(true);
        break;
      case "deleteItem":
        props.setModalTitle('Delete');
        props.setModalContent(DeleteForm({
          projectionName: projectionName,
          projectionId: projectionId,
          setIsModalVisible: props.setIsModalVisible,
          reloadTable: reloadTable,
          setLoadingState: props.setLoadingState
        }))
        props.setIsModalVisible(true);
        break;
      case "createIliasCourse":
        props.setModalContent(FluxCreateIliasCourse({
          columns: action.form.sections[0].columns,
          projectionId: projectionId,
          projectionName: projectionName,
          itemData: row,
        }))
        props.setIsModalVisible(true);
        break;
      default:
        console.log("actionType not found " + action.actionType)
    }


    console.log(key);
    console.log(action)
    console.log(projectionName);
    console.log(projectionId);
    console.log(row);


    /*
    switch (key) {
      case "edit":
        setCurrentModalTitle(row.title);
        setCurrentModalContent(FluxSchemaForm({
            enums: [],
            sections: page.table.editForm?.sections,
            projectionName: params.page,
            projectionId: row.projectionId,
            itemData: row,
            setIsModalVisible,
            reloadTable,
            setLoadingState,
            message: undefined
          }
        ))
        setIsModalVisible(true);
        break;
      case "create":
        setCurrentModalTitle('Create');
        setCurrentModalContent(FluxSchemaForm({
            enums: [],
            sections: page.table.editForm?.sections,
            projectionName: params.page,
            projectionId: undefined,
            itemData: undefined,
            setIsModalVisible,
            reloadTable,
            setLoadingState,
            message: undefined
          }
        ))
        setIsModalVisible(true);
        break;
      case "delete":
        setCurrentModalTitle('Delete');
        setCurrentModalContent(DeleteForm({
          projectionName: params.page,
          projectionId: row.projectionId,
          setIsModalVisible
        }))
        setIsModalVisible(true);
        break;
      case "createIliasCourse":
        setCurrentModalContent(FluxCreateIliasCourse({
          columns: page.table.editForm?.columns,
          projectionId: row.projectionId,
          projectionName: params.page,
          itemData: row,
        }))
        setIsModalVisible(true);
        break;
      case "backendAction":
        request(`/api/v1/command/${params.page}/item/${row.projectionId}/${key}`, {
          method: 'GET'
        });
        window.location.reload();
        break;


    }*/
  };


  const menusActions = props.actions.map((itemAction: API.action) => {
    let showCurrentAction = true
    if (itemAction.rules !== undefined) {
      showCurrentAction = false;
      const rules = itemAction.rules
      showCurrentAction = evaluateRules(rules, props.row)
    }
    if (showCurrentAction) {
      return  {key: itemAction.key, name: itemAction.title, operation: itemAction.operation}
    }
    return {}
  })

  return (
    <TableDropdown
      key={"actionGroup"}
      menus={menusActions}
      onSelect={(key: string) => handleSelect(key, props.actions, props.projectionName, props.projectionId, props.row)}
    />
  );

};

export default FluxTableRowActions;
