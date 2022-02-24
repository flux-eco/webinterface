import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {create, getItemList, getPage, getPageList} from '@/services/flux-eco-system/api';
import {history} from '@/.umi/core/history';
import {Button, List, message } from 'antd';
import classNames from 'classnames';
import styles from './style.less'
import { Card, Typography } from 'antd';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-form';
const { Meta } = Card;

const Pages: React.FC = () => {
  const location = history.location.pathname;
  const [pages, setPages] = useState<API.Page[]>([]);
  const [itemList, setItemList] = useState<API.itemList>({});
  const [createForm, setCreateForm] = useState<API.FormCreate>({});

  // modal ctrls
  const [modalCreateFormVisibility, setModalCreateFormVisibility] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const pageList = await getPageList();
      const page = await getPage({projectionName: 'TopicalArea'});
      setItemList(await getItemList({projectionName: 'TopicalArea'}));

      if (page.formCreate) {
        setCreateForm(page.formCreate);
      }

      console.log(itemList.data);

      if (pageList.data) {
        setPages(pageList.data);
      }
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);
  // asyncFetch();

  const handleAdd = async (
    properties: API.Item) => {
    //todo translate by api
    const hide = message.loading('loading');
    try {
      const createParameter = {projectionName: 'TopicalArea'};
      if(createParameter.projectionName) {
        await create(createParameter, properties);
      }
      hide();
      //todo translate by api
      message.success('Added successfully');
      fetchData();
      return true;
    } catch (error) {
      hide();
      //todo translate by api
      message.error('Adding failed, please try again!');
      fetchData();
      return false;
    }
  };


  return (
    <>
    <PageContainer className={classNames(styles.container)}>
      <div className={classNames(styles.actionbar)}>
        <Button
          type='primary'
          className={classNames(styles.addButton)}
          onClick={() => setModalCreateFormVisibility(true)}>Add</Button>
      </div>
      <List
        dataSource={itemList.data}
        className={classNames(styles.list)}
        renderItem={(page: any) =>
          (
            <List.Item className={classNames(styles.listItem)}>

              <Card
                hoverable
                className={classNames(styles.card)}
                cover={<img alt="example" src={page.image} />}
                onClick={() => history.push(`listdata/TrainingSession/${page.projectionId}` as string)}
              >
                <Meta title={page.title} />
              </Card>
            </List.Item>
          )
        }>
      </List>

    </PageContainer>

    <ModalForm
      // Creation Form as Modal
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
        }
      }}
      >
      <BetaSchemaForm // <DataItem[]> // ???
        layoutType={'Form'}
        onFinish={async (values) => {
          const success = await handleAdd(values as API.Item);
          if (success) {
            setModalCreateFormVisibility(false);
          }
        }}
        columns={createForm.properties ? createForm.properties : []}
      />
      </ModalForm>
    </>
  );
};

export default Pages;
