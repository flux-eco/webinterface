import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { create, deleteItem, getTable, update } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Avatar, Button, List, message, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, LeftOutlined, PlusOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.less'
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useParams } from 'react-router';

const tsProjection = 'training-session';
const areaProjection = 'EdiTopicalArea';


const Modules: React.FC = () => {
  const location = history.location.pathname;
  const params: any = useParams()
  const [area, setArea] = useState<API.TopicalArea>({})
  const [tsList, setTsList] = useState<API.TrainingSession[]>([])
  const [pageId, setPageId] = useState<any>('list')
  const [createForm, setCreateForm] = useState<any[]>([])
  const [editForm, setEditForm] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasChange, setHasChange] = useState<boolean>(false);

  const getEditForm = async (): Promise<any[]> => {
    const {tablePageDefinition}: any = await getTable({projectionName: areaProjection});

    return tablePageDefinition.formEdit;
  }

  const getCreateForm = async (): Promise<any[]> => {
    const {tablePageDefinition}: any = await getTable({projectionName: tsProjection});

    return tablePageDefinition.formCreate;
  }


  const getTSessionList = async (areaId: string): Promise<API.TrainingSession[]> => {
    console.log('query: ', `?${tsProjection}_areaId=${areaId}`)
    const tSessionList = await getProjectionList({
      projectionName: tsProjection,
      query: `?${tsProjection}_areaId=${areaId}`
    }) as any[];



    return tSessionList.map(r => {
        return {
          id: r[`_id`],
          areaId: r[`${tsProjection}_areaId`],
          key: r[`${tsProjection}_key`],
          name: r[`${tsProjection}_name`],
          image: r[`${tsProjection}_image`],
          description: r[`${tsProjection}_description`]
        } as API.TrainingSession
      }) as API.TrainingSession[];
  }

  const getTopicalArea = async (): Promise<API.TopicalArea> => {
    const areaList = (await getProjectionList({
      projectionName: 'EditTopicalArea'
    })) as any[];

    const areas = areaList.map(r => {
      return rawToArea(r);
    })

    return areas?.find((area: API.TopicalArea) => area.id == params.id) as API.TopicalArea;
  }

  const handleDelete = async (): Promise<void> => {
    try {
      deleteItem({
        projectionName: areaProjection,
        id: params.id
      }).then(val => {
        history.goBack();
        setIsModalVisible(false);

      }).catch(err => {
        message.error('delete failed')
      })
    } catch(err) {
      console.error(err)
    }
  }

  const handlePublish = async (mode: boolean): Promise<void> => {
    console.log('publish')
    try {
      const ts: any = area;
      ts.published = mode;
      update({
        projectionName: areaProjection,
        id: params.id
      }, areaToRaw(ts)).then(val => {
        fetchData();
      })
    } catch(err) {
      console.error(err)
    }
  }

  const handleSave = async (): Promise<void> => {
    const hide = message.loading('loading');
    try {
      await update({
        projectionName: areaProjection,
        id: params.id
      }, areaToRaw(area));
      hide();
      setHasChange(false)
      message.success('Added successfully');
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  }

  const fetchData = async () => {
    console.log('fetching data');
    try {
      const a = await getTopicalArea()
      setArea(a);

      if (pageId === 'list') {
        setCreateForm(await getCreateForm());
        setTsList(await getTSessionList(a.id as string));
        console.log('tsList: ', tsList);
      } else {

      }
      setEditForm(await getEditForm());
      console.log('editForm: ', editForm);
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    setPageId(params.page);
    fetchData();
  }, [location]);

  const handleAdd = async (
    params: {
      projectionName: string;
    },
    fields: API.Item) =>
    {
      const hide = message.loading('loading');
      fields[`${tsProjection}_areaId`] = area.id;

      create(params, fields).then(res => {
        addRawTs(res);
        hide();
        message.success('Added successfully');
      }).catch(err => {
        hide();
        message.error('Duplicate Name')
      });

    };

  const navigate = (id: number) => {
    history.push(`/session/${id}`)
  }


  const addRawTs = (r: any) => {
    console.log(r)

    setTsList([...tsList, {
      id: r[`_id`],
      name: r[`${tsProjection}_name`],
      image: r[`${tsProjection}_image`],
      description: r[`${tsProjection}_description`],
      published: r[`${areaProjection}_published`]
    } as API.TopicalArea]);
  }

  const rawToArea = (raw: any): API.TrainingSession => {
    return {
      id: raw['_id'],
      name: raw[`${areaProjection}_name`],
      color: raw[`${areaProjection}_color`],
      description: raw[`${areaProjection}_description`],
      image: raw[`${areaProjection}_image`],
      published: raw[`${areaProjection}_published`]
    } as API.TrainingSession;
  }

  const areaToRaw = (ts: API.TrainingSession): any => {
    let raw: any = {};
    Object.keys(ts).forEach(key => {
      if (key === 'id') {
        raw['_id'] = ts[key];
      } else {
        raw[`${areaProjection}_${key}`] = ts[key];
      }
    })

    return raw;
  }

  const mergeObj = (src: any, target: any) => {
    const merge = {};

    Object.keys(target).forEach(key => {
      if (src[key] != undefined) {
        merge[key] = src[key];
      } else {
        merge[key] = target[key];
      }
    });

    return merge
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getPage = () => {
    switch (pageId) {
      case 'list':
        return (
          <>
          <div className={classNames(styles.toolbar)}>
            <Button
              type="primary"
              onClick={() => {history.replace('/topicalareas')}}><LeftOutlined /> Back</Button>
            <div>
              <BetaSchemaForm<API.Item>
                trigger={<Button type="primary"><PlusOutlined /> Add New</Button>}
                width='400px'
                layoutType='ModalForm'
                onFinish={async (values) => {
                  handleAdd({
                    projectionName: tsProjection,
                  }, values);
                }}
                columns={createForm}
              ></BetaSchemaForm>
            </div>
          </div>
          <List
            dataSource={tsList}
            className={classNames(styles.list)}
            renderItem={(item: API.TrainingSession) =>
              (
                <List.Item
                  className={classNames(styles.listItem)}
                  onClick={() => {navigate(item.id)}}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={item.description}
                  />
                  <div><RightOutlined /></div>
                </List.Item>
              )
            }>
            </List>
          </>
        )
      case 'edit':
        return (
          <>
            <div className={classNames(styles.toolbar)}>
              <Button
                type="primary"
                onClick={() => {history.replace('/topicalareas')}}><LeftOutlined /> Back</Button>
              <div>
                <Button
                  type="primary"
                  disabled={!hasChange}
                  onClick={() => handleSave()}><SaveOutlined /> Save</Button>
                <Button
                  type="primary"
                  disabled={area?.published}
                  onClick={() => handlePublish(true)}
                  ><CheckOutlined /> Publish</Button>
                <Button
                  type="primary"
                  disabled={!area?.published}
                  onClick={() => handlePublish(false)}
                  ><CloseOutlined /> Hide</Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => showModal()}><DeleteOutlined /> Delete</Button>
              </div>
            </div>
            <div className={classNames(styles.formContainer)}>
              <div className={classNames(styles.form)}>
                <BetaSchemaForm<API.Item>
                  onFinish={async (values) => {
                    console.log('values: ', values)
                    console.log('newData', mergeObj(rawToArea(values), area))
                    setArea(mergeObj(rawToArea(values), area));
                    setHasChange(true);
                  }}
                  onReset={async () => {
                    if (hasChange) {
                      setHasChange(false);
                      fetchData();
                    }
                  }}
                  columns={editForm}
                ></BetaSchemaForm>
              </div>
              <div>
              <div className={classNames(styles.preview)}>
                <div className={classNames(styles.clipPath)}>
                    <div
                      className={classNames(styles.flap)}
                      style={{'backgroundColor': area?.color}}></div>
                    <div className={classNames(styles.content)}>
                      <img src={area?.image}/>
                      <h1>{area?.name?.toUpperCase()}</h1>
                    </div>
                  </div>
                </div>
                <div style={{'marginTop': '3em'}}>
                  <h3>Description</h3>
                  <p>{area?.description}</p>
                </div>
              </div>
            </div>
            <Modal
              visible={isModalVisible}
              onCancel={() => handleCancel()}
              footer={[
                <Button type="primary" key="delete" danger onClick={() => handleDelete()}>
                  <DeleteOutlined /> Delete
                </Button>,
                <Button type="primary" key="cancel" onClick={() => handleCancel()}>
                  Cancel
                </Button>,
              ]}>
              <h1
                style={{'textAlign': 'center', 'margin': 0}}
              >Are you sure?</h1>
            </Modal>
        </>
        )
      default:
        setPageId('list');
        return
    }
  }

  return (
    <PageContainer>
      <div className={classNames(styles.navList)}>
        <a onClick={() => {history.replace(`/topicalareas/${params.id}/list`)}}>List</a>
        <a onClick={() => {history.replace(`/topicalareas/${params.id}/edit`)}}>Edit</a>
      </div>
      {getPage()}
    </PageContainer>
  );
};

export default Modules;
