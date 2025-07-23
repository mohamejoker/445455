-- جدول إعدادات الإدارة
CREATE TABLE admin_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    settings JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_settings_row CHECK (id = 1)
);

-- إدراج الإعدادات الافتراضية
INSERT INTO admin_settings (settings) VALUES ('{
  "siteName": "Chat2Site",
  "siteDescription": "منصة إنشاء المواقع بالذكاء الاصطناعي",
  "supportEmail": "support@chat2site.com",
  "maintenanceMode": false,
  "newRegistrations": true,
  "pricing": {
    "basic": {
      "name": "الأساسي",
      "price": 10,
      "originalPrice": 15,
      "features": ["موقع واحد", "نطاق فرعي", "دعم أساسي", "قوالب محدودة"],
      "active": true
    },
    "advanced": {
      "name": "المتقدم",
      "price": 25,
      "originalPrice": 35,
      "features": ["3 مواقع", "نطاق مخصص", "دعم متقدم", "جميع القوالب", "تحليلات"],
      "active": true,
      "popular": true
    },
    "pro": {
      "name": "الاحترافي",
      "price": 50,
      "originalPrice": 70,
      "features": ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية", "ميزات متقدمة", "API مخصص"],
      "active": true
    }
  },
  "theme": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#8B5CF6",
    "accentColor": "#EC4899",
    "backgroundColor": "#F8FAFC",
    "textColor": "#1F2937"
  },
  "stats": {
    "websites": 10000,
    "users": 5000,
    "uptime": 99.9,
    "avgTime": 5
  },
  "bot": {
    "welcomeMessage": "مرحباً! أنا مساعدك الذكي لإنشاء المواقع. ما نوع الموقع الذي تريد إنشاءه؟",
    "errorMessage": "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
    "autoSuggestions": true,
    "typingIndicator": true,
    "quickResponses": true,
    "responseDelay": 1.5
  }
}') ON CONFLICT (id) DO NOTHING;

-- فهرس للبحث السريع في الإعدادات
CREATE INDEX idx_admin_settings_jsonb ON admin_settings USING GIN (settings);

-- دالة لتحديث timestamp تلقائياً
CREATE OR REPLACE FUNCTION update_admin_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق الدالة على الجدول
CREATE TRIGGER update_admin_settings_timestamp
    BEFORE UPDATE ON admin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_admin_settings_timestamp();
