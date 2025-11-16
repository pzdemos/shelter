import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login({
        username: values.username,
        password: values.password
      });
      
      // 保存token
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      messageApi.success('登录成功！');
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#001529',
      padding: '20px'
    }}>
      {contextHolder}
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          borderRadius: 12,
          background: '#fff'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ 
            fontSize: 'clamp(24px, 5vw, 28px)', 
            fontWeight: 600, 
            margin: 0, 
            color: '#001529' 
          }}>shelter</h1>
          <p style={{ 
            color: '#888', 
            marginTop: 8,
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>请输入您的账号信息</p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              loading={loading}
              style={{ 
                height: 42,
                background: '#001529',
                border: 'none'
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
