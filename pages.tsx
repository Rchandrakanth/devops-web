
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserContext } from './App';
import { Card, Button, ModuleCardComponent, QuizQuestionComponent, LeaderboardItemComponent, XPProgressBar, BadgeDisplay, StatCard, Modal, Tooltip as BadgeTooltip } from './components';
import { MOCK_MODULES, MOCK_QUIZZES, MOCK_USERS, PIPELINE_TOOLS, ICONS } from './constants';
import { Module, Quiz, QuizQuestion, PageView, PipelineTool } from './types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-120px)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/30">
      <ICONS.Sparkles className="w-24 h-24 text-blue-400 mb-6 animate-pulse" />
      <h1 className="text-5xl font-bold text-slate-100 mb-6">Welcome to DevOps Quest!</h1>
      <p className="text-xl text-slate-300 mb-10 max-w-2xl">
        Embark on an epic journey to master DevOps and DevSecOps. Learn through interactive modules, build CI/CD pipelines, conquer quizzes, and climb the leaderboard!
      </p>
      <div className="space-x-4">
        <Button size="lg" onClick={() => navigate('/modules')} leftIcon={<ICONS.Modules />}>
          Explore Modules
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')} leftIcon={<ICONS.Dashboard />}>
          View Dashboard
        </Button>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <Card className="!bg-slate-800/70">
          <ICONS.Modules className="w-12 h-12 text-blue-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
          <p className="text-sm text-slate-400">Earn XP and badges as you complete modules and quizzes.</p>
        </Card>
        <Card className="!bg-slate-800/70">
          <ICONS.Visualizer className="w-12 h-12 text-green-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Pipeline Simulator</h3>
          <p className="text-sm text-slate-400">Visualize and understand CI/CD workflows interactively.</p>
        </Card>
        <Card className="!bg-slate-800/70">
          <ICONS.Leaderboard className="w-12 h-12 text-yellow-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Compete & Achieve</h3>
          <p className="text-sm text-slate-400">Track your progress and compete on the global leaderboard.</p>
        </Card>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const userContext = useContext(UserContext);
  if (!userContext || !userContext.user) return <p>Loading user data...</p>;
  const { user } = userContext;

  const modulesCompletedCount = user.completedModuleIds.length;
  const totalModules = MOCK_MODULES.length;
  const badgesEarnedCount = user.badges.length;

  const progressData = [
    { name: 'Git Basics', xp: MOCK_MODULES.find(m=>m.id==='git-basics')?.xpReward || 0, userXp: user.completedModuleIds.includes('git-basics') ? MOCK_MODULES.find(m=>m.id==='git-basics')?.xpReward : 0 },
    { name: 'Jenkins CI', xp: MOCK_MODULES.find(m=>m.id==='jenkins-ci')?.xpReward || 0, userXp: user.completedModuleIds.includes('jenkins-ci') ? MOCK_MODULES.find(m=>m.id==='jenkins-ci')?.xpReward : 0 },
    { name: 'Docker Intro', xp: MOCK_MODULES.find(m=>m.id==='docker-intro')?.xpReward || 0, userXp: user.completedModuleIds.includes('docker-intro') ? MOCK_MODULES.find(m=>m.id==='docker-intro')?.xpReward : 0 },
  ];
  
  const completionPieData = [
      { name: 'Completed', value: modulesCompletedCount, fill: '#3b82f6'}, // blue-500
      { name: 'Remaining', value: totalModules - modulesCompletedCount, fill: '#374151'} // gray-700
  ];


  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-2">Welcome back, {user.name}!</h1>
      <p className="text-lg text-slate-400 mb-8">Here's your current progress on your DevOps Quest.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total XP Earned" value={user.xp} iconName="Sparkles" color="text-yellow-400" />
        <StatCard title="Modules Completed" value={`${modulesCompletedCount}/${totalModules}`} iconName="Modules" color="text-green-400" />
        <StatCard title="Badges Unlocked" value={badgesEarnedCount} iconName="Trophy" color="text-orange-400" />
        <StatCard title="Current Rank" value="#1" iconName="Leaderboard" color="text-purple-400" /> {/* Mock Rank */}
      </div>

      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">Your XP Journey</h2>
        <XPProgressBar xp={user.xp} goalXp={ (user.xp < 500) ? 500 : (user.xp < 1000 ? 1000 : 1500)} />
        <p className="text-sm text-slate-400 mt-2">Keep learning to unlock new levels and rewards!</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-semibold mb-4 text-slate-100">Earned Badges</h2>
          {user.badges.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {user.badges.map(badge => (
                <BadgeTooltip key={badge.id} text={`${badge.name}: ${badge.description}`}>
                    <BadgeDisplay badge={badge} size="md" />
                </BadgeTooltip>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No badges earned yet. Complete modules to unlock them!</p>
          )}
        </Card>
        <Card>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">Module Completion</h2>
             <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={completionPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label >
                         {completionPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">XP Progress per Module Area (Sample)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} itemStyle={{ color: '#e2e8f0' }} />
            <Legend wrapperStyle={{color: '#e2e8f0'}} />
            <Bar dataKey="userXp" name="Your XP" stackId="a" fill="#3b82f6" />
            <Bar dataKey="xp" name="Max XP" stackId="b" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export const ModulesPage: React.FC = () => {
  const [view, setView] = useState<PageView>(PageView.List);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; totalQuestions: number } | null>(null);
  
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSelectModule = (moduleId: string) => {
    const module = MOCK_MODULES.find(m => m.id === moduleId);
    if (module) {
      setSelectedModule(module);
      setView(PageView.Detail);
      setQuizResult(null); // Reset quiz result when viewing a new module
    }
  };

  const handleStartQuiz = (quizId?: string) => {
    if (!quizId) return;
    const quiz = MOCK_QUIZZES.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setQuizAnswers({});
      setQuizResult(null);
      setView(PageView.Quiz);
    }
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!currentQuiz || !userContext) return;
    let score = 0;
    currentQuiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });
    const percentageScore = Math.round((score / currentQuiz.questions.length) * 100);
    setQuizResult({ score: percentageScore, totalQuestions: currentQuiz.questions.length });
    
    // Update user context
    userContext.submitQuiz(currentQuiz.id, percentageScore, currentQuiz.moduleId);
    if(selectedModule && percentageScore >= 80 && !userContext.user?.completedModuleIds.includes(selectedModule.id)) {
        userContext.completeModule(selectedModule.id, selectedModule.xpReward);
    }

    setView(PageView.QuizResult);
  };

  if (!userContext || !userContext.user) return <p>Loading...</p>;
  const { user } = userContext;

  const renderListView = () => (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-slate-100 mb-8">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MODULES.map(module => (
          <ModuleCardComponent 
            key={module.id} 
            module={module} 
            onSelectModule={handleSelectModule}
            isCompleted={user.completedModuleIds.includes(module.id)}
          />
        ))}
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedModule) return null;
    const IconComponent = ICONS[selectedModule.iconName];
    const isCompleted = user.completedModuleIds.includes(selectedModule.id);
    const quizScore = selectedModule.quizId ? user.quizScores[selectedModule.quizId] : undefined;

    return (
      <div className="container mx-auto p-6">
        <Button onClick={() => setView(PageView.List)} variant="ghost" className="mb-6" leftIcon={<ICONS.Modules />}>Back to Modules</Button>
        <Card className="!bg-slate-800/80">
          <div className="flex items-center mb-4">
            {IconComponent && <IconComponent className="w-12 h-12 mr-4 text-blue-400"/>}
            <h1 className="text-4xl font-bold text-slate-100">{selectedModule.title}</h1>
          </div>
          <div className="mb-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full mr-2 ${
                selectedModule.level === 'Beginner' ? 'bg-green-600 text-green-100' :
                selectedModule.level === 'Intermediate' ? 'bg-yellow-600 text-yellow-100' :
                'bg-red-600 text-red-100'
              }`}>{selectedModule.level}</span>
            <span className="text-yellow-400 font-semibold">XP: {selectedModule.xpReward}</span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 mb-6" dangerouslySetInnerHTML={{ __html: selectedModule.longDescription.replace(/\n/g, '<br />') }} />

          {selectedModule.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full mr-1 mb-1 inline-block">{tag}</span>
          ))}

          {isCompleted && (
            <p className="mt-6 text-green-400 font-semibold flex items-center"><ICONS.Trophy className="w-5 h-5 mr-2" />Module Completed!</p>
          )}
          {quizScore !== undefined && (
             <p className="mt-2 text-sky-400">Your last quiz score: {quizScore}%</p>
          )}

          {selectedModule.quizId && (
            <Button onClick={() => handleStartQuiz(selectedModule.quizId)} size="lg" className="mt-8 w-full md:w-auto" leftIcon={<ICONS.Quizzes/>}>
              {quizScore !== undefined ? 'Retake Quiz' : 'Start Quiz'}
            </Button>
          )}
        </Card>
      </div>
    );
  };

  const renderQuizView = () => {
    if (!currentQuiz) return null;
    return (
      <div className="container mx-auto p-6">
        <Button onClick={() => { setSelectedModule(MOCK_MODULES.find(m => m.id === currentQuiz.moduleId) || null); setView(PageView.Detail); }} variant="ghost" className="mb-6">Back to Module</Button>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">{currentQuiz.title}</h1>
        <p className="text-slate-400 mb-8">Answer the questions below.</p>
        {currentQuiz.questions.map(q => (
          <QuizQuestionComponent 
            key={q.id} 
            question={q} 
            onOptionSelect={(idx) => handleOptionSelect(q.id, idx)}
            selectedOption={quizAnswers[q.id] ?? null}
          />
        ))}
        <Button onClick={handleSubmitQuiz} size="lg" className="mt-4 w-full md:w-auto" disabled={Object.keys(quizAnswers).length !== currentQuiz.questions.length}>
          Submit Quiz
        </Button>
      </div>
    );
  };

  const renderQuizResultView = () => {
    if (!quizResult || !currentQuiz) return null;
    const isPass = quizResult.score >= 80;
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">{isPass ? "Congratulations!" : "Keep Trying!"}</h1>
          <ICONS.Trophy className={`w-20 h-20 mx-auto mb-4 ${isPass ? 'text-yellow-400' : 'text-slate-500'}`} />
          <p className="text-xl text-slate-200 mb-2">You scored: <span className={`font-bold ${isPass ? 'text-green-400' : 'text-red-400'}`}>{quizResult.score}%</span></p>
          <p className="text-slate-400 mb-6">({Math.round(quizResult.score / 100 * quizResult.totalQuestions)} out of {quizResult.totalQuestions} correct)</p>
          {isPass && selectedModule && <p className="text-green-400 mb-4">You've earned {selectedModule.xpReward} XP for this module!</p>}
          
          <div className="space-y-3">
            <Button onClick={() => { setSelectedModule(MOCK_MODULES.find(m => m.id === currentQuiz.moduleId) || null); setView(PageView.Detail); }} className="w-full">
              Back to Module
            </Button>
            <Button onClick={() => handleStartQuiz(currentQuiz.id)} variant="secondary" className="w-full">
              Retake Quiz
            </Button>
             <Button onClick={() => {setView(PageView.List); setSelectedModule(null);}} variant="ghost" className="w-full">
              View All Modules
            </Button>
          </div>
        </Card>
      </div>
    );
  };
  
  switch(view) {
    case PageView.Detail: return renderDetailView();
    case PageView.Quiz: return renderQuizView();
    case PageView.QuizResult: return renderQuizResultView();
    default: return renderListView();
  }
};


export const VisualizerPage: React.FC = () => {
  const [pipeline, setPipeline] = useState<PipelineTool[]>([]);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const addToolToPipeline = (tool: PipelineTool) => {
    setPipeline(prev => [...prev, tool]);
  };

  const removeToolFromPipeline = (toolId: string) => {
    setPipeline(prev => prev.filter(t => t.id !== toolId || !prev.find(pt => pt.id === toolId))); // a bit complex to remove only one instance
  }
  
  const generateConfig = () => {
    // This is a mock config generator
    const config = {
      name: "My Awesome Pipeline",
      stages: pipeline.map(tool => ({
        name: tool.name,
        tool: tool.id,
        category: tool.category,
        // parameters: {} // Add mock parameters based on tool type
      }))
    };
    return JSON.stringify(config, null, 2);
  };


  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      {/* Tools Palette */}
      <Card className="lg:w-1/4 h-full overflow-y-auto !bg-slate-800/70">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">DevSecOps Tools</h2>
        <div className="space-y-3">
          {PIPELINE_TOOLS.map(tool => {
            const IconComponent = ICONS[tool.iconName];
            return (
              <div
                key={tool.id}
                onClick={() => addToolToPipeline(tool)}
                className="flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 cursor-grab transition-colors group"
              >
                {IconComponent && <IconComponent className="w-6 h-6 mr-3 text-blue-400 group-hover:text-blue-300" />}
                <span className="text-slate-200 group-hover:text-white">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Pipeline Canvas */}
      <Card className="flex-grow h-full flex flex-col !bg-slate-800/70">
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-2xl font-semibold text-slate-100">CI/CD Pipeline Visualizer</h2>
           <div className="space-x-2">
                <Button onClick={() => setShowConfigModal(true)} disabled={pipeline.length === 0} variant="secondary" leftIcon={<ICONS.Playground />}>
                Generate Config
                </Button>
                <Button onClick={() => setPipeline([])} variant="danger" disabled={pipeline.length === 0}>
                Clear Pipeline
                </Button>
           </div>
        </div>
        <div className="flex-grow border-2 border-dashed border-slate-700 rounded-lg p-4 bg-slate-900/50 overflow-y-auto">
          {pipeline.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <ICONS.Visualizer className="w-24 h-24 mb-4" />
              <p className="text-lg">Drag tools from the palette to build your pipeline.</p>
              <p className="text-sm">(Click tools on the left to add them to the pipeline)</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2 overflow-x-auto p-2">
              {pipeline.map((tool, index) => {
                const IconComponent = ICONS[tool.iconName];
                return (
                  <React.Fragment key={`${tool.id}-${index}`}>
                    {index > 0 && (
                      <div className="w-8 h-1 bg-slate-600 rounded-full mx-1"></div>
                    )}
                    <div className="flex flex-col items-center p-3 bg-slate-700 rounded-lg shadow-md min-w-[120px] text-center relative group">
                      {IconComponent && <IconComponent className="w-10 h-10 mb-2 text-blue-400" />}
                      <p className="text-sm text-slate-200">{tool.name}</p>
                       <button 
                          onClick={() => removeToolFromPipeline(tool.id)} // This needs improvement to remove specific instance
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          title="Remove"
                        >X</button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
         <p className="text-xs text-slate-500 mt-2">Note: This is a simplified visualizer. Full drag-and-drop functionality with connections would require a library like React Flow.</p>
      </Card>
      
      <Modal isOpen={showConfigModal} onClose={() => setShowConfigModal(false)} title="Pipeline Configuration">
        <pre className="bg-slate-900 p-4 rounded-md text-sm text-slate-300 overflow-x-auto max-h-96">
          <code>{generateConfig()}</code>
        </pre>
        <Button onClick={() => setShowConfigModal(false)} className="mt-4 w-full">Close</Button>
      </Modal>
    </div>
  );
};


export const PlaygroundPage: React.FC = () => {
  const [code, setCode] = useState(`# Example Dockerfile\nFROM ubuntu:latest\nRUN apt-get update && apt-get install -y nginx\nCMD ["nginx", "-g", "daemon off;"]`);
  const [output, setOutput] = useState<string>("Click 'Run Code' to see simulated output.");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Simulating code execution...\n");
    // Simulate processing based on code type
    setTimeout(() => {
      let simulatedOutput = "Execution complete.\n";
      if (code.toLowerCase().includes("dockerfile")) {
        simulatedOutput += "Dockerfile parsed successfully.\nSimulated image build...\nImage 'my-app:latest' built.\n";
      } else if (code.toLowerCase().includes("jenkinsfile")) {
        simulatedOutput += "Jenkinsfile syntax check passed.\nSimulating pipeline stages...\nBuild > Test > Deploy stages completed.\n";
      } else {
        simulatedOutput += "Code executed (simulated).\n";
      }
      setOutput(prev => prev + simulatedOutput);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col h-[calc(100vh-120px)]">
      <h1 className="text-4xl font-bold text-slate-100 mb-6">Code Playground</h1>
      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        {/* Code Editor */}
        <div className="lg:w-1/2 flex flex-col">
          <Card className="flex-grow flex flex-col !bg-slate-800/70">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-slate-100">Editor (YAML, Dockerfile, etc.)</h2>
              <select className="bg-slate-700 text-slate-200 p-2 rounded-md text-sm">
                <option>Dockerfile</option>
                <option>Jenkinsfile</option>
                <option>YAML</option>
                <option>Shell Script</option>
              </select>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow w-full p-3 bg-slate-900 text-slate-200 rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              placeholder="Write your Dockerfile, Jenkinsfile, or other scripts here..."
            />
          </Card>
        </div>

        {/* Output/Terminal */}
        <div className="lg:w-1/2 flex flex-col">
          <Card className="flex-grow flex flex-col !bg-slate-800/70">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">Simulated Terminal Output</h2>
            <pre className="flex-grow w-full p-3 bg-slate-900 text-slate-300 rounded-md border border-slate-700 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output}
            </pre>
          </Card>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <Button onClick={() => { setCode(''); setOutput("Output cleared.");}} variant="secondary" disabled={isRunning}>Clear Editor & Output</Button>
        <Button onClick={handleRunCode} disabled={isRunning} leftIcon={isRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <ICONS.Playground />}>
          {isRunning ? 'Running...' : 'Run Code (Simulated)'}
        </Button>
      </div>
      <p className="text-xs text-slate-500 mt-2 text-right">Note: Code execution is simulated. No actual commands are run.</p>
    </div>
  );
};

// Placeholder for QuizzesPage if navigating directly to /quizzes
export const QuizzesLandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-slate-100 mb-6">Quizzes</h1>
      <p className="text-lg text-slate-300 mb-8">
        Test your knowledge by taking quizzes associated with each module. Navigate to a module and find its quiz.
      </p>
      <Button onClick={() => navigate('/modules')} size="lg" leftIcon={<ICONS.Modules/>}>
        Go to Modules
      </Button>
    </div>
  );
}


export const LeaderboardPage: React.FC = () => {
  // Sort users by XP in descending order
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.xp - a.xp);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-8">
        <ICONS.Leaderboard className="w-12 h-12 text-yellow-400 mr-4"/>
        <h1 className="text-4xl font-bold text-slate-100">Global Leaderboard</h1>
      </div>
      
      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <LeaderboardItemComponent key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
