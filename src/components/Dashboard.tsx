import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  LogOut, CheckCircle2, Copy, Check, UserCheck, 
  SlidersHorizontal, Bell, User, Mail, Phone, Shield, 
  Laptop, Globe, Sun, Moon, Plus, Camera, Key, Settings,
  Briefcase, TrendingUp, Sparkles, AlertCircle, RefreshCw, Info, Download, Upload, Wallet,
  Menu, X
} from 'lucide-react';
import { Project, Investment, Transaction, UserProfile } from '../types';
import AIConsultation from './AIConsultation';
import VisionEmblem from './VisionEmblem';

interface DashboardProps {
  user: UserProfile;
  projects: Project[];
  investments: Investment[];
  transactions: Transaction[];
  usdtBalance: number;
  ethBalance: number;
  web3Address: string | null;
  onLogout: () => void;
  onSwitchProfile: (user: UserProfile) => void;
  onInvest: (projectId: string, amount: number) => void;
  onDeposit: (amount: number, currency: 'USDT' | 'ETH') => void;
  onWithdraw: (amount: number, currency: 'USDT' | 'ETH') => void;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onAllocateAI: (allocations: { projectId: string; amount: number }[]) => void;
  onNavigate?: (page: 'landing' | 'login' | 'dashboard') => void;
}

