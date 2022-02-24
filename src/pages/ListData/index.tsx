import {useRef} from 'react';
import {useState} from 'react';
import {BetaSchemaForm} from '@ant-design/pro-form';
import {Button, Divider, message, PageHeader, Modal} from 'antd';
import {create, deleteItem, getItem, getItemList, getPage, update} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {history} from '@/.umi/core/history';
import Tooltip from 'antd/es/tooltip';
import { ArrowRightOutlined } from '@ant-design/icons';

export default () => {
  const params: any = useParams();
  const tableRef = useRef<ActionType>();

  const [lastFetch, setLastFetch] = useState<number>(0);
  const [pageTitle, setPageTitle] = useState<string | undefined>('');
  const [currentData, setCurrentData] = useState<any[]>([]);

  // Modal Controlls
  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>({});
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [modalDeleteFormVisibility, setModalDeleteFormVisibility] = useState<boolean>(false);
  const [currentProjectionAction, setCurrentProjectionAction] = useState<string>(params.page);

  // code gen objects
  const [createForm, setCreateForm] = useState<API.FormCreate>({});
  const [editForm, setEditForm] = useState<any>({})
  const [columns, setColumns] = useState<ProColumns<API.Item>[]>([]);

  const fetchItem = async(projectionName: string, projectionId: string) => {
    const item = await getItem(
      {projectionName: projectionName, projectionId: projectionId}
    )
    return item;
  }

  const fetchData = async () => {
    try {
      setLastFetch(Date.now());
      const list = await getItemList({projectionName: params.page})
      if (list.total && list.data) {
        setCurrentData(list.data);
      }
      const pageDefinition = await getPage({projectionName: params.page}) as API.TablePageDefinition
      const parentItem = await getItem({projectionName: 'TopicalArea', projectionId: params.topicalAreaId});

      const formCreate = pageDefinition.formCreate;

      setPageTitle(parentItem.title);

      if (formCreate) {
        setCreateForm(formCreate);
      }

      if (pageDefinition.formEdit !== undefined) {
        setEditForm(pageDefinition.formEdit);
      }

      console.log(pageDefinition)
      console.log(editForm)

      setColumns(formCreate?.properties?.map((prop) => {
        return {
          title: prop.title,
          dataIndex: prop.dataIndex
        } as ProColumns
      }).concat([{
        title: 'Actions',
        dataIndex: 'actions',
        width: '8em',
        key: 'option',
        valueType: 'option',
        render: (text, record, _, action) => [
          <a key="edit" onClick={() => {
            setCurrentEditItem(record);
            openModal('edit', params.page);
          }}>edit</a>,
          <a key="delete" onClick={() => {
            setCurrentEditItem(record);
            openModal('delete', params.page);
          }}>delete</a>,
        ]
      }, {
        title: 'Enter',
        dataIndex: 'enter',
        width: '6em',
        key: 'option',
        valueType: 'option',
        render: (text, record, _, action) => [
          <Tooltip title="enter">
            <Button type="primary" shape="circle" icon={<ArrowRightOutlined />} onClick={() => history.push(`/listdata/${params.page}/${params.topicalAreaId}/${record.projectionId}`)}/>
          </Tooltip>
        ]
      }]) as ProColumns[]);

      tableRef?.current?.reload();

    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [location]);

  const handleAdd = async (
    projectionName: string,
    properties: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      console.log('add ', params.page)
      const createParameter = {projectionName: projectionName};

      if (params.page == 'TrainingSession') {
        properties.topicalAreaId = params.topicalAreaId;
        console.log(properties)
      }

      if(createParameter.projectionName) {
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

  const handleUpdate = async (
    projectionName: string,
    projectionId: string,
    properties: API.Item
  ) => {
    const hide = message.loading('Configuring');
    try {

      const updateParameter = {projectionName, projectionId};

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

  const openModal = (type: 'edit' | 'create' | 'delete', projection: string) => {
    setCurrentProjectionAction(projection);

    switch (type) {
      case 'edit':
        setModalEditFormVisibility(true);
        break;
      case 'create':
        setModalCreateFormVisibility(true);
        break;
      case 'delete':
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
      <PageHeader 
        onBack={() => history.goBack()}
        title={pageTitle}
        extra={[
          <Button key="3" onClick={() => openModal('edit', 'TopicalArea')}>Edit</Button>,
          <Button key="1" type="primary" danger onClick={() => openModal('delete', 'TopicalArea')}>
            Delete
          </Button>,
        ]}
      />
      <Divider />
      <ProTable<API.Item>
        columns={columns}
        actionRef={tableRef}
        request={async (param, sorter, filter) => {
          if (lastFetch + 1000 < Date.now() || !currentData.length) { // spam protection
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
          <Button key="show" type='primary' onClick={() => openModal('create', params.page)}>
            Add
          </Button>,
        ]}>
      </ProTable>

      <Modal
        // Creation Form as Modal
        title="New Entry"
        width="400px"
        visible={modalCreateFormVisibility}
        onCancel={() => closeModal()}
        destroyOnClose={true}
        footer={false}
      >
        <BetaSchemaForm // <DataItem[]> // ???
          layoutType={'Form'}
          onFinish={async (values) => {
            const success = await handleAdd(currentProjectionAction, values as API.Item);
            if (success) {
              closeModal();
            }
          }}
          columns={createForm.properties ? createForm.properties : []}
        />
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
            const success = await handleUpdate(currentProjectionAction, currentEditItem, values as API.Item);
            if (success) {
              closeModal();
            }
          }}
          columns={createForm.properties as any}
        />
      </Modal>

      <Modal
        //Edit Form as Modal
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
              currentEditItem
            );
            if (success) {
              closeModal();
            }
          }}>Delete</Button>
        ]}
        // onFinish={async (values) => {
        //   const success = await handleRemove(
        //     params.page,
        //     currentEditItemId
        //   );
        //   if (success) {
        //     setModalEditFormVisibility(false);
        //   }
        // }}
      >
        <h1>Are you sure?</h1>
      </Modal>
    </>
  );
};
