export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  gender: 'unisex' | 'male' | 'female';
  size: string;
  volume: string;
  notes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

// Import product images instead of using direct paths
import sp1 from "../assets/sanpham1.webp";
import sp2 from "../assets/sanpham2.webp";
import sp3 from "../assets/sanpham3.webp";
import sp4 from "../assets/sanpham4.webp";
import sp5 from "../assets/sanpham5.webp";

export const products: Product[] = [
  {
    id: 1,
    name: "Lualab Signature",
    brand: "Lualab",
    price: 189000,
    originalPrice: 250000,
    description: "Lualab Signature là dòng nước hoa cao cấp với hương thơm độc đáo, kết hợp giữa sự sang trọng và hiện đại. Sản phẩm được chế tác từ những nguyên liệu quý hiếm nhất, mang đến trải nghiệm khứu giác tuyệt vời.",
    shortDescription: "Nước hoa cao cấp với hương thơm độc đáo và sang trọng",
    images: [
      sp1,
      sp2,
      sp3
    ],
    category: "Premium",
    gender: "unisex",
    size: "100ml",
    volume: "100ml",
    notes: ["Bergamot", "Rose", "Sandalwood", "Vanilla"],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    tags: ["signature", "premium", "unisex"]
  },
  {
    id: 2,
    name: "Lualab Midnight",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Midnight là dòng nước hoa nam với hương thơm mạnh mẽ và quyến rũ. Với sự kết hợp của gỗ đàn hương và hổ phách, tạo nên một mùi hương đầy nam tính và bí ẩn.",
    shortDescription: "Nước hoa nam với hương thơm mạnh mẽ và quyến rũ",
    images: [
      sp2,
      sp3
    ],
    category: "Men",
    gender: "male",
    size: "75ml",
    volume: "75ml",
    notes: ["Black Pepper", "Sandalwood", "Amber", "Musk"],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true,
    tags: ["men", "night", "woody"]
  },
  {
    id: 3,
    name: "Lualab Bloom",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Bloom là dòng nước hoa nữ với hương thơm tươi mát và nữ tính. Kết hợp hoa hồng, hoa nhài và vani tạo nên một mùi hương ngọt ngào và quyến rũ.",
    shortDescription: "Nước hoa nữ với hương thơm tươi mát và nữ tính",
    images: [
      sp3,
      sp4
    ],
    category: "Women",
    gender: "female",
    size: "75ml",
    volume: "75ml",
    notes: ["Rose", "Jasmine", "Vanilla", "White Musk"],
    rating: 4.7,
    reviews: 124,
    inStock: true,
    featured: true,
    tags: ["women", "floral", "sweet"]
  },
  {
    id: 4,
    name: "Lualab Ocean",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Ocean mang đến cảm giác tươi mát như gió biển. Với hương thơm của cam bergamot, hoa oải hương và hổ phách trắng, tạo nên một mùi hương trong lành và sảng khoái.",
    shortDescription: "Nước hoa với hương thơm tươi mát như gió biển",
    images: [
      sp4,
      sp5
    ],
    category: "Fresh",
    gender: "unisex",
    size: "100ml",
    volume: "100ml",
    notes: ["Bergamot", "Lavender", "White Amber", "Sea Salt"],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    featured: false,
    tags: ["fresh", "ocean", "unisex"]
  },
  {
    id: 5,
    name: "Lualab Royal",
    brand: "Lualab",
    price: 189000,
    originalPrice: 250000,
    description: "Lualab Royal là dòng nước hoa cao cấp nhất với những nguyên liệu quý hiếm. Kết hợp saffron, oud và hoa hồng Bulgaria tạo nên một mùi hương đầy sang trọng và quý phái.",
    shortDescription: "Dòng nước hoa cao cấp nhất với nguyên liệu quý hiếm",
    images: [
      sp5,
      sp1
    ],
    category: "Luxury",
    gender: "unisex",
    size: "50ml",
    volume: "50ml",
    notes: ["Saffron", "Oud", "Bulgarian Rose", "Ambergris"],
    rating: 4.9,
    reviews: 43,
    inStock: true,
    featured: true,
    tags: ["luxury", "royal", "premium"]
  },
  {
    id: 6,
    name: "Lualab Citrus",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Citrus với hương thơm cam quýt tươi mát và sảng khoái. Kết hợp chanh, cam và bạc hà tạo nên một mùi hương đầy năng lượng và tích cực.",
    shortDescription: "Nước hoa với hương thơm cam quýt tươi mát",
    images: [
      sp1,
      sp2
    ],
    category: "Citrus",
    gender: "unisex",
    size: "100ml",
    volume: "100ml",
    notes: ["Lemon", "Orange", "Mint", "White Tea"],
    rating: 4.4,
    reviews: 78,
    inStock: true,
    featured: false,
    tags: ["citrus", "fresh", "energetic"]
  },
  {
    id: 7,
    name: "Lualab Elegance",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Elegance là dòng nước hoa nữ cao cấp với hương thơm tinh tế và quyến rũ. Kết hợp hoa hồng đỏ, hoa nhài và gỗ đàn hương tạo nên một mùi hương đầy nữ tính và sang trọng.",
    shortDescription: "Nước hoa nữ cao cấp với hương thơm tinh tế và quyến rũ",
    images: [
      sp2,
      sp3
    ],
    category: "Women",
    gender: "female",
    size: "75ml",
    volume: "75ml",
    notes: ["Red Rose", "Jasmine", "Sandalwood", "White Musk"],
    rating: 4.6,
    reviews: 92,
    inStock: true,
    featured: true,
    tags: ["women", "elegant", "sophisticated"]
  },
  {
    id: 8,
    name: "Lualab Adventure",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Adventure là dòng nước hoa nam với hương thơm mạnh mẽ và phiêu lưu. Với sự kết hợp của gỗ đàn hương, hổ phách và hạt tiêu đen, tạo nên một mùi hương đầy nam tính và bí ẩn.",
    shortDescription: "Nước hoa nam với hương thơm mạnh mẽ và phiêu lưu",
    images: [
      sp3,
      sp4
    ],
    category: "Men",
    gender: "male",
    size: "100ml",
    volume: "100ml",
    notes: ["Sandalwood", "Amber", "Black Pepper", "Musk"],
    rating: 4.5,
    reviews: 78,
    inStock: true,
    featured: true,
    tags: ["men", "adventure", "bold"]
  },
  {
    id: 9,
    name: "Lualab Harmony",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Harmony là dòng nước hoa unisex với hương thơm cân bằng và hài hòa. Kết hợp cam bergamot, hoa oải hương và hổ phách trắng tạo nên một mùi hương trong lành và thư giãn.",
    shortDescription: "Nước hoa unisex với hương thơm cân bằng và hài hòa",
    images: [
      sp4,
      sp5
    ],
    category: "Fresh",
    gender: "unisex",
    size: "100ml",
    volume: "100ml",
    notes: ["Bergamot", "Lavender", "White Amber", "Musk"],
    rating: 4.4,
    reviews: 65,
    inStock: true,
    featured: true,
    tags: ["unisex", "harmony", "balanced"]
  },
  {
    id: 10,
    name: "Lualab Mystique",
    brand: "Lualab",
    price: 189000,
    originalPrice: 250000,
    description: "Lualab Mystique là dòng nước hoa cao cấp với hương thơm bí ẩn và quyến rũ. Kết hợp oud, saffron và hoa hồng Bulgaria tạo nên một mùi hương đầy sang trọng và bí ẩn.",
    shortDescription: "Dòng nước hoa cao cấp với hương thơm bí ẩn và quyến rũ",
    images: [
      sp5,
      sp1
    ],
    category: "Luxury",
    gender: "unisex",
    size: "50ml",
    volume: "50ml",
    notes: ["Oud", "Saffron", "Bulgarian Rose", "Ambergris"],
    rating: 4.8,
    reviews: 54,
    inStock: true,
    featured: true,
    tags: ["luxury", "mystique", "mysterious"]
  },
  {
    id: 11,
    name: "Lualab Sunshine",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Sunshine với hương thơm cam quýt tươi mát và năng động. Kết hợp chanh, cam và bạc hà tạo nên một mùi hương đầy năng lượng và tích cực.",
    shortDescription: "Nước hoa với hương thơm cam quýt tươi mát và năng động",
    images: [
      sp1,
      sp2
    ],
    category: "Citrus",
    gender: "unisex",
    size: "100ml",
    volume: "100ml",
    notes: ["Lemon", "Orange", "Mint", "White Tea"],
    rating: 4.3,
    reviews: 71,
    inStock: true,
    featured: true,
    tags: ["citrus", "sunshine", "energetic"]
  },
  {
    id: 12,
    name: "Lualab Serenity",
    brand: "Lualab",
    price: 189000,
    description: "Lualab Serenity là dòng nước hoa với hương thơm thanh tịnh và yên bình. Kết hợp hoa oải hương, hoa nhài và vani tạo nên một mùi hương thư giãn và nhẹ nhàng.",
    shortDescription: "Nước hoa với hương thơm thanh tịnh và yên bình",
    images: [
      sp2,
      sp3
    ],
    category: "Fresh",
    gender: "unisex",
    size: "75ml",
    volume: "75ml",
    notes: ["Lavender", "Jasmine", "Vanilla", "White Musk"],
    rating: 4.5,
    reviews: 83,
    inStock: true,
    featured: true,
    tags: ["fresh", "serenity", "calm"]
  }
];

export const categories = [
  "All",
  "Premium", 
  "Men",
  "Women", 
  "Fresh",
  "Luxury",
  "Citrus"
];

export const featuredProducts = products.filter(product => product.featured);
