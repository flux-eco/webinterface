import {BetaSchemaForm} from "@ant-design/pro-form";
import {handleUpdate} from "@/adapters/Data";
import {fromApiFormColumns} from "@/adapters/ProTypes/ProFormColumnsTypeAdapter";


export type FluxSchemaFormProps = {
  enums: any;
  columns: API.formColumn[];
  projectionName: string;
  projectionId: string;
  itemData: any[]
}

const FluxSchemaForm = (props: FluxSchemaFormProps) => {
console.log(props);
  const enumCourseType = props.enums;

  return <BetaSchemaForm<API.item>
    layoutType={'Form'}
    shouldUpdate={(newVal, oldVal) => {
      return true
    }}
    initialValues={props.itemData}
    syncToInitialValues={true}
    onFinish={async (values) => {
      const success = await handleUpdate(props.projectionName, props.projectionId, values as API.item);
    }}
    columns={fromApiFormColumns(props.columns)}
  />
};

export default FluxSchemaForm;
