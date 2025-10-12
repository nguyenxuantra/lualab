import { useState, useEffect } from "react"
import { Card, Row, Col, Typography, Rate, Space, Tag, Select, Input, Button, Pagination, Empty, message } from "antd"
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons"
import { Link, useSearchParams } from "react-router-dom"
import { products, categories, type Product } from "../data/products"

const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'All'
    const gender = searchParams.get('gender') || 'All'
    const sortBy = searchParams.get('sortBy') || 'name'

    useEffect(() => {
        let filtered = [...products]

        // Filter by search
        if (search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
            )
        }

        // Filter by category
        if (category !== 'All') {
            filtered = filtered.filter(product => product.category === category)
        }

        // Filter by gender
        if (gender !== 'All') {
            filtered = filtered.filter(product => product.gender === gender)
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price
                case 'price-high':
                    return b.price - a.price
                case 'rating':
                    return b.rating - a.rating
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        })

        setFilteredProducts(filtered)
        setCurrentPage(1)
    }, [search, category, gender, sortBy])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const handleFilterChange = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams)
        if (value === 'All' || value === '') {
            newParams.delete(key)
        } else {
            newParams.set(key, value)
        }
        setSearchParams(newParams)
    }

    const handleSearch = (value: string) => {
        const newParams = new URLSearchParams(searchParams)
        if (value) {
            newParams.set('search', value)
        } else {
            newParams.delete('search')
        }
        setSearchParams(newParams)
    }

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div style={{ 
            width: '100%', 
            maxWidth: '1200px',
            margin: '0 auto', 
            padding: '24px'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Tất cả sản phẩm</Title>
                <Paragraph style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Khám phá bộ sưu tập nước hoa đa dạng từ Lualab, từ những dòng cao cấp đến những hương thơm tươi mát
                </Paragraph>
            </div>

            {/* Filters */}
            <Card style={{ marginBottom: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Search
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            onSearch={handleSearch}
                            enterButton
                        />
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            value={category}
                            onChange={(value) => handleFilterChange('category', value)}
                            style={{ width: '100%' }}
                            placeholder="Danh mục"
                        >
                            {categories.map(cat => (
                                <Option key={cat} value={cat}>{cat}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            value={gender}
                            onChange={(value) => handleFilterChange('gender', value)}
                            style={{ width: '100%' }}
                            placeholder="Giới tính"
                        >
                            <Option value="All">Tất cả</Option>
                            <Option value="unisex">Unisex</Option>
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Select
                            value={sortBy}
                            onChange={(value) => handleFilterChange('sortBy', value)}
                            style={{ width: '100%' }}
                            placeholder="Sắp xếp"
                        >
                            <Option value="name">Tên A-Z</Option>
                            <Option value="price-low">Giá thấp đến cao</Option>
                            <Option value="price-high">Giá cao đến thấp</Option>
                            <Option value="rating">Đánh giá cao nhất</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ color: '#666' }}>
                                Hiển thị {paginatedProducts.length} / {filteredProducts.length} sản phẩm
                            </span>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
                <>
                    <Row gutter={[24, 24]} justify="start">
                        {paginatedProducts.map((product) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                <Card
                                    hoverable
                                    style={{ 
                                        height: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        border: 'none'
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
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.3s ease',
                                                    background: '#f8f9fa'
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
                                                />
                                                <Button 
                                                    type="text" 
                                                    icon={<EyeOutlined />} 
                                                    style={{ 
                                                        background: 'rgba(255,255,255,0.8)',
                                                        color: '#1890ff'
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
                                            {!product.inStock && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    left: '10px',
                                                    background: 'rgba(0,0,0,0.7)',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px'
                                                }}>
                                                    Hết hàng
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
                                            disabled={!product.inStock}
                                            onClick={() => {
                                                const cart = JSON.parse(localStorage.getItem('cart') || '[]')
                                                const existingItem = cart.find((item: any) => item.id === product.id)
                                                
                                                if (existingItem) {
                                                    existingItem.quantity += 1
                                                } else {
                                                    cart.push({ id: product.id, quantity: 1 })
                                                }
                                                
                                                localStorage.setItem('cart', JSON.stringify(cart))
                                                message.success('Đã thêm vào giỏ hàng')
                                            }}
                                        >
                                            Thêm vào giỏ
                                        </Button>
                                    ]}
                                >
                                    <Card.Meta
                                        title={
                                            <div>
                                                <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
                                                    {product.name}
                                                </Title>
                                                <Space>
                                                    <Rate disabled defaultValue={product.rating} style={{ fontSize: '14px' }} />
                                                    <span style={{ color: '#666', fontSize: '12px' }}>
                                                        ({product.reviews})
                                                    </span>
                                                </Space>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <Paragraph 
                                                    ellipsis={{ rows: 2 }} 
                                                    style={{ marginBottom: '10px', color: '#666' }}
                                                >
                                                    {product.shortDescription}
                                                </Paragraph>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <Tag color="blue" style={{ fontSize: '10px' }}>
                                                        {product.category}
                                                    </Tag>
                                                    <Tag color="green" style={{ fontSize: '10px' }}>
                                                        {product.gender}
                                                    </Tag>
                                                    {product.tags.slice(0, 1).map(tag => (
                                                        <Tag key={tag} color="purple" style={{ fontSize: '10px' }}>
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ 
                                                            fontSize: '18px', 
                                                            fontWeight: 'bold', 
                                                            color: '#1890ff' 
                                                        }}>
                                                            {formatPrice(product.price)}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span style={{ 
                                                                marginLeft: '8px', 
                                                                textDecoration: 'line-through',
                                                                color: '#999',
                                                                fontSize: '14px'
                                                            }}>
                                                                {formatPrice(product.originalPrice)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Link to={`/products/${product.id}`}>
                                                        <Button type="link" size="small">
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

                    {/* Pagination */}
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Pagination
                            current={currentPage}
                            total={filteredProducts.length}
                            pageSize={pageSize}
                            onChange={(page, size) => {
                                setCurrentPage(page)
                                setPageSize(size || 9)
                            }}
                            showSizeChanger
                            showQuickJumper
                            showTotal={(total, range) => 
                                `${range[0]}-${range[1]} của ${total} sản phẩm`
                            }
                        />
                    </div>
                </>
            ) : (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '400px',
                    width: '100%'
                }}>
                    <Empty
                        description="Không tìm thấy sản phẩm nào"
                        style={{ margin: '60px 0' }}
                    >
                        <Button type="primary" onClick={() => {
                            setSearchParams(new URLSearchParams())
                        }}>
                            Xóa bộ lọc
                        </Button>
                    </Empty>
                </div>
            )}
        </div>
    )
}

export default Products
