import { useState, useEffect } from "react"
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Button, 
    InputNumber, 
    Space, 
    Divider,
    Empty,
    Modal,
    message
} from "antd"
import { 
    ShoppingCartOutlined, 
    DeleteOutlined, 
    PlusOutlined,
    MinusOutlined,
    ArrowLeftOutlined
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { products } from "../data/products"

const { Title, Text } = Typography

interface CartItem {
    id: number
    quantity: number
}

const Cart = () => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(productId)
            return
        }

        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const removeItem = (productId: number) => {
        const updatedCart = cartItems.filter(item => item.id !== productId)
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        message.success('Đã xóa sản phẩm khỏi giỏ hàng')
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('cart')
        message.success('Đã xóa tất cả sản phẩm')
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

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            message.warning('Giỏ hàng trống')
            return
        }
        navigate('/checkout')
    }

    const cartProducts = getCartProducts()

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
                    <Title level={2} style={{ margin: 0 }}>Giỏ hàng</Title>
                </Space>
                <Text type="secondary">
                    {getTotalItems()} sản phẩm trong giỏ hàng
                </Text>
            </div>

            {cartProducts.length > 0 ? (
                <Row gutter={[24, 24]}>
                    {/* Cart Items */}
                    <Col xs={24} lg={16}>
                        <Card title="Sản phẩm trong giỏ hàng" style={{ marginBottom: '24px' }}>
                            {cartProducts.map((product) => (
                                <div key={product!.id}>
                                    <Row gutter={[16, 16]} align="middle" style={{ padding: '16px 0' }}>
                                        <Col xs={24} sm={6}>
                                            <img
                                                src={product!.images[0]}
                                                alt={product!.name}
                                                style={{
                                                    width: '100%',
                                                    height: '120px',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px',
                                                    background: '#f8f9fa'
                                                }}
                                            />
                                        </Col>
                                        <Col xs={24} sm={10}>
                                            <div>
                                                <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                                                    {product!.name}
                                                </Title>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {product!.brand} • {product!.size}
                                                </Text>
                                                <div style={{ marginTop: '8px' }}>
                                                    <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                                                        {formatPrice(product!.price)}
                                                    </Text>
                                                    {product!.originalPrice && (
                                                        <Text delete style={{ marginLeft: '8px', fontSize: '12px' }}>
                                                            {formatPrice(product!.originalPrice)}
                                                        </Text>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={4}>
                                            <div style={{ textAlign: 'center' }}>
                                                <Text strong>Số lượng:</Text>
                                                <div style={{ marginTop: '8px' }}>
                                                    <Space>
                                                        <Button
                                                            size="small"
                                                            icon={<MinusOutlined />}
                                                            onClick={() => updateQuantity(product!.id, product!.quantity - 1)}
                                                        />
                                                        <InputNumber
                                                            min={1}
                                                            max={10}
                                                            value={product!.quantity}
                                                            onChange={(value) => updateQuantity(product!.id, value || 1)}
                                                            style={{ width: '60px' }}
                                                            size="small"
                                                        />
                                                        <Button
                                                            size="small"
                                                            icon={<PlusOutlined />}
                                                            onClick={() => updateQuantity(product!.id, product!.quantity + 1)}
                                                        />
                                                    </Space>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={4}>
                                            <div style={{ textAlign: 'right' }}>
                                                <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                                                    {formatPrice(product!.price * product!.quantity)}
                                                </Text>
                                                <div style={{ marginTop: '8px' }}>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => removeItem(product!.id)}
                                                        size="small"
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Divider style={{ margin: '16px 0' }} />
                                </div>
                            ))}
                            
                            <div style={{ textAlign: 'right', marginTop: '16px' }}>
                                <Button 
                                    danger 
                                    onClick={() => setIsModalVisible(true)}
                                    icon={<DeleteOutlined />}
                                >
                                    Xóa tất cả
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    {/* Order Summary */}
                    <Col xs={24} lg={8}>
                        <Card title="Tóm tắt đơn hàng" style={{ position: 'sticky', top: '100px' }}>
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

                            <Button
                                type="primary"
                                size="large"
                                icon={<ShoppingCartOutlined />}
                                onClick={handleCheckout}
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                }}
                            >
                                Thanh toán
                            </Button>

                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <Link to="/products">
                                    <Button type="link">Tiếp tục mua sắm</Button>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <Empty
                        image={<ShoppingCartOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
                        description="Giỏ hàng trống"
                        style={{ marginBottom: '24px' }}
                    >
                        <Link to="/products">
                            <Button type="primary" size="large">
                                Mua sắm ngay
                            </Button>
                        </Link>
                    </Empty>
                </div>
            )}

            {/* Clear Cart Modal */}
            <Modal
                title="Xác nhận xóa"
                open={isModalVisible}
                onOk={() => {
                    clearCart()
                    setIsModalVisible(false)
                }}
                onCancel={() => setIsModalVisible(false)}
                okText="Xóa tất cả"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?</p>
            </Modal>
        </div>
    )
}

export default Cart