export default function Dashboard({
  user, projects, investments, transactions, usdtBalance, ethBalance, web3Address,
  onLogout, onSwitchProfile, onInvest, onDeposit, onWithdraw, onConnectWallet, onDisconnectWallet, onAllocateAI,
  onNavigate
}: DashboardProps) {
  
  // Mobile menu control toggling
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Outer tabs
  const [activeTab, setActiveTab] = useState<'projects' | 'portfolio' | 'settings'>('projects');
  
  // Settings inner sub-tabs (only active when activeTab === 'settings')
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'wallets' | 'appearance' | 'security'>('profile');
  
  // Shared alerts/states
  const [copied, setCopied] = useState(false);
  const [showAIConsult, setShowAIConsult] = useState(false);

  // States for interactive investments
  const [investAmounts, setInvestAmounts] = useState<Record<string, string>>({});

  // Deposit/Withdraw states inside Portfolio tab
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCurrency, setDepositCurrency] = useState<'USDT' | 'ETH'>('USDT');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawCurrency, setWithdrawCurrency] = useState<'USDT' | 'ETH'>('USDT');

  // Interactive user profile edit states
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState('yhea23112003@gmail.com');
  const [profilePhone, setProfilePhone] = useState('+966 50 123 4567');
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [interfaceLanguage, setInterfaceLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarUrl);
  
  // Custom Linked Wallets list (completely dynamic)
  const [linkedWallets, setLinkedWallets] = useState<{ id: string; address: string; label: string }[]>([
    { id: '1', address: web3Address || '0x71C04e73a6e3c5000000000000000000000018df', label: 'المحفظة الافتراضية لعقد' }
  ]);
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [newWalletLabel, setNewWalletLabel] = useState('');

  // Sync profile details if changed externally
  React.useEffect(() => {
    setProfileName(user.name);
    setSelectedAvatar(user.avatarUrl);
    // Sync first linked wallet to system address
    if (web3Address) {
      setLinkedWallets(prev => {
        const copy = [...prev];
        if (copy[0]) {
          copy[0].address = web3Address;
        }
        return copy;
      });
    }
  }, [user.name, user.avatarUrl, web3Address]);

  const presetAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  ];

  const isAr = interfaceLanguage === 'ar';

  const text = {
    brand: isAr ? "عقد" : "Aqd",
    slogan: isAr ? "بوابة الغد للاستثمار التقني" : "The Hub of Future Tech Investments",
    backHome: isAr ? "الرجوع للرئيسية" : "Back to Home",
    logout: isAr ? "تسجيل الخروج" : "Log Out",
    
    // Core Navigation tabs
    tabProjects: isAr ? "فرص الاستثمار حية" : "Investment Opportunities",
    tabPortfolio: isAr ? "المحفظة والتوزيع المالي" : "My Smart Portfolio",
    tabSettings: isAr ? "إعدادات الحساب والهوية" : "Account & Theme Settings",

    // Dashboard Title labels
    projectsTitle: isAr ? "الفرص الاستثمارية النشطة" : "Active Investment Sukuk",
    projectsSub: isAr ? "استثمر ميزانيتك في الصكوك والمشاريع التقنية المعتمدة عالية العوائد والمتوافقة مع الشريعة." : "Gain exposure to audited high-yield tech infrastructure compliant with Islamic Sharia.",
    portfolioTitle: isAr ? "محفظة أصولك وإيداعاتك" : "Portfolio Balance & Assets Tracker",
    portfolioSub: isAr ? "تحكم في أرصدتك الرقمية، باشر عمليات الإيداع والسحب الفورية، وتابع تاريخ معاملاتك بأمان." : "Deposit, withdraw and tracking transactions securely on decentralized rails.",
    settingsTitle: isAr ? "إعدادات النظام والواجهة" : "Visual Theme & Identity Configuration",
    settingsSub: isAr ? "تخصيص كامل لمعلومات الهوية الفردية، تنبيهات الأمان، ربط عناوين المحفظات، ولغة تصفح عقد." : "Customize identity details, real-time channels, Web3 wallet aliases and visual display theme.",

    // AI Consultant
    aiBannerTitle: isAr ? "مستشار الذكاء الاصطناعي لعقد" : "Aqd Smart AI Portfolio Recommender",
    aiBannerSub: isAr ? "حدد ميزانيتك الاستثمارية ومستوى رضاك عن المخاطر، وسيقوم نظام الذكاء الاصطناعي ببناء توزيع عالي الكفاءة تلقائياً." : "Define your investable budget and targeted risk tolerance, let AI build your custom portfolio asset split.",
    aiConsultBtn: isAr ? "ابدأ الاستشارة والمحاكاة الآن" : "Launch AI Co-Pilot Simulation",

    // Projects elements
    category: isAr ? "التصنيف" : "Category",
    returnRate: isAr ? "العائد السنوي المتوقع" : "Expected ROI / IRR",
    duration: isAr ? "المدة المقررة" : "Term Duration",
    fundingTarget: isAr ? "المستهدف التمويلي" : "Total Goal Target",
    fundingRaised: isAr ? "المبلغ الممول حتى الآن" : "Aggregated Funding Raised",
    investAmountPlaceholder: isAr ? "المبلغ بالـ USDT" : "Amount in USDT",
    investActionBtn: isAr ? "استثمر في المشروع" : "Commit Investment",
    investSuccess: isAr ? "تهانينا! تم تسجيل استثمارك بنجاح وسيتم تشغيل العقد الذكي فورا." : "Success! Your allocation is locked and Smart Sukuk is signed.",
    invalidAmount: isAr ? "الرجاء إدخال قيمة صالحة لا تزيد عن الرصيد الحالي للـ USDT." : "Please enter a valid USDT amount up to your available balance.",
    upcomingBadge: isAr ? "يفتح قريباً" : "Opens Soon",
    opensInDays: isAr ? "تبدأ فرصة الاكتتاب خلال " : "Bidding opens in ",
    daysLabel: isAr ? "أيام" : "days",

    // Portfolio Details
    availUsdt: isAr ? "رصيد USDT المتاح" : "Available USDT Balance",
    availEth: isAr ? "رصيد ETH المتاح" : "Available ETH Balance",
    depositSec: isAr ? "إيداع فوري للأموال" : "Deposit Digital Funds",
    withdrawSec: isAr ? "سحب فوري للأموال" : "Instant Cash/Crypto Withdraw",
    depositBtn: isAr ? "تنفيذ الإيداع فوراً" : "Execute Smart Deposit",
    withdrawBtn: isAr ? "تنفيذ السحب فوراً" : "Execute Withdraw",
    historyTitle: isAr ? "تاريخ وسجل الحركات المالية" : "Financial Audits & Transaction logs",
    txTypeInvest: isAr ? "استثمار بمشروع" : "Project Investment",
    txTypeDeposit: isAr ? "إيداع نقدي للرصيد" : "Balance Deposit",
    txTypeWithdraw: isAr ? "سحب نقدي من الرصيد" : "Balance Withdrawal",
    connectedWallet: isAr ? "عناوين محفظة Web3 المتصلة" : "Web3 Cold Wallet Connection",
    connectBtn: isAr ? "ربط محفظة Web3 فوراً" : "Connect Web3 Metamask",
    disconnectBtn: isAr ? "قطع الاتصال وحماية البيانات" : "Disconnect & Freeze Session",

    // Settings elements
    profileTab: isAr ? "الملف الشخصي والهوية" : "Profile & Identity",
    walletsTab: isAr ? "روابط المحفظة وعناوين Web3" : "Linked Wallets & Custom Addresses",
    appearanceTab: isAr ? "المظهر ولغة الواجهة" : "Theme & App Language",
    securityTab: isAr ? "تفضيلات الأمان والتنبيهات" : "Security & Push Preferences",
    fullName: isAr ? "الاسم الكامل للمستثمر" : "Full Registered Name",
    email: isAr ? "عنوان البريد الإلكتروني" : "E-mail Address",
    phone: isAr ? "رقم الهاتف المحمول" : "Mobile Phone Number",
    saveBtn: isAr ? "حفظ كافة التغييرات الشخصية" : "Save Changes",
    savedNotif: isAr ? "تم حفظ التفضيلات والبيانات الشخصية بنجاح بنظام الأمان لعقد!" : "Profile preferences recorded successfully in Aqd secure cluster!",
    avatarSec: isAr ? "أيقونة وصورة المستخدم الرمزية" : "User Photo & Avatar Panel",
    avatarSub: isAr ? "اختر صورة تعبيرية من التفضيلات الجاهزة أو قم بلصق رابط خارجي مخصص مباشرة." : "Select your unique look from available presets or paste any external photo url link.",
    presetsLabel: isAr ? "أيقونات تعبيرية جاهزة متوافقة مع حسابك:" : "Available pre-designed avatars:",
    customAvatarUrl: isAr ? "أو قم بلصق رابط صورة خارجي مخصص:" : "Or configure custom direct external picture URL:",
    urlPlaceholder: isAr ? "مثال: https://images.unsplash.com/photo-..." : "e.g., https://example.com/photo.png",
    
    walletSec: isAr ? "بوابة ربط وعناوين محفظات Web3" : "Network Connections & Decentralized Wallets",
    walletSub: isAr ? "أضف عناوين محفظتك لتلقي الإشعارات الفورية وتوثيق الهوية الرقمية بأمان على بلوكشين عقد." : "Coordinate public wallet addresses for instant verification and signature proofs.",
    addWalletBtn: isAr ? "أضف رابط بمحفظتك" : "Link interactive Web3 Wallet",
    addWalletTitle: isAr ? "ربط محفظة جديدة للنظام" : "Link New Decentralized Wallet",
    aliasLabel: isAr ? "الاسم المستعار للمحفظة" : "Wallet Alias / Label",
    aliasPlaceholder: isAr ? "مثال: محفظة ميتاماسك الرئيسية" : "e.g., MetaMask Cold Wallet",
    addressLabel: isAr ? "عنوان المحفظة العام (Public Address)" : "Blockchain Public Address",
    addressPlaceholder: isAr ? "مثال: 0x71C04e73a6e3c500000018df..." : "Paste public token address starting with 0x...",
    cancel: isAr ? "إلغاء الأمر" : "Cancel",
    confirmLink: isAr ? "ربط وتفويض المحفظة الآن" : "Verify & Confirm Wallet Link",
    customAdded: isAr ? "تم إدراج ورسم عنوان المحفظة الجديدة بنجاح!" : "Interactive wallet address added successfully!",
    noWallets: isAr ? "لا توجد روابط محافظ معروضة حالياً. استخدم الزر لإضافة محفظة." : "No linked wallets yet. Click the button above to add.",
    activeBadge: isAr ? "✓ متصلة ونشطة" : "✓ Active & Connected",
    copied: isAr ? "تم النسخ!" : "Address copied!",
    removeBtn: isAr ? "إزالة" : "Remove",
    removeSuccess: isAr ? "تم إزالة وتطهير رابط المحفظة بنجاح." : "Wallet link removed successfully.",
    copyBtn: isAr ? "نسخ" : "Copy",

    systemPreferences: isAr ? "مظهر وتنسيق لوحة التحكم" : "Dashboard Style & Theme",
    systemPreferencesSub: isAr ? "تحويل كلي وفوري وتلقائي لكافة تفاصيل التصفح بين وضعي الإعتام والإنارة للراحة البصرية." : "Toggle styling instantly between immersive techno dark theme or minimalist clean light layout.",
    appearanceTitle: isAr ? "وضع مظهر لوحة التحكم" : "Dashboard Theme Mode",
    themeDark: isAr ? "المظهر الداكن والسيبراني 🌙" : "Futuristic Cyber Dark Mode 🌙",
    themeLight: isAr ? "المظهر المضيء والكلاسيكي ☀️" : "Minimalist Elegant Light Mode ☀️",
    translateSec: isAr ? "لغة واجهة العرض الافتراضية" : "UI Language & Translation",
    translateSub: isAr ? "تحويل فوري وشامل لجميع العبارات والتصنيفات في الواجهة من العربية للإنجليزية وبالعكس." : "Translate the entire app menu items, placeholders and alert screens cleanly.",

    notifSec: isAr ? "قنوات الإشعارات والتنبيهات الذكية" : "Communication Channels & Alert Feeds",
    notifSub: isAr ? "تحكّم في كيفية استقبال الإشعارات والتنبيهات الخاصة بحالة حسابك وصيانة الشبكة." : "Manage how you receive security updates, notifications, and scheduled service notes.",
    emailNotif: isAr ? "تلقي رسائل وتقارير دورية عبر البريد الإلكتروني" : "E-mail automated weekly system summaries",
    smsNotif: isAr ? "تلقي تنبيهات وعمليات التحقق كرسائل نصية SMS" : "Instant updates via cellular SMS notifications",
    pushNotif: isAr ? "ميزة التحقق الثنائي للأمان (2FA)" : "Browser push alerts & Multi-factor security (2FA)",
    biometricNotif: isAr ? "بوابة الدخول الحيوي الفعالة (Biometrics)" : "Enable FaceID & Biometric verification keys",
    kycBadge: isAr ? "حساب موثق بالكامل KYC" : "Fully Verified KYC Account",
    regDate: isAr ? "تاريخ التسجيل: 24 مايو 2026" : "Registration Date: 24 May 2026",
    deviceStatus: isAr ? "Safari عبر macOS • الرياض، السعودية" : "Safari via macOS • Riyadh, Saudi Arabia",
    deviceLabel: isAr ? "جهاز النشاط الحالي المسجل" : "Current Registered Device",
  };

  const handleAddWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWalletAddress.trim() || !newWalletLabel.trim()) {
      alert(isAr ? "الرجاء تعبئة جميع معلومات المحفظة." : "Please fill out all wallet configuration fields.");
      return;
    }
    setLinkedWallets(prev => [
      ...prev,
      { id: Date.now().toString(), address: newWalletAddress.trim(), label: newWalletLabel.trim() }
    ]);
    setNewWalletAddress('');
    setNewWalletLabel('');
    setIsAddingWallet(false);
    alert(text.customAdded);
  };

  const handleInvestSubmit = (projectId: string) => {
    const rawVal = investAmounts[projectId] || '';
    const numericAmt = parseFloat(rawVal);
    if (isNaN(numericAmt) || numericAmt <= 0 || numericAmt > usdtBalance) {
      alert(text.invalidAmount);
      return;
    }
    onInvest(projectId, numericAmt);
    setInvestAmounts(prev => ({ ...prev, [projectId]: '' }));
    alert(text.investSuccess);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) {
      alert(isAr ? "الرجاء إدخال مبلغ صحيح." : "Please specify a correct amount.");
      return;
    }
    onDeposit(amt, depositCurrency);
    setDepositAmount('');
    alert(isAr ? "تم تسجيل معاملة الإيداع بنجاح!" : "Deposit transaction processed successfully!");
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      alert(isAr ? "الرجاء إدخال مبلغ صحيح." : "Please specify a correct amount.");
      return;
    }
    const currentLimit = withdrawCurrency === 'USDT' ? usdtBalance : ethBalance;
    if (amt > currentLimit) {
      alert(isAr ? "المبلغ يتجاوز رصيدك الحالي." : "Amount exceeds your available balances.");
      return;
    }
    onWithdraw(amt, withdrawCurrency);
    setWithdrawAmount('');
    alert(isAr ? "تم تسجيل معاملة السحب بنجاح!" : "Withdrawal transaction processed successfully!");
  };

  // Percentage calculations
  const totalInvestmentAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className={`h-full w-full overflow-hidden flex flex-col md:flex-row rtl transition-colors duration-300 ${isDarkMode ? 'saudi-backdrop-dark text-white' : 'saudi-backdrop-light text-slate-900'}`}>
      
      {/* MOBILE TOP NAVIGATION BAR */}
      <div className={`md:hidden flex items-center justify-between px-6 py-4 border-b shrink-0 z-30 transition-colors ${isDarkMode ? 'bg-[#051a11]/90 border-[#0f3c28]' : 'bg-white border-emerald-100/60'}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className={`p-2 rounded-xl border ${isDarkMode ? 'border-[#0f3c28] hover:bg-[#042217] text-white' : 'border-emerald-150 hover:bg-emerald-50 text-slate-700'}`}
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-[#00b074]/15 text-[#00b074] font-black px-2.5 py-0.5 rounded-full select-none">
            {user.tier}
          </span>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('landing')}>
            <VisionEmblem size="xs" />
            <h2 className="text-xl font-black font-sans leading-none vision-text-gradient">
              {text.brand}
            </h2>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER BACKDROP LAYER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION PANEL - RESTORED FULL MULTI-TAB DESIGN / ADAPTIVE DRAWER */}
      <aside className={`
        fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] flex flex-col justify-between shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:h-full md:z-auto md:w-80
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        ${isDarkMode ? 'bg-[#051a11]/90 backdrop-blur-xl border-[#0f3c28]/70 border-l' : 'bg-white/90 backdrop-blur-md border-emerald-100/80 border-l'}
      `}>
        <div>
          {/* Brand Logo & Slogan Header with mobile close action */}
          <div className={`p-6 border-b flex items-center justify-between md:flex-row md:items-center text-center md:text-right relative ${isDarkMode ? 'border-[#0f3c28]/60' : 'border-emerald-50'}`}>
            <div className="flex items-center gap-3">
              <VisionEmblem size="xs" />
              <div className="flex flex-col items-start text-right">
                <h2 onClick={() => { onNavigate?.('landing'); setIsMobileMenuOpen(false); }} className="text-[28px] tracking-tight font-black font-sans cursor-pointer hover:opacity-85 leading-none mb-1 vision-text-gradient" title={text.backHome}>
                  {text.brand}
                </h2>
                <span className={`text-[10px] uppercase tracking-widest font-mono font-bold block ${isDarkMode ? 'text-[#94a3b8]/75' : 'text-slate-400'}`}>
                  {text.slogan}
                </span>
              </div>
            </div>

            {/* Close button visible only on mobile/tablet drawer */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-2 rounded-xl md:hidden border transition-colors ${isDarkMode ? 'border-[#0f3c28] hover:bg-[#042217] text-white' : 'border-emerald-100 hover:bg-emerald-50/50 text-slate-700'}`}
              aria-label="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Fully Integrated Interactive Multi-Tab Menu */}
          <nav className="p-4 space-y-2 mt-4">
            
            {/* OPTION 1: INVESTMENT OPPORTUNITIES */}
            <motion.button
              onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-right px-5 py-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#00b074] text-white font-black shadow-md shadow-emerald-500/10'
                  : isDarkMode
                    ? 'text-[#e2e8f0] hover:bg-[#042217]/85'
                    : 'text-slate-600 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">{text.tabProjects}</span>
              </div>
              {activeTab === 'projects' && (
                <span className="w-2 h-2 rounded-full bg-white block animate-pulse" />
              )}
            </motion.button>

            {/* OPTION 2: PORTFOLIO & BALANCES */}
            <motion.button
              onClick={() => { setActiveTab('portfolio'); setIsMobileMenuOpen(false); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-right px-5 py-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-[#00b074] text-white font-black shadow-md shadow-emerald-500/10'
                  : isDarkMode
                    ? 'text-[#e2e8f0] hover:bg-[#042217]/85'
                    : 'text-slate-600 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">{text.tabPortfolio}</span>
              </div>
              {activeTab === 'portfolio' && (
                <span className="w-2 h-2 rounded-full bg-white block animate-pulse" />
              )}
            </motion.button>

            {/* OPTION 3: EXCLUSIVE SETTINGS LAYOUT (NO MONEY INFO PRESENT) */}
            <motion.button
              onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-right px-5 py-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#00b074] text-white font-black shadow-md shadow-emerald-500/10'
                  : isDarkMode
                    ? 'text-[#e2e8f0] hover:bg-[#042217]/85'
                    : 'text-slate-600 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 shrink-0" />
                <span className="text-xs font-semibold">{text.tabSettings}</span>
              </div>
              {activeTab === 'settings' && (
                <span className="w-2 h-2 rounded-full bg-white block animate-pulse" />
              )}
            </motion.button>
          </nav>
        </div>

        {/* User Identity Info in Sidebar Footer */}
        <div className={`p-6 border-t ${isDarkMode ? 'border-[#0f3c28]/60 bg-[#030d07]/45' : 'border-emerald-100/30 bg-emerald-50/20'}`}>
          <div className={`flex items-center gap-3 p-4 rounded-xl border relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#042217]/80 border-[#0f3c28]' : 'bg-white border-emerald-100/60'}`}>
            <div className="relative shrink-0">
              <img 
                src={selectedAvatar} 
                alt={user.name} 
                className="w-11 h-11 rounded-xl border border-[#00b074]/40 object-cover"
              />
              <span className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center bg-[#00b074] ${isDarkMode ? 'border-[#030d07]' : 'border-white'}`}>
                <Check className="w-2 h-2 text-white" />
              </span>
            </div>
            <div className="min-w-0 flex-1 text-right">
              <h4 className={`font-bold text-sm truncate leading-tight ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>{profileName}</h4>
              <span className="text-[10px] text-[#00b074] font-bold block mt-0.5">
                {user.tier}
              </span>
            </div>
          </div>

          <motion.button
            onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
            whileHover={{ scale: 1.02 }}
            className="w-full mt-4 text-right py-2.5 rounded-xl text-red-500 hover:text-red-400 transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer font-sans"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{text.logout}</span>
          </motion.button>
        </div>
      </aside>

      {/* MAIN VIEW CONTROLLER CONTAINER */}
      <main className="flex-grow p-6 md:p-10 space-y-8 overflow-y-auto transition-colors duration-300 bg-transparent">
        
        {/* Dynamic Nav Header containing page details */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-dashed border-slate-200 dark:border-[#0f3c28] pb-6">
          <div className="text-right">
            {activeTab === 'projects' && (
              <>
                <h1 className={`text-2xl font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-900'}`}>{text.projectsTitle}</h1>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.projectsSub}</p>
              </>
            )}
            {activeTab === 'portfolio' && (
              <>
                <h1 className={`text-2xl font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-900'}`}>{text.portfolioTitle}</h1>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.portfolioSub}</p>
              </>
            )}
            {activeTab === 'settings' && (
              <>
                <h1 className={`text-2xl font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-900'}`}>{text.settingsTitle}</h1>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.settingsSub}</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Home switch link */}
            <motion.button
              onClick={() => onNavigate?.('landing')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${isDarkMode ? 'bg-[#042217]/80 border-[#0f3c28] text-[#00b074] hover:bg-[#051a11]' : 'bg-white border-emerald-200/50 text-[#00b074] hover:bg-emerald-50/50'}`}
            >
              <span>{text.backHome}</span>
            </motion.button>

            {/* Inline Light/Dark theme quick controller */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${isDarkMode ? 'bg-[#042217]/80 border-[#0f3c28] text-amber-400 hover:bg-[#051a11]' : 'bg-white border-emerald-200/50 text-slate-700 hover:bg-emerald-50/50'}`}
              title={isAr ? "تبديل مظهر الإضاءة" : "Toggle Color Theme Mode"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </header>

        {/* TAB 1 CONTENT: CORE INVESTMENT SUKUK & AI PORTFOLIO */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Aqd Smart AI Recommender banner */}
            <div className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-[#042217]/90 to-[#051a11]/90 border-[#0f3c28] shadow-xl' : 'bg-gradient-to-r from-white to-emerald-50/40 border-emerald-100 shadow-md shadow-emerald-950/[0.03]'}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00b074]/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-right">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-500">
                    <Sparkles className="w-5 h-5 text-[#00b074] animate-bounce" />
                    <span className="text-xs font-black uppercase tracking-widest">{text.aiBannerTitle}</span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{isAr ? "دعم وتوزيع المحفظة بالذكاء الاصطناعي" : "Automated AI Capital Allocation Guidance"}</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.aiBannerSub}</p>
                </div>

                <button
                  onClick={() => setShowAIConsult(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs py-4 px-8 rounded-2xl transition-all cursor-pointer shadow-lg shadow-emerald-500/15 font-sans"
                >
                  {text.aiConsultBtn}
                </button>
              </div>
            </div>

            {/* Opportunities Catalog Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((p) => {
                const isUpcoming = p.status === 'upcoming';
                const progressPercent = Math.min(100, Math.floor((p.raisedAmount / p.targetAmount) * 100));
                
                return (
                  <div
                    key={p.id}
                    id={p.id}
                    className={`border rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/70 border-[#0f3c28]/80 hover:border-[#00b074]/60' : 'bg-white border-emerald-100/80 hover:shadow-md hover:border-emerald-300'}`}
                  >
                    <div>
                      {/* Photo banner with overlay tag */}
                      <div className="h-56 relative overflow-hidden">
                        <img 
                          src={p.imageUrl} 
                          alt={p.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Sharia compliance tag */}
                        <div className="absolute top-4 right-4 bg-[#00b074]/90 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-md">
                          {isAr ? "✓ متوافق مع الشريعة" : "✓ Sharia Compliant"}
                        </div>

                        {/* Category tag */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-[#00b074] text-[10px] font-mono font-bold px-3 py-1 rounded border border-[#00b074]/30">
                          {p.category}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 space-y-4 text-right">
                        <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{p.title}</h3>
                        <p className={`text-xs leading-normal font-sans ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{p.description}</p>

                        {/* Financial Stats grid */}
                        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#042217]/75 border-[#0f3c28]/40' : 'bg-emerald-50/40 border-emerald-100/45'}`}>
                            <span className={`text-[9px] block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{text.returnRate}</span>
                            <span className="text-sm font-black text-[#00b074] block mt-1">%{p.expectedReturn}</span>
                          </div>
                          
                          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#042217]/75 border-[#0f3c28]/40' : 'bg-emerald-50/40 border-emerald-100/45'}`}>
                            <span className={`text-[9px] block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{text.duration}</span>
                            <span className={`text-xs font-extrabold block mt-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{p.durationMonths} {isAr ? "شهراً" : "M"}</span>
                          </div>

                          <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#042217]/75 border-[#0f3c28]/40' : 'bg-emerald-50/40 border-emerald-100/45'}`}>
                            <span className={`text-[9px] block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{text.fundingTarget}</span>
                            <span className={`text-xs font-black block mt-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{p.targetAmount.toLocaleString()} $</span>
                          </div>
                        </div>

                        {/* Funding Progress */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-[#00b074] font-black">%{progressPercent}</span>
                            <span className={isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}>
                              {p.raisedAmount.toLocaleString()} / {p.targetAmount.toLocaleString()} USDT
                            </span>
                          </div>
                          
                          <div className={`h-2.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#042217]/80' : 'bg-emerald-50/50'}`}>
                            <div 
                              className="h-full bg-gradient-to-r from-[#00b074] to-[#00b074]/70 transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom actions footer custom for projects */}
                    <div className={`p-6 border-t ${isDarkMode ? 'border-[#0f3c28]/60 bg-[#042217]/30' : 'border-emerald-50 bg-emerald-50/10'}`}>
                      {isUpcoming ? (
                        <div className="flex items-center gap-2 text-[#d4af37]">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-black">{text.opensInDays} {p.opensInDays} {text.daysLabel}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="relative w-full sm:flex-1">
                            <input
                              type="number"
                              min="10"
                              placeholder={text.investAmountPlaceholder}
                              value={investAmounts[p.id] || ''}
                              onChange={(e) => setInvestAmounts(prev => ({ ...prev, [p.id]: e.target.value }))}
                              className={`w-full border rounded-xl py-3 px-4 text-xs font-bold font-mono focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]/80 text-white' : 'bg-white border-emerald-100 text-slate-800'}`}
                            />
                            <span className="absolute left-3.5 top-3.5 text-[9px] font-mono text-slate-400 font-bold">USDT</span>
                          </div>
                          <button
                            onClick={() => handleInvestSubmit(p.id)}
                            className="w-full sm:w-auto bg-[#00b074] hover:brightness-105 text-white font-black text-xs py-3.5 px-6 rounded-xl transition-all font-sans cursor-pointer whitespace-nowrap shrink-0 shadow-md hover:shadow-emerald-500/10"
                          >
                            {text.investActionBtn}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2 CONTENT: SMART PORTFOLIO DETAILS & TRANSACTION AUDITS */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Split layout: Total Balance summary & Web3 setup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* USDT & ETH Balances widgets card (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Balance counters display */}
                <div className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-[#041d13]/95 to-[#052d1d]/95 border-[#0f3c28] shadow-xl shadow-black/20' : 'bg-white border-emerald-100/80 shadow-md shadow-emerald-500/5'}`}>
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#0fa57c]/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center text-right">
                    
                    {/* USDT */}
                    <div className="space-y-1">
                      <span className={`text-[10px] tracking-wider uppercase font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{text.availUsdt}</span>
                      <div className="flex items-baseline gap-2 justify-start rtl">
                        <span className="text-2xl md:text-3xl font-black font-mono text-emerald-500">{usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-xs font-extrabold text-[#0fa57c] font-mono">USDT</span>
                      </div>
                    </div>

                    {/* ETH */}
                    <div className="space-y-1 sm:border-r border-dashed border-slate-200 dark:border-[#0f3c28]/40 sm:pr-6">
                      <span className={`text-[10px] tracking-wider uppercase font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{text.availEth}</span>
                      <div className="flex items-baseline gap-2 justify-start rtl">
                        <span className="text-2xl md:text-3xl font-black font-mono text-[#e0b168]">{ethBalance.toFixed(4)}</span>
                        <span className="text-xs font-extrabold text-[#e0b168] font-mono">ETH</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Sub-panels for Deposit / Withdraw side-by-side forms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Deposit interface form */}
                  <div className={`border rounded-2xl p-5 space-y-4 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100/60 shadow-sm shadow-emerald-950/[0.02]'}`}>
                    <h4 className={`text-xs font-black flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      <Download className="w-4 h-4 text-emerald-500" />
                      <span>{text.depositSec}</span>
                    </h4>

                    <form onSubmit={handleDepositSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="any"
                          required
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className={`flex-1 border rounded-lg py-2 px-3 text-xs font-mono font-bold focus:outline-none focus:border-[#0fa57c] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                        />
                        <select
                          value={depositCurrency}
                          onChange={(e) => setDepositCurrency(e.target.value as 'USDT' | 'ETH')}
                          className={`border rounded-lg py-2 px-2.5 text-xs font-mono font-bold ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-white border-emerald-100 text-slate-800'}`}
                        >
                          <option value="USDT">USDT</option>
                          <option value="ETH">ETH</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-2.5 rounded-lg transition-all cursor-pointer"
                      >
                        {text.depositBtn}
                      </button>
                    </form>
                  </div>

                  {/* Withdraw interface form */}
                  <div className={`border rounded-2xl p-5 space-y-4 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100/60 shadow-sm shadow-emerald-950/[0.02]'}`}>
                    <h4 className={`text-xs font-black flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      <Upload className="w-4 h-4 text-amber-500" />
                      <span>{text.withdrawSec}</span>
                    </h4>

                    <form onSubmit={handleWithdrawSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="any"
                          required
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className={`flex-1 border rounded-lg py-2 px-3 text-xs font-mono font-bold focus:outline-none focus:border-[#0fa57c] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                        />
                        <select
                          value={withdrawCurrency}
                          onChange={(e) => setWithdrawCurrency(e.target.value as 'USDT' | 'ETH')}
                          className={`border rounded-lg py-2 px-2.5 text-xs font-mono font-bold ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-white border-emerald-100 text-slate-800'}`}
                        >
                          <option value="USDT">USDT</option>
                          <option value="ETH">ETH</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#e0b168] hover:bg-[#cca15e] text-slate-950 font-black text-xs py-2.5 rounded-lg transition-all cursor-pointer"
                      >
                        {text.withdrawBtn}
                      </button>
                    </form>
                  </div>

                </div>

              </div>

              {/* Web3 cold connection module card (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Web3 connector */}
                <div className={`border rounded-3xl p-6 text-right space-y-4 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
                  <h3 className={`text-sm font-black flex items-center justify-start gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <Wallet className="w-5 h-5 text-[#0fa57c]" />
                    <span>{text.connectedWallet}</span>
                  </h3>

                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-emerald-50'}`}>
                    {web3Address ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full">✓ {text.activeBadge}</span>
                          <span className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Metamask Portal</span>
                        </div>
                        <p className="text-xs font-mono font-bold block pt-1 select-all truncate text-left">{web3Address}</p>
                        
                        <button
                          onClick={onDisconnectWallet}
                          className="w-full text-center mt-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold py-2 rounded-xl cursor-pointer transition-colors"
                        >
                          {text.disconnectBtn}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-3 py-2">
                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {isAr ? "اربط محفظتك الخارجية لبث الصكوك والتراخيص المشفرة." : "Link standard web3 wallets to verify and coordinate tokens."}
                        </p>
                        <button
                          onClick={onConnectWallet}
                          className="mx-auto block bg-[#0fa57c] hover:brightness-105 text-white font-extrabold text-[11px] py-2.5 px-6 rounded-xl cursor-pointer transition-all"
                        >
                          {text.connectBtn}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cyberpunk Growth Line illustration using neat inline premium vectors */}
                <div className={`p-6 border rounded-3xl text-right relative overflow-hidden ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100'}`}>
                  <h4 className={`text-xs font-black block mb-3 uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {isAr ? "محاكاة العوائد التراكمية المحققة" : "Expected Returns Modeling"}
                  </h4>
                  <div className="h-28 w-full flex items-end justify-between relative mt-4">
                    
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                      <div className="border-b border-white w-full" />
                      <div className="border-b border-white w-full" />
                      <div className="border-b border-white w-full" />
                    </div>

                    {/* SVG Line path for beautiful graphic representation */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="cyber-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0fa57c" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#0fa57c" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Spline area */}
                      <path 
                        d="M0,112 C40,90 80,95 120,60 C160,25 200,45 240,15 C280,-10 320,5 360,-5 L360,112 L0,112 Z" 
                        fill="url(#cyber-gradient)" 
                        className="transition-all duration-700"
                      />
                      {/* Spline stroke */}
                      <path 
                        d="M0,112 C40,90 80,95 120,60 C160,25 200,45 240,15 C280,-10 320,5 360,-5" 
                        fill="none" 
                        stroke="#0fa57c" 
                        strokeWidth="3.2" 
                        className="transition-all duration-700" 
                      />
                      {/* Interactive Pulsing Node */}
                      <circle cx="240" cy="15" r="5" fill="#e0b168" className="animate-ping" />
                      <circle cx="240" cy="15" r="4.5" fill="#e0b168" />
                    </svg>

                    <span className="text-[9px] font-mono text-slate-400 absolute bottom-1 right-2">Q1</span>
                    <span className="text-[9px] font-mono text-slate-400 absolute bottom-1 left-2">Today</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Transactions Audit table */}
            <div className={`border rounded-3xl p-6 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
              <div className="pb-4 mb-4 border-b border-dashed border-slate-200 dark:border-[#0f3c28] text-right">
                <h3 className="text-base font-black">{text.historyTitle}</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className={`border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold ${isAr ? 'text-right' : 'text-left'}`}>
                      <th className="pb-3 px-2">تاريخ الحركة</th>
                      <th className="pb-3 px-2">نوع المعاملة</th>
                      <th className="pb-3 px-2 text-center">المقدار</th>
                      <th className="pb-3 px-2">المستلم / المشروع</th>
                      <th className="pb-3 px-2 text-left">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 font-mono">
                    {transactions.map((t) => {
                      const typeLabel = t.type === 'invest' 
                        ? text.txTypeInvest 
                        : t.type === 'deposit' 
                          ? text.txTypeDeposit 
                          : text.txTypeWithdraw;
                      
                      const typeColor = t.type === 'invest' 
                        ? 'text-cyan-400' 
                        : t.type === 'deposit' 
                          ? 'text-emerald-500' 
                          : 'text-amber-500';

                      return (
                        <tr key={t.id} className="hover:bg-slate-350 dark:hover:bg-[#0c0e14]/30 transition-colors">
                          <td className="py-3 px-2 font-mono whitespace-nowrap text-slate-400">{t.date}</td>
                          <td className={`py-3 px-2 font-bold ${typeColor}`}>{typeLabel}</td>
                          <td className="py-3 px-2 font-black text-center whitespace-nowrap">
                            {t.type === 'withdraw' ? '-' : '+'}{t.amount} {t.currency}
                          </td>
                          <td className="py-3 px-2 font-sans text-slate-300 font-medium max-w-[150px] truncate">{t.projectName || 'عقد للتسويات'}</td>
                          <td className="py-3 px-2 text-left">
                            <span className="bg-emerald-500/10 text-emerald-400 rounded-full px-2.5 py-0.5 text-[9px] font-bold">
                              {isAr ? "مكتملة ✓" : "Success"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3 CONTENT: EXCLUSIVE HIGH-FIDELITY SETTINGS WIREFRAME (NO BALANCES OR MONEY INFO AS REQUESTED) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Embedded navigation menu bar for settings categories */}
            <div className={`p-1.5 rounded-2xl flex flex-wrap gap-2 transition-all ${isDarkMode ? 'bg-[#041d13]/80 border border-[#0f3c28]' : 'bg-emerald-50/50 border border-emerald-100'}`}>
              <button
                onClick={() => setActiveSubTab('profile')}
                className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubTab === 'profile'
                    ? 'bg-[#00b074] text-white shadow-md'
                    : isDarkMode ? 'text-[#94a3b8] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>{text.profileTab}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('wallets')}
                className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubTab === 'wallets'
                    ? 'bg-[#00b074] text-white shadow-md'
                    : isDarkMode ? 'text-[#94a3b8] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span>{text.walletsTab}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('appearance')}
                className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubTab === 'appearance'
                    ? 'bg-[#00b074] text-white shadow-md'
                    : isDarkMode ? 'text-[#94a3b8] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                <span>{text.appearanceTab}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('security')}
                className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSubTab === 'security'
                    ? 'bg-[#00b074] text-white shadow-md'
                    : isDarkMode ? 'text-[#94a3b8] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span>{text.securityTab}</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              
              {/* SUBTAB 1: ID & PERSONAL DETAILS */}
              {activeSubTab === 'profile' && (
                <motion.div
                  key="sub-prof"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className={`border rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-[#041d13]/95 to-[#052d1d]/95 border-[#0f3c28] shadow-xl shadow-black/20' : 'bg-gradient-to-br from-white to-emerald-50/20 border-emerald-100 shadow-md shadow-emerald-950/[0.03]'}`}>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#00b074]/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                        
                        {/* Avatar edit ring */}
                        <div className="relative group">
                          <img 
                            src={selectedAvatar} 
                            alt={profileName} 
                            className="w-24 h-24 rounded-3xl border-2 border-[#00b074] object-cover transition-transform group-hover:scale-105 duration-300 shadow-[0_4px_20px_rgba(0,176,116,0.15)]"
                          />
                          <span className="absolute -bottom-1 -left-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                            <Camera className="w-3 h-3 text-white" />
                          </span>
                        </div>

                        <div>
                          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{profileName}</h2>
                          <p className={`text-xs mt-1 font-mono ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{profileEmail}</p>
                          
                          <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                            <span className="text-[10px] bg-[#00b074]/10 text-[#00b074] border border-[#00b074]/30 rounded-full px-3 py-1 font-extrabold">
                              {user.tier}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl min-w-[200px] border ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-white border-emerald-100'} text-center md:text-right`}>
                        <span className={`text-[10px] block ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-400'}`}>{text.kycBadge}</span>
                        <span className="text-sm font-black text-[#00b074] block mt-1">✓ {text.kycBadge}</span>
                        <span className="text-[9px] text-[#94a3b8]/75 block mt-1 font-mono">{text.regDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Information Text Inputs block */}
                    <div className={`lg:col-span-7 border rounded-3xl p-6 space-y-6 transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
                      <h3 className={`text-base font-black flex items-center justify-start gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        <User className="w-5 h-5 text-[#00b074]" />
                        <span>{isAr ? "تحرير الملف الملف للمستثمر" : "Investor Information Details"}</span>
                      </h3>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const feedback = isAr ? "تم حفظ التعديلات بنجاح ✓" : "Settings saved successfully! ✓";
                        alert(feedback);
                      }} className="space-y-4">
                        
                        <div className="space-y-1.5 text-right font-sans">
                          <label className={`text-xs font-bold block mr-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-600'}`}>{text.fullName}</label>
                          <input
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className={`w-full border rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 text-right font-sans">
                            <label className={`text-xs font-bold block mr-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-600'}`}>{text.email}</label>
                            <input
                              type="email"
                              required
                              value={profileEmail}
                              onChange={(e) => setProfileEmail(e.target.value)}
                              className={`w-full border rounded-xl py-3 px-4 text-xs font-mono focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                            />
                          </div>

                          <div className="space-y-1.5 text-right font-sans">
                            <label className={`text-xs font-bold block mr-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-600'}`}>{text.phone}</label>
                            <input
                              type="text"
                              required
                              value={profilePhone}
                              onChange={(e) => setProfilePhone(e.target.value)}
                              className={`w-full border rounded-xl py-3 px-4 text-xs font-mono focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                            />
                          </div>
                        </div>

                        <div className="flex justify-start pt-2">
                          <button
                            type="submit"
                            className="bg-[#00b074] hover:brightness-105 active:scale-95 text-white font-black py-3 px-8 rounded-xl text-xs cursor-pointer transition-all shadow-md"
                          >
                            {text.saveBtn}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Left Column Avatar Presets select */}
                    <div className={`lg:col-span-5 border rounded-3xl p-6 space-y-6 transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
                      <div>
                        <h3 className={`text-base font-black flex items-center justify-start gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          <Camera className="w-5 h-5 text-[#00b074]" />
                          <span>{text.avatarSec}</span>
                        </h3>
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.avatarSub}</p>
                      </div>

                      <div className="space-y-3">
                        <span className={`text-[11px] font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-600'}`}>{text.presetsLabel}</span>
                        <div className="flex flex-wrap gap-2.5 justify-start">
                          {presetAvatars.map((url, i) => (
                            <button
                              key={url}
                              type="button"
                              onClick={() => setSelectedAvatar(url)}
                              className={`w-12 h-12 rounded-xl relative overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${selectedAvatar === url ? 'border-[#00b074] scale-105' : 'border-transparent opacity-80'}`}
                            >
                              <img src={url} alt={`Preset element ${i}`} className="w-full h-full object-cover" />
                              {selectedAvatar === url && (
                                <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white font-black" />
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                        <span className={`text-[11px] font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-600'}`}>{text.customAvatarUrl}</span>
                        <input
                          type="text"
                          value={selectedAvatar}
                          onChange={(e) => setSelectedAvatar(e.target.value)}
                          placeholder={text.urlPlaceholder}
                          className={`w-full border rounded-xl py-3 px-4 text-xs font-mono focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-slate-50 border-emerald-100 text-slate-800'}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBTAB 2: DECEN TRALIZED ADD/REMOVE WALLETS LIST */}
              {activeSubTab === 'wallets' && (
                <motion.div
                  key="sub-wallet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`border rounded-3xl p-6 space-y-5 transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-right">
                      <h3 className={`text-base font-black flex items-center justify-start gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        <Globe className="w-5 h-5 text-[#00b074]" />
                        <span>{text.walletSec}</span>
                      </h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.walletSub}</p>
                    </div>

                    <button
                      onClick={() => setIsAddingWallet(!isAddingWallet)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3.5 px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{text.addWalletBtn}</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isAddingWallet && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleAddWalletSubmit}
                        className={`p-5 rounded-2xl border space-y-4 overflow-hidden ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-emerald-100'}`}
                      >
                        <h4 className={`text-xs font-black block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.addWalletTitle}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1 text-right">
                            <label className={`text-[11px] font-bold ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.aliasLabel}</label>
                            <input
                              type="text"
                              required
                              value={newWalletLabel}
                              onChange={(e) => setNewWalletLabel(e.target.value)}
                              placeholder={text.aliasPlaceholder}
                              className={`w-full border rounded-xl py-3 px-3.5 text-xs font-bold focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-white border-emerald-100 text-slate-800'}`}
                            />
                          </div>

                          <div className="space-y-1 text-right">
                            <label className={`text-[11px] font-bold ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.addressLabel}</label>
                            <input
                              type="text"
                              required
                              value={newWalletAddress}
                              onChange={(e) => setNewWalletAddress(e.target.value)}
                              placeholder={text.addressPlaceholder}
                              className={`w-full border rounded-xl py-3 px-3.5 text-xs font-mono focus:outline-none focus:border-[#00b074] ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-white' : 'bg-white border-emerald-100 text-slate-800'}`}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsAddingWallet(false)}
                            className={`px-4 py-2 border rounded-xl text-xs font-bold cursor-pointer ${isDarkMode ? 'border-[#0f3c28] text-white hover:bg-slate-800' : 'border-emerald-100 text-slate-500 hover:bg-slate-100'}`}
                          >
                            {text.cancel}
                          </button>
                          <button
                            type="submit"
                            className="bg-[#00b074] hover:brightness-105 px-5 py-2 rounded-xl text-xs font-black text-white cursor-pointer"
                          >
                            {text.confirmLink}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="border-t border-slate-200 dark:border-[#0f3c28] pt-4 space-y-3 font-sans">
                    {linkedWallets.length === 0 ? (
                      <p className={`text-xs text-center py-6 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-400'}`}>{text.noWallets}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {linkedWallets.map((wallet) => (
                          <div
                            key={wallet.id}
                            className={`flex justify-between items-center p-4 rounded-xl border relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]/60' : 'bg-white border-emerald-100 hover:shadow-sm'}`}
                          >
                            <div className="text-right flex-1 min-w-0 pr-1 font-sans">
                              <span className={`text-[11px] font-bold block truncate ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>{wallet.label}</span>
                              <span className="text-[10px] font-mono block truncate mt-0.5 text-slate-400">{wallet.address}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[9px] font-bold bg-[#00b074]/15 text-[#00b074] px-2 py-1 rounded-full whitespace-nowrap hidden sm:inline-block">
                                {text.activeBadge}
                              </span>
                              
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(wallet.address);
                                  setCopied(true);
                                  alert(text.copied);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                className={`text-[10px] px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28] text-slate-300 hover:text-white' : 'bg-slate-50 border-emerald-100 text-slate-600 hover:bg-slate-100'}`}
                              >
                                {text.copyBtn}
                              </button>

                              {linkedWallets.length > 1 && (
                                <button
                                  onClick={() => {
                                    setLinkedWallets(prev => prev.filter(w => w.id !== wallet.id));
                                    alert(text.removeSuccess);
                                  }}
                                  className="text-[10px] bg-red-500/10 text-red-400 px-2.5 py-1.5 rounded hover:bg-red-500/20 cursor-pointer"
                                >
                                  {text.removeBtn}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SUBTAB 3: THEME PREFERENCES & LANGUAGES */}
              {activeSubTab === 'appearance' && (
                <motion.div
                  key="sub-app"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`border rounded-3xl p-6 space-y-6 transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}
                >
                  <div className="text-right">
                    <h3 className={`text-base font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>{text.systemPreferences}</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.systemPreferencesSub}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    
                    {/* Dark/Light mode cards select */}
                    <div className="space-y-4 text-right">
                      <div>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.appearanceTitle}</span>
                        <p className={`text-[11px] leading-relaxed block mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.systemPreferencesSub}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsDarkMode(true)}
                          className={`p-4 rounded-xl text-xs font-bold block text-center transition-all cursor-pointer border-2 ${
                            isDarkMode 
                              ? 'bg-[#00b074] text-white border-emerald-400' 
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {text.themeDark}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsDarkMode(false)}
                          className={`p-4 rounded-xl text-xs font-bold block text-center transition-all cursor-pointer border-2 ${
                            !isDarkMode 
                              ? 'bg-[#00b074] text-white border-emerald-500' 
                              : isDarkMode
                                ? 'bg-[#030d07] text-[#94a3b8] border-[#0f3c28]'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {text.themeLight}
                        </button>
                      </div>
                    </div>

                    {/* Language toggler */}
                    <div className="space-y-4 text-right">
                      <div>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.translateSec}</span>
                        <p className={`text-[11px] leading-relaxed block mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.translateSub}</p>
                      </div>

                      <div className={`p-1 rounded-xl border flex ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-emerald-100'}`}>
                        <button
                          type="button"
                          onClick={() => setInterfaceLanguage('ar')}
                          className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${interfaceLanguage === 'ar' ? 'bg-[#00b074] text-white font-extrabold' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          العربية (Arabic)
                        </button>
                        <button
                          type="button"
                          onClick={() => setInterfaceLanguage('en')}
                          className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${interfaceLanguage === 'en' ? 'bg-[#00b074] text-white font-extrabold' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          English (US)
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBTAB 4: SECURITY SWITCHES & ALERTS */}
              {activeSubTab === 'security' && (
                <motion.div
                  key="sub-sec"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className={`border rounded-3xl p-6 space-y-5 transition-all duration-300 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
                    <div>
                      <h3 className={`text-base font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>{text.notifSec}</h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#94a3b8]' : 'text-slate-500'}`}>{text.notifSub}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email summary toggle */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.emailNotif}</span>
                        <button
                          type="button"
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`w-14 h-7 rounded-full p-1 transition-all ${emailNotifications ? 'bg-emerald-500' : 'bg-slate-400'}`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-[26px]' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* SMS text toggle */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.smsNotif}</span>
                        <button
                          type="button"
                          onClick={() => setSmsNotifications(!smsNotifications)}
                          className={`w-14 h-7 rounded-full p-1 transition-all ${smsNotifications ? 'bg-emerald-500' : 'bg-slate-400'}`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${smsNotifications ? 'translate-x-[26px]' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* 2FA validation security */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.pushNotif}</span>
                        <button
                          type="button"
                          onClick={() => setTwoFactor(!twoFactor)}
                          className={`w-14 h-7 rounded-full p-1 transition-all ${twoFactor ? 'bg-emerald-500' : 'bg-slate-400'}`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-[26px]' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* FaceID / TouchID Toggle */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-[#030d07] border-[#0f3c28]' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`text-xs font-bold block ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-700'}`}>{text.biometricNotif}</span>
                        <button
                          type="button"
                          onClick={() => setBiometric(!biometric)}
                          className={`w-14 h-7 rounded-full p-1 transition-all ${biometric ? 'bg-emerald-500' : 'bg-slate-400'}`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${biometric ? 'translate-x-[26px]' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 border rounded-3xl space-y-4 ${isDarkMode ? 'bg-[#041d13]/80 border-[#0f3c28]' : 'bg-white border-emerald-100 shadow-sm'}`}>
                    <h3 className={`text-sm font-black ${isDarkMode ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>{text.deviceLabel}</h3>
                    <div className="border-t border-slate-200 dark:border-[#0f3c28] pt-4 flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#030d07] border border-[#0f3c28]' : 'bg-slate-50 border border-emerald-100'}`}>
                        <Laptop className="w-5 h-5 text-[#00b074]" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black block">{text.deviceStatus}</span>
                        <span className="text-[10px] text-emerald-500 block mt-0.5">✓ {isAr ? "الجهاز موثق ونشط حالياً" : "Current Session Verified & Live"}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}

      </main>

      {/* AQD SMART AI PORTFOLIO ALLOCATION RECOMMENDATION MODAL */}
      <AnimatePresence>
        {showAIConsult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl rounded-3xl overflow-hidden relative border ${isDarkMode ? 'bg-[#121622] border-[#20273a]' : 'bg-white border-slate-200'} p-6 md:p-8`}
            >
              <AIConsultation 
                projects={projects} 
                walletBalance={usdtBalance} 
                onAllocate={(alloc) => {
                  onAllocateAI(alloc);
                  setShowAIConsult(false);
                }} 
                onClose={() => setShowAIConsult(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
