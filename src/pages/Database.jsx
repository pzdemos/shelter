import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

const Database = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '数据库名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === '正常' ? '#52c41a' : '#ff4d4f' }}>
          {status}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个数据库吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      // 模拟数据，实际项目中应该调用API
      const mockData = [
        {
          id: 1,
          name: '主数据库',
          type: 'MySQL',
          status: '正常',
          createTime: '2024-01-15 10:30:00',
        },
        {
          id: 2,
          name: '缓存数据库',
          type: 'Redis',
          status: '正常',
          createTime: '2024-01-16 14:20:00',
        },
        {
          id: 3,
          name: '日志数据库',
          type: 'MongoDB',
          status: '维护中',
          createTime: '2024-01-17 09:15:00',
        },
      ];
      setData(mockData);
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingRecord(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    try {
      // 实际项目中应该调用API删除
      setData(data.filter(item => item.id !== id));
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        // 编辑
        setData(data.map(item => 
          item.id === editingRecord.id 
            ? { ...item, ...values }
            : item
        ));
        message.success('更新成功');
      } else {
        // 新增
        const newRecord = {
          ...values,
          id: Date.now(),
          createTime: new Date().toLocaleString(),
        };
        setData([...data, newRecord]);
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingRecord(null);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="数据库管理"
        extra={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增数据库
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchData}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑数据库' : '新增数据库'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: '正常',
          }}
        >
          <Form.Item
            name="name"
            label="数据库名称"
            rules={[{ required: true, message: '请输入数据库名称' }]}
          >
            <Input placeholder="请输入数据库名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="数据库类型"
            rules={[{ required: true, message: '请选择数据库类型' }]}
          >
            <Input placeholder="如：MySQL, Redis, MongoDB" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Input placeholder="如：正常, 维护中" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Database;