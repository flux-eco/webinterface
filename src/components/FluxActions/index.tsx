import {EditOutlined, FolderOpenOutlined, SettingOutlined} from "@ant-design/icons";
import {TableDropdown} from "@ant-design/pro-table";


function handleSelect(key: string, operation: string) {

}
export type FluxActionsProps = {
  projectionId: string;
  actions: API.action[];
}
const FluxActions = (props: FluxActionsProps) => {
  const menuItems = props.actions.map((action, index) => {
    let icon = undefined;
    switch (action.icon) {
      case 'edit':
        icon = <EditOutlined/>
        break;
      case 'setting':
        icon = <SettingOutlined/>
        break;
      case 'open':
        icon = <FolderOpenOutlined/>
        break;
    }
    const key = props.projectionId + "_" + index;
    return {
      key: key, name: action.title, operation: action.operation, icon: icon, onClick: () => {
        console.log("click")
      }
    }
  }, props.projectionId)

  return <TableDropdown
    key={"action" + props.projectionId}
    menus={menuItems}
  />
}




export default FluxActions;
