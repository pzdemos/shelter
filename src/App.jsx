// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Drawer } from 'antd';
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
const MainLayout = ({ children, collapsed, onCollapse, isMobile, mobileOpen, onMobileClose }) => (
  <Layout style={{ minHeight: '100vh' }}>
    {/* Desktop Sidebar */}
    {!isMobile && (
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
    )}

    {/* Mobile Drawer */}
    {isMobile && (
      <Drawer
        placement="left"
        onClose={onMobileClose}
        open={mobileOpen}
        closable={false}
        width={280}
        styles={{
          body: { padding: 0, background: '#001529' }
        }}
      >
        <Sidebar collapsed={false} />
      </Drawer>
    )}

    <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) }}>
      <Header 
        style={{ 
          padding: 0,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <HeaderBar
          collapsed={collapsed}
          onCollapse={onCollapse}
          isMobile={isMobile}
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false); // 移动端不使用折叠状态
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCollapse = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <MainLayout 
              collapsed={collapsed} 
              onCollapse={handleCollapse}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileClose={handleMobileClose}
            >
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout 
              collapsed={collapsed} 
              onCollapse={handleCollapse}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileClose={handleMobileClose}
            >
              <Users />
            </MainLayout>
          }
        />
        <Route
          path="/database"
          element={
            <MainLayout 
              collapsed={collapsed} 
              onCollapse={handleCollapse}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileClose={handleMobileClose}
            >
              <Database />
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout 
              collapsed={collapsed} 
              onCollapse={handleCollapse}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileClose={handleMobileClose}
            >
              <Upload />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
