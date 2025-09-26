import React from 'react';
import { Container } from '../../../components/common/Container';
import { TestimonialCard } from '../../../components/common/TestimonialCard';
import { Carousel } from '../../../components/common/Carousel';


const testimonials = [
  {
    id: 1,
    quote: "AI phân tích CV rất chính xác, tôi đã tìm được công việc mơ ước chỉ sau 2 tuần! Hệ thống matching thông minh giúp tôi tiết kiệm rất nhiều thời gian.",
    author: "Nguyễn Văn A",
    role: "Software Engineer",
    company: "TechCorp Vietnam",
    rating: 5,
    avatar: "/images/testimonials/customer-1.jpg",
    userType: "candidate" as const,
  },
  {
    id: 2,
    quote: "Hệ thống giúp chúng tôi tìm được ứng viên phù hợp nhanh hơn 70% so với phương pháp truyền thống. AI matching rất chính xác và tiết kiệm chi phí tuyển dụng.",
    author: "Trần Thị B",
    role: "HR Manager",
    company: "ABC Corporation",
    rating: 5,
    avatar: "/images/testimonials/customer-2.jpg",
    userType: "recruiter" as const,
  },
  {
    id: 3,
    quote: "Platform dễ sử dụng, hiệu quả cao trong việc quản lý và matching. Dashboard analytics giúp chúng tôi theo dõi hiệu suất và cải thiện quy trình tuyển dụng.",
    author: "Lê Văn C",
    role: "Admin System",
    company: "Resulyze Platform",
    rating: 5,
    avatar: "/images/testimonials/customer-3.jpg",
    userType: "admin" as const,
  },
  {
    id: 4,
    quote: "Tính năng phân tích kỹ năng và gợi ý cải thiện CV rất hữu ích. Tôi đã nâng cao được profile và nhận được nhiều lời mời phỏng vấn hơn.",
    author: "Phạm Thị D",
    role: "Marketing Specialist",
    company: "Digital Agency",
    rating: 5,
    avatar: "/images/testimonials/customer-4.jpg",
    userType: "candidate" as const,
  },
  {
    id: 5,
    quote: "Hệ thống lọc ứng viên thông minh giúp chúng tôi tìm được đúng người tài cần thiết. Tỷ lệ thành công trong tuyển dụng tăng đáng kể.",
    author: "Hoàng Văn E",
    role: "Talent Acquisition",
    company: "StartupXYZ",
    rating: 5,
    avatar: "/images/testimonials/customer-5.jpg",
    userType: "recruiter" as const,
  },
  {
    id: 6,
    quote: "Dashboard quản lý toàn diện, báo cáo chi tiết giúp chúng tôi đưa ra quyết định kinh doanh chính xác. ROI từ platform rất ấn tượng.",
    author: "Vũ Thị F",
    role: "Operations Manager",
    company: "Enterprise Corp",
    rating: 5,
    avatar: "/images/testimonials/customer-6.jpg",
    userType: "admin" as const,
  },
];

export const Testimonials: React.FC = () => {

  const testimonialCards = testimonials.map((testimonial) => (
    <TestimonialCard
      key={testimonial.id}
      quote={testimonial.quote}
      author={testimonial.author}
      role={testimonial.role}
      company={testimonial.company}
      rating={testimonial.rating}
      avatar={testimonial.avatar}
      userType={testimonial.userType}
    />
  ));

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100/30 to-secondary-100/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-100/25 to-primary-100/15 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-pulse" style={{animationDelay: '3s'}} />
      </div>
      
      <Container>
        {/* Enhanced Section Header */}
        <div className="text-center mb-20 relative z-10 space-y-fluid">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-6 animate-slide-up">
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 animate-pulse" />
            💬 Testimonials
          </div>
          <h2 className="text-hierarchy-1 text-neutral-900 mb-6 leading-tight animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
            <span className="text-brand-gradient bg-clip-text text-transparent">
              Lời chứng thực
            </span>{' '}
            từ khách hàng
          </h2>
          <p className="text-hierarchy-3 text-neutral-600 max-w-3xl mx-auto leading-relaxed font-medium animate-slide-up stagger-1" style={{animationDelay: '0.2s'}}>
            Hàng nghìn người dùng đã tin tưởng và đạt được thành công với nền tảng của chúng tôi.
            Hãy xem họ nói gì về trải nghiệm của mình.
          </p>
        </div>

        {/* Enhanced Testimonials Carousel */}
        <div className="relative z-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <Carousel
            items={testimonialCards}
            autoPlay={true}
            interval={6000}
            showDots={true}
            showArrows={true}
            className="shadow-brand"
            itemsPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
          />
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-brand-xl hover-lift transition-all duration-500 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl font-bold text-brand-gradient bg-clip-text text-transparent mb-2">10,000+</div>
            <div className="text-neutral-600 font-medium">Ứng viên hài lòng</div>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-brand-xl hover-lift transition-all duration-500 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <div className="text-4xl font-bold text-brand-gradient bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-neutral-600 font-medium">Doanh nghiệp tin tưởng</div>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-brand-xl hover-lift transition-all duration-500 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="text-4xl font-bold text-brand-gradient bg-clip-text text-transparent mb-2">95%</div>
            <div className="text-neutral-600 font-medium">Tỷ lệ hài lòng</div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-16 text-center relative z-10">
          <p className="text-neutral-500 mb-8 animate-slide-up" style={{animationDelay: '0.7s'}}>Được tin tưởng bởi các công ty hàng đầu</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['TechCorp', 'ABC Corp', 'StartupXYZ', 'Enterprise'].map((company, index) => (
              <div 
                key={company}
                className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-neutral-200/50 hover:border-primary-200/50 shadow-soft hover:shadow-brand hover-lift transition-all duration-300 animate-slide-up"
                style={{animationDelay: `${0.8 + index * 0.1}s`}}
              >
                <span className="font-semibold text-neutral-700 hover:text-primary-600 transition-colors duration-300">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};