import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Cpu, WalletCards } from 'lucide-react';
import { UserProfile } from '../types';
import { userTiers } from '../data/projects';
import VisionEmblem from './VisionEmblem';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export default function LoginPage({ onLoginSuccess, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [web3Connecting, setWeb3Connecting] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('فضلاً املأ جميع الحقول المطلوبة.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      // Automatically choose first user if they just submitted any credentials
      onLoginSuccess(userTiers[1]); // default to Ahmed Al-Ali
    }, 1200);
  };

  const handleWeb3Login = (walletName: string, userIndex: number) => {
    setWeb3Connecting(walletName);
    setErrorMsg(null);

    setTimeout(() => {
      setWeb3Connecting(null);
      onLoginSuccess(userTiers[userIndex]);
    }, 1500);
  };

  return (
    <div className="min-h-screen saudi-backdrop-light text-slate-800 flex flex-col justify-center items-center p-4 relative">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00b074]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#8dc63f]/10 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-[485px] z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="mb-4">
            <VisionEmblem size="sm" />
          </div>
          <h1 className="font-display-lg text-[44px] tracking-tight font-black leading-none mb-2 vision-text-gradient">عقد</h1>
          <p className="text-emerald-800 font-body-md text-sm font-medium">مستقبلك الاستثماري، يبدأ هنا</p>
        </div>

        {/* Login Credentials Box */}
        <section className="bg-white/95 backdrop-blur-xl border border-emerald-100/80 rounded-3xl p-8 shadow-xl shadow-emerald-900/5 relative">
          <h2 className="font-headline-md text-2xl text-slate-900 mb-8 text-center font-bold">تسجيل الدخول</h2>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-700 p-3 rounded-xl text-sm mb-6 text-center font-bold">
              {errorMsg}
            </div>
          )}

          {web3Connecting ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-[#00b074] border-t-transparent animate-spin" />
              <p className="font-body-md text-[#00b074] text-sm animate-pulse font-bold">جاري الاتصال والتحقق عبر {web3Connecting}...</p>
            </div>
          ) : (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 pr-1" htmlFor="email font-bold">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-12 pl-4 text-slate-900 focus:outline-none focus:border-[#00b074] focus:ring-1 focus:ring-[#00b074]/50 transition-all placeholder:text-slate-300 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pr-1">
                  <label className="block text-xs font-bold text-slate-500" htmlFor="password">كلمة المرور</label>
                  <a href="#" className="text-xs text-[#00b074] hover:underline font-bold" onClick={(e) => e.preventDefault()}>نسيت كلمة المرور؟</a>
                </div>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-12 pl-12 text-slate-900 focus:outline-none focus:border-[#00b074] focus:ring-1 focus:ring-[#00b074]/50 transition-all placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember device checkbox */}
              <div className="flex items-center gap-2 pr-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded bg-white border-slate-200 text-[#00b074] focus:ring-[#00b074]"
                />
                <label htmlFor="remember" className="text-sm text-slate-500 select-none cursor-pointer font-medium">تذكرني على هذا الجهاز</label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#00b074] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
              </motion.button>
            </form>
          )}

          {/* Web3 Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-slate-400 font-bold">أو الاستمرار عبر Web3</span>
            </div>
          </div>

          {/* Web3 Block */}
          <div className="space-y-3 font-medium">
            <motion.button
              onClick={() => handleWeb3Login('MetaMask', 0)}
              disabled={web3Connecting !== null || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-slate-50 border border-slate-100 py-3.5 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer text-slate-800 hover:bg-slate-100/80"
            >
              <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              <span className="font-body-md text-sm">MetaMask (محفظة فهد العتيبي)</span>
            </motion.button>

            <motion.button
              onClick={() => handleWeb3Login('TrustWallet', 1)}
              disabled={web3Connecting !== null || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-slate-50 border border-slate-100 py-3.5 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer text-slate-800 hover:bg-slate-100/80"
            >
              <div className="w-5 h-5 bg-sky-500 rounded-full border-2 border-white" />
              <span className="font-body-md text-sm">TrustWallet (محفظة أحمد العلي)</span>
            </motion.button>
          </div>

          {/* Prompt options */}
          <div className="mt-8 text-center text-sm text-slate-500 font-medium">
            <span>ليس لديك حساب؟ </span>
            <motion.button
              onClick={() => {
                // Auto login as Ahmed Al-Ali
                onLoginSuccess(userTiers[1]);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#00b074] font-bold hover:underline cursor-pointer"
            >
              سجل الآن مجاناً
            </motion.button>
          </div>
        </section>

        {/* Footer Policy Links */}
        <footer className="mt-8 text-center flex justify-center gap-6 text-xs text-slate-500 font-medium">
          <a href="#" className="hover:text-[#00b074] transition-colors">الشروط والأحكام</a>
          <a href="#" className="hover:text-[#00b074] transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-[#00b074] transition-colors">اتصل بنا</a>
        </footer>
      </main>
    </div>
  );
}
