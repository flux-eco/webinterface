import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { create, getProjectionList, getTablePageDefinition } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Avatar, Button, List, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.less'
import { BetaSchemaForm } from '@ant-design/pro-form';

const areaProjection = 'topical-area'


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
  const [areas, setAreas] = useState<API.TopicalArea[]>([])
  const [form, setForm] = useState<any[]>([])

  const fetchModules = async () => {
    try {
      const list = await getProjectionList({
        projectionName: areaProjection
      })

      const {table} = await getTablePageDefinition({
        projectionName: areaProjection
      }) as API.TablePageDefinition

      setForm(table.data);

      const a: API.TopicalArea[] = (list as any[]).map(r => {
        return {
          id: r[`${areaProjection}_id`],
          name: r[`${areaProjection}_name`],
          image: r[`${areaProjection}_image`],
          description: r[`${areaProjection}_description`],
          color: r[`${areaProjection}_color`]
        } as API.TopicalArea;
      })

      setAreas(a);
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  const addRawArea = (r: any) => {
    console.log(r)

    setAreas([...areas, {
      id: r[`${areaProjection}_id`],
      name: r[`${areaProjection}_name`],
      image: r[`${areaProjection}_image`],
      description: r[`${areaProjection}_description`],
      color: r[`${areaProjection}_color`]
    } as API.TopicalArea]);
  }

  useEffect(() => { fetchModules(); }, [location]);
  // asyncFetch();


  const navigate = (id: number, page: string) => {
    history.replace(`/topicalareas/${id}`)
  }

  return (
    <PageContainer className={classNames(styles.container)}>
      <BetaSchemaForm<API.Item>
        trigger={<Button><PlusOutlined /> Add New</Button>}
        width='400px'
        layoutType='ModalForm'
        onFinish={async (values) => {
          handleAdd({
            projectionName: areaProjection,
          }, values);
          addRawArea(values);
        }}
        columns={form}
      ></BetaSchemaForm>
      <List
        dataSource={areas}
        className={classNames(styles.list)}
        renderItem={(item: any) =>
          (
            <List.Item
              className={classNames(styles.listItem)}
              onClick={() => {navigate(item.id, 'list')}}
              actions={[<a key="list-loadmore-edit" onClick={() => navigate(item.id, 'edit')}>edit</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar style={{backgroundColor: item.color}} />}
                title={item.name}
                description={item.description}
              />
              <div><RightOutlined /></div>
            </List.Item>
          )
        }>
        </List>
        
    </PageContainer>
  );
};

export default Modules;
