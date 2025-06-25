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
  Star,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

/* ── Supabase helpers ──────────────────────────────────────────────── */
import { addProfile, listProfiles } from "@/api/profileService";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  /* cache of existing wait-list rows (optional UI later) */
  const [profiles, setProfiles] = useState<any[]>([]);

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
    "Clause Tagging",
  ];

  /* rotating headline */
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentWordIndex(
          (prevIndex) => (prevIndex + 1) % rotatingWords.length,
        ),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  /* fetch existing profiles once on mount */
  useEffect(() => {
    listProfiles()
      .then(setProfiles)
      .catch((err) => {
        console.error(err);
        toast({
          title: "Failed to load profiles",
          description: err.message,
          variant: "destructive",
        });
      });
  }, []);

  /* handle form submit */
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      toast({
        title: "Please fill in required fields",
        description: "Name and email are required to join the waitlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addProfile({ name, email, company });

      toast({
        title: "Welcome to Abodex! 🚀",
        description:
          "You've been added to our early-access waitlist. We'll be in touch soon!",
      });

      /* update local list immediately (optional) */
      setProfiles((prev) => [
        ...prev,
        { id: Date.now(), name, email, company },
      ]);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Could not add you to the waitlist",
        description: err.message,
        variant: "destructive",
      });
      return;
    }

    /* reset form + close modal */
    setEmail("");
    setName("");
    setCompany("");
    setShowWaitlistModal(false);
  };

  /* ----------------- static data (features, pricing, etc.) ---------------- */
  const features = [
    {
      icon: Upload,
      title: "Upload Any Document",
      description: "Leases, OMs, rent rolls – drag & drop or batch upload",
    },
    {
      icon: Bot,
      title: "AI Extraction",
      description: "Parse key fields like NOI, lease expirations, cap rates automatically",
    },
    {
      icon: BarChart3,
      title: "Dashboard Insights",
      description: "Visual analytics with full audit trail for every data point",
    },
    {
      icon: Link2,
      title: "Export Anywhere",
      description: "Excel, CRM, Dealpath – seamless integrations",
    },
    {
      icon: MessageSquare,
      title: "LLM Q&A Interface",
      description: "Ask questions like 'What's the average rent/sqft?'",
    },
    {
      icon: Code,
      title: "Developer API",
      description: "JSON/CSV export with comprehensive documentation",
    },
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      features: ["5 documents", "Basic export", "Email support"],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/mo",
      features: ["50 documents", "Dashboard access", "API access", "Priority support"],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Team",
      price: "$299",
      period: "/mo",
      features: ["500 documents", "Multi-user access", "All integrations", "Custom workflows"],
      popular: false,
      cta: "Contact Sales",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited documents", "SOC-2 compliance", "Dedicated onboarding", "SSO integration"],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const comparisonData = [
    { feature: "Built for real estate", abodex: true, competitors: false, manual: false },
    { feature: "Structured deal data + UI/API", abodex: true, competitors: "partial", manual: false },
    { feature: "Easy for small teams", abodex: true, competitors: false, manual: false },
    { feature: "Clause-level audit trail", abodex: true, competitors: "limited", manual: true },
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

  /* ------------------------------- JSX ----------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Navigation ───────────────────────────────────────────── */}
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
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <a href="#demo" className="text-slate-600 hover:text-slate-900 transition-colors">
                Demo
              </a>
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

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100">
            🚀 Now in Private Beta
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            From PDFs to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Property Intelligence
            </span>
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
                      📄 lease_agreement.pdf
                      <br />
                      📊 rent_roll.xlsx
                      <br />
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

      {/* (all other sections: Problem & Vision, Features, Comparison, Demo, Pricing, CTA, Footer) */}
      {/* … unchanged for brevity … */}

      {/* ── Waitlist Modal ────────────────────────────────────────── */}
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
                  placeholder="you@example.com"
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
