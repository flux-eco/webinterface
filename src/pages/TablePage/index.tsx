import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Button, Divider} from 'antd';
import {getItemList, getPage} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {setLocale} from 'umi';
import CreateForm from "@/components/CreateForm";
import EditForm from "@/components/EditForm";
import DeleteForm from "@/components/DeleteForm";
import {ButtonType} from "antd/lib/button";
import {evaluateRules} from "@/adapters/RuleEvaluator";

setLocale('de-DE') // TODO: dirty, find a better place

export default () => {

  const params: any = useParams();
  const tableRef = useRef<ActionType>();

  // Modal Controlls
  const [creationFormIsVisible, showCreationForm] = useState<boolean>(false);
  const [currentCreationForm, setCurrentCreationForm] = useState<API.createForm>({});

  const [editFormIsVisible, showEditForm] = useState<boolean>(false);
  const [currentEditForm, setCurrentEditForm] = useState<API.editForm>({});

  const [deleteFormIsVisible, showDeleteForm] = useState<boolean>(false);

  const [currentEditItem, setCurrentEditItem] = useState<API.item>({});

  const [currentPage, setCurrentPage] = useState<API.page>({});
  const [currentTableColumns, setCurrentTableColumns] = useState<API.column[]|ProColumns>([]);


  const fetchItemList = async (
    offset: number | undefined,
    limit: number | undefined,
    sort: API.sort | undefined,
    search: string | undefined): Promise<API.itemList> => {
    try {
      switch (params.parentId) {
        case undefined:
          return await getItemList({
            projectionName: params.page,
            offset: offset,
            limit: limit,
            sort: sort,
            search: search
          })
        default:
          return await getItemList({
            projectionName: params.page,
            parentId: params.parentId,
            offset: offset,
            limit: limit,
            sort: sort,
            search: search
          })
      }
    } catch (error) {
      console.error('Fetch Data failed ', error)
    }

    return {} as API.itemList
  };


  const fetchPage = async (): Promise<API.tablePage> => {
    const page = await getPage({projectionName: params.page})
    if (page.table?.createForm?.columns !== undefined) {
      setCurrentCreationForm(page.table.createForm);
    }
    if (page.table?.editForm?.columns !== undefined) {
      setCurrentEditForm(page.table.editForm);
    }

    if(page.table?.columns !== undefined) {
      const columns = page.table?.columns;
      setCurrentTableColumns(
        columns.concat([{
          title: 'Actions',
          dataIndex: 'actions',
          sorter: false,
          render: (_, row, index, action) => {
            return getItemActions(page.table?.itemActions, page.pageMetadata?.projectionName, row)
          }
        }])
      )
    }
    setCurrentPage(page)
    return currentPage;
  }

  const getItemActions = (itemActions: any | undefined, projectionName: string, item: any) => {
    let actions = [];

    console.log('item');
    console.log(item);

    for (const arrkey in itemActions) {
      if (itemActions[arrkey].type === 'form') {
        actions = actions.concat([
          <a key={itemActions[arrkey].key} onClick={() => {
            setCurrentEditItem(item);
            if(itemActions[arrkey].key === "delete") {
              showDeleteForm(true)
            }
            if(itemActions[arrkey].key === "edit") {
              showEditForm(true)
            }
          }}>{itemActions[arrkey].key}</a>
        ])
      }

      if (itemActions[arrkey].type === 'subobject') {
        actions = actions.concat([
          <a key={itemActions[arrkey].key} onClick={() => {
            location.href = `/listdata/${projectionName}/${item.projectionId}`
          }}>{itemActions[arrkey].key}</a>
        ])
      }

      if (itemActions[arrkey].type === 'backendAction') {
        let showCurrentAction = false;
        if(itemActions[arrkey].rules !== undefined) {
          const rules =  itemActions[arrkey].rules
          showCurrentAction = evaluateRules(rules, item)
        } else {
          showCurrentAction = true
        }

        if(showCurrentAction) {
          actions = actions.concat([
            <a key={itemActions[arrkey].key} onClick={() => {
              location.href = `/api/v1/command/${projectionName}/item/${item.projectionId}/createIliasCourse`
            }}>{itemActions[arrkey].title}</a>
          ])
        }
      }
    }
    return actions;
  }


  /*  let pItem: any = {title: params.page};
    if (params.parentId !== undefined) {
      pItem = await getItem({projectionName: params.page, projectionId: params.parentId});
      setPageHeader(
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={params.page}
        />
      );
    } else {
      setPageHeader(
        <PageHeader
          title={params.page}
        />
      );
    }

*/

  useEffect(() => {
   fetchPage();

  }, [])

  return (
    <>
      <Divider/>
      <ProTable<API.item>
        params={params}
        columns= {currentTableColumns}
        actionRef={tableRef}
        search={false}
        options={{
          search: true,
        }}

        request={(params,
                  sort,
                  filter) => {
          //params.current
          return Promise.resolve(
            fetchItemList(0, params.pageSize, sort, params.keyword)
          )
        }}
        rowKey="projectionId"
        toolBarRender={(action) => [ <Button  key="show" type='primary' onClick={() => showCreationForm(true)}>  Add  </Button>]}
        >
      </ProTable>

      {creationFormIsVisible && <CreateForm title={currentCreationForm.title} columns={currentCreationForm.columns} params={params} projectionName={currentPage.pageMetadata?.projectionName}/>}
      {editFormIsVisible && <EditForm title={currentEditForm.title} columns={currentEditForm.columns} params={params} projectionName={params.page}/>}
      {deleteFormIsVisible && <DeleteForm title={'Datensatz Löschen'} params={params} projectionName={params.page} projectionId={currentEditItem.projectionId}/>}

  </>
  );
};
