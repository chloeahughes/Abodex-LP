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
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

/* --- component ---------------------------------------------------------- */
const Index = () => {
  /* state -------------------------------------------------------------- */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [profiles, setProfiles] = useState<any[]>([]); // optional UI later
  const [showMagicLinkModal, setShowMagicLinkModal] = useState(false);
  const [magicLinkValue, setMagicLinkValue] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState("");

  const navigate = useNavigate();

  /* rotating headline -------------------------------------------------- */
  const rotatingWords = [
    "Re-keying Data",
    "Updating Stakeholders",
    "Rebuilding Templates",
    "Tracking Compliance",
    "Sorting Documents",
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
    { icon: Upload, title: "Automated Deal & Document Intelligence", description: "PDF extraction, flagging" },
    { icon: Bot, title: "Dynamic Task & Checklist Engine", description: "Automated workflows & checklists, assign reviewers, set statuses, and enable visual progress tracking" },
    { icon: BarChart3, title: "Track Real-time Progress", description: "Stakeholder Collaboration & Role-Based Access, IC workflow" },
  ];
  const pricingTiers = [
    { name: "Growth", price: "$4k", period: "/yr", features: [""], popular: false, cta: "Contact Sales" },
    { name: "Core-mid", price: "$12k", period: "/yr", features: [""], popular: true, cta: "Contact Sales" },
    { name: "Upper-mid", price: "$30k", period: "/yr", features: [""], popular: false, cta: "Contact Sales" },
    { name: "Enterprise", price: "Custom", period: "", features: [""], popular: false, cta: "Contact Sales" },
  ];
  const comparisonData = [
    { feature: "Real-time collaboration across stakeholders", abodex: true, competitors: false, manual: false },
    { feature: "Private vector store per client", abodex: true, competitors: "partial", manual: false },
    { feature: "Modular verticals", abodex: true, competitors: false, manual: false },
    { feature: "Internal integration", abodex: true, competitors: "limited", manual: true },
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
      {/* ────────────────── NAVBAR ────────────────── */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* Logo image */}
              <img
                src="/uploads/abodexoslogo.png"   // public folder path
                alt="Abodex logo"
                className="w-8 h-8 rounded-lg"
              />
              {/* Brand name */}
              <span className="text-xl font-bold text-slate-900">Abodex</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing"  className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#demo"     className="text-slate-600 hover:text-slate-900 transition-colors">Demo</a>
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


      {/* HERO */}
      {/* ────────────────── HERO ────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:text-left">
          <Badge className="mb-6 bg-blue-50 text-blue-700">🚀 The Future of Deal Management</Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            AI-Powered Operating System for your Real Estate Transactions
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Abodex is a private, secure AI platform that plugs into any CRE firm’s internal data — underwriting models, offering memos, rent rolls, leases, emails — and turns it into a set of AI copilots.
          </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-12">
                <Button
                  size="lg"
                  onClick={() => setShowWaitlistModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                >
                  Join Early Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                  asChild
                >
                  <a href="/dashboard">Try AbodexOS</a>
                </Button>
              </div>
            </div>

            {/* Hero visual - right side */}
            <div className="relative">
              <img
                src="/lovable-uploads/d368858c-dddf-4000-b8d9-c832a52a66d3.png"
                alt="Abodex dashboard interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>


      {/* PROBLEM & VISION ------------------------------------------------ */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stop Wasting Hours on Manually{" "}
              <span className="text-purple-500">
                {rotatingWords[currentWordIndex]}
              </span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Abodex automates the busywork so you close deals up to 40 % faster.
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
            An externalized, modular platform — with per-client vector storage, secure APIs, and smart modules.
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

      {/* TRANSACTION TYPES ------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Any Transaction, Anywhere
          </h2>
          <p className="text-xl text-slate-600 mb-16">
            Supported Transaction Types
          </p>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="text-left bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                📥 Acquisitions
              </h3>
              <p className="text-slate-600">From deal sourcing to IC approval — centralize OM intake, automate due diligence, and track every milestone on the path to close.</p>
            </div>
            <div className="text-left bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                🏷️ Dispositions
              </h3>
              <p className="text-slate-600">Streamline exit workflows — prep, organize diligence materials, and coordinate brokers and legal teams to launch listings with confidence.</p>
            </div>
            <div className="text-left bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">Leasing</h3>
              <p className="text-slate-600">Track LOIs, abstracts, and approvals — manage lease negotiation, upload key docs, and auto-extract terms for underwriting in one place.</p>
            </div>
            <div className="text-left bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">Refinance / Recapitalizations</h3>
              <p className="text-slate-600">Coordinate lenders, capital calls, and investor docs — upload term sheets, monitor maturity timelines, and sync across legal and finance teams.</p>
            </div>
            <div className="text-left bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
              <h3 className="text-lg font-semibold mb-3">Development</h3>
              <p className="text-slate-600">Manage the full entitlement-to-permit lifecycle — assign tasks for budgeting, approvals, and document submissions with version tracking and alerts.</p>
            </div>
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
            Join our private beta and get 50 prompts free
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
      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* left logo/intro */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/uploads/abodexoslogo.png"                // <-- path inside the public folder
                  alt="Abodex logo"
                  className="w-8 h-8 rounded-lg"         // same 8×8 size as before
                />
                <span className="text-xl font-bold text-white">Abodex</span>
              </div>
              <p className="text-slate-400 mb-4">Centralized Operating System for your CRE deals.</p>
            </div>
            {/* product links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing"  className="hover:text-white">Pricing</a></li>
                <li><a href="#"         className="hover:text-white">API Docs</a></li>
                <li><a href="#"         className="hover:text-white">Integrations</a></li>
              </ul>
            </div>

            {/* company links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>

            {/* connect links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            &copy; {new Date().getFullYear()} Abodex. All rights reserved.
          </div>
        </div>
      </footer>
      {/* ────────────────── WAIT-LIST MODAL ────────────────── */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Join Abodex Early Access
            </h3>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              {/* name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
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

              {/* email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
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

              {/* company */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Company
                </label>
                <Input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company name"
                />
              </div>

              {/* perk banner */}
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  🎁 <strong>Beta Perk:</strong> Get 50 documents processed free
                  during our private beta!
                </p>
              </div>

              {/* actions */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowWaitlistModal(false)}
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
      <Dialog open={showMagicLinkModal} onOpenChange={setShowMagicLinkModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Deal Room Demo</DialogTitle>
            <DialogDescription>
              Enter your email or phone number to receive a magic link. You'll be able to track your created deals.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            {/* Magic Link Section */}
            <div>
              <div className="font-semibold mb-2">Get a Magic Link</div>
              {magicLinkSent ? (
                <div className="text-green-600 text-center py-4">Magic link sent! Check your inbox or SMS to continue.</div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setMagicLinkLoading(true);
                    setMagicLinkError("");
                    try {
                      let result;
                      if (magicLinkValue.includes("@")) {
                        result = await supabase.auth.signInWithOtp({ email: magicLinkValue });
                      } else {
                        result = await supabase.auth.signInWithOtp({ phone: magicLinkValue });
                      }
                      if (result.error) throw result.error;
                      setMagicLinkSent(true);
                    } catch (err) {
                      setMagicLinkError(err.message || "Failed to send magic link");
                    } finally {
                      setMagicLinkLoading(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    placeholder="Email or phone number"
                    value={magicLinkValue}
                    onChange={e => setMagicLinkValue(e.target.value)}
                    required
                    disabled={magicLinkLoading}
                  />
                  {magicLinkError && <div className="text-red-600 text-sm">{magicLinkError}</div>}
                  <Button type="submit" className="w-full bg-black text-white" disabled={magicLinkLoading}>
                    {magicLinkLoading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </form>
              )}
            </div>
            {/* See Demo Section */}
            <div className="border-t pt-4">
              <div className="font-semibold mb-2 text-center">Or</div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowMagicLinkModal(false);
                  navigate('/deals');
                }}
              >
                See Demo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
