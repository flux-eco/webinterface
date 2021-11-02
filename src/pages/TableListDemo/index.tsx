import {LeftOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Drawer, message, Tooltip} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage} from 'umi';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {BetaSchemaForm, ModalForm} from '@ant-design/pro-form';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {create, getProjectionList, getTablePageDefinition} from '@/services/flux-eco-system/api';
import {history} from '@/.umi/core/history';
import {useParams} from 'react-router';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 * @param params
 */
const handleAdd = async (params: {
                           projectionName: string;
                         },
                         fields: API.Item
) => { // Martin Table entry data definition
  const hide = message.loading('loading');
  try {
    console.log(fields)
    await create(params, fields); // Martin: create request here
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
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

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Item[]) => {
  const hide = message.loading('Loading');
  if (!selectedRows) return true;
  try {
    // await removeRule({
    //   id: selectedRows.map((row) => row.id),
    // });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  const params: any = useParams()
  const location = history.location.pathname;

  const [tablePage, setTablePage] = useState<API.TablePageDefinition>({}); // Martin: Table definition object

  const asyncFetch = async () => {
    try {
      const res: any = await getTablePageDefinition({
        projectionName: params.id
      }); // Martin get Table definition here

      setTablePage(res);
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    asyncFetch();
  }, [location]);
  // asyncFetch();

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Item>();
  const [selectedRowsState, setSelectedRows] = useState<API.Item[]>([]);

  const columns: ProColumns<any>[] | undefined = tablePage?.table?.data?.map((col: any) => {
    console.log('col: ', col)
    return col as ProColumns<any>
  });

  return (
    <div style={{position: 'relative'}}>
      <Tooltip title="Navigate back">
        <Button
          type="primary"
          icon={<LeftOutlined/>}
          onClick={() => history.push('/modules')}
          style={{position: 'fixed', zIndex: 99999999, top: '.5em', left: '.5em'}}>Back</Button>
      </Tooltip>
      <PageContainer style={{marginTop: '1.25em'}}>
        <ProTable<API.Item, API.PageParams>
          headerTitle={tablePage?.title}
          actionRef={actionRef}
          rowKey="sequence"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
            </Button>,
          ]}
          request={async ({}, sort, filter) => {
            console.log(sort);
            console.log(filter);
            const res = await getProjectionList({projectionName: params.id})
            console.warn(res)
            return res;
          }}
          columns={columns}
          rowSelection={{
            onChange: (sequence, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
                <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
                <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
                &nbsp;&nbsp;
                <span>
                  <FormattedMessage
                    id="pages.searchTable.totalServiceCalls"
                    defaultMessage="Total number of service calls"
                  />{' '}
                  {/* {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '} */}
                  <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              <FormattedMessage
                id="pages.searchTable.batchDeletion"
                defaultMessage="Batch deletion"
              />
            </Button>
            <Button type="primary">
              <FormattedMessage
                id="pages.searchTable.batchApproval"
                defaultMessage="Batch approval"
              />
            </Button>
          </FooterToolbar>
        )}

        <ModalForm
          title="New Entry"
          width="400px"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (values) => {
            const success = await handleAdd(
              {projectionName: params.id},
              values as API.Item
            );
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <BetaSchemaForm // <DataItem[]> // ???
            layoutType={'Form'}
            onFinish={async (values) => {
              console.log(values);
              const success = await handleAdd({projectionName: params.id}, values as API.Item);
              if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            columns={tablePage.formCreate as any} // Martin create Data Form definition
          />
        </ModalForm>
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            if (!showDetail) {
              setCurrentRow(undefined);
            }
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />

        <Drawer
          width={600}
          visible={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.name && (
            <ProDescriptions<API.Item>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={columns as ProDescriptionsItemProps<API.Item>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    </div>
  );
};

export default TableList;
