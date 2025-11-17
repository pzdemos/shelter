import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div>
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
      }}>
        <HomeOutlined style={{ fontSize: '24px' }} />
        {!collapsed && <span>Shelter</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          '--ant-menu-item-selected-bg': '#fff',
        }}
        className="custom-sidebar-menu"
      />
      <style>{`
        .custom-sidebar-menu .ant-menu-item-selected {
          background-color: #fff !important;
          color: #001529 !important;
        }
        .custom-sidebar-menu .ant-menu-item-selected .anticon {
          color: #001529 !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
