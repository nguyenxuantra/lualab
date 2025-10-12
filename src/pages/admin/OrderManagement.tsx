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
    Select,
    Typography,
    Row,
    Col,
    Statistic,
    Input
} from "antd"
import { 
    EyeOutlined, 
    EditOutlined, 
    SearchOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    TruckOutlined,
    ClockCircleOutlined
} from "@ant-design/icons"

const { Title } = Typography
const { Option } = Select

const OrderManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [searchText, setSearchText] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    // Mock data
    const orders = [
        {
            key: '1',
            orderId: '#ORD001',
            customerName: 'Nguyễn Văn A',
            customerPhone: '0123456789',
            customerEmail: 'nguyenvana@email.com',
            orderDate: '2024-01-15 10:30:00',
            totalAmount: 1200000,
            status: 'pending',
            paymentMethod: 'COD',
            shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
            items: [
                { name: 'Lualab Signature', quantity: 1, price: 1200000 }
            ]
        },
        {
            key: '2',
            orderId: '#ORD002',
            customerName: 'Trần Thị B',
            customerPhone: '0987654321',
            customerEmail: 'tranthib@email.com',
            orderDate: '2024-01-15 14:20:00',
            totalAmount: 850000,
            status: 'processing',
            paymentMethod: 'Banking',
            shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
            items: [
                { name: 'Lualab Bloom', quantity: 1, price: 850000 }
            ]
        },
        {
            key: '3',
            orderId: '#ORD003',
            customerName: 'Lê Văn C',
            customerPhone: '0369852147',
            customerEmail: 'levanc@email.com',
            orderDate: '2024-01-14 09:15:00',
            totalAmount: 1800000,
            status: 'shipped',
            paymentMethod: 'MoMo',
            shippingAddress: '789 Đường DEF, Quận 3, TP.HCM',
            items: [
                { name: 'Lualab Royal', quantity: 1, price: 1800000 }
            ]
        },
        {
            key: '4',
            orderId: '#ORD004',
            customerName: 'Phạm Thị D',
            customerPhone: '0741258963',
            customerEmail: 'phamthid@email.com',
            orderDate: '2024-01-14 16:45:00',
            totalAmount: 650000,
            status: 'delivered',
            paymentMethod: 'ZaloPay',
            shippingAddress: '321 Đường GHI, Quận 4, TP.HCM',
            items: [
                { name: 'Lualab Citrus', quantity: 1, price: 650000 }
            ]
        },
        {
            key: '5',
            orderId: '#ORD005',
            customerName: 'Hoàng Văn E',
            customerPhone: '0852147963',
            customerEmail: 'hoangvane@email.com',
            orderDate: '2024-01-13 11:30:00',
            totalAmount: 2200000,
            status: 'cancelled',
            paymentMethod: 'COD',
            shippingAddress: '654 Đường JKL, Quận 5, TP.HCM',
            items: [
                { name: 'Lualab Mystique', quantity: 1, price: 2200000 }
            ]
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
            'pending': 'orange',
            'processing': 'blue',
            'shipped': 'cyan',
            'delivered': 'green',
            'cancelled': 'red'
        }
        return colors[status] || 'default'
    }

    const getStatusText = (status: string) => {
        const texts: { [key: string]: string } = {
            'pending': 'Chờ xử lý',
            'processing': 'Đang xử lý',
            'shipped': 'Đang giao',
            'delivered': 'Đã giao',
            'cancelled': 'Đã hủy'
        }
        return texts[status] || status
    }

    const handleViewOrder = (record: any) => {
        setSelectedOrder(record)
        setIsModalVisible(true)
    }

    const handleStatusChange = (orderId: string, newStatus: string) => {
        message.success(`Đã cập nhật trạng thái đơn hàng ${orderId}`)
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
                            order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                            order.customerPhone.includes(searchText)
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const orderStats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text: string) => (
                <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{text}</span>
            ),
        },
        {
            title: 'Khách hàng',
            key: 'customer',
            render: (_, record: any) => (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{record.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{record.customerPhone}</div>
                </div>
            ),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date: string) => (
                <div>
                    <div>{date.split(' ')[0]}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{date.split(' ')[1]}</div>
                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number) => (
                <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
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
                    onChange={(value) => handleStatusChange(record.orderId, value)}
                >
                    <Option value="pending">Chờ xử lý</Option>
                    <Option value="processing">Đang xử lý</Option>
                    <Option value="shipped">Đang giao</Option>
                    <Option value="delivered">Đã giao</Option>
                    <Option value="cancelled">Đã hủy</Option>
                </Select>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (method: string) => {
                const colors: { [key: string]: string } = {
                    'COD': 'orange',
                    'Banking': 'blue',
                    'MoMo': 'pink',
                    'ZaloPay': 'green'
                }
                return <Tag color={colors[method] || 'default'}>{method}</Tag>
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record: any) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleViewOrder(record)}
                        title="Xem chi tiết"
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
                Quản lý đơn hàng
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
                            title="Tổng đơn hàng"
                            value={orderStats.total}
                            prefix={<CheckCircleOutlined />}
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
                            title="Chờ xử lý"
                            value={orderStats.pending}
                            prefix={<ClockCircleOutlined />}
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
                            title="Đang giao"
                            value={orderStats.shipped}
                            prefix={<TruckOutlined />}
                            valueStyle={{ color: '#13c2c2' }}
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
                            title="Đã giao"
                            value={orderStats.delivered}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
                    <Input
                        placeholder="Tìm kiếm đơn hàng..."
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
                        <Option value="pending">Chờ xử lý</Option>
                        <Option value="processing">Đang xử lý</Option>
                        <Option value="shipped">Đang giao</Option>
                        <Option value="delivered">Đã giao</Option>
                        <Option value="cancelled">Đã hủy</Option>
                    </Select>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    rowKey="orderId"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} của ${total} đơn hàng`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* Order Detail Modal */}
            <Modal
                title={`Chi tiết đơn hàng ${selectedOrder?.orderId}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={800}
            >
                {selectedOrder && (
                    <div>
                        <Descriptions title="Thông tin khách hàng" bordered column={2}>
                            <Descriptions.Item label="Họ tên">{selectedOrder.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedOrder.customerPhone}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedOrder.customerEmail}</Descriptions.Item>
                            <Descriptions.Item label="Phương thức thanh toán">
                                <Tag color="blue">{selectedOrder.paymentMethod}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ giao hàng" span={2}>
                                {selectedOrder.shippingAddress}
                            </Descriptions.Item>
                        </Descriptions>

                        <div style={{ marginTop: '24px' }}>
                            <Title level={4}>Sản phẩm đã đặt</Title>
                            <Table
                                dataSource={selectedOrder.items}
                                columns={[
                                    {
                                        title: 'Tên sản phẩm',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Số lượng',
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                        render: (quantity: number) => quantity,
                                    },
                                    {
                                        title: 'Giá',
                                        dataIndex: 'price',
                                        key: 'price',
                                        render: (price: number) => formatPrice(price),
                                    },
                                    {
                                        title: 'Thành tiền',
                                        key: 'total',
                                        render: (_, record: any) => formatPrice(record.price * record.quantity),
                                    },
                                ]}
                                pagination={false}
                                size="small"
                            />
                        </div>

                        <div style={{ marginTop: '16px', textAlign: 'right' }}>
                            <Title level={4}>
                                Tổng cộng: {formatPrice(selectedOrder.totalAmount)}
                            </Title>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default OrderManagement
