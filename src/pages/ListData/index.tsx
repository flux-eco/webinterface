import {ReactText, useRef} from 'react';
import {useEffect, useState} from 'react';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import {Button, Divider, message, PageHeader, Modal} from 'antd';
import {create, deleteItem, getItem, getItemList, getPage, update} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import {flatMap, isString} from "lodash";
import ProTable, { ActionType, ProColumns, RequestData, TableDropdown } from '@ant-design/pro-table';
import {history} from '@/.umi/core/history';

export default () => {
  const params: any = useParams();
  const tableRef = useRef<ActionType>();
  const [pageTitle, setPageTitle] = useState<string | undefined>('');
  //const [avatar, setAvatar] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

  // table options

  // Modal Controlls
  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);
  const [currentEditItemId, setCurrentEditItemId] = useState<string>('');
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [modalDeleteFormVisibility, setModalDeleteFormVisibility] = useState<boolean>(false);

  const [createForm, setCreateForm] = useState<API.FormCreate>({});
  const [columns, setColumns] = useState<ProColumns<API.Item>[]>([]);

  const fetchItem = async(projectionName: string, projectionId: string) => {
    const item = await getItem(
      {projectionName: projectionName, projectionId: projectionId}
    )
    return item;
  }

  const fetchData = async () => {
    try {
      const list = await getItemList({projectionName: params.page})
      if (list.total && list.data) {
        setCurrentData(list.data);
      }
      const pageDefinition = await getPage({projectionName: params.page}) as API.TablePageDefinition
      const formCreate = pageDefinition.formCreate;


      setPageTitle(pageDefinition.title);

      if (formCreate) {
        setCreateForm(formCreate);
      }

      setColumns(formCreate?.properties?.map((prop) => {
        return {
          title: prop.title,
          dataIndex: prop.dataIndex
        } as ProColumns
      }).concat([{
        title: 'Actions',
        dataIndex: 'actions',
        width: '12em',
        key: 'option',
        valueType: 'option',
        render: (text, record, _, action) => [
          <a key="edit" onClick={() => {
            setCurrentEditItemId(record.projectionId)
            setModalEditFormVisibility(true);
          }}>edit</a>,
          <a key="delete" onClick={() => {
            setCurrentEditItemId(record.projectionId);
            setModalDeleteFormVisibility(true);
          }}>delete</a>,
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
    properties: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      const createParameter = {projectionName: params.page};
      if(createParameter.projectionName) {
        await create(createParameter, properties);
      }
      hide();
      //todo translate by api
      message.success('Added successfully');
      fetchData();
      return true;
    } catch (error) {
      hide();
      //todo translate by api
      message.error('Adding failed, please try again!');
      fetchData();
      return false;
    }
  };

  const handleUpdate = async (
    properties: API.Item
  ) => {
    const hide = message.loading('Configuring');
    try {

      const updateParameter = {projectionName: params.page, projectionId: currentEditItemId};

      await update(
        updateParameter, properties
      );
      hide();

      message.success('Configuration is successful');
      fetchData();
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
      fetchData();
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  return (
    <>
      <PageHeader 
        onBack={() => history.goBack()}
        title={pageTitle}
        extra={[
          <Button key="3">Edit</Button>,
          <Button key="1" type="primary" danger>
            Delete
          </Button>,
        ]}
      />
      <Divider />
      <ProTable<API.Item>
        columns={columns}
        actionRef={tableRef}
        request={async (param, sorter, filter) => {
          await fetchData();
          return {
            data: currentData,
            success: true,
            total: currentData.length
          };
        }}
        onRow={(record, index) => {
          return {
            onClick: event => {history.push(`/listdata/${params.page}/${record.projectionId}`)}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
        rowKey="key"
        toolBarRender={() => [
          <Button key="show" type='primary' onClick={() => setModalCreateFormVisibility(true)}>
            Add
          </Button>,
        ]}>
      </ProTable>
      <ModalForm
        // Creation Form as Modal
        title="New Entry"
        width="400px"
        visible={modalCreateFormVisibility}
        onVisibleChange={setModalCreateFormVisibility}
        submitter={false}
        onFinish={async (values) => {
          const success = await handleAdd(
            values as API.Item
          );
          if (success) {
            setModalCreateFormVisibility(false);
          }
        }}
      >
        <BetaSchemaForm // <DataItem[]> // ???
          layoutType={'Form'}
          onFinish={async (values) => {
            const success = await handleAdd(values as API.Item);
            if (success) {
              setModalCreateFormVisibility(false);
            }
          }}
          columns={createForm.properties ? createForm.properties : []}
        />
      </ModalForm>

      <ModalForm<API.Item>
        //Edit Form as Modal
        title="Edit Entry"
        width="400px"
        visible={modalEditFormVisibility}
        onVisibleChange={setModalEditFormVisibility}
        submitter={false}
        onFinish={async (values) => {
          const success = await handleUpdate(
            values as API.Item
          );
          if (success) {
            setModalEditFormVisibility(false);
          }
        }}
      >
        <BetaSchemaForm<API.Item>
          layoutType={'Form'}
          request={async () => {
              const res = await fetchItem(params.page, currentEditItemId)
              return res;
            }
          }
          onFinish={async (values) => {
            const success = await handleUpdate(values as API.Item);
            if (success) {
              setModalEditFormVisibility(false);
            }
          }}
          columns={createForm.properties as any}
        />
      </ModalForm>

      <Modal
        //Edit Form as Modal
        title="Delete"
        width="400px"
        visible={modalDeleteFormVisibility}
        // onVisibleChange={setModalDeleteFormVisibility}
        footer={[
          <Button key="cancel" onClick={() => setModalDeleteFormVisibility(false)}>Cancel</Button>,
          <Button key="delete" type='primary' danger onClick={async () => {
            const success = await handleRemove(
              params.page,
              currentEditItemId
            );
            if (success) {
              setModalDeleteFormVisibility(false);
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
