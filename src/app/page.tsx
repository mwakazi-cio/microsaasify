import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  DollarSign,
  Code,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MicroSaaSify
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Pricing
            </a>
            <a
              href="#examples"
              className="text-sm hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Examples
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hover:scale-105 transition-transform duration-200"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium animate-bounce">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Turn your spreadsheet into a SaaS in 5 minutes ⚡
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Your Google Sheet is now a{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              SaaS Business
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Connect any Google Sheet and instantly create a branded web app with
            authentication, payments, and custom domains. No code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300">
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-all duration-300 border-2 hover:border-blue-600"
            >
              View Demo Apps
            </Button>
          </div>

          {/* Demo Video/Screenshot Placeholder */}
          <Card className="overflow-hidden shadow-2xl animate-fade-in-up delay-500 hover:scale-105 transition-transform duration-500">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Code className="w-10 h-10" />
                  </div>
                  <p className="text-xl font-semibold">
                    Demo Video Coming Soon
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    See MicroSaaSify in action
                  </p>
                </div>
                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-white/40 rounded-full animate-ping delay-500"></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping delay-1000"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
            Everything you need to launch
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
            From data to deployed app in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up delay-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
              <p className="text-gray-600">
                Connect your Google Sheet with one click. No manual data entry
                or complex configurations.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up delay-200">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Domains</h3>
              <p className="text-gray-600">
                Use your own domain (yourbrand.com) with automatic SSL
                certificates.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up delay-300">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Built-in Payments</h3>
              <p className="text-gray-600">
                Accept payments via M-Pesa and cards. Monetize your data
                instantly with Paystack.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="group hover:shadow-2xl transition-all duration-500 animate-fade-in-up delay-400">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    More Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        Auto-sync with Google Sheets (real-time updates)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        User authentication and management
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        Search, filter, and pagination built-in
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        Mobile-responsive design
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    Advanced Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        Custom branding (colors, logo, fonts)
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        Analytics dashboard
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        SEO optimized
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="group-hover/item:text-blue-600 transition-colors duration-200">
                        API access (Pro plan)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="examples"
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
              Built for creators and entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
              See what others are building
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Property Listings",
                description:
                  "Real estate agent turned spreadsheet into client portal",
                revenue: "$500/mo",
                icon: "🏠",
                gradient: "from-blue-100 to-blue-200",
              },
              {
                title: "Salary Data Tool",
                description: "Consultant monetizing industry research",
                revenue: "$1.2K/mo",
                icon: "💰",
                gradient: "from-green-100 to-green-200",
              },
              {
                title: "Course Directory",
                description: "Teacher created student learning portal",
                revenue: "$800/mo",
                icon: "📚",
                gradient: "from-purple-100 to-purple-200",
              },
              {
                title: "Restaurant Menu",
                description: "Digital menu with online ordering",
                revenue: "$300/mo",
                icon: "🍽️",
                gradient: "from-orange-100 to-orange-200",
              },
            ].map((example, i) => (
              <Card
                key={i}
                className="group hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div
                    className={`aspect-square bg-gradient-to-br ${example.gradient} rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {example.icon}
                  </div>
                  <h4 className="font-bold mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {example.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {example.description}
                  </p>
                  <div className="text-green-600 font-semibold text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {example.revenue}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium animate-pulse">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Join 500+ entrepreneurs</span>
          </div>

          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            Ready to turn your spreadsheet into a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              business?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up delay-200">
            Join hundreds of entrepreneurs already making money from their data
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-fade-in-up delay-300">
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Building Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-all duration-300 border-2 hover:border-blue-600"
            >
              <Users className="w-4 h-4 mr-2" />
              View Success Stories
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 animate-fade-in-up delay-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />1 free app forever
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              Secure & reliable
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg" />
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MicroSaaSify
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Turn Google Sheets into SaaS apps
              </p>
            </div>
            <div className="animate-fade-in-up delay-100">
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up delay-200">
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up delay-300">
              <h4 className="font-bold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600 animate-fade-in-up delay-400">
            © 2025 MicroSaaSify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
