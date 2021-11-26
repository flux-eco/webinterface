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

const handleAdd = async (
  params: {
    projectionName: string;
  },
  fields: API.Item) => {

    const hide = message.loading('loading');
    try {
      console.log(fields)
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

const getEditForm = async (): Promise<API.TablePageDefinition> => {
  const form: API.TablePageDefinition = await getTablePageDefinition({projectionName: 'topical-area'});

  console.log('got Form: ', form);

  return form;
}

const getTopicalArea = async (): Promise<API.TopicalArea> => {
  const params: any = useParams()
  const areaList = (await getProjectionList({
    projectionName: 'topical_area'
  })).data?.map(r => {
    return {
      id: r.topical_area_id,
      key: r.topical_area_key,
      name: r.topical_area_name,
      image: r.topical_area_image,
      description: r.topical_area_description
    } as API.TopicalArea
  })
  
  return areaList?.find(area => area.id == +params.id) as API.TopicalArea;
}

const getTSessionList = async (): Promise<API.TrainingSession[]> => {
  const tSessionList = await getProjectionList({
    projectionName: 'training_session'
  });

  return tSessionList.data?.map(r => {
      return {
        id: r.topical_area_id,
        areaId: r.training_session_area_id,
        key: r.topical_area_key,
        name: r.topical_area_name,
        image: r.topical_area_image,
        description: r.topical_area_description
      } as API.TrainingSession
    }) as API.TrainingSession[];
}

const Modules: React.FC = () => {
  const location = history.location.pathname;
  const params: any = useParams()
  const [area, setArea] = useState<API.TopicalArea>({})
  const [tsList, setTsList] = useState<API.TrainingSession[]>([])
  const [pageId, setPageId] = useState<any>('list')
  const [createForm, setCreateForm] = useState<any>({})
  const [editForm, setEditForm] = useState<any>({})

  const fetchData = async () => {
    try {
      setArea(await getTopicalArea());

      if (pageId === 'list') {
        setTsList(await getTSessionList())
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
              <Button type="primary"><PlusOutlined /> Add</Button>
            </div>
          </div>
          <List
            dataSource={tsList}
            className={classNames(styles.list)}
            renderItem={item =>
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
          <div className={classNames(styles.toolbar)}>
            <Button 
              type="primary"
              onClick={() => {history.replace('/topicalareas')}}><LeftOutlined /> Back</Button>
            <div>
              <Button type="primary"><SaveOutlined /> Save</Button>
              <Button type="primary"><CheckOutlined /> Publish</Button>
              <Button type="primary" danger><DeleteOutlined />Delete</Button>
            </div>
          </div>

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
      <div className={classNames(styles.navList)}>
        <a onClick={() => {history.replace(`/topicalareas/${params.id}/list`)}}>List</a>
        <a onClick={() => {history.replace(`/topicalareas/${params.id}/edit`)}}>Edit</a>
      </div>
      {getPage()}
    </PageContainer>
  );
};

export default Modules;
