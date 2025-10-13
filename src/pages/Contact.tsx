import { useState } from "react"
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Form, 
    Input, 
    Button, 
    message,
    Space
} from "antd"
import { 
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    ClockCircleOutlined,
    SendOutlined,
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    MessageOutlined
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const Contact = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        
        // Simulate API call
        setTimeout(() => {
            message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.')
            form.resetFields()
            setLoading(false)
        }, 1000)
    }

    const contactInfo = [
        {
            icon: <EnvironmentOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
            title: 'Địa chỉ',
            content: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh, Việt Nam',
            description: 'Showroom chính của Lualab'
        },
        {
            icon: <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            title: 'Điện thoại',
            content: '+84 123 456 789',
            description: 'Hotline: 8:00 - 22:00 (Hàng ngày)'
        },
        {
            icon: <MailOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
            title: 'Email',
            content: 'info@lualab.com',
            description: 'Phản hồi trong 24h'
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
            title: 'Giờ làm việc',
            content: '8:00 - 22:00',
            description: 'Thứ 2 - Chủ nhật'
        }
    ]

    const socialLinks = [
        {
            icon: <FacebookOutlined style={{ fontSize: '20px' }} />,
            name: 'Facebook',
            url: '#',
            color: '#1877f2'
        },
        {
            icon: <InstagramOutlined style={{ fontSize: '20px' }} />,
            name: 'Instagram',
            url: '#',
            color: '#e4405f'
        },
        {
            icon: <YoutubeOutlined style={{ fontSize: '20px' }} />,
            name: 'YouTube',
            url: '#',
            color: '#ff0000'
        },
        {
            icon: <MessageOutlined style={{ fontSize: '20px' }} />,
            name: 'Zalo',
            url: '#',
            color: '#0068ff'
        }
    ]

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '60px 40px',
                textAlign: 'center',
                borderRadius: '16px',
                marginBottom: '60px'
            }}>
                <Title level={1} style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
                    Liên hệ với chúng tôi
                </Title>
                <Title level={3} style={{ color: 'white', fontWeight: 'normal', marginBottom: '24px', fontSize: '1.5rem' }}>
                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
                </Title>
                <Paragraph style={{ 
                    color: 'white', 
                    fontSize: '1.2rem', 
                    marginBottom: '0',
                    opacity: 0.9,
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Có câu hỏi về sản phẩm? Cần tư vấn chọn nước hoa phù hợp? 
                    Hãy liên hệ với chúng tôi ngay hôm nay!
                </Paragraph>
            </div>

            <Row gutter={[48, 48]}>
                {/* Contact Form */}
                <Col xs={24} lg={14}>
                    <Card style={{ 
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: 'none',
                        height: '100%'
                    }}>
                        <Title level={2} style={{ 
                            marginBottom: '32px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Gửi tin nhắn cho chúng tôi
                        </Title>
                        
                        <Form
                            form={form}
                            name="contact"
                            onFinish={handleSubmit}
                            layout="vertical"
                            size="large"
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="name"
                                        label="Họ và tên"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                    >
                                        <Input 
                                            placeholder="Nhập họ và tên"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập email!' },
                                            { type: 'email', message: 'Email không hợp lệ!' }
                                        ]}
                                    >
                                        <Input 
                                            placeholder="Nhập email"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                    >
                                        <Input 
                                            placeholder="Nhập số điện thoại"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="subject"
                                        label="Chủ đề"
                                        rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                                    >
                                        <Input 
                                            placeholder="Nhập chủ đề"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="message"
                                label="Nội dung tin nhắn"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="Nhập nội dung tin nhắn của bạn..."
                                    style={{ borderRadius: '8px' }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    icon={<SendOutlined />}
                                    style={{
                                        width: '100%',
                                        height: '50px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    Gửi tin nhắn
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* Contact Information */}
                <Col xs={24} lg={10}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* Contact Info Cards */}
                        {contactInfo.map((info, index) => (
                            <Card
                                key={index}
                                style={{ 
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                    border: 'none'
                                }}
                                hoverable
                            >
                                <Space size="middle">
                                    <div style={{ 
                                        width: '60px', 
                                        height: '60px', 
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <Title level={4} style={{ marginBottom: '4px' }}>
                                            {info.title}
                                        </Title>
                                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>
                                            {info.content}
                                        </Text>
                                        <Text type="secondary" style={{ fontSize: '14px' }}>
                                            {info.description}
                                        </Text>
                                    </div>
                                </Space>
                            </Card>
                        ))}

                        {/* Social Media */}
                        <Card style={{ 
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}>
                            <Title level={4} style={{ marginBottom: '20px', textAlign: 'center' }}>
                                Kết nối với chúng tôi
                            </Title>
                            <Row gutter={[16, 16]}>
                                {socialLinks.map((social, index) => (
                                    <Col span={12} key={index}>
                                        <Button
                                            type="text"
                                            icon={social.icon}
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                                color: social.color,
                                                fontSize: '16px',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => window.open(social.url, '_blank')}
                                        >
                                            {social.name}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </Card>

                        {/* Map Placeholder */}
                        <Card style={{ 
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}>
                            <Title level={4} style={{ marginBottom: '20px', textAlign: 'center' }}>
                                Vị trí của chúng tôi
                            </Title>
                            <div style={{
                                height: '200px',
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
                                    <div>Bản đồ sẽ được hiển thị ở đây</div>
                                </div>
                            </div>
                        </Card>
                    </Space>
                </Col>
            </Row>

            {/* FAQ Section */}
            <Card style={{ 
                marginTop: '60px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <Title level={2} style={{ 
                    textAlign: 'center',
                    marginBottom: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Câu hỏi thường gặp
                </Title>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <div style={{ padding: '20px' }}>
                            <Title level={4} style={{ color: '#1890ff', marginBottom: '12px' }}>
                                Làm thế nào để chọn nước hoa phù hợp?
                            </Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                Chúng tôi có đội ngũ tư vấn chuyên nghiệp sẽ giúp bạn chọn ra mùi hương 
                                phù hợp với cá tính và phong cách của bạn.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ padding: '20px' }}>
                            <Title level={4} style={{ color: '#1890ff', marginBottom: '12px' }}>
                                Thời gian giao hàng là bao lâu?
                            </Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                Đối với đơn hàng trong TP.HCM: 1-2 ngày. 
                                Các tỉnh thành khác: 3-5 ngày làm việc.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ padding: '20px' }}>
                            <Title level={4} style={{ color: '#1890ff', marginBottom: '12px' }}>
                                Có chính sách đổi trả không?
                            </Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                Chúng tôi có chính sách đổi trả trong vòng 7 ngày nếu sản phẩm 
                                còn nguyên vẹn và có hóa đơn mua hàng.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ padding: '20px' }}>
                            <Title level={4} style={{ color: '#1890ff', marginBottom: '12px' }}>
                                Có thể test nước hoa trước khi mua không?
                            </Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                Tại showroom của chúng tôi, bạn có thể test tất cả các sản phẩm 
                                trước khi quyết định mua.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Contact
