import ProTable, {ActionType, ProColumns, TableDropdown} from "@ant-design/pro-table";
import React, {useRef, useState} from "react";
import {useParams} from "react-router";
import {getItemList} from "@/services/flux-eco-system/api";
import FluxTableRowActions from "@/components/FluxTableRowActions";
import FluxModal from "@/components/FluxModal";
import FluxTableToolbarActions from "@/components/FluxTableToolbarActions";

export type FluxTableProps = {
  projectionName: string,
  table: API.table,
  setLoadingState: (state: boolean) => void
}

const FluxTable = (props: FluxTableProps) => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<JSX.Element>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const params = useParams();
  const tableRef = useRef<ActionType>();

  const reloadTable = () => {
    tableRef.current?.reload();
  }

  const fetchItemList = async (offset: number | undefined,
                               limit: number | undefined,
                               sort: API.sort | undefined,
                               search: string | undefined): Promise<API.itemList> => {
    return await getItemList({
      projectionName: props.projectionName,
      fluxoffset: offset,
      fluxlimit: limit,
      fluxsort: sort,
      fluxsearch: search
    })
  }

  const getColumns = (
    columns: any[],
    actions: API.action[]|undefined,
    projectoinName: string,
  ) => {
    if(actions) {
      return columns.concat([{
        key: 'actions',
        sorter: false,
        render: (_, row, index, action) => {
          return (
            <FluxTableRowActions
              row={row}
              actions={actions}
              projectionName={projectoinName}
              projectionId={row.projectionId}
              reloadTable={reloadTable}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              setIsModalVisible={setIsModalVisible}
              setLoadingState={props.setLoadingState}
            />
          )
        }
      }])
    }
    return columns;
  }

  const getToolbarActions = (
    actions: API.action[]|undefined,
    projectionName: string,
  ): JSX.Element[] => {
    if (actions) {
      const toolbarActionsProps = {
        projectionName: projectionName,
        actions: actions,
        reloadTable: reloadTable,
        setModalTitle: setModalTitle,
        setModalContent: setModalContent,
        setIsModalVisible: setIsModalVisible,
        setLoadingState: props.setLoadingState
      };

      return FluxTableToolbarActions(
        toolbarActionsProps
      )
    }
    return []
  }

  return (
    <>
    <ProTable<API.item>
      params={params}
      columns= {getColumns(props.table.columns, props.table.itemActions, props.projectionName)}
      actionRef={tableRef}
      search={false}
      options={{search: props.table.search}}
      request={(params, sort, filter) => {
        return Promise.resolve(
          fetchItemList(((params.current * params.pageSize) - params.pageSize), params.pageSize, sort, params.keyword)
        )
      }}
      rowKey="projectionId"
      toolbar={{
        actions: getToolbarActions(props.table.toolbarActions, props.projectionName)
      }}

    >
    </ProTable>

    <FluxModal title={modalTitle} modalContent={modalContent} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}/>
    </>
  );

};

export default FluxTable;
