
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Bot, 
  BarChart3, 
  Link2, 
  MessageSquare, 
  Code, 
  Check, 
  X, 
  AlertTriangle,
  Play,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const rotatingWords = [
    "Data Entry",
    "Lease Extraction", 
    "NOI Calculations",
    "Rent Roll Parsing",
    "Zoning Lookups",
    "Cap Rate Input",
    "OM Summarizing",
    "Comps Formatting",
    "Unit Mix Cleaning",
    "Clause Tagging"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Please fill in required fields",
        description: "Name and email are required to join the waitlist.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Welcome to Abodex! 🚀",
      description: "You've been added to our early access waitlist. We'll be in touch soon!",
    });
    
    setEmail("");
    setName("");
    setCompany("");
    setShowWaitlistModal(false);
  };

  const features = [
    {
      icon: Upload,
      title: "Upload Any Document",
      description: "Leases, OMs, rent rolls - drag & drop or batch upload"
    },
    {
      icon: Bot,
      title: "AI Extraction",
      description: "Parse key fields like NOI, lease expirations, cap rates automatically"
    },
    {
      icon: BarChart3,
      title: "Dashboard Insights",
      description: "Visual analytics with full audit trail for every data point"
    },
    {
      icon: Link2,
      title: "Export Anywhere",
      description: "Excel, CRM, Dealpath - seamless integrations"
    },
    {
      icon: MessageSquare,
      title: "LLM Q&A Interface",
      description: "Ask questions like 'What's the average rent/sqft?'"
    },
    {
      icon: Code,
      title: "Developer API",
      description: "JSON/CSV export with comprehensive documentation"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      features: ["5 documents", "Basic export", "Email support"],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$79",
      period: "/mo",
      features: ["50 documents", "Dashboard access", "API access", "Priority support"],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Team",
      price: "$299",
      period: "/mo",
      features: ["500 documents", "Multi-user access", "All integrations", "Custom workflows"],
      popular: false,
      cta: "Contact Sales"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited documents", "SOC-2 compliance", "Dedicated onboarding", "SSO integration"],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const comparisonData = [
    { feature: "Built for real estate", abodex: true, competitors: false, manual: false },
    { feature: "Structured deal data + UI/API", abodex: true, competitors: "partial", manual: false },
    { feature: "Easy for small teams", abodex: true, competitors: false, manual: false },
    { feature: "Clause-level audit trail", abodex: true, competitors: "limited", manual: true }
  ];

  const renderCheckIcon = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (value === "partial" || value === "limited") {
      return <AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" />;
    } else {
      return <X className="w-5 h-5 text-red-500 mx-auto" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Abodex</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#demo" className="text-slate-600 hover:text-slate-900 transition-colors">Demo</a>
              <Button 
                onClick={() => setShowWaitlistModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100">
            🚀 Now in Private Beta
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            From PDFs to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Property Intelligence</span>
            <br />— Instantly
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Abodex turns leases, OMs, and rent rolls into clean, structured data. 
            Automate underwriting, analysis, and reporting with one AI-powered tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowWaitlistModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              Join Early Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm ml-4">AbodexOS - Document Processing</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-2">
                    <div className="text-blue-400 text-sm font-medium">INPUT</div>
                    <div className="bg-slate-700 p-3 rounded text-slate-300 text-sm">
                      📄 lease_agreement.pdf<br />
                      📊 rent_roll.xlsx<br />
                      📋 offering_memo.pdf
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-purple-400">
                      <Bot className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-green-400 text-sm font-medium">OUTPUT</div>
                    <div className="bg-slate-700 p-3 rounded text-slate-300 text-sm font-mono">
                      {`{
  "noi": 485000,
  "cap_rate": 6.2,
  "avg_rent_psf": 28.50
}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Vision */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stop Wasting Hours on{" "}
                <span className="text-purple-500 transition-all duration-300">
                  {rotatingWords[currentWordIndex]}
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Investors and underwriters waste hours rekeying PDFs. Abodex is your AI copilot for 
                extracting insights, automating due diligence, and connecting your tools — without the busywork.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/lovable-uploads/5d3d4abb-6c8e-4e9f-8be7-6965985e1f1e.png" 
                alt="Abodex Logo" 
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-slate-600">
              From document upload to actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            How Abodex Compares
          </h2>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">Abodex</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-600">Competitors</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-600">Manual</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="py-4 px-6 text-slate-900">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {renderCheckIcon(row.abodex)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCheckIcon(row.competitors)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCheckIcon(row.manual)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            See Abodex in Action
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Watch how we transform complex real estate documents into structured data
          </p>
          
          <div className="bg-slate-900 rounded-2xl p-8 text-left">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400">Demo: Document Processing</span>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Try the Beta
              </Button>
            </div>
            
            <div className="space-y-4 text-slate-300 font-mono text-sm">
              <div>→ Uploading lease_agreement.pdf...</div>
              <div>→ AI extracting key terms...</div>
              <div>→ Found: 15 clauses, 8 financial terms</div>
              <div className="text-green-400">✓ Processing complete</div>
              <div className="bg-slate-800 p-4 rounded mt-4">
                <div className="text-blue-400 mb-2">Ask a question:</div>
                <div className="text-white">"What's the total NOI for this property?"</div>
                <div className="text-green-400 mt-2">💡 Based on the rent roll and operating expenses, the NOI is $485,000 annually.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600">
              Choose the plan that fits your deal flow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    <span className="text-slate-600">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-600">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                    onClick={() => setShowWaitlistModal(true)}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            🚀 Be First to Use AbodexOS
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our private beta and get 50 documents processed free
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowWaitlistModal(true)}
            className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-4"
          >
            Join Early Access
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-white">Abodex</span>
              </div>
              <p className="text-slate-400 mb-4">
                Built by investors, for investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Abodex. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Join Abodex Early Access
            </h3>
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  🎁 <strong>Beta Perk:</strong> Get 50 documents processed free during our private beta!
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowWaitlistModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Join Waitlist
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
