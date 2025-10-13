import { useState } from "react"
import { Form, Input, Button, Card, Typography, Space, Divider, message } from "antd"
import { UserOutlined, LockOutlined, ShopOutlined, SettingOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const Login = () => {
    const [form] = Form.useForm()
    const [loginType, setLoginType] = useState<'user' | 'admin'>('user')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (values: any) => {
        setLoading(true)
        
        // Simulate API call
        setTimeout(() => {
            if (loginType === 'admin') {
                // Admin login logic
                if (values.username === 'admin' && values.password === 'admin123') {
                    message.success('Đăng nhập admin thành công!')
                    navigate('/admin')
                } else {
                    message.error('Tài khoản hoặc mật khẩu không đúng!')
                }
            } else {
                // User login logic
                if (values.username === 'user' && values.password === 'user123') {
                    message.success('Đăng nhập thành công!')
                    navigate('/')
                } else {
                    message.error('Tài khoản hoặc mật khẩu không đúng!')
                }
            }
            setLoading(false)
        }, 1000)
    }


    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    border: 'none'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}>
                        <UserOutlined style={{ fontSize: '32px', color: 'white' }} />
                    </div>
                    <Title level={2} style={{ 
                        margin: 0,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Lualab
                    </Title>
                    <Text type="secondary" style={{ fontSize: '16px' }}>
                        Đăng nhập vào hệ thống
                    </Text>
                </div>

                {/* Login Type Selector */}
                <div style={{ marginBottom: '24px' }}>
                    <Space size="large" style={{ width: '100%', justifyContent: 'center' }}>
                        <Button
                            type={loginType === 'user' ? 'primary' : 'default'}
                            icon={<ShopOutlined />}
                            onClick={() => setLoginType('user')}
                            style={{
                                background: loginType === 'user' 
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                    : 'transparent',
                                border: loginType === 'user' ? 'none' : '1px solid #d9d9d9',
                                borderRadius: '8px',
                                height: '40px',
                                padding: '0 20px'
                            }}
                        >
                            Khách hàng
                        </Button>
                        <Button
                            type={loginType === 'admin' ? 'primary' : 'default'}
                            icon={<SettingOutlined />}
                            onClick={() => setLoginType('admin')}
                            style={{
                                background: loginType === 'admin' 
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                    : 'transparent',
                                border: loginType === 'admin' ? 'none' : '1px solid #d9d9d9',
                                borderRadius: '8px',
                                height: '40px',
                                padding: '0 20px'
                            }}
                        >
                            Quản trị viên
                        </Button>
                    </Space>
                </div>

                <Form
                    form={form}
                    name="login"
                    onFinish={handleLogin}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nhập tên đăng nhập"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Nhập mật khẩu"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                width: '100%',
                                height: '45px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <Divider>Hoặc</Divider>

               
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Chưa có tài khoản? <a href="#" style={{ color: '#667eea' }}>Đăng ký ngay</a>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default Login
