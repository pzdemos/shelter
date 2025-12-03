import { Menu, Avatar, Dropdown, Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { logout } from '../../api/user';

const { confirm } = Modal;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 获取用户信息
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/database',
      icon: <DatabaseOutlined />,
      label: '数据库管理',
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: '上传管理',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    confirm({
      title: '确认退出',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await logout();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
      },
    });
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: collapsed ? '20px' : '18px',
        fontWeight: 'bold',
        gap: '8px',
        transition: 'all 0.2s',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <HomeOutlined style={{ fontSize: '24px' }} />
        {!collapsed && <span>Shelter</span>}
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: 'none',
          }}
          className="custom-sidebar-menu"
        />
      </div>

      {/* User Info & Logout */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: collapsed ? '12px 0' : '16px',
        background: 'rgba(0, 0, 0, 0.2)',
      }}>
        {!collapsed ? (
          <>
            {/* User Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
            }}>
              <Avatar 
                src={userInfo.profile_image_url} 
                icon={<UserOutlined />}
                style={{ flexShrink: 0 }}
              />
              <div style={{ 
                flex: 1, 
                overflow: 'hidden',
                color: '#fff',
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {userInfo.full_name || userInfo.username || '未登录'}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.65)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {userInfo.email || ''}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                cursor: 'pointer',
                borderRadius: '8px',
                color: '#fff',
                transition: 'all 0.2s',
                background: 'rgba(255, 77, 79, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 77, 79, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)';
              }}
            >
              <LogoutOutlined style={{ fontSize: '16px', color: '#ff4d4f' }} />
              <span style={{ fontSize: '14px' }}>退出登录</span>
            </div>
          </>
        ) : (
          // Collapsed state - show only icons
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Avatar 
              src={userInfo.profile_image_url} 
              icon={<UserOutlined />}
              size="small"
            />
            <LogoutOutlined 
              onClick={handleLogout}
              style={{ 
                fontSize: '18px', 
                color: '#ff4d4f',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        .custom-sidebar-menu .ant-menu-item-selected {
          background-color: #fff !important;
          color: #001529 !important;
        }
        .custom-sidebar-menu .ant-menu-item-selected .anticon {
          color: #001529 !important;
        }
        .custom-sidebar-menu .ant-menu-item {
          transition: all 0.2s;
        }
        .custom-sidebar-menu .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
