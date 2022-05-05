import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Button, Divider, Dropdown, Menu, Space} from 'antd';
import {getItemList, getPage} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import ProTable, {ActionType, ProColumns, TableDropdown} from '@ant-design/pro-table';
import {setLocale} from 'umi';
import CreateForm from "@/components/CreateForm";
import EditForm from "@/components/EditForm";
import DeleteForm from "@/components/DeleteForm";
import {evaluateRules} from "@/adapters/RuleEvaluator";
import FluxProDescriptions from "@/components/FluxProDescriptions";
import FluxModal from "@/components/FluxModal";
import {fetchTablePage} from "@/adapters/Page";
import FluxSchemaForm from "@/components/FluxSchemaForm";

setLocale('de-DE') // TODO: dirty, find a better place

export default () => {

  const params: any = useParams();
  const tableRef = useRef<ActionType>();

  const [currentModalTitle, setCurrentModalTitle] = useState<string>('');
  const [currentModalContent, setCurrentModalContent] = useState<JSX.Element>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Modal Controlls
  const [creationFormIsVisible, showCreationForm] = useState<boolean>(false);
  const [currentCreationForm, setCurrentCreationForm] = useState<API.form>({});

  const [editFormIsVisible, showEditForm] = useState<boolean>(false);
  const [currentEditForm, setCurrentEditForm] = useState<API.form>();
  const [currentShowForm, setCurrentShowForm] = useState<API.form>();

  const [deleteFormIsVisible, showDeleteForm] = useState<boolean>(false);

  const [currentEditItem, setCurrentEditItem] = useState<API.item>();
  const [currentPage, setCurrentPage] = useState<API.tablePage>();
  const [currentTableColumns, setCurrentTableColumns] = useState<API.tableColumn[]|ProColumns>([]);


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

    const page = await fetchTablePage(params.page)
    if (page.table.createForm?.columns !== undefined) {
      setCurrentCreationForm(page.table.createForm);
    }
    if (page.table.editForm?.columns !== undefined) {
      setCurrentEditForm(page.table.editForm);
    }
    if (page.table.showForm?.columns !== undefined) {
      setCurrentShowForm(page.table.showForm);
    }

    if(page.table.columns !== undefined) {
      const columns = page.table.columns;
      setCurrentTableColumns(
        columns.concat([{
          label: 'Actions',
          key: 'actions',
          sorter: false,
          render: (_, row, index, action) => {
            return getItemActions(page.table?.itemActions, page.pageMetadata?.projectionName, row)
          }
        }])
      )
    }
    setCurrentPage(page)
    return page;
  }

  const handleShow = (form: API.form, itemData: any[]) => {
    setCurrentModalTitle('dd');
    setCurrentModalContent(FluxProDescriptions({
      columns: form.columns,
      projectionId: itemData.projectionId,
      projectionName: params.page,
    }))
    setIsModalVisible(true);
  }

  const handleEditForm = (form: API.form, itemData: any) => {
    setCurrentModalTitle('dd');
    setCurrentModalContent(
      FluxSchemaForm(
        {
          enums: form.enums,
          columns: form.columns,
          projectionName: params.page,
          projectionId: itemData.projectionId,
          values: itemData
        }
      )
    )
    setIsModalVisible(true);
  }

  const handleSelect = (key:string, itemData: any[]) => {

    if(key === "showForm")  {
      if(currentShowForm !== undefined) {
        handleShow(currentShowForm, itemData)
      } else {
        fetchPage().then(page => {
          handleShow(page.table.showForm, itemData)}
        );
      }
    }

    if(key === "editForm")  {
      console.log(itemData)
      if(currentEditForm !== undefined) {
        handleEditForm(currentEditForm.enums,currentEditForm, itemData, setIsModalVisible)
      } else {
        fetchPage().then(page => {
          handleEditForm(page.table.editForm.enums, page.table.editForm, itemData, setIsModalVisible)}
        );
      }
    }

    // if (itemActions[arrkey].type === 'form') {

    /*f (itemActions[arrkey].type === 'subobject') {
        actions = actions.concat([
          { key: itemActions[arrkey].key, name:itemActions[arrkey].title }

          <a key={itemActions[arrkey].key} onClick={() => {
            location.href = `/listdata/${projectionName}/${item.projectionId}`
          }}>{itemActions[arrkey].key}</a>
        ])

         actions = actions.concat([
            <a key={itemActions[arrkey].key} onClick={() => {
              location.href = `/api/v1/command/${projectionName}/item/${item.projectionId}/createIliasCourse`
            }}>{itemActions[arrkey].title}</a>
          ])
      }*/
  };


  const getItemActions = (itemActions: any | undefined, projectionName: string, item: any) => {
    let actions = [];
    for (const arrkey in itemActions) {
        let showCurrentAction = true
        if(itemActions[arrkey].rules !== undefined) {
          let showCurrentAction = false;
          const rules =  itemActions[arrkey].rules
          showCurrentAction = evaluateRules(rules, item)
        }
        if(showCurrentAction) {
          actions = actions.concat([
            { key: itemActions[arrkey].key, name:itemActions[arrkey].title }
          ])
        }
      }

    return <TableDropdown
      key="actionGroup"
      onSelect={(key) => handleSelect(key, item)}
      menus={actions}
    />
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
            fetchItemList( params.current, params.pageSize, sort, params.keyword)
          )
        }}
        rowKey="projectionId"
        //toolBarRender={(action) => [ <Button  key="show" type='primary' onClick={() => showCreationForm(true)}>  Add  </Button>]}
        >
      </ProTable>

      {creationFormIsVisible && <CreateForm title={currentCreationForm.title} columns={currentCreationForm.columns} params={params} projectionName={currentPage.pageMetadata?.projectionName}/>}


      {deleteFormIsVisible && <DeleteForm title={'Datensatz Löschen'} params={params} projectionName={params.page} projectionId={currentEditItem.projectionId}/>}

      <FluxModal title={currentModalTitle} modalContent={currentModalContent} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
  </>
  );
};
