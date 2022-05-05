import ProDescriptions from '@ant-design/pro-descriptions';
import {fetchItem} from "@/adapters/Data";

export type FluxProDescriptionsProps = {
  columns: API.formColumn[];
  projectionName: string;
  projectionId: string;
}

const FluxProDescriptions = (props: FluxProDescriptionsProps) => {
  const columns = props.columns;
  const projectionName = props.projectionName;
  const projectionId = props.projectionId;

  return <ProDescriptions column={2} title={''} tooltip="" request={
    (params) => {
      //params.current
      return Promise.resolve(
        fetchItem(projectionName, projectionId)
      )
  }} columns={columns}>
  </ProDescriptions>
};

export default FluxProDescriptions;
