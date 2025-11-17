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
import Database from './pages/Database';
import Login from './pages/Login';

const { Header, Sider, Content } = Layout;

// 将 MainLayout 移到组件外部，避免重复创建
const MainLayout = ({ children, collapsed, onCollapse }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Sidebar collapsed={collapsed} />
    </Sider>
    <Layout>
      <Header style={{ padding: 0 }}>
        <HeaderBar
          collapsed={collapsed}
          onCollapse={onCollapse}
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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <MainLayout collapsed={collapsed} onCollapse={setCollapsed}>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout collapsed={collapsed} onCollapse={setCollapsed}>
              <Users />
            </MainLayout>
          }
        />
        <Route
          path="/database"
          element={
            <MainLayout collapsed={collapsed} onCollapse={setCollapsed}>
              <Database />
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout collapsed={collapsed} onCollapse={setCollapsed}>
              <Upload />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
