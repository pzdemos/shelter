// src/App.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/layout/Sidebar';
import HeaderBar from './components/layout/HeaderBar';
import MainContent from './components/layout/MainContent';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <HeaderBar 
            collapsed={collapsed} 
            onCollapse={setCollapsed} 
          />
        </Header>
        <Content>
          <MainContent>
            Content
          </MainContent>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
