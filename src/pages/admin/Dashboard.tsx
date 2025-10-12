import { Card, Row, Col, Statistic, Typography, Table, Progress, Space } from "antd"
import { 
    ShoppingCartOutlined, 
    DollarOutlined, 
    UserOutlined, 
    ShoppingOutlined,

} from "@ant-design/icons"

const { Title } = Typography

const Dashboard = () => {
    // Mock data
    const stats = [
        {
            title: 'Tổng doanh thu',
            value: 125000000,
            prefix: '₫',
            icon: <DollarOutlined style={{ color: '#52c41a' }} />,
            trend: '+12.5%',
            trendUp: true
        },
        {
            title: 'Đơn hàng',
            value: 1248,
            icon: <ShoppingCartOutlined style={{ color: '#1890ff' }} />,
            trend: '+8.2%',
            trendUp: true
        },
        {
            title: 'Khách hàng',
            value: 892,
            icon: <UserOutlined style={{ color: '#722ed1' }} />,
            trend: '+15.3%',
            trendUp: true
        },
        {
            title: 'Sản phẩm',
            value: 156,
            icon: <ShoppingOutlined style={{ color: '#fa8c16' }} />,
            trend: '+3.1%',
            trendUp: true
        }
    ]

    const recentOrders = [
        {
            key: '1',
            orderId: '#ORD001',
            customer: 'Nguyễn Văn A',
            amount: 1200000,
            status: 'Đã giao',
            date: '2024-01-15'
        },
        {
            key: '2',
            orderId: '#ORD002',
            customer: 'Trần Thị B',
            amount: 850000,
            status: 'Đang giao',
            date: '2024-01-15'
        },
        {
            key: '3',
            orderId: '#ORD003',
            customer: 'Lê Văn C',
            amount: 1800000,
            status: 'Chờ xử lý',
            date: '2024-01-14'
        },
        {
            key: '4',
            orderId: '#ORD004',
            customer: 'Phạm Thị D',
            amount: 650000,
            status: 'Đã giao',
            date: '2024-01-14'
        },
        {
            key: '5',
            orderId: '#ORD005',
            customer: 'Hoàng Văn E',
            amount: 2200000,
            status: 'Đang giao',
            date: '2024-01-13'
        }
    ]

    const topProducts = [
        { name: 'Lualab Signature', sales: 45, revenue: 54000000 },
        { name: 'Lualab Midnight', sales: 38, revenue: 37240000 },
        { name: 'Lualab Bloom', sales: 32, revenue: 27200000 },
        { name: 'Lualab Royal', sales: 28, revenue: 50400000 },
        { name: 'Lualab Ocean', sales: 25, revenue: 18750000 }
    ]

    const orderColumns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const colors: { [key: string]: string } = {
                    'Đã giao': '#52c41a',
                    'Đang giao': '#1890ff',
                    'Chờ xử lý': '#fa8c16',
                    'Đã hủy': '#ff4d4f'
                }
                return <span style={{ color: colors[status] || '#666' }}>{status}</span>
            }
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
    ]

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value)
    }

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
                Dashboard
            </Title>
            
            {/* Statistics Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card 
                            style={{ 
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                border: 'none',
                                background: 'white'
                            }}
                            hoverable
                        >
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.prefix}
                                valueStyle={{ color: '#1890ff' }}
                            />
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {stat.icon}
                                </div>
                                {/* <Space>
                                    {stat.trendUp ? (
                                        <TrendingUpOutlined style={{ color: '#52c41a' }} />
                                    ) : (
                                        <TrendingDownOutlined style={{ color: '#ff4d4f' }} />
                                    )}
                                    <span style={{ 
                                        color: stat.trendUp ? '#52c41a' : '#ff4d4f',
                                        fontSize: '12px'
                                    }}>
                                        {stat.trend}
                                    </span>
                                </Space> */}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* Recent Orders */}
                <Col xs={24} lg={16}>
                    <Card 
                        title="Đơn hàng gần đây" 
                        style={{ 
                            marginBottom: '16px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}
                    >
                        <Table
                            columns={orderColumns}
                            dataSource={recentOrders}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* Top Products */}
                <Col xs={24} lg={8}>
                    <Card 
                        title="Sản phẩm bán chạy" 
                        style={{ 
                            marginBottom: '16px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            {topProducts.map((product, index) => (
                                <div key={index} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                            {product.name}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#666' }}>
                                            {product.sales} bán
                                        </span>
                                    </div>
                                    <Progress 
                                        percent={(product.sales / 50) * 100} 
                                        size="small" 
                                        showInfo={false}
                                    />
                                    <div style={{ fontSize: '12px', color: '#1890ff', marginTop: '2px' }}>
                                        {formatCurrency(product.revenue)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Sales Chart Placeholder */}
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card 
                        title="Biểu đồ doanh thu 7 ngày qua"
                        style={{ 
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}
                    >
                        <div style={{ 
                            height: '300px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                            borderRadius: '12px',
                            color: '#666'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                                <div>Biểu đồ doanh thu sẽ được hiển thị ở đây</div>
                                <div style={{ fontSize: '12px', marginTop: '8px' }}>
                                    (Cần tích hợp thư viện chart như Chart.js hoặc Recharts)
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
