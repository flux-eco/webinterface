import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Button, PageHeader} from 'antd';
import {getItemList} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import ProTable, {ActionType, ProColumns, TableDropdown} from '@ant-design/pro-table';
import {setLocale} from 'umi';
import {evaluateRules} from "@/adapters/RuleEvaluator";
import FluxProDescriptions from "@/components/FluxProDescriptions";
import FluxModal from "@/components/FluxModal";
import {fetchTablePage} from "@/adapters/Page";
import FluxSchemaForm from "@/components/FluxSchemaForm";
import {request} from "@@/plugin-request/request";
import ProLayout from '@ant-design/pro-layout';
import {fetchItem, handleCreate} from "@/adapters/Data";
import FluxCreateIliasCourse from "@/components/FluxCreateIliasCourse";
import {Content} from "antd/es/layout/layout";
import DeleteForm from "@/components/DeleteForm";

setLocale('de-DE') // TODO: dirty, find a better place

export default () => {

  const params: any = useParams();
  const tableRef = useRef<ActionType>();

  const [currentPage, setCurrentPage] = useState<API.tablePage>();
  const [currentModalTitle, setCurrentModalTitle] = useState<string>('');
  const [currentModalContent, setCurrentModalContent] = useState<JSX.Element>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [createButton, setCreateButton] = useState<JSX.Element>();
  const [currentTableColumns, setCurrentTableColumns] = useState<API.tableColumn[] | ProColumns>([]);


  const fetchItemList = async (offset: number | undefined,
                               limit: number | undefined,
                               sort: API.sort | undefined,
                               search: string | undefined): Promise<API.itemList> => {
    return await getItemList({
      projectionName: params.page,
      fluxoffset: offset,
      fluxlimit: limit,
      fluxsort: sort,
      fluxsearch: search
    })
  }


  const fetchPage = (): void => {
    fetchTablePage(params.page).then(
      page => {
        setCurrentPage(page);
        //creation Button
        if (page.table.createForm != undefined) {
          setCreateButton(<Button key="create" type='primary'
                                  onClick={() => handleSelect("create", [],page)}> Create </Button>)
        }

        //table columns & Actions
        if (page.table.columns !== undefined) {
          const columns = page.table.columns;

          const itemActions = page.table.itemActions;
          const actions = itemActions.map((itemAction: API.action) => {
            let showCurrentAction = true
            if (itemAction.rules !== undefined) {
              showCurrentAction = false;
              const rules = itemAction.rules
              showCurrentAction = evaluateRules(rules, item)
            }
            if (showCurrentAction) {
              return {key: itemAction.key, name: itemAction.title, operation: itemAction.operation}
            }
            return {}
          })

          setCurrentTableColumns(columns.concat([{
              key: 'actions', sorter: false, render: (_, row, index, action) => {
                return (<TableDropdown
                  key="actionGroup"
                  menus={actions}
                  onSelect={(key) => handleSelect(key, row, page)}
                />)
              }
            }])
          )
        }
      })
  }

  const handleSelect = (key: string, row: any[], page: API.tablePage) => {
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
            tableRef,
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
            message: undefined
          }
        ))
        setIsModalVisible(true);
        break;
      case "delete":
        setCurrentModalTitle('Delete');
        setCurrentModalContent(DeleteForm({projectionName: params.page, projectionId: row.projectionId, setIsModalVisible}))
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


        /*
         const handleShow = (form: API.form, itemData: any[]) => {
    setCurrentModalTitle(itemData.title);
    setCurrentModalContent(FluxProDescriptions({
      columns: form.columns,
      projectionId: itemData.projectionId,
      projectionName: params.page,
    }))
    setIsModalVisible(true);
  }
         */
    }
  };


  useEffect(() => {
    fetchPage();
  }, [])

  return (
    <>
      <ProLayout siderWidth={0}>
        <PageHeader ghost={false} onBack={() => window.history.back()} title={currentPage?.pageMetadata.title}>
          <Content style={{padding: '0 50px'}}>
            <ProTable<API.item>
              params={params}
              columns={currentTableColumns}
              actionRef={tableRef}
              search={false}
              options={{search: currentPage?.table.search}}
              request={(params, sort, filter) => {
                return Promise.resolve(
                  fetchItemList(((params.current * params.pageSize) - params.pageSize), params.pageSize, sort, params.keyword)
                )
              }}
              rowKey="projectionId"
              toolBarRender={() => [createButton]}
            >
            </ProTable>

            <FluxModal title={currentModalTitle} modalContent={currentModalContent}
                       setIsModalVisible={setIsModalVisible}
                       isModalVisible={isModalVisible}/>
          </Content>
        </PageHeader>
      </ProLayout>
    </>
  )
}
