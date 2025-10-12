import { useState } from "react"
import { 
    Card, 
    Table, 
    Button, 
    Space, 
    Tag, 
    Image, 
    Modal, 
    Form, 
    Input, 
    Select, 
    InputNumber, 
    Switch,
    message,
    Popconfirm,
    Typography,
    Row,
    Col
} from "antd"
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    EyeOutlined,
    SearchOutlined
} from "@ant-design/icons"
import { products } from "../../data/products"

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

const ProductManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    const handleAdd = () => {
        setEditingProduct(null)
        form.resetFields()
        setIsModalVisible(true)
    }

    const handleEdit = (record: any) => {
        setEditingProduct(record)
        form.setFieldsValue(record)
        setIsModalVisible(true)
    }

    const handleDelete = (id: number) => {
        message.success('Đã xóa sản phẩm')
    }

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingProduct) {
                message.success('Đã cập nhật sản phẩm')
            } else {
                message.success('Đã thêm sản phẩm mới')
            }
            setIsModalVisible(false)
            form.resetFields()
        })
    }

    const handleModalCancel = () => {
        setIsModalVisible(false)
        form.resetFields()
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchText.toLowerCase())
    )

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            width: 80,
            render: (images: string[]) => (
                <Image
                    width={50}
                    height={50}
                    src={images[0]}
                    style={{ objectFit: 'contain', background: '#f8f9fa' }}
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{record.brand}</div>
                </div>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: string) => {
                const colors: { [key: string]: string } = {
                    'male': 'blue',
                    'female': 'pink',
                    'unisex': 'green'
                }
                return <Tag color={colors[gender]}>{gender}</Tag>
            },
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number, record: any) => (
                <div>
                    <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                        {formatPrice(price)}
                    </div>
                    {record.originalPrice && (
                        <div style={{ fontSize: '12px', textDecoration: 'line-through', color: '#999' }}>
                            {formatPrice(record.originalPrice)}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number, record: any) => (
                <div>
                    <div>⭐ {rating}/5</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        ({record.reviews} đánh giá)
                    </div>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'inStock',
            key: 'inStock',
            render: (inStock: boolean) => (
                <Tag color={inStock ? 'green' : 'red'}>
                    {inStock ? 'Còn hàng' : 'Hết hàng'}
                </Tag>
            ),
        },
        {
            title: 'Nổi bật',
            dataIndex: 'featured',
            key: 'featured',
            render: (featured: boolean) => (
                <Tag color={featured ? 'gold' : 'default'}>
                    {featured ? 'Nổi bật' : 'Bình thường'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record: any) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        title="Xem chi tiết"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                        title="Chỉnh sửa"
                    />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            title="Xóa"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ 
                    margin: 0,
                    color: '#2c3e50',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Quản lý sản phẩm
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    size="large"
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                >
                    Thêm sản phẩm
                </Button>
            </div>

            <Card style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ 
                            width: 300,
                            borderRadius: '8px'
                        }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} của ${total} sản phẩm`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* Add/Edit Product Modal */}
            <Modal
                title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={800}
                okText="Lưu"
                cancelText="Hủy"
                style={{ top: 20 }}
                okButtonProps={{
                    style: {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '6px'
                    }
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        inStock: true,
                        featured: false,
                        rating: 4.5,
                        reviews: 0
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên sản phẩm"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                            >
                                <Input placeholder="Nhập tên sản phẩm" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Thương hiệu"
                                name="brand"
                                rules={[{ required: true, message: 'Vui lòng nhập thương hiệu' }]}
                            >
                                <Input placeholder="Nhập thương hiệu" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Danh mục"
                                name="category"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                            >
                                <Select placeholder="Chọn danh mục">
                                    <Option value="Premium">Premium</Option>
                                    <Option value="Men">Men</Option>
                                    <Option value="Women">Women</Option>
                                    <Option value="Fresh">Fresh</Option>
                                    <Option value="Luxury">Luxury</Option>
                                    <Option value="Citrus">Citrus</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                    <Option value="unisex">Unisex</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Dung tích"
                                name="size"
                                rules={[{ required: true, message: 'Vui lòng nhập dung tích' }]}
                            >
                                <Input placeholder="VD: 100ml" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Giá bán"
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Nhập giá bán"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giá gốc (tùy chọn)"
                                name="originalPrice"
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Nhập giá gốc"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Mô tả ngắn"
                        name="shortDescription"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}
                    >
                        <Input placeholder="Nhập mô tả ngắn" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả chi tiết"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
                    >
                        <TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Đánh giá"
                                name="rating"
                            >
                                <InputNumber
                                    min={0}
                                    max={5}
                                    step={0.1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Số đánh giá"
                                name="reviews"
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Dung tích"
                                name="volume"
                            >
                                <Input placeholder="VD: 100ml" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Còn hàng"
                                name="inStock"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Sản phẩm nổi bật"
                                name="featured"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default ProductManagement
