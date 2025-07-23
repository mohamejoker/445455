-- قاعدة البيانات المقترحة لـ Chat2Site
-- يمكن استخدامها مع Supabase أو أي قاعدة بيانات PostgreSQL

-- جدول المستخدمين
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255),
    avatar_url TEXT,
    subscription_plan VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(20) DEFAULT 'inactive',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    total_spent DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المواقع
CREATE TABLE websites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    domain VARCHAR(255) UNIQUE,
    custom_domain VARCHAR(255),
    template_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, suspended
    content JSONB, -- محتوى الموقع بصيغة JSON
    settings JSONB, -- إعدادات الموقع
    analytics JSONB, -- بيانات التحليلات
    total_visits INTEGER DEFAULT 0,
    last_published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول القوالب
CREATE TABLE templates (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    preview_image TEXT,
    template_data JSONB, -- بيانات القالب
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المحادثات
CREATE TABLE conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
    messages JSONB, -- رسائل المحادثة
    current_step INTEGER DEFAULT 1,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المدفوعات
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USDT',
    transaction_hash VARCHAR(255),
    wallet_address VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    payment_type VARCHAR(50), -- subscription, website_creation, domain
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول النطاقات
CREATE TABLE domains (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    domain_type VARCHAR(20) DEFAULT 'subdomain', -- subdomain, custom
    ssl_status VARCHAR(20) DEFAULT 'pending',
    dns_status VARCHAR(20) DEFAULT 'pending',
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التحليلات
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    page_url TEXT,
    referrer TEXT,
    country VARCHAR(2),
    device_type VARCHAR(20),
    session_duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإعدادات العامة
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_websites_user_id ON websites(user_id);
CREATE INDEX idx_websites_domain ON websites(domain);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_analytics_website_id ON analytics(website_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- إدراج بيانات أولية للقوالب
INSERT INTO templates (id, name, description, category, is_featured) VALUES
('business-modern', 'شركة حديثة', 'قالب احترافي للشركات والمؤسسات', 'أعمال', true),
('ecommerce-elegant', 'متجر أنيق', 'قالب متجر إلكتروني بتصميم عصري', 'تجارة إلكترونية', true),
('restaurant-luxury', 'مطعم فاخر', 'قالب مثالي للمطاعم والكافيهات', 'مطاعم', false),
('portfolio-creative', 'معرض إبداعي', 'قالب لعرض الأعمال الفنية والإبداعية', 'شخصي', false),
('education-platform', 'منصة تعليمية', 'قالب للمؤسسات التعليمية والدورات', 'تعليمي', false);

-- إدراج إعدادات أولية
INSERT INTO settings (key, value, description) VALUES
('pricing_basic', '{"price": 10, "features": ["موقع واحد", "نطاق فرعي", "دعم أساسي"]}', 'إعدادات الخطة الأساسية'),
('pricing_advanced', '{"price": 25, "features": ["3 مواقع", "نطاق مخصص", "دعم متقدم", "تحليلات"]}', 'إعدادات الخطة المتقدمة'),
('pricing_pro', '{"price": 50, "features": ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية"]}', 'إعدادات الخطة الاحترافية');
