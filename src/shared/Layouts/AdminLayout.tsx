import { Layout, Menu, Typography, Button, Space, Avatar, Dropdown } from "antd"
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { 
    DashboardOutlined, 
    ShoppingOutlined, 
    FileTextOutlined, 
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons"
import { useState } from "react"

const { Header, Sider, Content } = Layout
const { Title } = Typography

const AdminLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
        },
        {
            key: '/admin/products',
            icon: <ShoppingOutlined />,
            label: <Link to="/admin/products">Quản lý sản phẩm</Link>,
        },
        {
            key: '/admin/orders',
            icon: <FileTextOutlined />,
            label: <Link to="/admin/orders">Quản lý đơn hàng</Link>,
        },
        {
            key: '/admin/customers',
            icon: <UserOutlined />,
            label: <Link to="/admin/customers">Quản lý khách hàng</Link>,
        },
    ]

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Thông tin cá nhân',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: () => {
                localStorage.removeItem('role')
                navigate('/')
            }
        },
    ]

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ 
                    padding: '16px', 
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Title level={4} style={{ color: 'white', margin: 0 }}>
                        {collapsed ? 'LA' : 'Lualab Admin'}
                    </Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{
                        background: 'transparent',
                        border: 'none'
                    }}
                />
            </Sider>
            
            <Layout>
                <Header style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    height: '64px',
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64, color: 'white' }}
                    />
                    
                    <Space>
                        <Dropdown
                            menu={{ items: userMenuItems as any }}
                            placement="bottomRight"
                        >
                            <Space style={{ cursor: 'pointer', color: 'white' }}>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ color: 'white' }}>Admin User</span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>
                
                <Content style={{ 
                    margin: '24px 16px',
                    padding: 24,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    minHeight: 'calc(100vh - 112px)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
