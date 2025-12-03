import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Button, Input, Space, Tag, Modal, Form, 
  Select, message, Popconfirm, Row, Col, Statistic, Avatar, Tooltip 
} from 'antd';
import { 
  UserOutlined, SearchOutlined, PlusOutlined, EditOutlined, 
  DeleteOutlined, KeyOutlined, ReloadOutlined, StopOutlined, CheckCircleOutlined 
} from '@ant-design/icons';
import { 
  getUsers, createUser, updateUser, deleteUser, 
  updatePassword, getUserStats, batchUpdateStatus 
} from '../api/user';

const { Option } = Select;

const Users = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchText, setSearchText] = useState('');
  const [stats, setStats] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Modal State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // Password Modal State
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch Data
  const fetchData = async (page = 1, pageSize = 10, search = '') => {
    setLoading(true);
    try {
      const res = await getUsers({ page, limit: pageSize, search });
      if (res.success) {
        setData(res.data);
        setPagination({
          current: res.pagination.page,
          pageSize: res.pagination.limit,
          total: res.pagination.total
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getUserStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  // Handlers
  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    fetchData(1, pagination.pageSize, value);
  };

  const handleRefresh = () => {
    fetchData(pagination.current, pagination.pageSize, searchText);
    fetchStats();
  };

  // Create/Edit User
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (modalType === 'create') {
        await createUser(values);
        message.success('用户创建成功');
      } else {
        await updateUser(currentRecord.user_id, values);
        message.success('用户更新成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchData(pagination.current, pagination.pageSize, searchText);
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const showCreateModal = () => {
    setModalType('create');
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setModalType('edit');
    setCurrentRecord(record);
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      full_name: record.full_name,
      role_id: record.role_id,
      is_active: record.is_active,
      profile_image_url: record.profile_image_url
    });
    setIsModalVisible(true);
  };

  // Password Reset
  const handlePasswordOk = async () => {
    try {
      const values = await passwordForm.validateFields();
      await updatePassword(currentRecord.user_id, values.password);
      message.success('密码修改成功');
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const showPasswordModal = (record) => {
    setCurrentRecord(record);
    passwordForm.resetFields();
    setIsPasswordModalVisible(true);
  };

  // Delete
  const handleDelete = async (id, hard = false) => {
    try {
      await deleteUser(id, hard);
      message.success(hard ? '用户已永久删除' : '用户已停用');
      fetchData(pagination.current, pagination.pageSize, searchText);
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  // Batch Operations
  const handleBatchStatus = async (isActive) => {
    if (selectedRowKeys.length === 0) return;
    try {
      await batchUpdateStatus(selectedRowKeys, isActive);
      message.success(`已${isActive ? '激活' : '停用'}选中的用户`);
      setSelectedRowKeys([]);
      fetchData(pagination.current, pagination.pageSize, searchText);
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  // Columns
  const columns = [
    {
      title: '用户',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar src={record.profile_image_url} icon={<UserOutlined />} />
          <div>
            <div>{record.username}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '全名',
      dataIndex: 'full_name',
      key: 'full_name',
      responsive: ['md'],
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      key: 'role_id',
      render: (roleId) => (
        <Tag color={roleId === 1 ? 'gold' : 'blue'}>
          {roleId === 1 ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? '活跃' : '停用'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      key: 'created_at',
      responsive: ['lg'],
      render: (text) => text ? new Date(text).toLocaleString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      fixed: isMobile ? false : 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => showEditModal(record)} 
            />
          </Tooltip>
          <Tooltip title="修改密码">
            <Button 
              type="text" 
              icon={<KeyOutlined />} 
              onClick={() => showPasswordModal(record)} 
            />
          </Tooltip>
          <Popconfirm
            title="确定要删除/停用该用户吗?"
            description="点击'取消'仅停用，点击'确定'永久删除"
            okText="永久删除"
            cancelText="仅停用"
            onConfirm={() => handleDelete(record.user_id, true)}
            onCancel={() => handleDelete(record.user_id, false)}
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px' }}>
      {/* Stats Cards */}
      {stats && (
        <Row gutter={[16, 16]} style={{ marginBottom: isMobile ? '16px' : '24px' }}>
          <Col xs={12} sm={12} md={6}>
            <Card>
              <Statistic 
                title="总用户数" 
                value={stats.total} 
                prefix={<UserOutlined />}
                valueStyle={{ fontSize: isMobile ? '20px' : '24px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card>
              <Statistic 
                title="活跃用户" 
                value={stats.active} 
                valueStyle={{ color: '#3f8600', fontSize: isMobile ? '20px' : '24px' }} 
                prefix={<CheckCircleOutlined />} 
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card>
              <Statistic 
                title="今日新增" 
                value={stats.todayNew} 
                prefix={<PlusOutlined />}
                valueStyle={{ fontSize: isMobile ? '20px' : '24px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card>
              <Statistic 
                title="停用用户" 
                value={stats.inactive} 
                valueStyle={{ color: '#cf1322', fontSize: isMobile ? '20px' : '24px' }} 
                prefix={<StopOutlined />} 
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Toolbar */}
      <Card>
        <div style={{ 
          marginBottom: 16, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '0',
          justifyContent: 'space-between' 
        }}>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
              {isMobile ? '新增' : '新增用户'}
            </Button>
            {selectedRowKeys.length > 0 && (
              <>
                <Button onClick={() => handleBatchStatus(true)}>批量激活</Button>
                <Button danger onClick={() => handleBatchStatus(false)}>批量停用</Button>
              </>
            )}
          </Space>
          <Space wrap>
            <Input.Search
              placeholder="搜索用户名/邮箱/姓名"
              onSearch={handleSearch}
              style={{ width: isMobile ? '100%' : 250 }}
              allowClear
            />
            <Button icon={<ReloadOutlined />} onClick={handleRefresh} />
          </Space>
        </div>

        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          columns={columns}
          dataSource={data}
          rowKey="user_id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={modalType === 'create' ? '新增用户' : '编辑用户'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={isMobile ? '100%' : 520}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input disabled={modalType === 'edit'} />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="全名"
            rules={[{ required: true, message: '请输入全名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          {modalType === 'create' && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少6位' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            name="role_id"
            label="角色"
            initialValue={2}
          >
            <Select>
              <Option value={1}>管理员</Option>
              <Option value={2}>普通用户</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="is_active"
            label="状态"
            initialValue={true}
          >
            <Select>
              <Option value={true}>活跃</Option>
              <Option value={false}>停用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Password Modal */}
      <Modal
        title="修改密码"
        open={isPasswordModalVisible}
        onOk={handlePasswordOk}
        onCancel={() => setIsPasswordModalVisible(false)}
        width={isMobile ? '100%' : 520}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }, { min: 6, message: '密码至少6位' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
