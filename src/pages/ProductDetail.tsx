import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Rate, 
    Space, 
    Tag, 
    Button, 
    InputNumber, 
    Tabs,
    Image,
    Empty,
    Breadcrumb,
    message
} from "antd"
import { 
    ShoppingCartOutlined, 
    HeartOutlined, 
    ShareAltOutlined,
} from "@ant-design/icons"
import { products, type Product } from "../data/products"

const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product| null>(null)
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id || '0'))
        if(foundProduct){
            setProduct(foundProduct)
            setIsLoading(false)
        }
    }, [id])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const handleAddToCart = () => {
        if (!product) return
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingItem = cart.find((item: any) => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.push({ id: product.id, quantity })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        message.success('Đã thêm vào giỏ hàng')
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const handleWishlist = () => {
        // TODO: Implement wishlist functionality
        console.log('Add to wishlist:', product?.name)
    }

    const handleShare = () => {
        // TODO: Implement share functionality
        console.log('Share product:', product?.name)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!product) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                <Empty description="Sản phẩm không tồn tại" />
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
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: '24px' }}>
                <Breadcrumb.Item>
                    <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/products">Sản phẩm</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[32, 32]}>
                {/* Product Image */}
                <Col xs={24} lg={10}>
                    <div style={{ 
                        position: 'sticky', 
                        top: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Main Image */}
                        <div style={{ 
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            background: 'white',
                            padding: '20px',
                            width: '100%',
                            maxWidth: '500px'
                        }}>
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                style={{ 
                                    width: '100%', 
                                    height: '450px', 
                                    objectFit: 'contain',
                                    borderRadius: '12px'
                                }}
                                preview={{
                                    mask: <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Xem ảnh lớn</div>
                                }}
                            />
                        </div>
                    </div>
                </Col>

                {/* Product Info */}
                <Col xs={24} lg={14}>
                    <div style={{ padding: '20px 0' }}>
                        {/* Product Title */}
                        <Title level={1} style={{ marginBottom: '16px', fontSize: '2.2rem', lineHeight: '1.2' }}>
                            {product.name}
                        </Title>
                        
                        {/* Brand */}
                        <Text type="secondary" style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
                            Thương hiệu: <Text strong style={{ color: '#1890ff' }}>{product.brand}</Text>
                        </Text>

                        {/* Rating */}
                        <Space style={{ marginBottom: '20px' }}>
                            <Rate disabled defaultValue={product.rating} style={{ fontSize: '16px' }} />
                            <Text style={{ fontSize: '14px' }}>({product.reviews} đánh giá)</Text>
                        </Space>

                        {/* Price */}
                        <div style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', borderRadius: '10px' }}>
                            <Space size="large" align="baseline">
                                <Title level={2} style={{ color: '#1890ff', margin: 0, fontSize: '1.8rem' }}>
                                    {formatPrice(product.price)}
                                </Title>
                                {product.originalPrice && (
                                    <Text delete style={{ fontSize: '16px', color: '#999' }}>
                                        {formatPrice(product.originalPrice)}
                                    </Text>
                                )}
                            </Space>
                            {product.originalPrice && (
                                <div style={{ marginTop: '8px' }}>
                                    <Tag color="red" style={{ fontSize: '14px', padding: '2px 8px' }}>
                                        Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                                    </Tag>
                                </div>
                            )}
                        </div>

                        {/* Product Tags */}
                        <div style={{ marginBottom: '20px' }}>
                            <Space wrap>
                                <Tag color="blue" style={{ fontSize: '12px', padding: '2px 8px' }}>{product.category}</Tag>
                                <Tag color="green" style={{ fontSize: '12px', padding: '2px 8px' }}>{product.gender}</Tag>
                                <Tag color="purple" style={{ fontSize: '12px', padding: '2px 8px' }}>{product.size}</Tag>
                                {product.tags.map(tag => (
                                    <Tag key={tag} color="orange" style={{ fontSize: '12px', padding: '2px 8px' }}>{tag}</Tag>
                                ))}
                            </Space>
                        </div>

                        {/* Short Description */}
                        <Paragraph style={{ fontSize: '16px', marginBottom: '24px', lineHeight: '1.5', color: '#666' }}>
                            {product.shortDescription}
                        </Paragraph>

                        {/* Quantity and Add to Cart */}
                        <div style={{ marginBottom: '24px' }}>
                            <Row gutter={[16, 16]} align="middle">
                                <Col>
                                    <Text strong style={{ fontSize: '14px' }}>Số lượng:</Text>
                                </Col>
                                <Col>
                                    <InputNumber
                                        min={1}
                                        max={10}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value || 1)}
                                        style={{ width: '80px', height: '36px' }}
                                        size="middle"
                                    />
                                </Col>
                                <Col flex="auto">
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                        style={{ 
                                            width: '100%',
                                            height: '44px',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            borderRadius: '6px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            boxShadow: '0 3px 12px rgba(102, 126, 234, 0.3)'
                                        }}
                                    >
                                        {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        {/* Action Buttons */}
                        <Space size="middle" style={{ marginBottom: '40px' }}>
                            <Button
                                icon={<HeartOutlined />}
                                onClick={handleWishlist}
                                style={{ 
                                    width: '140px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Yêu thích
                            </Button>
                            <Button
                                icon={<ShareAltOutlined />}
                                onClick={handleShare}
                                style={{ 
                                    width: '140px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Chia sẻ
                            </Button>
                        </Space>

                        {/* Product Details */}
                        <Card 
                            title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Thông tin sản phẩm</span>} 
                            style={{ 
                                marginBottom: '32px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={12}>
                                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <Text strong style={{ fontSize: '16px' }}>Dung tích:</Text>
                                        <br />
                                        <Text style={{ fontSize: '16px' }}>{product.volume}</Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <Text strong style={{ fontSize: '16px' }}>Giới tính:</Text>
                                        <br />
                                        <Text style={{ fontSize: '16px' }}>{product.gender === 'unisex' ? 'Unisex' : product.gender === 'male' ? 'Nam' : 'Nữ'}</Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <Text strong style={{ fontSize: '16px' }}>Danh mục:</Text>
                                        <br />
                                        <Text style={{ fontSize: '16px' }}>{product.category}</Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <Text strong style={{ fontSize: '16px' }}>Tình trạng:</Text>
                                        <br />
                                        <Text style={{ 
                                            fontSize: '16px',
                                            color: product.inStock ? '#52c41a' : '#ff4d4f',
                                            fontWeight: 'bold'
                                        }}>
                                            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                                        </Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>

            {/* Product Details Tabs */}
            <div style={{ marginTop: '60px' }}>
                <Tabs 
                    defaultActiveKey="description"
                    size="large"
                    style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                    <TabPane tab={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Mô tả sản phẩm</span>} key="description">
                        <div style={{ padding: '20px 0' }}>
                            <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', color: '#666' }}>
                                {product.description}
                            </Paragraph>
                        </div>
                    </TabPane>
                    
                    <TabPane tab={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Thành phần hương thơm</span>} key="notes">
                        <div style={{ padding: '20px 0' }}>
                            <Title level={3} style={{ marginBottom: '24px' }}>Các tầng hương:</Title>
                            <Row gutter={[16, 16]}>
                                {product.notes.map((note: string, index: number) => (
                                    <Col key={index} xs={24} sm={12} md={8}>
                                        <Card 
                                            size="small" 
                                            style={{ 
                                                textAlign: 'center',
                                                borderRadius: '8px',
                                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                                border: 'none'
                                            }}
                                        >
                                            <Text strong style={{ fontSize: '16px' }}>{note}</Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </TabPane>
                    
                    <TabPane tab={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đánh giá</span>} key="reviews">
                        <div style={{ padding: '20px 0' }}>
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <Title level={3} style={{ marginBottom: '24px' }}>Đánh giá sản phẩm</Title>
                                <Space direction="vertical" size="large">
                                    <div>
                                        <Rate disabled defaultValue={product.rating} style={{ fontSize: '28px' }} />
                                        <Title level={3} style={{ margin: '12px 0 0 0' }}>
                                            {product.rating}/5 ({product.reviews} đánh giá)
                                        </Title>
                                    </div>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        style={{
                                            height: '50px',
                                            padding: '0 40px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            borderRadius: '25px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                        }}
                                    >
                                        Viết đánh giá
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>

            {/* Related Products */}
            <div style={{ marginTop: '60px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
                    Sản phẩm liên quan
                </Title>
                <Row gutter={[24, 24]}>
                    {products
                        .filter(p => p.id !== product.id && p.category === product.category)
                        .slice(0, 4)
                        .map((relatedProduct) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={relatedProduct.id}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        border: 'none'
                                    }}
                                    cover={
                                        <div style={{ 
                                            height: '220px', 
                                            overflow: 'hidden',
                                            borderRadius: '12px 12px 0 0'
                                        }}>
                                            <img
                                                alt={relatedProduct.name}
                                                src={relatedProduct.images[0]}
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    }
                                >
                                    <Card.Meta
                                        title={
                                            <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
                                                {relatedProduct.name}
                                            </Title>
                                        }
                                        description={
                                            <div>
                                                <div style={{ marginBottom: '12px' }}>
                                                    <Rate disabled defaultValue={relatedProduct.rating} style={{ fontSize: '14px' }} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                                                        {formatPrice(relatedProduct.price)}
                                                    </Text>
                                                    <Link to={`/products/${relatedProduct.id}`}>
                                                        <Button 
                                                            type="primary" 
                                                            size="small"
                                                            style={{
                                                                borderRadius: '6px',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            Xem chi tiết
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default ProductDetail
