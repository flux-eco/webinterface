import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {create, getItemList, getTablePageDefinition} from '@/services/flux-eco-system/api';
import {history} from '@/.umi/core/history';
import {Avatar, Button, Input, List, message, Space, Tag} from 'antd';
import {PlusOutlined, RightOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.less'
import {EditableProTable, ProColumns, ProColumnType} from "@ant-design/pro-table";
import {BetaSchemaForm} from '@ant-design/pro-form';

const EditData: React.FC = () => {
  type QueryParams = any;
  const location = history.location.pathname;
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);


  const [currentData, setCurrentData] = useState<DataSourceType[]>([]);
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [currentApiResult, setCurentApiResult] = useState<boolean>(false);




  const [tableColumns, setTableColumns] = useState<ProColumns[]>([])
  const [form, setForm] = useState<any[]>([])
  const [current, setCurrent] = useState<Partial<API.TableRow> | undefined>(undefined);

  const fetchData = async () => {
    try {
      //todo projectionname by url
      const projectionName = 'MyResponsibleCourses'

      const list = await getItemList({
        projectionName: projectionName
      })

      if(list.total && list.data) {
        setCurrentData(list.data);
        setCurrentTotal(list.total);
        setCurentApiResult(true);
      }


      const tablePageDefinition = await getTablePageDefinition({
        projectionName: projectionName
      }) as API.TablePageDefinition
      const formCreate = tablePageDefinition.formCreate;
      if (formCreate) {
        setForm(formCreate);
      }

      const table = tablePageDefinition.table;
      console.log(table);
      if (table) {
        //todo @erik
        const columns = table.map(r => {
          return {
            title: r['title'],
            dataIndex: r['dataIndex'],
            formItemProps: r['UiFormItemProps'],
            width: '30%',
          } as ProColumns<DataSourceType>
        }) as ProColumns<DataSourceType>[];

        setTableColumns(columns);
      }
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };


  const TagList: React.FC<{
    value?: {
      key: string;
      label: string;
    }[];
    onChange?: (
      value: {
        key: string;
        label: string;
      }[],
    ) => void;
  }> = ({ value, onChange }) => {
    const ref = useRef<Input | null>(null);
    const [newTags, setNewTags] = useState<
      {
        key: string;
        label: string;
      }[]
      >([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
      let tempsTags = [...(value || [])];
      if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
        tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
      }
      onChange?.(tempsTags);
      setNewTags([]);
      setInputValue('');
    };

    return (
      <Space>
        {(value || []).concat(newTags).map((item) => (
          <Tag key={item.key}>{item.label}</Tag>
        ))}
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      </Space>
    );
  };


  type DataSourceType = {
    id: React.Key;
    title?: string;
    labels?: {
      key: string;
      label: string;
    }[];
    state?: string;
    created_at?: string;
    children?: DataSourceType[];
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '标签',
      dataIndex: 'labels',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <TagList /> : <Input />;
      },
      render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <EditableProTable.RecordCreator
          key="copy"
          record={{
            ...record,
            id: (Math.random() * 1000000).toFixed(0),
          }}
        >
          <a>复制此行到末尾</a>
        </EditableProTable.RecordCreator>,
      ],
    },
  ];

  const handleAdd = async (
    params: {
      projectionName: string;
    },
    fields: API.Item) => {

    const hide = message.loading('loading');
    try {
      const res = await create(params, fields);
      hide();
      addRawArea(res);
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  const addRawArea = (r: any) => {
   /* setData([...data, {
      id: r[`_id`],
      name: r[`${areaProjection}_name`],
      image: r[`${areaProjection}_image`],
      description: r[`${areaProjection}_description`],
      color: r[`${areaProjection}_color`]
    } as API.TopicalArea]);*/
  }

  function getData(params: QueryParams) {
    if(data) {
      return data.data
    }
    return []
  }

  useEffect(() => {
    fetchData();
  }, [location]);
  // asyncFetch();


  const navigate = (id: number, page: string) => {
    //history.replace(`/topicalareas/${id}`)
  }
  let actionRef;
  return (
    <PageContainer className={classNames(styles.container)}>
      <EditableProTable
        actionRef={actionRef}
        rowKey="sequence"

       /* toolbar={{
          actions: [
            <BetaSchemaForm<API.TableRow>
              layoutType="ModalForm"
              onFinish={async (values) => {
                await createAggregate({userId, fluxAppName, aggregateName, operationId: 'createAggregate'}, values)
              }}
              trigger={<Button type="primary">
                <PlusOutlined/>
                New
              </Button>}
              onVisibleChange={showForm}
              columns={FormColumns}
            />
          ]
        }}*/
        search={{
          labelWidth: 120,
          defaultCollapsed: false
        }}
        recordCreatorProps={false}

        editable={{
          deletePopconfirmMessage: 'Delete this row?',
          onlyAddOneLineAlertMessage: 'Only one line can be added at the same time',
          onlyOneLineEditorAlertMessage: 'Only one line can be edited',
        }}

        request={async () => ({
          data: currentData,
          total: currentTotal,
          success: currentApiResult,
        })}


        columns={tableColumns}

        pagination={{onChange: (page) => setCurrent(page)}}
      />

    </PageContainer>
  );
};

export default EditData;
