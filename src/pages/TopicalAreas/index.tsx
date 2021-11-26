import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { create, getModuleList, getProjectionList, getTablePageDefinition } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Avatar, Button, List, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './style.less'
import { BetaSchemaForm } from '@ant-design/pro-form';

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

const Modules: React.FC = () => {
  const location = history.location.pathname;
  const [areas, setAreas] = useState<API.TopicalArea[]>([])
  const [form, setForm] = useState<any[]>([])

  const fetchModules = async () => {
    try {
      const list = await getProjectionList({
        projectionName: 'topical_area'
      })

      const {table} = await getTablePageDefinition({
        projectionName: 'topical_area'
      })

      setForm(table.data);

      const a: API.TopicalArea[] = list.data.map(r => {
        return {
          id: r.topical_area_id,
          name: r.topical_area_name,
          image: r.topical_area_image,
          description: r.topical_area_description,
          color: r.topical_area_color
        } as API.TopicalArea;
      })

      setAreas(a);
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => { fetchModules(); }, [location]);
  // asyncFetch();


  const navigate = (id: number, page: string) => {
    history.replace(`/topicalareas/${id}`)
  }

  return (
    <PageContainer>
      <BetaSchemaForm<API.Item>
        trigger={<Button><PlusOutlined /> Add New</Button>}
        width='400px'
        layoutType='ModalForm'
        onFinish={async (values) => {
          handleAdd({
            projectionName: 'topical_area',
          }, values);
        }}
        columns={form}
      ></BetaSchemaForm>
      <List
        dataSource={areas}
        className={classNames(styles.list)}
        renderItem={item =>
          (
            <List.Item
              className={classNames(styles.listItem)}
              onClick={() => {navigate(item.id, 'list')}}
              actions={[<a key="list-loadmore-edit" onClick={() => navigate(item.id, 'edit')}>edit</a>]}
            >
              <List.Item.Meta
                avatar={<Avatar style={{backgroundColor: item.description}} />}
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
