-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
CREATE TYPE subscription_tier AS ENUM ('free', 'maker', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');
CREATE TYPE app_template_type AS ENUM ('directory', 'dashboard', 'crm', 'catalog', 'portal', 'custom');

-- User profiles
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    subscription_tier subscription_tier DEFAULT 'free',
    subscription_status subscription_status DEFAULT 'active',
    paystack_customer_code TEXT,
    paystack_subscription_code TEXT,
    apps_created INTEGER DEFAULT 0,
    apps_limit INTEGER DEFAULT 1,
    google_connected BOOLEAN DEFAULT FALSE,
    google_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Apps (generated SaaS applications)
CREATE TABLE apps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    google_sheet_id TEXT NOT NULL,
    google_sheet_name TEXT,
    google_sheet_range TEXT DEFAULT 'Sheet1',
    refresh_token TEXT, -- encrypted Google OAuth token
    template_type app_template_type DEFAULT 'directory',
    theme JSONB DEFAULT '{
        "primaryColor": "#3b82f6",
        "secondaryColor": "#1e40af",
        "fontFamily": "Inter",
        "logo": null
    }'::jsonb,
    custom_domain TEXT,
    domain_verified BOOLEAN DEFAULT FALSE,
    auth_enabled BOOLEAN DEFAULT FALSE,
    payment_enabled BOOLEAN DEFAULT FALSE,
    payment_config JSONB DEFAULT '{
        "price": 0,
        "currency": "KES",
        "interval": "monthly"
    }'::jsonb,
    settings JSONB DEFAULT '{
        "showHeader": true,
        "showFooter": true,
        "enableSearch": true,
        "enableFilters": true,
        "itemsPerPage": 20
    }'::jsonb,
    is_published BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_synced TIMESTAMP WITH TIME ZONE
);

-- App users (users of the generated apps)
CREATE TABLE app_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    password_hash TEXT,
    subscription_status subscription_status DEFAULT 'trial',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(app_id, email)
);

-- Sheet cache (for performance optimization)
CREATE TABLE sheet_cache (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE UNIQUE,
    data JSONB NOT NULL,
    headers JSONB NOT NULL, -- column names and inferred types
    row_count INTEGER,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 hour')
);

-- App analytics
CREATE TABLE app_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    signups INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue NUMERIC(10, 2) DEFAULT 0,
    metadata JSONB,
    UNIQUE(app_id, date)
);

-- Webhook logs
CREATE TABLE webhook_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    payload JSONB,
    status TEXT DEFAULT 'pending',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_apps_user_id ON apps(user_id);
CREATE INDEX idx_apps_slug ON apps(slug);
CREATE INDEX idx_apps_published ON apps(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_app_users_app_id ON app_users(app_id);
CREATE INDEX idx_app_users_email ON app_users(email);
CREATE INDEX idx_sheet_cache_app_id ON sheet_cache(app_id);
CREATE INDEX idx_app_analytics_app_date ON app_analytics(app_id, date);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sheet_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for apps
CREATE POLICY "Users can view own apps" ON apps
    FOR SELECT USING (auth.uid() = user_id OR is_published = TRUE);

CREATE POLICY "Users can create apps" ON apps
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own apps" ON apps
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own apps" ON apps
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for sheet_cache
CREATE POLICY "Users can view cache for own apps" ON sheet_cache
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM apps 
            WHERE apps.id = sheet_cache.app_id 
            AND apps.user_id = auth.uid()
        )
    );

-- RLS Policies for app_analytics
CREATE POLICY "Users can view analytics for own apps" ON app_analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM apps 
            WHERE apps.id = app_analytics.app_id 
            AND apps.user_id = auth.uid()
        )
    );

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apps_updated_at 
    BEFORE UPDATE ON apps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, apps_limit)
    VALUES (NEW.id, 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to increment app views
CREATE OR REPLACE FUNCTION increment_app_views(app_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE apps 
    SET views_count = views_count + 1 
    WHERE slug = app_slug;
END;
$$ LANGUAGE plpgsql;
