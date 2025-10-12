import { Card, Row, Col, Typography, Space, Avatar, Timeline, Statistic } from "antd"
import { 
    TeamOutlined, 
    TrophyOutlined, 
    HeartOutlined, 
    StarOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined
} from "@ant-design/icons"

const { Title, Paragraph } = Typography

const About = () => {
    const teamMembers = [
        {
            name: "Nguyễn Văn A",
            position: "CEO & Founder",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=A",
            description: "Với hơn 10 năm kinh nghiệm trong ngành nước hoa, anh A đã xây dựng Lualab từ một ý tưởng nhỏ thành thương hiệu được yêu thích."
        },
        {
            name: "Trần Thị B",
            position: "Creative Director",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=B",
            description: "Chuyên gia về hương thơm với khả năng tạo ra những mùi hương độc đáo và ấn tượng, cô B là linh hồn sáng tạo của Lualab."
        },
        {
            name: "Lê Văn C",
            position: "Head of Production",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=C",
            description: "Đảm bảo chất lượng sản phẩm từ khâu nguyên liệu đến thành phẩm, anh C cam kết mang đến những sản phẩm tốt nhất."
        },
        {
            name: "Phạm Thị D",
            position: "Marketing Director",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=D",
            description: "Với tầm nhìn marketing sắc bén, cô D đã giúp Lualab tiếp cận và kết nối với hàng nghìn khách hàng yêu thích nước hoa."
        }
    ]

    const achievements = [
        {
            year: "2020",
            title: "Thành lập Lualab",
            description: "Khởi đầu với tầm nhìn mang đến những trải nghiệm khứu giác tuyệt vời"
        },
        {
            year: "2021",
            title: "Ra mắt dòng sản phẩm đầu tiên",
            description: "Lualab Signature - dòng nước hoa cao cấp đầu tiên được khách hàng đón nhận"
        },
        {
            year: "2022",
            title: "Mở rộng thị trường",
            description: "Mở rộng ra 5 tỉnh thành lớn với hơn 50 điểm bán hàng"
        },
        {
            year: "2023",
            title: "Đạt 10,000 khách hàng",
            description: "Cột mốc quan trọng với 10,000 khách hàng tin tưởng và yêu thích"
        },
        {
            year: "2024",
            title: "Phát triển thương hiệu",
            description: "Tiếp tục phát triển với nhiều dòng sản phẩm mới và dịch vụ chuyên nghiệp"
        }
    ]

    const values = [
        {
            icon: <HeartOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />,
            title: "Đam mê",
            description: "Chúng tôi đam mê với nghệ thuật tạo ra những mùi hương độc đáo và ý nghĩa"
        },
        {
            icon: <StarOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
            title: "Chất lượng",
            description: "Cam kết mang đến những sản phẩm chất lượng cao với nguyên liệu tốt nhất"
        },
        {
            icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            title: "Đồng hành",
            description: "Luôn đồng hành cùng khách hàng trong hành trình khám phá hương thơm"
        },
        {
            icon: <TrophyOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
            title: "Xuất sắc",
            description: "Không ngừng cải tiến và phấn đấu để mang đến trải nghiệm xuất sắc nhất"
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
                    Về Lualab
                </Title>
                <Title level={3} style={{ color: 'white', fontWeight: 'normal', marginBottom: '24px', fontSize: '1.5rem' }}>
                    Thương hiệu nước hoa cao cấp với tình yêu và đam mê
                </Title>
                <Paragraph style={{ 
                    color: 'white', 
                    fontSize: '1.2rem', 
                    marginBottom: '0',
                    opacity: 0.9,
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    Từ những ngày đầu thành lập, Lualab đã không ngừng phấn đấu để trở thành thương hiệu nước hoa 
                    được tin tưởng và yêu thích nhất tại Việt Nam.
                </Paragraph>
            </div>

            {/* Story Section */}
            <Card style={{ 
                marginBottom: '60px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <Row gutter={[48, 48]} align="middle">
                    <Col xs={24} lg={12}>
                        <div>
                            <Title level={2} style={{ 
                                marginBottom: '24px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Câu chuyện của chúng tôi
                            </Title>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                                Lualab được sinh ra từ tình yêu đặc biệt với nghệ thuật tạo ra những mùi hương. 
                                Chúng tôi tin rằng mỗi người đều có một mùi hương riêng, phản ánh cá tính và phong cách của họ.
                            </Paragraph>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                                Với đội ngũ chuyên gia giàu kinh nghiệm và những nguyên liệu cao cấp từ khắp nơi trên thế giới, 
                                chúng tôi cam kết mang đến những sản phẩm chất lượng nhất.
                            </Paragraph>
                            <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                                Từ những ngày đầu với chỉ một vài sản phẩm, đến nay Lualab đã có hơn 50 dòng nước hoa 
                                và phục vụ hàng nghìn khách hàng yêu thích hương thơm.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                            padding: '40px',
                            borderRadius: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌸</div>
                            <Title level={3} style={{ color: '#2c3e50' }}>Sứ mệnh của chúng tôi</Title>
                            <Paragraph style={{ fontSize: '1.1rem', color: '#666', margin: 0 }}>
                                "Mang đến những trải nghiệm khứu giác tuyệt vời, giúp mỗi người tìm thấy 
                                mùi hương phù hợp với cá tính và phong cách riêng của mình."
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Statistics */}
            <Row gutter={[24, 24]} style={{ marginBottom: '60px' }}>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        textAlign: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Khách hàng"
                            value={10000}
                            suffix="+"
                            valueStyle={{ color: '#1890ff', fontSize: '2rem' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        textAlign: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Sản phẩm"
                            value={50}
                            suffix="+"
                            valueStyle={{ color: '#52c41a', fontSize: '2rem' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        textAlign: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Năm kinh nghiệm"
                            value={4}
                            suffix="+"
                            valueStyle={{ color: '#fa8c16', fontSize: '2rem' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card style={{ 
                        textAlign: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        border: 'none'
                    }}>
                        <Statistic
                            title="Điểm bán hàng"
                            value={50}
                            suffix="+"
                            valueStyle={{ color: '#722ed1', fontSize: '2rem' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Values Section */}
            <Card style={{ 
                marginBottom: '60px',
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
                    Giá trị cốt lõi
                </Title>
                <Row gutter={[32, 32]}>
                    {values.map((value, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    {value.icon}
                                </div>
                                <Title level={4} style={{ marginBottom: '12px' }}>{value.title}</Title>
                                <Paragraph style={{ color: '#666', margin: 0 }}>
                                    {value.description}
                                </Paragraph>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Team Section */}
            <Card style={{ 
                marginBottom: '60px',
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
                    Đội ngũ của chúng tôi
                </Title>
                <Row gutter={[32, 32]}>
                    {teamMembers.map((member, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <Card
                                style={{ 
                                    textAlign: 'center',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                    border: 'none',
                                    height: '100%'
                                }}
                                hoverable
                            >
                                <Avatar
                                    size={80}
                                    src={member.avatar}
                                    style={{ marginBottom: '16px' }}
                                />
                                <Title level={4} style={{ marginBottom: '8px' }}>{member.name}</Title>
                                <Paragraph style={{ 
                                    color: '#1890ff', 
                                    fontWeight: 'bold',
                                    marginBottom: '12px'
                                }}>
                                    {member.position}
                                </Paragraph>
                                <Paragraph style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                    {member.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Timeline */}
            <Card style={{ 
                marginBottom: '60px',
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
                    Hành trình phát triển
                </Title>
                <Timeline
                    items={achievements.map((achievement, index) => ({
                        color: '#667eea',
                        children: (
                            <div>
                                <Title level={4} style={{ marginBottom: '8px', color: '#1890ff' }}>
                                    {achievement.year} - {achievement.title}
                                </Title>
                                <Paragraph style={{ color: '#666', margin: 0 }}>
                                    {achievement.description}
                                </Paragraph>
                            </div>
                        )
                    }))}
                />
            </Card>

            {/* Contact Info */}
            <Card style={{ 
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: 'none',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
                <Title level={2} style={{ 
                    textAlign: 'center',
                    marginBottom: '32px',
                    color: '#2c3e50'
                }}>
                    Kết nối với chúng tôi
                </Title>
                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: 'center' }}>
                            <EnvironmentOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '12px' }} />
                            <Title level={4} style={{ marginBottom: '8px' }}>Địa chỉ</Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                123 Đường ABC, Quận 1<br />
                                TP. Hồ Chí Minh, Việt Nam
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: 'center' }}>
                            <PhoneOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
                            <Title level={4} style={{ marginBottom: '8px' }}>Điện thoại</Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                +84 123 456 789<br />
                                +84 987 654 321
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: 'center' }}>
                            <MailOutlined style={{ fontSize: '32px', color: '#fa8c16', marginBottom: '12px' }} />
                            <Title level={4} style={{ marginBottom: '8px' }}>Email</Title>
                            <Paragraph style={{ color: '#666', margin: 0 }}>
                                info@lualab.com<br />
                                support@lualab.com
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default About
