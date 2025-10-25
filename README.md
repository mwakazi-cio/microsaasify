# 🚀 MicroSaaSify

**Turn Google Sheets into SaaS applications in minutes, not months.**

MicroSaaSify is an innovative platform that converts Google Sheets into fully functional SaaS applications with authentication, payments, and custom domains. Perfect for entrepreneurs, consultants, and creators who want to monetize their data without writing code.

## ✨ Features

### 🎯 Core Functionality

- **Instant Setup** - Connect Google Sheets with one click
- **Auto-Sync** - Real-time updates from your spreadsheets
- **Custom Domains** - Use your own domain with SSL certificates
- **Built-in Payments** - Accept payments via M-Pesa and cards
- **User Authentication** - Secure user management system
- **Mobile Responsive** - Works perfectly on all devices

### 🎨 Modern Design

- **Beautiful Landing Page** - Modern animations and responsive design
- **Professional Dashboard** - Clean, intuitive interface
- **Custom Branding** - Colors, logos, and fonts
- **SEO Optimized** - Built for search engines

### 🔧 Technical Features

- **Next.js 14** - Latest React framework
- **TypeScript** - Type-safe development
- **Supabase** - Database and authentication
- **Google Sheets API** - Direct integration
- **Paystack** - Payment processing
- **Tailwind CSS** - Modern styling

## 🏗️ Project Structure

```
microsaasify/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard
│   │   ├── api/               # API routes
│   │   └── a/[slug]/          # Dynamic app pages
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── dashboard/        # Dashboard components
│   │   └── landing/          # Landing page components
│   ├── lib/                  # Utility libraries
│   │   ├── supabase/         # Database client
│   │   ├── google/           # Google Sheets integration
│   │   └── utils/            # Helper functions
│   └── types/                # TypeScript definitions
├── supabase/                 # Database migrations
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Cloud Console account
- Paystack account (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mwakazi-cio/microsaasify-v1.git
   cd microsaasify-v1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your credentials:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/google/oauth/callback

   # Paystack (optional)
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
   PAYSTACK_SECRET_KEY=sk_test_xxx

   # Encryption
   ENCRYPTION_KEY=your_32_character_encryption_key_here
   ```

4. **Set up Supabase**

   - Create a new Supabase project
   - Run the migration in `supabase/migrations/001_initial_schema.sql`
   - Update your environment variables

5. **Set up Google Cloud Console**

   - Create a new project
   - Enable Google Sheets API and Google Drive API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Milestones

### ✅ Milestone 1: Project Setup and Google Sheets Integration

- [x] Next.js 14 setup with TypeScript and Tailwind CSS
- [x] Supabase integration with complete database schema
- [x] Google OAuth 2.0 and Sheets API integration
- [x] Modern landing page with animations and responsive design
- [x] Complete dashboard with authentication and protected routes
- [x] User management, apps management, settings, and billing pages
- [x] Dynamic app pages for generated SaaS applications
- [x] Environment configuration and deployment ready

### 🔄 Milestone 2: App Generation Engine (Coming Soon)

- [ ] Google Sheets data parsing and analysis
- [ ] Dynamic app generation based on spreadsheet structure
- [ ] Template system for different app types
- [ ] Real-time data synchronization
- [ ] Custom domain management
- [ ] Payment integration with Paystack

### 🔮 Milestone 3: Advanced Features (Planned)

- [ ] Analytics dashboard
- [ ] API access for Pro users
- [ ] White-label solutions
- [ ] Advanced customization options
- [ ] Multi-language support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Paystack
- **Google Integration**: Google Sheets API, Google Drive API
- **UI Components**: Shadcn/ui
- **Deployment**: Vercel (recommended)

## 📱 Pages & Features

### Landing Page

- Modern hero section with animations
- Feature showcase with interactive cards
- Use case examples with revenue indicators
- Call-to-action sections
- Responsive footer

### Dashboard

- User statistics and analytics
- App management interface
- Quick actions and shortcuts
- Recent apps overview

### App Management

- Create new apps from Google Sheets
- Configure app settings and branding
- Manage app users and permissions
- View analytics and performance

### Authentication

- Secure login and signup
- Google OAuth integration
- Protected routes and middleware
- User profile management

## 🔒 Security Features

- Row Level Security (RLS) in Supabase
- Encrypted Google OAuth tokens
- Protected API routes
- Input validation and sanitization
- Secure authentication flow

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add all environment variables
3. Deploy automatically on push

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred hosting platform
3. Configure environment variables
4. Set up custom domain (optional)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@microsaasify.com
- 📖 Documentation: [docs.microsaasify.com](https://docs.microsaasify.com)
- 🐛 Issues: [GitHub Issues](https://github.com/mwakazi-cio/microsaasify-platform/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Google Sheets API](https://developers.google.com/sheets) - Spreadsheet integration
- [Paystack](https://paystack.com/) - Payment processing

---

**Built with ❤️ by [Johnson Mwakazi](https://github.com/mwakazi-cio)**

_Turn your spreadsheet into a SaaS business today!_ 🚀
