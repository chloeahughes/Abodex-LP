/* --- imports (same as before) --- */
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
import { addProfile, listProfiles } from "@/api/profileService";

/* --- component ---------------------------------------------------------- */
const Index = () => {
  /* state -------------------------------------------------------------- */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [profiles, setProfiles] = useState<any[]>([]); // optional UI later

  /* rotating headline -------------------------------------------------- */
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
  useEffect(() => {
    const id = setInterval(
      () => setCurrentWordIndex((i) => (i + 1) % rotatingWords.length),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  /* load existing sign-ups -------------------------------------------- */
  useEffect(() => {
    listProfiles()
      .then(setProfiles)
      .catch((err) =>
        toast({
          title: "Failed to load profiles",
          description: err.message,
          variant: "destructive",
        }),
      );
  }, []);

  /* submit form -------------------------------------------------------- */
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
      setProfiles((p) => [...p, { id: Date.now(), name, email, company }]);
    } catch (err: any) {
      toast({
        title: "Could not add you to the waitlist",
        description: err.message,
        variant: "destructive",
      });
      return;
    }
    setEmail("");
    setName("");
    setCompany("");
    setShowWaitlistModal(false);
  };

  /* static data (features, tiers, comparison) -------------------------- */
  const features = [
    { icon: Upload, title: "Upload Any Document", description: "Leases, OMs, rent rolls – drag & drop or batch upload" },
    { icon: Bot, title: "AI Extraction", description: "Parse key fields like NOI, lease expirations, cap rates automatically" },
    { icon: BarChart3, title: "Dashboard Insights", description: "Visual analytics with full audit trail for every data point" },
    { icon: Link2, title: "Export Anywhere", description: "Excel, CRM, Dealpath – seamless integrations" },
    { icon: MessageSquare, title: "LLM Q&A Interface", description: "Ask questions like 'What's the average rent/sqft?'" },
    { icon: Code, title: "Developer API", description: "JSON/CSV export with comprehensive documentation" },
  ];
  const pricingTiers = [
    { name: "Free", price: "$0", period: "/mo", features: ["5 documents", "Basic export", "Email support"], popular: false, cta: "Get Started" },
    { name: "Pro", price: "$79", period: "/mo", features: ["50 documents", "Dashboard access", "API access", "Priority support"], popular: true, cta: "Start Free Trial" },
    { name: "Team", price: "$299", period: "/mo", features: ["500 documents", "Multi-user access", "All integrations", "Custom workflows"], popular: false, cta: "Contact Sales" },
    { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited documents", "SOC-2 compliance", "Dedicated onboarding", "SSO integration"], popular: false, cta: "Contact Sales" },
  ];
  const comparisonData = [
    { feature: "Built for real estate", abodex: true, competitors: false, manual: false },
    { feature: "Structured deal data + UI/API", abodex: true, competitors: "partial", manual: false },
    { feature: "Easy for small teams", abodex: true, competitors: false, manual: false },
    { feature: "Clause-level audit trail", abodex: true, competitors: "limited", manual: true },
  ];
  const renderCheck = (v: boolean | string) =>
    v === true ? (
      <Check className="w-5 h-5 text-green-500 mx-auto" />
    ) : v === "partial" || v === "limited" ? (
      <AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-red-500 mx-auto" />
    );

  /* --------------------------- JSX ----------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* NAVBAR (unchanged) */}
      {/* … same navbar code as before … */}

      {/* HERO */}
      {/* … hero code exactly as in previous message … */}

      {/* PROBLEM & VISION ------------------------------------------------ */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stop Wasting Hours on{" "}
              <span className="text-purple-500">
                {rotatingWords[currentWordIndex]}
              </span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Investors and underwriters waste hours re-keying PDFs. Abodex is
              your AI copilot for extracting insights, automating due diligence,
              and connecting your tools—without the busywork.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/uploads/5d3d4abb-6c8e-4e9f-8be7-6965985e1f1e.png"
              alt="Abodex Logo"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </section>

      {/* FEATURES -------------------------------------------------------- */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            From document upload to actionable insights
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Card key={i} className="shadow-lg hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-slate-600">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE ----------------------------------------------- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              How Abodex Compares
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden text-slate-900 shadow-lg">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="py-4 px-6 text-left">Feature</th>
                    <th className="py-4 px-6 text-center text-blue-600">
                      Abodex
                    </th>
                    <th className="py-4 px-6 text-center">Competitors</th>
                    <th className="py-4 px-6 text-center">Manual</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-t border-slate-200">
                      <td className="py-4 px-6">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {renderCheck(row.abodex)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCheck(row.competitors)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCheck(row.manual)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO ------------------------------------------------------------ */}
      <section id="demo" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See Abodex in Action
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Watch how we transform complex real estate documents into structured
            data
          </p>
          <div className="bg-slate-900 rounded-2xl p-8 text-left">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400">
                Demo: Document Processing
              </span>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Try the Beta
              </Button>
            </div>
            <div className="space-y-3 text-slate-300 font-mono text-sm">
              <div>→ Uploading lease_agreement.pdf...</div>
              <div>→ AI extracting key terms...</div>
              <div>→ Found: 15 clauses, 8 financial terms</div>
              <div className="text-green-400">✓ Processing complete</div>
              <div className="bg-slate-800 p-4 rounded mt-4">
                <div className="text-blue-400 mb-2">Ask a question:</div>
                <div className="text-white">
                  "What's the total NOI for this property?"
                </div>
                <div className="text-green-400 mt-2">
                  💡 Based on the rent roll and operating expenses, the NOI is
                  $485,000 annually.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING --------------------------------------------------------- */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Choose the plan that fits your deal flow
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, i) => (
              <Card
                key={i}
                className={`relative ${
                  tier.popular ? "ring-2 ring-blue-500 shadow-xl" : "shadow-lg"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-slate-600">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => setShowWaitlistModal(true)}
                    className={`w-full ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------- */}
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

      {/* FOOTER ---------------------------------------------------------- */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* … footer content identical to your original … */}
        </div>
      </footer>

      {/* WAITLIST MODAL (unchanged) -------------------------------------- */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            {/* … modal form identical to previous version … */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
