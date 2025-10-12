import { useState, useEffect } from "react"
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Button, 
    Form, 
    Input, 
    Select, 
    Space, 
    Divider,
    Steps,
    message,
    Modal
} from "antd"
import { 
    ShoppingCartOutlined, 
    ArrowLeftOutlined,
    CheckCircleOutlined,
    CreditCardOutlined,
    TruckOutlined
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { products } from "../data/products"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

interface CartItem {
    id: number
    quantity: number
}

const Checkout = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        } else {
            navigate('/cart')
        }
    }, [navigate])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const getCartProducts = () => {
        return cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.id)
            return product ? { ...product, quantity: cartItem.quantity } : null
        }).filter(Boolean)
    }

    const getTotalPrice = () => {
        return getCartProducts().reduce((total, product) => {
            return total + (product!.price * product!.quantity)
        }, 0)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const handleSubmit = (values: any) => {
        console.log('Checkout values:', values)
        setIsModalVisible(true)
    }

    const handlePaymentSuccess = () => {
        // Clear cart
        localStorage.removeItem('cart')
        message.success('Đặt hàng thành công!')
        navigate('/')
    }

    const steps = [
        {
            title: 'Thông tin giao hàng',
            icon: <TruckOutlined />,
        },
        {
            title: 'Thanh toán',
            icon: <CreditCardOutlined />,
        },
        {
            title: 'Hoàn thành',
            icon: <CheckCircleOutlined />,
        },
    ]

    const cartProducts = getCartProducts()

    if (cartProducts.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Title level={3}>Không có sản phẩm nào để thanh toán</Title>
                <Link to="/cart">
                    <Button type="primary" size="large">
                        Quay lại giỏ hàng
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div style={{ 
            width: '100%', 
            maxWidth: '1200px',
            margin: '0 auto', 
            padding: '24px'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <Space align="center" style={{ marginBottom: '16px' }}>
                    <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate(-1)}
                        style={{ marginRight: '8px' }}
                    >
                        Quay lại
                    </Button>
                    <Title level={2} style={{ margin: 0 }}>Thanh toán</Title>
                </Space>
                <Text type="secondary">
                    {getTotalItems()} sản phẩm • Tổng: {formatPrice(getTotalPrice())}
                </Text>
            </div>

            {/* Steps */}
            <Card style={{ marginBottom: '32px' }}>
                <Steps
                    current={currentStep}
                    items={steps}
                    style={{ marginBottom: '24px' }}
                />
            </Card>

            <Row gutter={[24, 24]}>
                {/* Checkout Form */}
                <Col xs={24} lg={16}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ marginBottom: '24px' }}
                    >
                        {/* Delivery Information */}
                        <Card title="Thông tin giao hàng" style={{ marginBottom: '24px' }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="fullName"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                                    >
                                        <Input placeholder="Nhập họ và tên" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                                            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item
                                        label="Địa chỉ email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập email' },
                                            { type: 'email', message: 'Email không hợp lệ' }
                                        ]}
                                    >
                                        <Input placeholder="Nhập địa chỉ email" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item
                                        label="Địa chỉ giao hàng"
                                        name="address"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng' }]}
                                    >
                                        <TextArea 
                                            rows={3} 
                                            placeholder="Nhập địa chỉ giao hàng chi tiết" 
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Tỉnh/Thành phố"
                                        name="city"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                                    >
                                        <Select placeholder="Chọn tỉnh/thành phố">
                                            <Option value="hanoi">Hà Nội</Option>
                                            <Option value="hcm">TP. Hồ Chí Minh</Option>
                                            <Option value="danang">Đà Nẵng</Option>
                                            <Option value="haiphong">Hải Phòng</Option>
                                            <Option value="cantho">Cần Thơ</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        label="Quận/Huyện"
                                        name="district"
                                        rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
                                    >
                                        <Select placeholder="Chọn quận/huyện">
                                            <Option value="quan1">Quận 1</Option>
                                            <Option value="quan2">Quận 2</Option>
                                            <Option value="quan3">Quận 3</Option>
                                            <Option value="quan4">Quận 4</Option>
                                            <Option value="quan5">Quận 5</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Payment Method */}
                        <Card title="Phương thức thanh toán" style={{ marginBottom: '24px' }}>
                            <Form.Item
                                name="paymentMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                            >
                                <Select placeholder="Chọn phương thức thanh toán">
                                    <Option value="cod">Thanh toán khi nhận hàng (COD)</Option>
                                    <Option value="banking">Chuyển khoản ngân hàng</Option>
                                    <Option value="momo">Ví MoMo</Option>
                                    <Option value="zalopay">Ví ZaloPay</Option>
                                </Select>
                            </Form.Item>
                        </Card>

                        {/* Order Notes */}
                        <Card title="Ghi chú đơn hàng" style={{ marginBottom: '24px' }}>
                            <Form.Item name="notes">
                                <TextArea 
                                    rows={3} 
                                    placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)" 
                                />
                            </Form.Item>
                        </Card>

                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <Button onClick={() => navigate('/cart')}>
                                    Quay lại giỏ hàng
                                </Button>
                                <Button 
                                    type="primary" 
                                    htmlType="submit"
                                    size="large"
                                    style={{
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    Đặt hàng
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Col>

                {/* Order Summary */}
                <Col xs={24} lg={8}>
                    <Card title="Tóm tắt đơn hàng" style={{ position: 'sticky', top: '100px' }}>
                        {/* Order Items */}
                        <div style={{ marginBottom: '16px' }}>
                            {cartProducts.map((product) => (
                                <div key={product!.id} style={{ marginBottom: '12px' }}>
                                    <Row gutter={[8, 8]} align="middle">
                                        <Col span={6}>
                                            <img
                                                src={product!.images[0]}
                                                alt={product!.name}
                                                style={{
                                                    width: '100%',
                                                    height: '60px',
                                                    objectFit: 'contain',
                                                    borderRadius: '4px',
                                                    background: '#f8f9fa'
                                                }}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Text strong style={{ fontSize: '12px' }}>
                                                {product!.name}
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: '10px' }}>
                                                SL: {product!.quantity}
                                            </Text>
                                        </Col>
                                        <Col span={6}>
                                            <Text strong style={{ fontSize: '12px', color: '#1890ff' }}>
                                                {formatPrice(product!.price * product!.quantity)}
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>

                        <Divider style={{ margin: '16px 0' }} />

                        {/* Price Summary */}
                        <div style={{ marginBottom: '16px' }}>
                            <Row justify="space-between" style={{ marginBottom: '8px' }}>
                                <Text>Tạm tính:</Text>
                                <Text>{formatPrice(getTotalPrice())}</Text>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: '8px' }}>
                                <Text>Phí vận chuyển:</Text>
                                <Text style={{ color: '#52c41a' }}>Miễn phí</Text>
                            </Row>
                            <Divider style={{ margin: '12px 0' }} />
                            <Row justify="space-between">
                                <Text strong style={{ fontSize: '16px' }}>Tổng cộng:</Text>
                                <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                                    {formatPrice(getTotalPrice())}
                                </Text>
                            </Row>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <Link to="/products">
                                <Button type="link">Tiếp tục mua sắm</Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Success Modal */}
            <Modal
                title="Đặt hàng thành công!"
                open={isModalVisible}
                onOk={handlePaymentSuccess}
                onCancel={() => setIsModalVisible(false)}
                okText="Hoàn thành"
                cancelText="Đóng"
                okButtonProps={{ 
                    style: {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                    }
                }}
            >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                    <p>Cảm ơn bạn đã đặt hàng tại Lualab!</p>
                    <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.</p>
                </div>
            </Modal>
        </div>
    )
}

export default Checkout
