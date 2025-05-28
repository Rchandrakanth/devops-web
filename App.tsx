
import React, { useState, createContext, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Footer, Modal, Button, LoadingSpinner, BadgeDisplay } from './components';
import { HomePage, DashboardPage, ModulesPage, VisualizerPage, PlaygroundPage, QuizzesLandingPage, LeaderboardPage } from './pages';
import { User, UserContextType, Badge } from './types';
import { INITIAL_USER_STATE, MOCK_BADGES, MOCK_MODULES } from './constants';

export const UserContext = createContext<UserContextType | null>(null);

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300); // Match animation duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <main className={`flex-grow transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <Outlet /> {/* Pages will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [newBadgeEarned, setNewBadgeEarned] = useState<Badge | null>(null);

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      const storedUser = localStorage.getItem('devopsQuestUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // For a first-time "guest" experience or if no user is logged in
        setUser(INITIAL_USER_STATE); 
        setShowWelcomeModal(true); 
      }
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('devopsQuestUser', JSON.stringify(user));
    }
  }, [user]);

  const login = useCallback((userData: User) => {
    setUser(userData);
    setShowWelcomeModal(false); // Close welcome modal on login if it was for guest
  }, []);
  
  const logout = useCallback(() => {
     setUser(INITIAL_USER_STATE); // Reset to guest state
     setShowWelcomeModal(true); // Show welcome again for "guest"
     localStorage.removeItem('devopsQuestUser');
  }, []);


  const completeModule = useCallback((moduleId: string, xpEarned: number) => {
    setUser(prevUser => {
      if (!prevUser || prevUser.completedModuleIds.includes(moduleId)) return prevUser;
      
      const updatedUser = {
        ...prevUser,
        xp: prevUser.xp + xpEarned,
        completedModuleIds: [...prevUser.completedModuleIds, moduleId],
      };

      // Check for DevOps Champion badge
      const allCoreModules = MOCK_MODULES.filter(m => ['git-basics', 'jenkins-ci', 'docker-intro', 'kubernetes-deploy', 'terraform-iac', 'sonarqube-scan', 'vault-secrets'].includes(m.id));
      const allCoreCompleted = allCoreModules.every(coreMod => updatedUser.completedModuleIds.includes(coreMod.id));
      
      let finalUser = updatedUser;
      if (allCoreCompleted && !updatedUser.badges.find(b => b.id === 'badge8')) {
        const championBadge = MOCK_BADGES.find(b => b.id === 'badge8');
        if (championBadge) {
            finalUser = {
                ...updatedUser,
                badges: [...updatedUser.badges, championBadge]
            };
            setNewBadgeEarned(championBadge);
        }
      }
      return finalUser;
    });
  }, []);

  const earnBadge = useCallback((badge: Badge) => {
    setUser(prevUser => {
      if (!prevUser || prevUser.badges.some(b => b.id === badge.id)) return prevUser;
      setNewBadgeEarned(badge);
      return {
        ...prevUser,
        badges: [...prevUser.badges, badge],
      };
    });
  }, []);

  const submitQuiz = useCallback((quizId: string, score: number, moduleIdForXP?: string) => {
    setUser(prevUser => {
        if (!prevUser) return prevUser;
        let newXp = prevUser.xp;
        let newCompletedModules = [...prevUser.completedModuleIds];
        let newBadges = [...prevUser.badges];

        // Award XP and mark module complete if score is >= 80% and module exists
        if (score >= 80 && moduleIdForXP) {
            const module = MOCK_MODULES.find(m => m.id === moduleIdForXP);
            if (module && !prevUser.completedModuleIds.includes(moduleIdForXP)) {
                newXp += module.xpReward;
                newCompletedModules.push(moduleIdForXP);

                // Check for specific badges related to module completion (example for Git Guru)
                if (moduleIdForXP === 'git-basics' && !prevUser.badges.find(b => b.id === 'badge1')) {
                    const gitBadge = MOCK_BADGES.find(b => b.id === 'badge1');
                    if (gitBadge) {
                        newBadges.push(gitBadge);
                        setNewBadgeEarned(gitBadge);
                    }
                }
                 // Add other badge checks similarly...
                if (moduleIdForXP === 'docker-intro' && !prevUser.badges.find(b => b.id === 'badge2')) {
                    const dockerBadge = MOCK_BADGES.find(b => b.id === 'badge2');
                    if (dockerBadge) { newBadges.push(dockerBadge); setNewBadgeEarned(dockerBadge); }
                }
                 if (moduleIdForXP === 'jenkins-ci' && !prevUser.badges.find(b => b.id === 'badge3')) {
                    const jenkinsBadge = MOCK_BADGES.find(b => b.id === 'badge3');
                    if (jenkinsBadge) { newBadges.push(jenkinsBadge); setNewBadgeEarned(jenkinsBadge); }
                }
            }
        }
        
        return {
            ...prevUser,
            xp: newXp,
            completedModuleIds: newCompletedModules,
            badges: newBadges,
            quizScores: {
                ...prevUser.quizScores,
                [quizId]: score,
            },
        };
    });
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <LoadingSpinner size="w-16 h-16" />
      </div>
    );
  }
  
  const handleSimulatedLogin = () => {
    login(INITIAL_USER_STATE); // Simulate login with default user for now
    setShowWelcomeModal(false);
  };


  return (
    <UserContext.Provider value={{ user, loading, completeModule, earnBadge, submitQuiz, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
            <Route path="modules" element={user ? <ModulesPage /> : <Navigate to="/" />} />
            {/* Route for module detail and quiz could be nested or handled within ModulesPage */}
            <Route path="visualizer" element={user ? <VisualizerPage /> : <Navigate to="/" />} />
            <Route path="playground" element={user ? <PlaygroundPage /> : <Navigate to="/" />} />
            <Route path="quizzes" element={user ? <QuizzesLandingPage /> : <Navigate to="/" />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback for unknown routes */}
          </Route>
        </Routes>
      </HashRouter>
      <Modal isOpen={showWelcomeModal && user?.name === INITIAL_USER_STATE.name} onClose={() => setShowWelcomeModal(false)} title="Welcome to DevOps Quest!">
        <p className="text-slate-300 mb-4">
          It looks like you're new here or exploring as a guest!
        </p>
        <p className="text-slate-300 mb-6">
          Click "Start Quest" to begin with a guest profile, or integrate a login system to save your progress across sessions.
        </p>
        <Button onClick={handleSimulatedLogin} className="w-full">
          Start Quest as Guest
        </Button>
      </Modal>
      
      <Modal isOpen={!!newBadgeEarned} onClose={() => setNewBadgeEarned(null)} title="Badge Unlocked!">
        {newBadgeEarned && (
          <div className="text-center">
            <div className="flex justify-center my-4">
                 <BadgeDisplay badge={newBadgeEarned} size="lg" />
            </div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{newBadgeEarned.name}</h3>
            <p className="text-slate-300 mb-6">{newBadgeEarned.description}</p>
            <Button onClick={() => setNewBadgeEarned(null)} className="w-full">Awesome!</Button>
          </div>
        )}
      </Modal>
    </UserContext.Provider>
  );
};

export default App;
