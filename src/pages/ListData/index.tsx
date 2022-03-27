import {useEffect, useRef} from 'react';
import {useState} from 'react';
import {BetaSchemaForm} from '@ant-design/pro-form';
import {Button, Divider, message, PageHeader, Modal} from 'antd';
import {create, deleteItem, getItem, getItemList, getPage, update} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { setLocale } from 'umi';
import classNames from 'classnames';
import styles from './style.less'

setLocale('en-US') // TODO: dirty, find a better place

export default () => {
  const params: any = useParams();
  const tableRef = useRef<ActionType>();

  const [pageHeader, setPageHeader] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);

  // Modal Controlls
  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>({});
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [modalDeleteFormVisibility, setModalDeleteFormVisibility] = useState<boolean>(false);
  const [currentProjectionAction, setCurrentProjectionAction] = useState<string>(params.page);

  // Anti Spam Timers
  const [lastFetchData, setLastFetchData] = useState<number>(0);

  // Form Controlls
  const [unitTypeForm, setUnitTypeForm] = useState<{
    warmUp: any,
    playTime: any,
    coachCorner: any,
    practiceDrill: any,
    proTip: any
  }>({
    warmUp: {},
    playTime: {},
    coachCorner: {},
    practiceDrill: {},
    proTip: {}
  });

  // code gen objects
  const [createForm, setCreateForm] = useState<API.createForm>({});
  const [editForm, setEditForm] = useState<API.editForm>({})
  const [columns, setColumns] = useState<ProColumns<API.Item>[]>([]);

  const fetchData = async () => {
    try {
      setLastFetchData(Date.now());

      let pItem: any = {title: params.page};
      if(params.parentId !== undefined) {
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

      console.log(params)
      let list: any;
      if(params.parentId !== undefined) {
        console.log('getfiltered data');
        list = await getItemList({projectionName: params.page, parentId: params.parentId})
      } else {
        list = await getItemList({projectionName: params.page})
      }

      if (list.status === 'success') {
          setCurrentData(list.data);
      }

      const pageDefinition = await getPage({projectionName: params.page}) as API.PageDefinition
      if (pageDefinition.createForm !== undefined) {
        setCreateForm(pageDefinition.createForm);
      }
      if (pageDefinition.editForm !== undefined) {
        setEditForm(pageDefinition.editForm);
      }

      setColumns(pageDefinition.createForm?.properties?.map((prop) => {
        if (prop.valueType === 'color') {
          return {
            title: prop.title,
            dataIndex: prop.dataIndex,
            render: (text, record, _, action) => [
              <div className={classNames(styles.color)} style={{backgroundColor: record.color}}></div>
            ]
          } as ProColumns
        } else {
          return {
            title: prop.title,
            dataIndex: prop.dataIndex,
          } as ProColumns
        }
      }).concat([{
        title: 'Actions',
        dataIndex: 'actions',
        width: '8em',
        key: 'option',
        valueType: 'option',
        render: (text, record, _, action) => {return getItemActions(pageDefinition.itemActions,params.page,record)}
      }]) as ProColumns[]);

      tableRef?.current?.reload();

    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };


  useEffect(() => {
    fetchData();
  }, [])

  const handleAdd = async (
    projectionName: string,
    properties: any) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      const createParameter = {projectionName};
      properties.parentId = params.parentId;
      if (createParameter.projectionName) {
        await create(createParameter, properties);
      }
      hide();
      //todo translate by api
      message.success('Added successfully');
      await fetchData();
      return true;
    } catch (error) {
      hide();
      //todo translate by api
      message.error('Adding failed, please try again!');
      await fetchData();
      return false;
    }
  };

  const getItemActions = (itemActions: any|undefined, projectionName: string, item: any) => {
    let actions = [];
    console.log(itemActions)

    for (const arrkey in itemActions) {
      if(itemActions[arrkey].type === 'form') {
        actions = actions.concat([
          <a key={itemActions[arrkey].key} onClick={() => {
          setCurrentEditItem(item);
          openModal(itemActions[arrkey].key, projectionName);
        }}>{itemActions[arrkey].key}</a>
        ])
      }
      if(itemActions[arrkey].type === 'subobject') {
        actions = actions.concat([
          <a key={itemActions[arrkey].key} onClick={() => {
            location.href=`/listdata/${itemActions[arrkey].projectionName}/${item.projectionId}`
          }}>{itemActions[arrkey].key}</a>
        ])
      }
      console.log(itemActions[arrkey]); // prints indexes: 0, 1, 2, 3
    }
    return actions;
  }

  const handleUpdate = async (
    projectionName: string,
    projectionId: string,
    properties: any
  ) => {
    const hide = message.loading('Configuring');
    try {

      const updateParameter = {projectionName, projectionId};
      properties.parentId = params.parentId;
      properties.image = null;

      await update(
        updateParameter, properties
      );
      hide();

      message.success('Configuration is successful');
      await fetchData();
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  const handleRemove = async (projectionName: string, projectionId: string) => {
    const hide = message.loading('Loading');

    try {
      await deleteItem({
        projectionName: projectionName,
        projectionId: projectionId
      });

      hide();
      message.success('Deleted successfully and will refresh soon');
      await fetchData();
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  const openModal = (type: 'editForm' | 'createForm' | 'deleteForm', projection: string) => {
    setCurrentProjectionAction(projection);

    switch (type) {
      case 'editForm':
        setModalEditFormVisibility(true);
        break;
      case 'createForm':
        setModalCreateFormVisibility(true);
        break;
      case 'deleteForm':
        setModalDeleteFormVisibility(true);
        break;
    }
  }

  const closeModal = () => {
    setModalEditFormVisibility(false);
    setModalCreateFormVisibility(false);
    setModalDeleteFormVisibility(false);
  }

  return (
    <>
      {
        pageHeader
      }
      <Divider />
      <ProTable<API.Item>
        columns={columns}
        actionRef={tableRef}
        request={async (param, sorter, filter) => {
          if (lastFetchData + 1000 < Date.now()) { // spam protection
            await fetchData();
          }

          return {
            data: currentData,
            success: true,
            total: currentData.length
          };
        }}
        onRow={(record, index) => {
          return {
            onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowKey="key"
        toolBarRender={() => [
          <Button key="show" type='primary' onClick={() => openModal('createForm', params.page)}>
            Add
          </Button>,
        ]}>
      </ProTable>

      <Modal
        // Creation Form as Modal
        title="New Entry"
        visible={modalCreateFormVisibility}
        onCancel={() => closeModal()}
        destroyOnClose={true}
        footer={false}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '1em'
        }}
        width='60vw'
      >
        <BetaSchemaForm
          layoutType={'Form'}
          onFieldsChange={(changedField, allFields) => {
            console.log(changedField, allFields);
          }}
          onFinish={async (values) => {
            const success = await handleAdd(currentProjectionAction, values as API.Item);
            if (success) {
              closeModal();
            }
          }}
          columns={createForm.properties ? createForm.properties : []}/>

          <Divider type='vertical' style={{height: '100%'}} />
      </Modal>

      <Modal
        //Edit Form as Modal
        title="Edit Entry"
        width="400px"
        visible={modalEditFormVisibility}
        onCancel={() => closeModal()}
        destroyOnClose={true}
        footer={false}
      >
        <BetaSchemaForm<API.Item>
          layoutType={'Form'}
          shouldUpdate={(newVal, oldVal) => {
              return true
            }
          }
          initialValues={currentEditItem}
          syncToInitialValues={true}
          onFinish={async (values) => {
            const success = await handleUpdate(currentProjectionAction, currentEditItem.projectionId, values as API.Item);
            if (success) {
              closeModal();
            }
          }}
          columns={editForm.properties as any}
        />
      </Modal>

      <Modal
        //Delete Form as Modal
        title="Delete"
        width="400px"
        visible={modalDeleteFormVisibility}
        onCancel={() => closeModal()}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={() => closeModal()}>Cancel</Button>,
          <Button key="delete" type='primary' danger onClick={async () => {
            const success = await handleRemove(
              currentProjectionAction,
              currentEditItem.projectionId
            );
            if (success) {
              closeModal();
            }
          }}>Delete</Button>
        ]}
      >
        <h1>Are you sure?</h1>
      </Modal>
    </>
  );
};
