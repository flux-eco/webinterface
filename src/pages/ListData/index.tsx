import type {ReactText} from 'react';
import {useEffect, useState} from 'react';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import {Button, message} from 'antd';
import ProList from '@ant-design/pro-list';
import {create, deleteItem, getItemList, getPageDefinition, update} from "@/services/flux-eco-system/api";
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
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<API.FormCreate>({});

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };

  const fetchData = async () => {
    try {
      const list = await getItemList({subject: params.subject})
      if (list.total && list.data) {
        setCurrentData(list.data);
      }
      const pageDefinition = await getPageDefinition({subject: params.subject}) as API.TablePageDefinition
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
    fields: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      console.log(fields)

      const rootObjectAggregateName = createForm.rootObjectAggregateName;
      const createParameter = {subject: rootObjectAggregateName};
      if(createParameter.subject) {
        await create(createParameter, fields);
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
    fields: API.Item
  ) => {
    const hide = message.loading('Configuring');
    try {
      await update(
        params, fields
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


  const handleRemove = async (subject: string, id: number) => {
    const hide = message.loading('Loading');

    try {
      await deleteItem({
        subject: subject,
        id: id
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
              if (isString(row.rootObjectAggregateId) && isString(row.rootObjectAggregateName)) {
                //todo from api and translation
                return [
                  <a key="edit" onClick={async () => {
                    setModalEditFormVisibility(true);
                    history.pushState({id: row.rootObjectAggregateId}, '', null);
                  }}>Edit</a>,

                  <a key="delete" onClick={async () => {
                    await handleRemove(row.rootObjectAggregateName, row.rootObjectAggregateId);
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
          columns={createForm.fields} // Martin create Data Form definition
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
          onFinish={async (values) => {
            const success = await handleUpdate(values as API.Item);
            if (success) {
              setModalEditFormVisibility(false);
              /*if (actionRef.current) {
                actionRef.current.reload();
              }*/
            }
          }}
          columns={createForm.fields}
        />
      </ModalForm>

    </>
  );
};
