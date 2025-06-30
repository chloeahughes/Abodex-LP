/* --- imports (same as before) --- */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Bot,
  Zap,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Play,
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
          "You've been added to our early‑access waitlist. We'll be in touch soon!",
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
    {
      icon: Upload,
      title: "Centralized Operating System",
      description:
        "All stakeholders, documents, and tasks for every deal live in one searchable workspace.",
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description:
        "Pre‑built templates trigger the next step—disclosures, signatures, compliance—automatically.",
    },
    {
      icon: Bot,
      title: "AI Document Intelligence",
      description:
        "Leases, PSAs, and reports are parsed and structured in seconds, giving you clean, query‑ready data.",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter (Free)",
      price: "$0",
      period: "/mo",
      features: [
        "1 active transaction",
        "2 GB storage",
        "Email support",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Growth",
      price: "$79",
      period: "/user/mo",
      features: [
        "Unlimited deals",
        "Workflow templates",
        "Dashboard access",
        "Priority support",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "SSO & SOC‑2",
        "Advanced compliance",
        "Dedicated onboarding",
        "API access",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const comparisonData = [
    { feature: "Built for real estate", abodex: true, competitors: false, manual: false },
    { feature: "Structured deal data + UI/API", abodex: true, competitors: "partial", manual: false },
    { feature: "Easy for small teams", abodex: true, competitors: false, manual: false },
    { feature: "Clause‑level audit trail", abodex: true, competitors: "limited", manual: true },
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
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/uploads/abodexoslogo.png" alt="Abodex logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-slate-900">Abodex</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#demo" className="text-slate-600 hover:text-slate-900 transition-colors">Demo</a>
              <Button onClick={() => setShowWaitlistModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-50 text-blue-700">🚀 Now in Private Beta</Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Close every deal
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> in one place.</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AbodexOS is the centralized operating system that turns fragmented commercial real‑estate transactions into automated, error‑free workflows—so you can move from LOI to closing <strong>40% faster</strong> without the email chaos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => setShowWaitlistModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              Request Early Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Hero visual (unchanged) */}
          <div className="relative max-w-5xl mx-auto">
            {/* same visual block as before */}
          </div>
        </div>
      </section>

      {/* Remaining sections remain mostly unchanged except for text tweaks to match new copy */}
      {/* ... (features, comparison, demo, pricing, CTA, footer, modal) ... */}
    </div>
  );
};

export default Index;
