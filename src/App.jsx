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
import Login from './pages/Login';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const MainLayout = ({ children }) => (
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
            {children}
          </MainContent>
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
        <Route path="/upload" element={<MainLayout><Upload /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
