import React, {useEffect, useState} from 'react';
import ProList from '@ant-design/pro-list';
import {fetchListPage} from "@/adapters/Page";
import {useParams} from "react-router";
import {fetchItemList} from "@/adapters/Data";


export default () => {
  const params: any = useParams();
  const [currentPage, setCurrentPage] = useState<API.listPage>({});
  const [dataSource, setDataSource] = useState<[]>([]);


  useEffect(() => {
    fetchListPage(params.page).then(page => setCurrentPage(page))
    fetchItemList(params.page).then(itemList => itemList.data && setDataSource(itemList.data))
  }, [])


  return (
    <ProList<any>
      toolBarRender={() => {
        return [/*
        <Button key="add" type="primary">
          新建
        </Button>,*/
        ];
      }}
      rowKey="projectionId"
      headerTitle={currentPage.pageMetadata?.title}
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
    />
  );
}
