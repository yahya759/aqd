import React from 'react';
import { motion } from 'motion/react';
import { Shield, Rocket, HelpCircle, Activity, Award, Flame, Users, CheckCircle2, TrendingUp, Cpu, Database, Stethoscope, ArrowLeft } from 'lucide-react';
import { Project, UserProfile } from '../types';
import VisionEmblem from './VisionEmblem';

interface LandingPageProps {
  projects: Project[];
  user: UserProfile | null;
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
  onSelectProjectAndInvest?: (proj: Project) => void;
}

export default function LandingPage({ projects, user, onNavigate, onSelectProjectAndInvest }: LandingPageProps) {
  const activeProjects = projects.filter(p => p.status === 'active').slice(0, 3);

  return (
    <div className="min-h-screen saudi-backdrop-light text-slate-800 selection:bg-[#00b074]/30 overflow-x-hidden">
      {/* Top Banner decoration with interactive drifting movement to make page look alive */}
      <motion.div 
        animate={{ 
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.6, 0.9, 0.7, 0.6]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b074]/10 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 40, 0],
          y: [0, 40, -25, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.5, 0.8, 0.6, 0.5]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#8dc63f]/8 blur-[100px] pointer-events-none" 
      />

      {/* Header / Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 w-full h-20 sticky top-0 bg-white/85 backdrop-blur-xl border-b border-emerald-100/60 z-50 shadow-sm shadow-emerald-950/5">
        <div className="flex items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <VisionEmblem size="xs" />
            <span className="font-display-lg text-headline-md tracking-tighter vision-text-gradient font-black">عقد</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 font-bold">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('landing')} 
              className="font-body-md text-sm text-[#00b074] border-b-2 border-[#00b074] pb-1 transition-colors cursor-pointer"
            >
              الرئيسية
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#how-it-works" 
              className="font-body-md text-sm text-slate-600 hover:text-[#00b074] transition-colors"
            >
              كيف يعمل
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="font-body-md text-sm text-slate-600 hover:text-[#00b074] transition-colors"
            >
              مشاريعنا
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#vision" 
              className="font-body-md text-sm text-slate-600 hover:text-[#00b074] transition-colors"
            >
              رؤية 2030
            </motion.a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('dashboard')}
              className="font-body-md text-sm bg-gradient-to-r from-[#00b074] to-[#8dc63f] text-white px-6 py-2.5 rounded-xl transition-all font-bold cursor-pointer shadow-md shadow-emerald-500/10"
            >
              لوحة التحكم
            </motion.button>
          ) : (
            <>
              <motion.button 
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('login')} 
                className="font-body-md text-sm text-slate-600 hover:text-[#00b074] px-4 py-2 transition-all cursor-pointer font-bold"
              >
                دخول
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, shadow: "0px 0px 25px rgba(0,176,116,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('login')}
                className="font-body-md text-sm bg-[#00b074] text-white px-6 py-2.5 rounded-xl transition-all font-bold hover:shadow-[0_0_20px_rgba(0,176,116,0.25)] cursor-pointer"
              >
                حساب جديد
              </motion.button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-12 text-center pt-16">
          <div className="max-w-4xl z-10 flex flex-col items-center">
            
            {/* Centerpiece Saudi Vision Animated Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 select-none pointer-events-none"
            >
              <VisionEmblem size="lg" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b074]/10 border border-[#00b074]/20 text-[#00b074] mb-8 font-bold"
            >
              <Activity className="w-[18px] h-[18px]" />
              <span className="font-label-sm text-[12px]">منصة استثمار مدعومة بالذكاء الاصطناعي</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display-lg text-display-lg-mobile md:text-[56px] mb-8 leading-tight font-black text-slate-900"
            >
              استثمر في مستقبل <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8dc63f] via-[#00b074] to-[#00b4d8]">الذكاء الاصطناعي</span> مع خبراء متخصصين
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body-lg text-[18px] text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              نوفر عوائد ذكية وموزعة آلياً عبر بروتوكولاتنا المتقدمة والمتوافقة بالكامل مع الشريعة الإسلامية. انضم الآن وباشر أولى استثماراتك الموثوقة.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05, shadow: "0px 0px 30px rgba(0,176,116,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(user ? 'dashboard' : 'login')}
                className="w-full sm:w-auto px-10 py-4 bg-[#00b074] text-white rounded-xl font-extrabold transition-all text-lg cursor-pointer hover:shadow-[0_0_20px_rgba(0,176,116,0.15)] shadow-lg shadow-emerald-500/10"
              >
                ابدأ رحلتك الآن
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(240,253,244,0.9)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="w-full sm:w-auto px-10 py-4 border border-emerald-200/80 bg-white/90 text-emerald-800 rounded-xl font-bold transition-all text-center text-lg shadow-sm"
              >
                اكتشف المشاريع
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white/40 border-t border-b border-emerald-100/30 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display-lg text-3xl md:text-4xl mb-4 font-bold text-slate-900">كيف يعمل عقد؟</h2>
            <div className="w-20 h-1 bg-[#00b074] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,176,116,0.3)" }}
              className="bg-white/95 p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 cursor-pointer border border-emerald-100/50 shadow-lg shadow-emerald-950/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-[#00b074]" />
              </div>
              <h3 className="font-headline-md text-xl mb-4 text-slate-950 font-bold">1. سجل واربط محفظتك</h3>
              <p className="font-body-md text-sm text-slate-500 leading-relaxed font-medium">
                أنشئ حسابك الآمن في ثوانٍ معدودة. يدعم نظامنا الربط السهل والآمن مع محافظ العملات الرقمية الأكثر ثقة (Web3 Wallets).
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,176,116,0.5)" }}
              className="bg-white/95 p-8 rounded-3xl flex flex-col items-center text-center group border border-emerald-400 vision-border-glow transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00b074] flex items-center justify-center mb-6 shadow-[0_4px_15px_rgba(0,176,116,0.25)]">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-headline-md text-xl mb-4 text-slate-950 font-bold">2. اختر مشاريعك</h3>
              <p className="font-body-md text-sm text-emerald-950 leading-relaxed font-medium">
                تصفح مجموعة من المشاريع التقنية المنسقة والمدققة بواسطة الذكاء الاصطناعي والمستشاريين الماليين، وحدد الميزانية المناسبة لك.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,176,116,0.3)" }}
              className="bg-white/95 p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 cursor-pointer border border-emerald-100/50 shadow-lg shadow-emerald-950/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-[#00b074]" />
              </div>
              <h3 className="font-headline-md text-xl mb-4 text-slate-950 font-bold">3. استلم أرباحك فورياً</h3>
              <p className="font-body-md text-sm text-slate-500 leading-relaxed font-medium">
                يتم توزيع الأرباح الناتجة من تمويل تلك التقنيات محلياً وعالمياً آلياً وبشكل دوري إلى محفظتك مباشرة بكل شفافية.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
            >
              <div>
                <h2 className="font-display-lg text-3xl md:text-4xl mb-4 font-bold text-slate-900">آخر المشاريع المتاحة للتمويل</h2>
                <p className="font-body-md text-slate-600 font-medium">استكشف أحدث ابتكارات الذكاء الاصطناعي التي تم تدقيقها والمتاحة للاستثمار.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(user ? 'dashboard' : 'login')}
                className="text-[#00b074] font-black flex items-center gap-2 transition-transform cursor-pointer bg-transparent border-none"
              >
                <span>عرض جميع المشاريع</span>
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0px 10px 30px rgba(0,176,116,0.12)" }}
                  className="group bg-white/95 border border-emerald-100/80 hover:border-[#00b074]/50 rounded-2xl overflow-hidden flex flex-col shadow-md shadow-emerald-950/[0.02]"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#00b074]/90 text-white font-bold px-3 py-1 rounded-full text-xs font-label-sm">
                      عائد المتوقع {project.expectedReturn}%
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 mb-2 block">{project.category}</span>
                      <h4 className="font-headline-md text-lg text-slate-950 mb-2 font-bold">{project.title}</h4>
                      <p className="font-body-md text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed font-medium">{project.description}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-emerald-50">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 font-bold">
                          <span>الهدف المالي:</span>
                          <span className="font-bold text-slate-900">{project.targetAmount.toLocaleString()} USDT</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#00b074] h-full" 
                            style={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-[#00b074] font-black">
                          <span>{((project.raisedAmount / project.targetAmount) * 100).toFixed(0)}% ممول</span>
                          <span>باقي {(project.targetAmount - project.raisedAmount).toLocaleString()} USDT</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "#00b074", color: "#ffffff" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (user) {
                            if (onSelectProjectAndInvest) {
                              onSelectProjectAndInvest(project);
                            }
                          } else {
                            onNavigate('login');
                          }
                        }}
                        className="w-full py-3 bg-emerald-50 text-[#00b074] border border-emerald-200/50 font-bold rounded-xl transition-all cursor-pointer"
                      >
                        استثمر الآن
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Statistics */}
        <section id="vision" className="py-24 px-6 md:px-12 bg-white/45 border-t border-emerald-100/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#00b074]/05 opacity-10 pointer-events-none" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="font-display-lg text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">لماذا تثق بمنصة عقد؟</h2>
              <p className="font-body-md text-slate-600 text-base leading-relaxed font-medium">
                نحن في عقد نسعى لتوفير بيئة استثمارية شفافة ومبسطة للمواطنين والمقيمين في منطقة الخليج العربي ومختلف دول العالم. جميع مشاريعنا يتم تقييمها عبر ذكاء اصطناعي مخصص وتتم مراجعتها من قبل لجان شرعية وفنية قبل الطرح.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <span className="text-[#00b074] text-3xl md:text-4xl font-extrabold block mb-1 font-data-tabular">+50</span>
                  <span className="text-sm text-slate-500 font-bold">مشروع تقني ممول</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <span className="text-[#00b074] text-3xl md:text-4xl font-extrabold block mb-1 font-data-tabular">+10M</span>
                  <span className="text-sm text-slate-500 font-bold">ريال استثمارات مدفوعة</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <span className="text-[#00b074] text-3xl md:text-4xl font-extrabold block mb-1 font-data-tabular">99.9%</span>
                  <span className="text-sm text-slate-500 font-bold">دقة التوزيع الآلي للأرباح</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <span className="text-[#00b074] text-3xl md:text-4xl font-extrabold block mb-1 font-data-tabular">+5,000</span>
                  <span className="text-sm text-slate-500 font-bold">مستثمر نشط</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-10 rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-lg shadow-emerald-950/[0.03] relative overflow-hidden text-center flex flex-col items-center cursor-pointer"
            >
              <div className="mb-6 transform hover:scale-105 transition-all duration-500">
                <VisionEmblem size="md" />
              </div>
              <h3 className="font-headline-md text-xl mb-4 text-slate-900 font-bold">رؤية وطنية طموحة</h3>
              <p className="font-body-md text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                ندعم مستهدفات رؤية المملكة 2030 للتحول الرقمي واقتصاد المعرفة، من خلال توجيه رؤوس الأموال لتمويل الابتكارات المحلية التي تعزز السيادة التقنية وتخلق فرص عمل نوعية.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold">الرؤية الرقمية</span>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold">التنمية المستدامة</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#040e0a] border-t border-[#0b241b] text-sm text-[#94a3b8]">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <VisionEmblem size="xs" />
              <h4 className="font-headline-md vision-text-gradient text-xl font-black">عقد</h4>
            </div>
            <p className="max-w-md leading-relaxed text-sm text-slate-300 font-medium">
            المنصة العربية الأولى المتخصصة في تمويل ابتكارات وتقنيات الذكاء الاصطناعي وبنائها بشكل يتوافق كلياً مع مبادئ الشريعة الإسلامية ورؤية 2030.
          </p>
          <p className="text-[11px] text-[#94a3b8]/70 pt-4">© 2026 عقد. جميع الحقوق محفوظة.</p>
        </div>
        <div>
          <h5 className="font-bold text-[#e2e8f0] mb-4 text-base">استكشف</h5>
          <ul className="space-y-2 text-sm text-slate-300 font-medium">
            <li><button onClick={() => onNavigate('landing')} className="hover:text-[#00b074] transition-colors cursor-pointer bg-transparent border-none">الرئيسية</button></li>
            <li><a href="#how-it-works" className="hover:text-[#00b074] transition-colors">كيف يعمل</a></li>
            <li><a href="#projects" className="hover:text-[#00b074] transition-colors">مشاريعنا</a></li>
            <li><a href="#vision" className="hover:text-[#00b074] transition-colors">رؤية 2030</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#e2e8f0] mb-4 text-base">قانوني</h5>
          <ul className="space-y-2 text-sm text-slate-300 font-medium font-sans">
            <li><a href="#" className="hover:text-[#00b074] transition-colors">الشروط والأحكام</a></li>
            <li><a href="#" className="hover:text-[#00b074] transition-colors">سياسة الخصوصية</a></li>
            <li><a href="#" className="hover:text-[#00b074] transition-colors">تواصل معنا</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
