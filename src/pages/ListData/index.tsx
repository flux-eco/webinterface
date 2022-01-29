import type {ReactText} from 'react';
import {useEffect, useState, useRef} from 'react';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import {Button, message} from 'antd';
import ProList from '@ant-design/pro-list';
import {getItemList, getPageDefinition, create, deleteItem} from "@/services/flux-eco-system/api";
import {useParams} from 'react-router';

export default () => {
  const params: any = useParams()
  const [pageTitle, setPageTitle] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);


  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);
  const [modalEditFormVisibility, setModalEditFormVisibility] = useState<boolean>(false);

  const [columnsCreateForm, setColumnsCreateForm] = useState<any[]>([]);

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
      setAvatar(pageDefinition.avatar);

      const formCreate = pageDefinition.formCreate;
      if (formCreate) {
        setColumnsCreateForm(formCreate);
      }
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };
  useEffect(() => {
    fetchData( );
  }, [location]);


  const handleAdd = async (
    params: {
      subject: string;
    },
    fields: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      console.log(fields)
      await create(params, fields);
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
    params: {
      subject: string,
      id: number
    },
    fields: API.Item
  ) => {
    const hide = message.loading('Configuring');
    try {
      // await updateRule({
      //   name: fields.name,
      //   desc: fields.desc,
      //   key: fields.key,
      // });
      hide();

      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };


  const handleRemove = async (subject: string, item: API.Item) => {
    const hide = message.loading('Loading');
    if (!item) return true;
    if (!item.sequence) return true;
    try {
      await deleteItem({
        subject: subject,
        id: item.sequence
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
      <ProList<{ title: string, sequence: number }>
        toolBarRender={() => {
          return [
            //todo from api & translation
            <Button key="3" type="primary" onClick={async () => { setModalCreateFormVisibility(true); }}>
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
          avatar: {avatar},
          /* todo metadataArray as two column layout
          content: {
            render: () => (

            ),
          },
          */
          actions: {
            render: (text, row) =>  {
              //todo from api and translation
              return [<a key="init"  onClick={async () => {
                setModalEditFormVisibility(true);
                history.pushState(
                  {id: row.sequence},
                  '',
                  null
                );
              }

              }>Edit</a>];
            },
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
              {subject: params.subject},
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
                const success = await handleAdd({subject: currentsubject}, values as API.Item);
                if (success) {
                  setModalCreateFormVisibility(false);
                  /*if (actionRef.current) {
                    actionRef.current.reload();
                  }*/
                }
              }}
              columns={columnsCreateForm} // Martin create Data Form definition
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
            {subject: params.subject, id: params.id},
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
            const success = await handleUpdate({subject: params.subject, id: params.id}, values as API.Item);
            if (success) {
              setModalEditFormVisibility(false);
              /*if (actionRef.current) {
                actionRef.current.reload();
              }*/
            }
          }}
          columns={columnsCreateForm} // Martin create Data Form definition
        />
      </ModalForm>



    </>
  );
};
