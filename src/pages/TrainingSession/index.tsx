import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { create, deleteItem, getItem, getTablePageDefinition, updateItem } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Avatar, Button, List, message, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.less'
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useParams } from 'react-router';

const tsProjection = 'training-session';
const areaProjection = 'topical-area';

const handleAdd = async (
  params: {
    projectionName: string;
  },
  fields: API.Item) => {

    const hide = message.loading('loading');
    try {
      await create(params, fields);
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };



const Modules: React.FC = () => {
  const location = history.location.pathname;
  const params: any = useParams()
  const [trainingSession, setTrainingSession] = useState<API.TrainingSession>({});
  const [editForm, setEditForm] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasChange, setHasChange] = useState<boolean>(false);

  const getEditForm = async (): Promise<API.TablePageDefinition[]> => {
    const {table}: any = await getTablePageDefinition({projectionName: tsProjection});
    
    return table.data;
  }

  const getTrainingSession = async (id: string): Promise<API.TrainingSession> => {
    try {
      const res: API.TrainingSession = (await getItem({
        projectionName: tsProjection,
        id: id
      }))[0];

      return rawToTS(res);
    } catch(err) {
      console.error(err)
    }
  }

  const handleDelete = async (): Promise<void> => {
    try {
      deleteItem({
        projectionName: tsProjection,
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
      const ts: any = trainingSession;
      ts.published = mode;
      updateItem({
        projectionName: tsProjection,
        id: params.id
      }, tsToRaw(ts)).then(val => {
        fetchData();
      })
    } catch(err) {
      console.error(err)
    }
  }

  const handleSave = async (): Promise<void> => {
    const hide = message.loading('loading');
    try {
      await updateItem({
        projectionName: tsProjection,
        id: params.id
      }, tsToRaw(trainingSession));
      hide();
      setHasChange(false)
      message.success('Added successfully');
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  }

  const fetchData = async () => {
    try {
      setEditForm(await getEditForm());
      setTrainingSession(await getTrainingSession(params.id));
      console.log(trainingSession);
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    console.log('ts: ', trainingSession)
  }, [trainingSession])

  const rawToTS = (raw: any): API.TrainingSession => {
    return {
      id: raw['_id'],
      areaId: raw[`${tsProjection}_areaId`],
      name: raw[`${tsProjection}_name`],
      description: raw[`${tsProjection}_description`],
      image: raw[`${tsProjection}_image`],
      published: raw[`${tsProjection}_published`]
    } as API.TrainingSession;
  }

  const tsToRaw = (ts: API.TrainingSession): any => {
    let raw: any = {};
    Object.keys(ts).forEach(key => {
      if (key === 'id') {
        raw['_id'] = ts[key];
      } else {
        raw[`${tsProjection}_${key}`] = ts[key];
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageContainer>
      <div className={classNames(styles.toolbar)}>
        <Button 
          type="primary"
          onClick={() => {history.goBack()}}><LeftOutlined /> Back</Button>
        <div>
          <Button
            type="primary"
            disabled={!hasChange}
            onClick={() => handleSave()}><SaveOutlined /> Save</Button>
          <Button 
            type="primary"
            disabled={trainingSession?.published}
            onClick={() => handlePublish(true)}
            ><CheckOutlined /> Publish</Button>
          <Button 
            type="primary"
            disabled={!trainingSession?.published}
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
              setTrainingSession(mergeObj(rawToTS(values), trainingSession));
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
                className={classNames(styles.flap)}></div>
              <div
                className={classNames(styles.imgContainer)}
                style={
                  {
                    'background': `url(${trainingSession?.image})`,
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover',
                    'backgroundPositionY': 'center'
                  }}>
                  <div className={classNames(styles.darken)}></div>
                </div>
              <div className={classNames(styles.textContainer)}>
                <h1>{trainingSession?.name}</h1>
              </div>
            </div>
          </div>
          <div style={{'marginTop': '3em'}}>
            <h3>Description</h3>
            <p>{trainingSession?.description}</p>
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
    </PageContainer>
  );
};

export default Modules;
