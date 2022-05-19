import ProDescriptions from '@ant-design/pro-descriptions';
import FluxMessage from "@/components/FluxMessage";
import {Button, message} from "antd";
import {update} from "@/services/flux-eco-system/api";
import {ActionType} from "@ant-design/pro-table";

export type FluxCreateIliasCourseProps = {
  columns: API.formColumn[];
  projectionName: string;
  projectionId: string;
  itemData: API.item,
  tableRef: ActionType
}

const FluxCreateIliasCourse = (props: FluxCreateIliasCourseProps) => {
  const columns = props.columns;
  const projectionName = props.projectionName;
  const projectionId = props.projectionId;
  const itemData = props.itemData

  const handleCreateIliasCourse = async (
    projectionName: string,
    projectionId: string
  ) => {
    const hide = message.loading('loading');
    try {
      const updateParams = {
        projectionName: projectionName,
        projectionId: projectionId
      };
      await update(updateParams, {statusIlias: "orderd"});
      hide();
      //todo translate by api
      message.success('ILIAS-Kurs wird in kürze bereit stehen.');
      return true;
    } catch (error) {
      hide();
      //todo translate by api
      message.error('Bestellung fehlgeschlagen');
      return false;
    }
  };

  if(itemData.alert) {
    console.log("dddddd");
    console.log(itemData);
    return (
      <>
      <FluxMessage message={itemData.alert} />
        <br/>
        <br/>
        <ProDescriptions column={2} title={''} tooltip="" dataSource={itemData.data} columns={columns}>
        </ProDescriptions>
      </>
    )
  } else {
    return(
    <>
    <ProDescriptions column={2} title={''} tooltip="" dataSource={itemData.data} columns={columns}>
    </ProDescriptions>
      <br/>
      <br/>
      <Button type="primary" onClick={() => handleCreateIliasCourse(projectionName, projectionId)}>ILIAS Kurs erstellen</Button>
    </>
    )
  }


};

export default FluxCreateIliasCourse;
