// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/layout/Sidebar';
import HeaderBar from './components/layout/HeaderBar';
import MainContent from './components/layout/MainContent';
import Home from './pages/Home';
import Users from './pages/Users';
import Upload from './pages/Upload';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
            </MainContent>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
