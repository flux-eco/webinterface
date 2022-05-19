import React, {useEffect, useState} from 'react';
import ProList from '@ant-design/pro-list';
import {fetchListPage} from "@/adapters/Page";
import {useParams} from "react-router";
import {fetchItem, fetchItemList} from "@/adapters/Data";
import {List, PageHeader} from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import {Content} from "antd/lib/layout/layout";


export default () => {
  const params: any = useParams();
  const [currentPage, setCurrentPage] = useState<API.listPage>({});
  const [dataSource, setDataSource] = useState<[]>();


  useEffect(() => {
    fetchItem(params.page, params.parentId).then(item => setDataSource(item.data))
    fetchListPage(params.page, params.parentId).then(page => setCurrentPage(page))
  }, [])


  return (
    <ProLayout siderWidth={0}>
      <PageHeader ghost={false} onBack={() => window.history.back()} title={params.parentId}>
        <Content style={{padding: '0 50px'}}>
    <ProList<any>
      toolBarRender={() => {
        return [/*
        <Button key="add" type="primary">
          新建
        </Button>,*/
        ];
      }}
      rowKey="projectionId"

      tooltip=""
      dataSource={dataSource}
      showActions="hover"
      showExtra="hover"
      metas={{
        title: {
          dataIndex: currentPage.listData?.mappings?.title?.dataIndex,
        },
        description: {
          dataIndex: currentPage.listData?.mappings?.description?.dataIndex,
        },
        subTitle: {
          dataIndex: currentPage.listData?.mappings?.subtitle?.dataIndex,
        },
        actions: currentPage.listData?.actions
      }}
      renderItem= {item => (
        <>
          <a href={item[currentPage.listData?.mappings?.link?.dataIndex]} >
        <img src={item[currentPage.listData?.mappings?.image?.dataIndex]} height={"200"} width={"600"}/>
          <List.Item.Meta
            title={item[currentPage.listData?.mappings?.title?.dataIndex]}
            description={item.email}
          />
          </a>
        </>
      )}
    />
        </Content>
      </PageHeader>
    </ProLayout>
  )
}
