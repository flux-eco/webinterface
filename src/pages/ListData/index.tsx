import {ReactText, useRef} from 'react';
import {useEffect, useState} from 'react';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import {Button, message} from 'antd';
import {create, deleteItem, getItem, getItemList, getPage, update} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import {isString} from "lodash";
import ProTable, { ActionType, ProColumns, RequestData, TableDropdown } from '@ant-design/pro-table';

export default () => {
  const params: any = useParams();
  const tableRef = useRef<ActionType>();
  const [pageTitle, setPageTitle] = useState<string | undefined>('');
  //const [avatar, setAvatar] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);


  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);

  const [currentEditItemId, setCurrentEditItemId] = useState<string>('');
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<API.FormCreate>({});
  const [columns, setColumns] = useState<ProColumns<API.Item>[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };


  const fetchItem = async(projectionName: string, projectionId: string) => {
    const item = await getItem(
      {projectionName: projectionName, projectionId: projectionId}
    )
    return item;
  }

  const fetchData = async () => {
    try {
      const list = await getItemList({projectionName: params.projectionName})
      if (list.total && list.data) {
        setCurrentData(list.data);
      }
      const pageDefinition = await getPage({projectionName: params.projectionName}) as API.TablePageDefinition
      setPageTitle(pageDefinition.title);

      const formCreate = pageDefinition.formCreate;

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
        width: 'm',
        key: 'option',
        valueType: 'option',

        render: (text, record, _, action) => [
          <a key="edit" onClick={() => {
            setCurrentEditItemId(record.projectionId)
            setModalEditFormVisibility(true);
          }}>edit</a>,
          <a key="delete" onClick={() => handleRemove(params.projectionName, record.projectionId)}>delete</a>,
        ]
      }]) as ProColumns[]);
      tableRef?.current?.reload();
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const handleAdd = async (
    properties: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      console.log(properties)

      const createParameter = {projectionName: params.projectionName};
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

      const updateParameter = {projectionName: params.projectionName, projectionId: currentEditItemId};

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
      console.log(projectionName, projectionId)
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
      <ProTable<API.Item>
        columns={columns}
        actionRef={tableRef}
        request={(param, sorter, filter) => {
          return Promise.resolve({
            data: currentData,
            success: true,
          });
        }}
        rowKey="key"
        toolBarRender={() => [
          <Button key="show" type='primary' onClick={() => setModalCreateFormVisibility(true)}>Add</Button>,
        ]}
        >


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
          columns={createForm.properties as any} // Martin create Data Form definition
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
              const res = await fetchItem(params.projectionName, currentEditItemId)
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

    </>
  );
};
