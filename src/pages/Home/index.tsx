import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {getPageList} from '@/services/flux-eco-system/api';
import {List} from 'antd';
import classNames from 'classnames';
import styles from './style.less'
import {Card} from 'antd';
const {Meta} = Card;

const Pages: React.FC = () => {
  const [currentPageList, setCurrentPageList] = useState<API.pageList>({});

  const fetchPageList = async (): Promise<API.pageList> => {
    try {
      return await getPageList();
    } catch (error) {
      console.error('fetch data failed ', error)
    }
    return {} as API.pageList
  }

  useEffect(() => {
    const promisePageList = fetchPageList();
    promisePageList.then(pageList => {
      setCurrentPageList(pageList)
    })
  }, []);


  return (
    <>
      <PageContainer className={classNames(styles.container)}>
        <List
          dataSource={currentPageList.data}
          className={classNames(styles.list)}
          renderItem={(page: any) =>
            (
              <List.Item className={classNames(styles.listItem)}>
                <Card
                  hoverable
                  className={classNames(styles.card)}
                  cover={<img alt="{page.projectionName}" src={page.avatar}/>}
                  onClick={() => {
                    location.href = `${page.pageType}/${page.projectionName}`
                  }}
                >
                  <Meta title={page.title}/>
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
