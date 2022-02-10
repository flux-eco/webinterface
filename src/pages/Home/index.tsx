import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {getPageList} from '@/services/flux-eco-system/api';
import {history} from '@/.umi/core/history';
import {List } from 'antd';
import classNames from 'classnames';
import styles from './style.less'
import { Card, Typography } from 'antd';
const { Meta } = Card;
const {Paragraph} = Typography;




const Pages: React.FC = () => {
  const location = history.location.pathname;
  const [pages, setPages] = useState<API.Page[]>([])

  const fetchPages = async () => {
    try {
      const pageList = await getPageList()
      if (pageList.data) {
        setPages(pageList.data);
      }
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    fetchPages();
  }, [location]);
  // asyncFetch();


  return (
    <PageContainer className={classNames(styles.container)}>
      test
      <List
        dataSource={pages}
        className={classNames(styles.list)}
        renderItem={(page: API.Page) =>
          (

            <List.Item className={classNames(styles.listItem)}>

              <Card
                hoverable
                className={styles.card}
                actions={[<a key="option1" href={page.url}>öffnen</a>]}
              >
                <Card.Meta
                  avatar={<img alt="" className={styles.cardAvatar} src={page.avatar} />}
                  title={<a>{page.title}</a>}
                  description={
                    <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                     xyz
                    </Paragraph>
                  }
                />
              </Card>


            </List.Item>


          )
        }>
      </List>

    </PageContainer>
  );
};

export default Pages;
