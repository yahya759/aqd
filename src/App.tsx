import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { Project, Investment, Transaction, UserProfile } from './types';
import { initialProjects, userTiers } from './data/projects';

// Local storage keys
const USER_KEY = 'aqd_logged_user';
const PROJECTS_KEY = 'aqd_projects';
const INVESTMENTS_KEY = 'aqd_investments';
const TRANSACTIONS_KEY = 'aqd_transactions';
const USDT_KEY = 'aqd_usdt';
const ETH_KEY = 'aqd_eth';
const WALLET_KEY = 'aqd_wallet';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [usdtBalance, setUsdtBalance] = useState<number>(12450.0);
  const [ethBalance, setEthBalance] = useState<number>(4.82);
  const [web3Address, setWeb3Address] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedProjects = localStorage.getItem(PROJECTS_KEY);
      const storedInvestments = localStorage.getItem(INVESTMENTS_KEY);
      const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
      const storedUsdt = localStorage.getItem(USDT_KEY);
      const storedEth = localStorage.getItem(ETH_KEY);
      const storedWeb3 = localStorage.getItem(WALLET_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
      }

      if (storedInvestments) {
        setInvestments(JSON.parse(storedInvestments));
      } else {
        // Initial mock investments to make layout premium on first render
        const initInv: Investment[] = [
          {
            projectId: "proj_farming",
            projectTitle: "مشروع الزراعة العمودية الذكية",
            amount: 1500,
            returnRate: 15,
            date: "2026-05-10"
          },
          {
            projectId: "proj_logistics",
            projectTitle: "نظام أتمتة لوجستي الذكي",
            amount: 2500,
            returnRate: 18,
            date: "2026-05-15"
          }
        ];
        setInvestments(initInv);
        localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(initInv));
      }

      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        // Initial mock transactions matching the mock investments
        const initTx: Transaction[] = [
          {
            id: "tx_0",
            date: "2026-05-10",
            type: "invest",
            amount: 1500,
            currency: "USDT",
            projectName: "مشروع الزراعة العمودية الذكية",
            status: "completed"
          },
          {
            id: "tx_1",
            date: "2026-05-12",
            type: "deposit",
            amount: 10000,
            currency: "USDT",
            status: "completed"
          },
          {
            id: "tx_2",
            date: "2026-05-15",
            type: "invest",
            amount: 2500,
            currency: "USDT",
            projectName: "نظام أتمتة لوجستي الذكي",
            status: "completed"
          }
        ];
        setTransactions(initTx);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(initTx));
      }

      if (storedUsdt) setUsdtBalance(Number(storedUsdt));
      if (storedEth) setEthBalance(Number(storedEth));
      if (storedWeb3) setWeb3Address(storedWeb3);
    } catch (e) {
      console.error("Error reading local state", e);
    }
  }, []);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    
    // Simulate auto wallet link in background
    const mockAddr = `0x${Math.floor(Math.random() * 10000000).toString(16)}...${Math.floor(Math.random() * 1000).toString(16)}9F`;
    setWeb3Address(mockAddr);
    localStorage.setItem(WALLET_KEY, mockAddr);

    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setWeb3Address(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(WALLET_KEY);
    setCurrentPage('landing');
  };

  const handleSwitchProfile = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    
    // Generates a distinctive wallet address for Ahmed Al-Ali vs Fahad Al-Otaibi
    const ext = profile.name.includes('العتيبي') ? 'A72b' : 'F4d1';
    const mockAddr = `0xDe93...${ext}`;
    setWeb3Address(mockAddr);
    localStorage.setItem(WALLET_KEY, mockAddr);
  };

  const handleInvest = (projectId: string, amount: number) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    // Check balance
    if (amount > usdtBalance) return;

    // 1. Deduct balance
    const updatedUsdt = usdtBalance - amount;
    setUsdtBalance(updatedUsdt);
    localStorage.setItem(USDT_KEY, updatedUsdt.toString());

    // 2. Increment raised amount in projects
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, raisedAmount: p.raisedAmount + amount };
      }
      return p;
    });
    setProjects(updatedProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));

    // 3. Add to investments checklist
    const newInvestment: Investment = {
      projectId: proj.id,
      projectTitle: proj.title,
      amount,
      returnRate: proj.expectedReturn,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedInvestments = [newInvestment, ...investments];
    setInvestments(updatedInvestments);
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(updatedInvestments));

    // 4. Create action transaction log
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'invest',
      amount,
      currency: 'USDT',
      projectName: proj.title,
      status: 'completed'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTx));
  };

  const handleDeposit = (amount: number, currency: 'USDT' | 'ETH') => {
    if (currency === 'USDT') {
      const updated = usdtBalance + amount;
      setUsdtBalance(updated);
      localStorage.setItem(USDT_KEY, updated.toString());
    } else {
      const updated = ethBalance + amount;
      setEthBalance(updated);
      localStorage.setItem(ETH_KEY, updated.toString());
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'deposit',
      amount,
      currency,
      status: 'completed'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTx));
  };

  const handleWithdraw = (amount: number, currency: 'USDT' | 'ETH') => {
    if (currency === 'USDT') {
      const updated = usdtBalance - amount;
      setUsdtBalance(updated);
      localStorage.setItem(USDT_KEY, updated.toString());
    } else {
      const updated = ethBalance - amount;
      setEthBalance(updated);
      localStorage.setItem(ETH_KEY, updated.toString());
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'withdraw',
      amount,
      currency,
      status: 'completed'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTx));
  };

  const handleConnectWallet = () => {
    const mockAddr = `0x${Math.floor(Math.random() * 1000000).toString(16)}e73...${Math.floor(Math.random() * 500).toString(16)}0`;
    setWeb3Address(mockAddr);
    localStorage.setItem(WALLET_KEY, mockAddr);
    alert("تم ربط المحفظة اللامركزية بنجاح بنظام البلوكشين!");
  };

  const handleDisconnectWallet = () => {
    setWeb3Address(null);
    localStorage.removeItem(WALLET_KEY);
    alert("تم قطع الاتصال بالشبكة للمحافظة على أمان بياناتك الاستثمارية.");
  };

  const handleAllocateAI = (allocations: { projectId: string; amount: number }[]) => {
    let currentBalance = usdtBalance;
    const workingProjects = [...projects];
    const workingInvestments = [...investments];
    const workingTx = [...transactions];

    allocations.forEach(alloc => {
      const proj = workingProjects.find(p => p.id === alloc.projectId);
      if (!proj || alloc.amount > currentBalance) return;

      currentBalance -= alloc.amount;

      // Project raised
      proj.raisedAmount += alloc.amount;

      // Investment list
      workingInvestments.unshift({
        projectId: proj.id,
        projectTitle: proj.title,
        amount: alloc.amount,
        returnRate: proj.expectedReturn,
        date: new Date().toISOString().split('T')[0]
      });

      // Transaction log
      workingTx.unshift({
        id: `tx_${Date.now()}_${Math.random()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'invest',
        amount: alloc.amount,
        currency: 'USDT',
        projectName: proj.title,
        status: 'completed'
      });
    });

    setUsdtBalance(currentBalance);
    localStorage.setItem(USDT_KEY, currentBalance.toString());

    setProjects(workingProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(workingProjects));

    setInvestments(workingInvestments);
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(workingInvestments));

    setTransactions(workingTx);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(workingTx));
  };

  const handleSelectProjectAndInvest = (proj: Project) => {
    setCurrentPage('dashboard');
    setTimeout(() => {
      const section = document.getElementById(proj.id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={`w-full bg-[#0c0e14] ${currentPage === 'dashboard' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <LandingPage
              projects={projects}
              user={user}
              onNavigate={setCurrentPage}
              onSelectProjectAndInvest={handleSelectProjectAndInvest}
            />
          </motion.div>
        )}
        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        )}
        {currentPage === 'dashboard' && user && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="h-full w-full overflow-hidden"
          >
            <Dashboard
              user={user}
              projects={projects}
              investments={investments}
              transactions={transactions}
              usdtBalance={usdtBalance}
              ethBalance={ethBalance}
              web3Address={web3Address}
              onLogout={handleLogout}
              onSwitchProfile={handleSwitchProfile}
              onInvest={handleInvest}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
              onConnectWallet={handleConnectWallet}
              onDisconnectWallet={handleDisconnectWallet}
              onAllocateAI={handleAllocateAI}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
