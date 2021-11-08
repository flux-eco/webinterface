import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getModuleList } from '@/services/flux-eco-system/api';
import { history } from '@/.umi/core/history';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import style from './style.less'
import classNames from 'classnames';


const Modules: React.FC = () => {
  const location = history.location.pathname;
  const [modules, setModules] = useState<API.Modules>({})

  const fetchModules = async () => {
    try {
      const res: any = await getModuleList();
      setModules({data: res.modules});
    } catch (err) {
      console.error('Fetch Data failed ', err)
    }
  };

  useEffect(() => { fetchModules(); }, [location]);
  // asyncFetch();


  const getCards = () => {
    console.log(modules.data)
    return modules.data?.map((module, i) => {
      return (
      <Card
        key={i}
        hoverable
        style={{ width: 240, margin: '0.5em' }}
        cover={<img alt="example" style={{height: 200}} src={module.imageUrl} />}
        onClick={() => history.push(`/${module.url}`)}
        >

        <Meta title={module.title} description={module.description} />
      </Card>);
    });
  }

  return (
    <PageContainer>
      <div className={classNames(style.container)}>
        {getCards()}
      </div>
    </PageContainer>
  );
};

export default Modules;
