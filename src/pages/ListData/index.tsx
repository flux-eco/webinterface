import type { ReactText } from 'react';
import React, {useEffect, useState} from 'react';
import { Progress, Button, Select } from 'antd';
import ProList from '@ant-design/pro-list';
import {getItemList, getPageDefinition, getTablePageDefinition} from "@/services/flux-eco-system/api";


export default () => {
  const [pageTitle, setPageTitle] = useState<string|undefined>('');
  const [avatar, setAvatar] = useState<string>('');
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };

  const fetchData = async () => {
    try {
    //todo projectionname by url
    const projectionName = 'MyResponsibleCourses'

    const list = await getItemList({ projectionName: projectionName })
    if (list.total && list.data) {
      setCurrentData(list.data);;
    }


      const pageDefinition = await getPageDefinition({projectionName: projectionName}) as API.TablePageDefinition
      setPageTitle(pageDefinition.title);
      setAvatar(pageDefinition.avatar);

      const formCreate = pageDefinition.formCreate;
      if (formCreate) {
        //setForm(formCreate);
      }



    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <>
      <ProList<{ title: string }>
        toolBarRender={() => {
          return [
            //todo from api & translation
            <Button key="3" type="primary">
              Add
            </Button>,
          ];
        }}
        metas={{
          title: {},
          description: {
            render: () => {
              return 'some Description';
            },
          },
          avatar: {avatar},
          /* todo metadataArray as two column layout
          content: {
            render: () => (

            ),
          },
          */
          actions: {
            render: () => {
              //todo from api and translation
              return [<a key="init">Edit</a>];
            },
          },
        }}
        expandable={{
          expandedRowKeys,
          defaultExpandAllRows: false,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        rowKey="title"
        headerTitle={pageTitle}
        rowSelection={rowSelection}
        dataSource={currentData}
      />
    </>
  );
};
