import { Button, Result } from 'antd';
import React from 'react';
import {PageContainer} from "@ant-design/pro-layout";


const NotAuthorized: React.FC = () => (



<PageContainer style={
    {
    backgroundImage: `url(/http_403_bg.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'}}>
  <div style={{background: '#FFFFFF',   opacity: '0.9',  position: 'absolute',  top: '0px', left: '0px', right: '0px',    width: '100vw', fontWeight: 'bolder'}}>
  <Result
    title="HTTP Error 403 - Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />
  </div>
    </PageContainer>

);
export default NotAuthorized;
