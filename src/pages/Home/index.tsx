import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {getPageList} from '@/services/flux-eco-system/api';
import {history} from '@/.umi/core/history';
import {List} from 'antd';
import classNames from 'classnames';
import styles from './style.less'
import { Card, Typography } from 'antd';
const { Meta } = Card;

const Pages: React.FC = () => {
  const location = history.location.pathname;
  const [pages, setPages] = useState<API.Page[]>([]);

  const fetchData = async () => {
    try {
      const pageList = await getPageList();
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


  return (
    <>
    <PageContainer className={classNames(styles.container)}>
      <List
        dataSource={pages}
        className={classNames(styles.list)}
        renderItem={(page: any) =>
          (
            <List.Item className={classNames(styles.listItem)}>

              <Card
                hoverable
                className={classNames(styles.card)}
                cover={<img alt="{page.projectionName}" src={page.avatar} />}
                onClick={() => history.push(`${page.pageType}/${page.projectionName}` as string)}
              >
                <Meta title={page.title} />
              </Card>
            </List.Item>
          )
        }>
      </List>

    </PageContainer>
    </>
  );
};

export default Pages;
