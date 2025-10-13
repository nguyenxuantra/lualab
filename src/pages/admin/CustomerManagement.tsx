import { useState } from "react"
import { 
    Card, 
    Table, 
    Button, 
    Space, 
    Tag, 
    Modal, 
    Descriptions, 
    message,
    Typography,
    Row,
    Col,
    Statistic,
    Input,
    Select,
    DatePicker,
    Avatar
} from "antd"
import { 
    EyeOutlined, 
    EditOutlined,  
    SearchOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    ShoppingCartOutlined,
    DollarOutlined
} from "@ant-design/icons"

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const CustomerManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
    const [searchText, setSearchText] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Mock data
    const customers = [
        {
            key: '1',
            id: 'CUST001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0123456789',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            joinDate: '2024-01-15',
            status: 'active',
            totalOrders: 5,
            totalSpent: 4500000,
            lastOrder: '2024-01-20',
            avatar: null
        },
        {
            key: '2',
            id: 'CUST002',
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0987654321',
            address: '456 Đường XYZ, Quận 2, TP.HCM',
            joinDate: '2024-01-10',
            status: 'active',
            totalOrders: 3,
            totalSpent: 2800000,
            lastOrder: '2024-01-18',
            avatar: null
        },
        {
            key: '3',
            id: 'CUST003',
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0369852147',
            address: '789 Đường DEF, Quận 3, TP.HCM',
            joinDate: '2024-01-05',
            status: 'inactive',
            totalOrders: 1,
            totalSpent: 1200000,
            lastOrder: '2024-01-12',
            avatar: null
        },
        {
            key: '4',
            id: 'CUST004',
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            phone: '0741258963',
            address: '321 Đường GHI, Quận 4, TP.HCM',
            joinDate: '2023-12-20',
            status: 'active',
            totalOrders: 8,
            totalSpent: 7200000,
            lastOrder: '2024-01-22',
            avatar: null
        },
        {
            key: '5',
            id: 'CUST005',
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            phone: '0852147963',
            address: '654 Đường JKL, Quận 5, TP.HCM',
            joinDate: '2023-11-15',
            status: 'vip',
            totalOrders: 15,
            totalSpent: 15000000,
            lastOrder: '2024-01-25',
            avatar: null
        }
    ]

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'active': 'green',
            'inactive': 'red',
            'vip': 'gold'
        }
        return colors[status] || 'default'
    }

    const getStatusText = (status: string) => {
        const texts: { [key: string]: string } = {
            'active': 'Hoạt động',
            'inactive': 'Không hoạt động',
            'vip': 'VIP'
        }
        return texts[status] || status
    }

    const handleViewCustomer = (record: any) => {
        setSelectedCustomer(record)
        setIsModalVisible(true)
    }

    const handleStatusChange = (customerId: string) => {
        message.success(`Đã cập nhật trạng thái khách hàng ${customerId}`)
    }

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
                            customer.phone.includes(searchText) ||
                            customer.id.toLowerCase().includes(searchText.toLowerCase())
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const customerStats = {
        total: customers.length,
        active: customers.filter(c => c.status === 'active').length,
        inactive: customers.filter(c => c.status === 'inactive').length,
        vip: customers.filter(c => c.status === 'vip').length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
    }

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customer',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                        size={40} 
                        icon={<UserOutlined />} 
                        style={{ marginRight: '12px' }}
                    />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{record.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{record.id}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Liên hệ',
            key: 'contact',
            render: (_: any, record: any) => (
                <div>
                    <div style={{ fontSize: '14px' }}>
                        <MailOutlined style={{ marginRight: '4px' }} />
                        {record.email}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        <PhoneOutlined style={{ marginRight: '4px' }} />
                        {record.phone}
                    </div>
                </div>
            ),
        },
        {
            title: 'Ngày tham gia',
            dataIndex: 'joinDate',
            key: 'joinDate',
            render: (date: string) => (
                <div>
                    <div>{date}</div>
                </div>
            ),
        },
        {
            title: 'Đơn hàng',
            key: 'orders',
            render: (_: any, record: any) => (
                <div>
                    <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                        {record.totalOrders} đơn
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Cuối: {record.lastOrder}
                    </div>
                </div>
            ),
        },
        {
            title: 'Tổng chi tiêu',
            dataIndex: 'totalSpent',
            key: 'totalSpent',
            render: (amount: number) => (
                <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
                    {formatPrice(amount)}
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: any) => (
                <Select
                    value={status}
                    style={{ width: 120 }}
                    size="small"
                    onChange={() => handleStatusChange(record.id)}
                >
                    <Option value="active">Hoạt động</Option>
                    <Option value="inactive">Không hoạt động</Option>
                    <Option value="vip">VIP</Option>
                </Select>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleViewCustomer(record)}
                        title="Xem chi tiết"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        title="Chỉnh sửa"
                    />
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Title level={2} style={{ 
                marginBottom: '24px',
                color: '#2c3e50',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Quản lý khách hàng
            </Title>
            
            {/* Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Tổng khách hàng"
                            value={customerStats.total}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Khách hàng hoạt động"
                            value={customerStats.active}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Khách hàng VIP"
                            value={customerStats.vip}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Tổng doanh thu"
                            value={customerStats.totalRevenue}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                            formatter={(value) => formatPrice(Number(value))}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Input
                        placeholder="Tìm kiếm khách hàng..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ 
                            width: 300,
                            borderRadius: '8px'
                        }}
                    />
                    <Select
                        placeholder="Lọc theo trạng thái"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ 
                            width: 150,
                            borderRadius: '8px'
                        }}
                    >
                        <Option value="all">Tất cả</Option>
                        <Option value="active">Hoạt động</Option>
                        <Option value="inactive">Không hoạt động</Option>
                        <Option value="vip">VIP</Option>
                    </Select>
                    <RangePicker
                        placeholder={['Từ ngày', 'Đến ngày']}
                        style={{ borderRadius: '8px' }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredCustomers}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} của ${total} khách hàng`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Customer Detail Modal */}
            <Modal
                title={`Chi tiết khách hàng ${selectedCustomer?.name}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={800}
            >
                {selectedCustomer && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <Avatar 
                                size={80} 
                                icon={<UserOutlined />} 
                                style={{ marginBottom: '16px' }}
                            />
                            <div>
                                <Title level={3} style={{ margin: 0 }}>
                                    {selectedCustomer.name}
                                </Title>
                                <Tag color={getStatusColor(selectedCustomer.status)} style={{ marginTop: '8px' }}>
                                    {getStatusText(selectedCustomer.status)}
                                </Tag>
                            </div>
                        </div>

                        <Descriptions title="Thông tin cá nhân" bordered column={2}>
                            <Descriptions.Item label="Mã khách hàng">{selectedCustomer.id}</Descriptions.Item>
                            <Descriptions.Item label="Họ tên">{selectedCustomer.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedCustomer.phone}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ" span={2}>{selectedCustomer.address}</Descriptions.Item>
                            <Descriptions.Item label="Ngày tham gia">{selectedCustomer.joinDate}</Descriptions.Item>
                            <Descriptions.Item label="Đơn hàng cuối">{selectedCustomer.lastOrder}</Descriptions.Item>
                        </Descriptions>

                        <Row gutter={16} style={{ marginTop: '24px' }}>
                            <Col span={12}>
                                <Card title="Thống kê đơn hàng" size="small">
                                    <Statistic
                                        title="Tổng đơn hàng"
                                        value={selectedCustomer.totalOrders}
                                        prefix={<ShoppingCartOutlined />}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Tổng chi tiêu" size="small">
                                    <Statistic
                                        title="Số tiền đã chi"
                                        value={selectedCustomer.totalSpent}
                                        prefix={<DollarOutlined />}
                                        valueStyle={{ color: '#52c41a' }}
                                        formatter={(value) => formatPrice(Number(value))}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default CustomerManagement
