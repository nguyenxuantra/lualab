

import { Button, Card, Row, Col, Typography, Rate, Space, Tag, message } from "antd"
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { featuredProducts } from "../data/products"
import banner from "../assets/banner.png"

const { Title, Paragraph } = Typography

const Home = () => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    return (
        <div style={{ width: '100%', maxWidth: '100%' }}>
            {/* Hero Section with Banner */}
            <div style={{
                position: 'relative',
                marginBottom: '40px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
                {/* Banner Image */}
                <div style={{
                    position: 'relative',
                    height: '400px',
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            padding: '0 24px',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            <Title level={1} style={{
                                color: 'white',
                                fontSize: '3rem',
                                marginBottom: '16px',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                Lualab
                            </Title>
                            <Title level={2} style={{
                                color: 'white',
                                fontWeight: 'normal',
                                marginBottom: '20px',
                                fontSize: '1.8rem',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                            }}>
                                Thương hiệu nước hoa cao cấp
                            </Title>
                            <Paragraph style={{
                                color: 'white',
                                fontSize: '1.2rem',
                                marginBottom: '32px',
                                opacity: 0.95,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                            }}>
                                Khám phá bộ sưu tập nước hoa độc đáo với những hương thơm tinh tế
                            </Paragraph>
                            <Space size="large">
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        background: 'white',
                                        color: '#667eea',
                                        border: 'none',
                                        height: '50px',
                                        padding: '0 32px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        borderRadius: '25px',
                                        boxShadow: '0 4px 15px rgba(255,255,255,0.3)'
                                    }}
                                >
                                    <Link to="/products" style={{ color: '#667eea' }}>
                                        Khám phá ngay
                                    </Link>
                                </Button>
                                <Button
                                    size="large"
                                    style={{
                                        background: 'transparent',
                                        color: 'white',
                                        border: '2px solid white',
                                        height: '50px',
                                        padding: '0 32px',
                                        fontSize: '16px',
                                        borderRadius: '25px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Tìm hiểu thêm
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                width: '100%'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Sản phẩm nổi bật</Title>
                    <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Những dòng nước hoa được yêu thích nhất từ Lualab, được chọn lọc kỹ càng từ bộ sưu tập đa dạng của chúng tôi
                    </Paragraph>
                </div>

                <Row gutter={[16, 16]}>
                    {featuredProducts.slice(0, 12).map((product) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        border: 'none',
                                        transform: 'translateY(0)',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                    }}
                                    cover={
                                        <div style={{
                                            height: '180px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            borderRadius: '12px 12px 0 0'
                                        }}>
                                            <img
                                                alt={product.name}
                                                src={product.images[0]}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px'
                                            }}>
                                                <Button
                                                    type="text"
                                                    icon={<HeartOutlined />}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.8)',
                                                        color: '#ff4d4f'
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // TODO: Add to wishlist functionality
                                                    }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<EyeOutlined />}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.8)',
                                                        color: '#1890ff'
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // TODO: Quick view functionality
                                                    }}
                                                />
                                            </div>
                                            {product.originalPrice && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: '10px',
                                                    background: '#ff4d4f',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                                </div>
                                            )}
                                        </div>
                                    }
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined />}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '6px',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const cart = JSON.parse(localStorage.getItem('cart') || '[]')
                                                const existingItem = cart.find((item: any) => item.id === product.id)

                                                if (existingItem) {
                                                    existingItem.quantity += 1
                                                } else {
                                                    cart.push({ id: product.id, quantity: 1 })
                                                }

                                            localStorage.setItem('cart', JSON.stringify(cart))
                                            message.success('Đã thêm vào giỏ hàng')
                                            window.dispatchEvent(new Event('cartUpdated'))
                                            }}
                                        >
                                            Thêm vào giỏ
                                        </Button>
                                    ]}
                                >
                                    <Card.Meta
                                        title={
                                            <div>
                                                <Title level={5} style={{ margin: 0, marginBottom: '4px', fontSize: '14px' }}>
                                                    {product.name}
                                                </Title>
                                                <Space>
                                                    <Rate disabled defaultValue={product.rating} style={{ fontSize: '12px' }} />
                                                    <span style={{ color: '#666', fontSize: '10px' }}>
                                                        ({product.reviews})
                                                    </span>
                                                </Space>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <Paragraph
                                                    ellipsis={{ rows: 1 }}
                                                    style={{ marginBottom: '6px', color: '#666', fontSize: '12px' }}
                                                >
                                                    {product.shortDescription}
                                                </Paragraph>
                                                <div style={{ marginBottom: '6px' }}>
                                                    {product.tags.slice(0, 1).map(tag => (
                                                        <Tag key={tag} color="blue" style={{ fontSize: '8px', padding: '1px 4px' }}>
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{
                                                            fontSize: '14px',
                                                            fontWeight: 'bold',
                                                            color: '#1890ff'
                                                        }}>
                                                            {formatPrice(product.price)}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span style={{
                                                                marginLeft: '4px',
                                                                textDecoration: 'line-through',
                                                                color: '#999',
                                                                fontSize: '10px'
                                                            }}>
                                                                {formatPrice(product.originalPrice)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

                <div style={{ textAlign: 'center', marginTop: '60px' }}>
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
                        <Link to="/products" style={{ color: 'white' }}>
                            Xem tất cả sản phẩm
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Brand Story Section */}
            <div style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: '80px 24px',
                marginTop: '60px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Title level={2}>Câu chuyện thương hiệu</Title>
                    <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                        Lualab được thành lập với tầm nhìn mang đến những trải nghiệm khứu giác tuyệt vời nhất.
                        Chúng tôi tin rằng mỗi người đều xứng đáng có được một mùi hương đặc biệt,
                        phản ánh cá tính và phong cách riêng của mình.
                    </Paragraph>
                    <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                        Với đội ngũ chuyên gia giàu kinh nghiệm và những nguyên liệu cao cấp từ khắp nơi trên thế giới,
                        Lualab cam kết mang đến những sản phẩm chất lượng nhất,
                        giúp bạn tỏa sáng trong mọi khoảnh khắc.
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}

export default Home;