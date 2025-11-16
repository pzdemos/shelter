import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
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
      />
    </div>
  );
};

export default Sidebar;
