import { Layout, Menu, Input, Button, Badge, Space, Typography } from "antd"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { ShoppingCartOutlined, UserOutlined, HeartOutlined } from "@ant-design/icons"
import { useState } from "react"
import logo from "../../assets/logo.webp";

const { Header, Content, Footer } = Layout
const { Title } = Typography

const MainLayout = () => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchValue)}`)
        }
    }

    const menuItems = [
        {
            key: 'home',
            label: <Link to="/">Trang chủ</Link>,
        },
        {
            key: 'products',
            label: <Link to="/products">Sản phẩm</Link>,
        },
        {
            key: 'about',
            label: <Link to="/about">Về chúng tôi</Link>,
        },
        {
            key: 'contact',
            label: <Link to="/contact">Liên hệ</Link>,
        },
    ]

    return (
        <Layout style={{ minHeight: '100vh', width: '100%', maxWidth: '100%' }}>
            <Header style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                height: '64px',
                lineHeight: '64px',
                
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
                        <img 
                            src={logo}
                            alt="Lualab Logo" 
                            style={{ height: '40px', marginRight: '12px' }}
                        />
                        <Title level={3} style={{ color: 'white', margin: 0 }}>
                            Lualab
                        </Title>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={menuItems}
                        style={{ 
                            background: 'transparent',
                            border: 'none',
                            flex: 1
                        }}
                    />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Space size="middle" align="center">
                        <Input.Search
                            placeholder="Tìm kiếm nước hoa..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onSearch={handleSearch}
                            style={{ width: 300, 
                                marginTop: '15px'
                             }}
                            enterButton
                        />
                        <Button type="text" icon={<HeartOutlined />} style={{ color: 'white' }} />
                    <Badge count={0} showZero>
                        <Link to="/cart">
                            <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: 'white' }} />
                        </Link>
                    </Badge>
                                <Button 
                                    type="text" 
                                    icon={<UserOutlined />} 
                                    style={{ color: 'white' }}
                                    onClick={() => navigate('/login')}
                                >
                                    Đăng nhập
                                </Button>
                    </Space>
                </div>
            </Header>

            <Content style={{ 
                background: '#f5f5f5', 
                minHeight: 'calc(100vh - 64px - 69px)',
                width: '100%',
                maxWidth: '100%'
            }}>
                <Outlet />
            </Content>

            <Footer style={{ 
                background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                color: 'white',
                textAlign: 'center',
                padding: '40px 24px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Title level={3} style={{ color: 'white', marginBottom: '20px' }}>
                        Lualab - Thương hiệu nước hoa cao cấp
                    </Title>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                        <div>
                            <Title level={5} style={{ color: 'white' }}>Thông tin</Title>
                            <p>Về chúng tôi</p>
                            <p>Chính sách bảo mật</p>
                            <p>Điều khoản sử dụng</p>
                        </div>
                        <div>
                            <Title level={5} style={{ color: 'white' }}>Hỗ trợ</Title>
                            <p>Liên hệ</p>
                            <p>Hướng dẫn mua hàng</p>
                            <p>Chính sách đổi trả</p>
                        </div>
                        <div>
                            <Title level={5} style={{ color: 'white' }}>Kết nối</Title>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Zalo</p>
                        </div>
                    </div>
                    <p style={{ margin: 0, opacity: 0.8 }}>
                        © 2024 Lualab. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </Footer>
        </Layout>
    )
}

export default MainLayout;