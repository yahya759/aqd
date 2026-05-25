import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, CornerDownLeft, Loader2, Coins, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import VisionEmblem from './VisionEmblem';

interface AIConsultationProps {
  projects: Project[];
  walletBalance: number;
  onAllocate: (allocations: { projectId: string; amount: number }[]) => void;
  onClose: () => void;
}

export default function AIConsultation({ projects, walletBalance, onAllocate, onClose }: AIConsultationProps) {
  const [budget, setBudget] = useState<number>(Math.min(5000, walletBalance));
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'balanced' | 'growth'>('balanced');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [parsedAllocations, setParsedAllocations] = useState<{ projectId: string; amount: number; percentage: number }[] | null>(null);

  const samplePrompts = [
    { text: "أوزان استثمار لشخص متحفظ بميزانية متواضعة", risk: 'conservative' },
    { text: "محفظة متوازنة لتعظيم الأرباح وتوزيع المخاطر", risk: 'balanced' },
    { text: "خطة استثمارية جريئة تركز على مشاريع العتاد والبرمجيات", risk: 'growth' }
  ];

  const handleConsult = async (selectedRisk = riskProfile, selectedBudget = budget) => {
    if (selectedBudget <= 0) {
      alert("الطلب غير صالح. يرجى إدخال مبلغ مالي أكبر من صفر.");
      return;
    }

    setLoading(true);
    setSuggestion(null);
    setParsedAllocations(null);

    try {
      const response = await fetch('/api/ai-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: selectedBudget,
          riskProfile: selectedRisk,
          availableProjects: projects.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            return: p.expectedReturn,
            duration: p.durationMonths
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to load recommendation");
      }

      const data = await response.json();
      setSuggestion(data.text);
      
      if (data.allocations && Array.isArray(data.allocations)) {
        setParsedAllocations(data.allocations);
      }
    } catch (err) {
      console.error(err);
      // Fallback custom calculation if Gemini is missing or offline
      generateFallbackAllocation(selectedBudget, selectedRisk);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackAllocation = (budgetAmount: number, risk: string) => {
    let allocations: { projectId: string; amount: number; percentage: number }[] = [];
    const active = projects.filter(p => p.status === 'active');
    
    if (risk === 'conservative') {
      // 60% farming (low risk/sukuk), 40% logistics
      const fProj = active.find(p => p.id === 'proj_farming') || active[0];
      const lProj = active.find(p => p.id === 'proj_logistics') || active[1];
      if (fProj && lProj) {
        allocations = [
          { projectId: fProj.id, amount: Math.round(budgetAmount * 0.6), percentage: 60 },
          { projectId: lProj.id, amount: Math.round(budgetAmount * 0.4), percentage: 40 }
        ];
      }
    } else if (risk === 'growth') {
      // 50% medical (24% ROI), 30% DeFi (22% ROI), 20% logistics
      const mProj = active.find(p => p.id === 'proj_medical') || active[0];
      const sProj = active.find(p => p.id === 'proj_sukuk') || active[1];
      const lProj = active.find(p => p.id === 'proj_logistics') || active[2];
      if (mProj && sProj && lProj) {
        allocations = [
          { projectId: mProj.id, amount: Math.round(budgetAmount * 0.5), percentage: 50 },
          { projectId: sProj.id, amount: Math.round(budgetAmount * 0.3), percentage: 30 },
          { projectId: lProj.id, amount: Math.round(budgetAmount * 0.2), percentage: 20 }
        ];
      }
    } else {
      // Balanced: Equal split among medical, DeFi and farming
      const eligible = active.slice(0, 3);
      const splitVal = Math.round(budgetAmount / eligible.length);
      const splitPct = Math.round(100 / eligible.length);
      allocations = eligible.map(p => ({
        projectId: p.id,
        amount: splitVal,
        percentage: splitPct
      }));
    }

    setParsedAllocations(allocations);
    setSuggestion(`**[توصية بديلة محليّة]**\n\nبناءً على طلبك ومستوى المخاطر المحدد **(${risk === 'conservative' ? 'متحفظ' : risk === 'growth' ? 'عالي نمو' : 'متوازن'})** وبميزانية قدرها **${budgetAmount.toLocaleString()} USDT**، قمنا بإنشاء هذا التوزيع المتوازي لزيادة عوائدك وثباتها الشرعي الآمن:\n\n* **تقاسم استثماري رائد**: تضمن لك هذه المحفظة تنويعاً متكاملاً بين مشاريع الأتمتة الزراعية الآمنة ومشاريع التشخيص الطبي ذات العوائد القياسية.\n* **عائد مركب مقدر**: يبلغ متوسط العائد السنوي المتوقع لهذه المحفظة حوالي **19.5%** موزعة تلقائياً.`);
  };

  const handleApplyAllocation = () => {
    if (!parsedAllocations) return;
    const cleanList = parsedAllocations.map(a => ({ projectId: a.projectId, amount: a.amount }));
    onAllocate(cleanList);
    alert("تم تطبيق توزيع المحاكاة آلياً! يمكنك مراجعة محفظتك وتفاصيل الاستثمارات الآن.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070c0a]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0e1613] border border-[#1c2b26] rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#1c2b26]/50 flex justify-between items-center bg-[#14221d]">
          <div className="flex items-center gap-3">
            <VisionEmblem size="xs" />
            <h3 className="font-headline-md text-lg font-bold text-[#e2e8f0]">مستشار التوزيع بالذكاء الاصطناعي (عقد AI)</h3>
          </div>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* User Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#94a3b8] pr-1">ميزانية المحاكاة للاستثمار (USDT)</label>
              <input
                type="number"
                max={walletBalance}
                min={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-[#090f0d] border border-[#1c2b26] rounded-xl py-3 px-4 text-[#e2e8f0] focus:outline-none focus:border-[#00b074] focus:ring-1 focus:ring-[#00b074]"
              />
              <span className="text-[10px] text-[#94a3b8]/70 pr-1 block">رصيدك المتاح: {walletBalance.toLocaleString()} USDT</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#94a3b8] pr-1">نمط المخاطر الاستثماري</label>
              <div className="grid grid-cols-3 gap-2">
                {(['conservative', 'balanced', 'growth'] as const).map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setRiskProfile(profile)}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                      riskProfile === profile
                        ? 'bg-[#00b074] text-white border-[#00b074]'
                        : 'bg-[#090f0d] border-[#1c2b26] text-[#94a3b8]'
                    }`}
                  >
                    {profile === 'conservative' ? 'متحفظ' : profile === 'growth' ? 'نمو سريع' : 'متوازن'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-[#94a3b8] font-bold">أنماط شائعة مقترحة:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRiskProfile(p.risk as any);
                    handleConsult(p.risk as any, budget);
                  }}
                  className="bg-[#0e1613] hover:bg-[#14221d] border border-[#1c2b26] text-xs text-[#94a3b8] px-3 py-2 rounded-lg transition-all text-right flex items-center gap-2 cursor-pointer"
                >
                  <Brain className="w-3.5 h-3.5 text-[#00b074] shrink-0" />
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Trigger Button */}
          <button
            onClick={() => handleConsult()}
            disabled={loading}
            className="w-full bg-[#00b074] hover:brightness-105 active:scale-[0.98] transition-all text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري تحليل الأوزان المثالية وصياغة التوصية...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>توليد محفظة ذكاء اصطناعي مخصصة</span>
              </>
            )}
          </button>

          {/* Solution Recommendation Result */}
          {suggestion && (
            <div className="bg-[#090f0d] border border-[#1c2b26] rounded-xl p-5 space-y-4 animate-fadeIn">
              <div className="relative text-sm text-[#e2e8f0] leading-relaxed whitespace-pre-line pr-2 border-r-2 border-r-[#00b074]">
                {suggestion}
              </div>

              {/* Parsed Allocations visualizer */}
              {parsedAllocations && parsedAllocations.length > 0 && (
                <div className="pt-4 border-t border-[#1c2b26]/50 space-y-3">
                  <h4 className="text-xs font-bold text-[#00b074] flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4" />
                    <span>تقسيم الميزانية المقترح آلياً:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {parsedAllocations.map((alloc, idx) => {
                      const projDetails = projects.find(p => p.id === alloc.projectId);
                      return (
                        <div key={idx} className="bg-[#0e1613] p-3 rounded-lg border border-[#1c2b26] flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-[#e2e8f0]">{projDetails?.title || alloc.projectId}</p>
                            <p className="text-[10px] text-[#94a3b8] font-data-tabular">معدل العائد المتوقع: {projDetails?.expectedReturn}%</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-[#00b074] font-bold">{alloc.amount.toLocaleString()} USDT</p>
                            <p className="text-[9px] text-[#94a3b8]/80 font-data-tabular">نسبة مئوية: {alloc.percentage}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-[#00b074]/5 p-4 rounded-xl border border-[#00b074]/20 flex gap-3 text-xs text-[#94a3b8] items-start mt-4">
                    <AlertCircle className="w-5 h-5 text-[#00b074] shrink-0" />
                    <p>
                      <strong>ملاحظة تقنية:</strong> بالنقر على زر التوزيع أدناه، سيقوم النظام تلقائياً بخصم <strong>{budget.toLocaleString()} USDT</strong> من رصيدك وتوزيعها على المشاريع أعلاه مع توثيق المعاملة وحساب الأرباح الفورية.
                    </p>
                  </div>

                  <button
                    onClick={handleApplyAllocation}
                    className="w-full mt-2 py-3 bg-gradient-to-r from-[#00b074] to-[#d4af37] text-white font-bold rounded-xl active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(0,176,116,0.3)] cursor-pointer"
                  >
                    تطبيق وتوزيع محفظة الذكاء الاصطناعي فوراً
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
