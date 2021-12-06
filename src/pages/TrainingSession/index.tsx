import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { create, getModuleList, getProjectionList, getTablePageDefinition } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Avatar, Button, List, message } from 'antd';
import { CheckOutlined, DeleteOutlined, LeftOutlined, PlusOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons';
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
      console.log(fields)
      fields.type = tsProjection
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

// Put request
const handleSave = async (): Promise<void> => {

}


// Put request to change publish mode
const handlePublish = async (): Promise<void> => {

}

const handleDelete = async (): Promise<void> => {

}



const Modules: React.FC = () => {
  const location = history.location.pathname;
  const params: any = useParams()
  const [area, setArea] = useState<API.TopicalArea>({})
  const [tsList, setTsList] = useState<API.TrainingSession[]>([])
  const [pageId, setPageId] = useState<any>('list')
  const [createForm, setCreateForm] = useState<any[]>([])
  const [editForm, setEditForm] = useState<any[]>([])

  const getEditForm = async (): Promise<API.TablePageDefinition> => {
    const form: API.TablePageDefinition = await getTablePageDefinition({projectionName: areaProjection});
  
    console.log('got Form: ', form);
  
    return form;
  }
  
  const getCreateForm = async (): Promise<API.TablePageDefinition> => {
    const form: API.TablePageDefinition = await getTablePageDefinition({projectionName: tsProjection});
  
    console.log('got Form: ', form);
  
    return form;
  }
  

  const getTSessionList = async (): Promise<API.TrainingSession[]> => {
    const tSessionList = await getProjectionList({
      projectionName: 'training-session'
    }) as any[];
  
    return tSessionList.map(r => {
        return {
          id: r[`${tsProjection}_id`],
          areaId: r[`${tsProjection}_area_id`],
          key: r[`${tsProjection}_key`],
          name: r[`${tsProjection}_name`],
          image: r[`${tsProjection}_image`],
          description: r[`${tsProjection}_description`]
        } as API.TrainingSession
      }) as API.TrainingSession[];
  }

  const getTopicalArea = async (): Promise<API.TopicalArea> => {
    const areaList = (await getProjectionList({
      projectionName: 'topical-area'
    })) as any[];
    
    areaList.map(r => {
      return {
        id: r[`${areaProjection}_id`],
        key: r[`${areaProjection}_session_key`],
        name: r[`${areaProjection}_session_name`],
        image: r[`${areaProjection}_session_image`],
        description: r[`${areaProjection}_session_description`]
      } as API.TopicalArea
    })
    
    return areaList?.find((area: API.TopicalArea) => area.id == +params.id) as API.TopicalArea;
  }

  const fetchData = async () => {
    console.log('fetching data');
    try {
      setArea(await getTopicalArea());

      if (pageId === 'list') {
        console.log('init list page')
        setCreateForm(await getCreateForm());
        console.log('createForm: ', createForm);
        setTsList(await getTSessionList());
        console.log('tsList: ', tsList);
      } else {
        setEditForm(await getEditForm());
      }
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    setPageId(params.page);
    fetchData();
  }, [location]);

  const navigate = (id: number) => {

  }

  const addRawTs = (r: any) => {
    console.log(r)

    setTsList([...tsList, {
      id: r[`${tsProjection}_id`],
      name: r[`${tsProjection}_name`],
      image: r[`${tsProjection}_image`],
      description: r[`${tsProjection}_description`],
      color: r[`${tsProjection}_color`]
    } as API.TopicalArea]);
  }

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
                  addRawTs(values);
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
                  actions={[<a key="list-loadmore-edit">edit</a>]}
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
          
        </>
        )
      default:
        setPageId('list');
        return
    }
  }


  // asyncFetch();


  return (
    <PageContainer>
      <div className={classNames(styles.toolbar)}>
        <Button 
          type="primary"
          onClick={() => {history.goBack()}}><LeftOutlined /> Back</Button>
        <div>
          <Button type="primary"><SaveOutlined /> Save</Button>
          <Button type="primary"><CheckOutlined /> Publish</Button>
          <Button type="primary" danger><DeleteOutlined /> Delete</Button>
        </div>
      </div>
      <BetaSchemaForm<API.Item>
            onFinish={async (values) => {
              handleAdd({
                projectionName: tsProjection,
              }, values);
              addRawTs(values);
            }}
            columns={createForm}
          ></BetaSchemaForm>
    </PageContainer>
  );
};

export default Modules;
