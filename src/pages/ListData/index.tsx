import type {ReactText} from 'react';
import {useEffect, useState} from 'react';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import {Button, message} from 'antd';
import ProList from '@ant-design/pro-list';
import {create, deleteItem, getItem, getItemList, getPage, update} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';
import {isString} from "lodash";

export default () => {
  const params: any = useParams()
  const [pageTitle, setPageTitle] = useState<string | undefined>('');
  //const [avatar, setAvatar] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);


  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);

  const [currentEditItemId, setCurrentEditItemId] = useState<string>('');
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<API.FormCreate>({});

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
      return true;
    } catch (error) {
      hide();
      //todo translate by api
      message.error('Adding failed, please try again!');
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
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  return (
    <>
      <ProList<API.Item>
        toolBarRender={() => {
          return [
            //todo from api & translation
            <Button key="3" type="primary" onClick={async () => {
              setModalCreateFormVisibility(true);
            }}>
              Add
            </Button>,
          ];
        }}
        metas={{
          title: {},
          description: {
            render: () => {
              return 'some Description';
            },
          },

          /* todo metadataArray as two column layout
          content: {
            render: () => (

            ),
          },
          */
          actions: {
            render: (text, row) => {
              if (isString(row.projectionId)) {
                //todo from api and translation
                return [
                  <a key="edit" onClick={async () => {
                    setCurrentEditItemId(row.projectionId);
                    setModalEditFormVisibility(true);
                  }}>Edit</a>,

                  <a key="delete" onClick={async () => {
                    await handleRemove(params.projectionName, row.projectionId);
                  }}>Delete</a>
                ];
              }
              return [];
            }
          },
        }}
        expandable={{
          expandedRowKeys,
          defaultExpandAllRows: false,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        rowKey="sequence"
        headerTitle={pageTitle}
        rowSelection={rowSelection}
        dataSource={currentData}
      />
      <ModalForm
        //Creation Form as Modal
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
            /*if (actionRef.current) {
              actionRef.current.reload();
            }*/
          }
        }}
      >
        <BetaSchemaForm // <DataItem[]> // ???
          layoutType={'Form'}
          onFinish={async (values) => {
            console.log(values);
            const success = await handleAdd(values as API.Item);
            if (success) {
              setModalCreateFormVisibility(false);
              /*if (actionRef.current) {
                actionRef.current.reload();
              }*/
            }
          }}
          columns={createForm.properties} // Martin create Data Form definition
        />
      </ModalForm>

      <ModalForm
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
            /*if (actionRef.current) {
              actionRef.current.reload();
            }*/
          }
        }}
      >
        <BetaSchemaForm // <DataItem[]> // ???
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
              /*if (actionRef.current) {
                actionRef.current.reload();
              }*/
            }
          }}
          columns={createForm.properties}
        />
      </ModalForm>

    </>
  );
};
