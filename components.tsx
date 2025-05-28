
import React, { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ICONS, NAV_LINKS, MOCK_MODULES } from './constants';
import { Badge, Module, QuizQuestion, User, NavLinkItem } from './types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 inline-flex items-center justify-center transition-colors duration-150";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    ghost: "bg-transparent hover:bg-slate-700 text-slate-300 hover:text-slate-100 focus:ring-slate-500 border border-slate-600 hover:border-slate-500"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div
      className={`bg-slate-800 shadow-lg rounded-xl p-6 ${onClick ? 'cursor-pointer' : ''} ${hoverEffect ? 'transition-all duration-300 ease-in-out hover:shadow-blue-500/30 hover:ring-2 hover:ring-blue-500 hover:-translate-y-1' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-slate-100">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div>{children}</div>
      </div>
      <style>{`
        @keyframes modal-appear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

interface XPProgressBarProps {
  xp: number;
  maxXp?: number; // For level-based progress, optional
  goalXp?: number; // XP for next level/badge
  label?: string;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({ xp, maxXp = 1000, goalXp }) => {
  const percentage = goalXp ? Math.min((xp / goalXp) * 100, 100) : Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm font-medium text-slate-300">
        <span>XP: {xp} {goalXp ? `/ ${goalXp}` : ''}</span>
        {goalXp && <span>Next Goal</span>}
      </div>
      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, size = 'md' }) => {
  const IconComponent = ICONS[badge.iconName];
  const sizeClasses = {
    sm: 'w-10 h-10 p-2 text-xl',
    md: 'w-16 h-16 p-3 text-3xl',
    lg: 'w-24 h-24 p-4 text-5xl',
  };
  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div title={badge.description} className={`flex flex-col items-center group ${size === 'sm' ? 'space-y-1' : 'space-y-2'}`}>
      <div className={`rounded-full ${badge.color} text-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow ${sizeClasses[size]}`}>
        {IconComponent && <IconComponent className={iconSizeClasses[size]} />}
      </div>
      {size !== 'sm' && <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{badge.name}</span>}
    </div>
  );
};

interface ModuleCardComponentProps {
  module: Module;
  onSelectModule: (moduleId: string) => void;
  isCompleted: boolean;
}

export const ModuleCardComponent: React.FC<ModuleCardComponentProps> = ({ module, onSelectModule, isCompleted }) => {
  const IconComponent = ICONS[module.iconName];
  return (
    <Card 
      className={`relative ${isCompleted ? 'border-2 border-green-500 opacity-75' : 'border-2 border-transparent'}`}
      onClick={() => onSelectModule(module.id)}
      hoverEffect={!isCompleted}
    >
      {isCompleted && (
         <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
           Completed
         </div>
       )}
      <div className="flex items-center mb-3">
        {IconComponent && <IconComponent className="w-8 h-8 mr-3 text-blue-400" />}
        <h3 className="text-xl font-semibold text-slate-100">{module.title}</h3>
      </div>
      <p className="text-sm text-slate-400 mb-3 h-12 overflow-hidden">{module.description}</p>
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Level: {module.level}</span>
        <span className="font-semibold text-yellow-400">XP: {module.xpReward}</span>
      </div>
      <div className="mt-3">
        {module.tags.map(tag => (
          <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full mr-1 mb-1 inline-block">{tag}</span>
        ))}
      </div>
    </Card>
  );
};

interface QuizQuestionComponentProps {
  question: QuizQuestion;
  onOptionSelect: (optionIndex: number) => void;
  selectedOption: number | null;
}

export const QuizQuestionComponent: React.FC<QuizQuestionComponentProps> = ({ question, onOptionSelect, selectedOption }) => {
  return (
    <Card className="mb-6 bg-slate-800/70">
      <h4 className="text-lg font-semibold mb-4 text-slate-100">{question.text}</h4>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(index)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-150
              ${selectedOption === index ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-slate-500 text-slate-300'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
};

interface LeaderboardItemComponentProps {
  user: User;
  rank: number;
}

export const LeaderboardItemComponent: React.FC<LeaderboardItemComponentProps> = ({ user, rank }) => {
  return (
    <Card className="flex items-center justify-between !p-4 mb-3 bg-slate-800/70 hover:!shadow-md hover:!ring-1 hover:!ring-slate-700 hover:!-translate-y-0">
      <div className="flex items-center">
        <span className="text-lg font-bold text-slate-400 w-8 text-center">{rank}</span>
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full mx-4 border-2 border-slate-600" />
        <div>
          <p className="text-md font-semibold text-slate-100">{user.name}</p>
          <div className="flex space-x-1 mt-1">
            {user.badges.slice(0, 3).map(badge => <BadgeDisplay key={badge.id} badge={badge} size="sm" />)}
            {user.badges.length > 3 && <span className="text-xs text-slate-500 self-center">+{user.badges.length - 3} more</span>}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-yellow-400">{user.xp} XP</p>
      </div>
    </Card>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold text-white">
          <ICONS.Sparkles className="w-8 h-8 mr-2 text-blue-400" />
          DevOps Quest
        </Link>
        <div className="hidden md:flex space-x-2 items-center">
          {NAV_LINKS.map((link: NavLinkItem) => {
             const IconComponent = ICONS[link.iconName];
             return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors
                     ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`
                  }
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                  {link.label}
                </NavLink>
             );
          })}
        </div>
        {/* Mobile menu button can be added here */}
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 text-center p-6 mt-auto shadow-inner">
      <p>&copy; {new Date().getFullYear()} DevOps Quest. Gamify Your Learning Journey!</p>
    </footer>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof ICONS;
  color?: string; // e.g. 'text-blue-400'
}
export const StatCard: React.FC<StatCardProps> = ({ title, value, iconName, color = 'text-blue-400' }) => {
  const IconComponent = ICONS[iconName];
  return (
    <Card className="flex-1 min-w-[200px]">
      <div className="flex items-center">
        {IconComponent && <IconComponent className={`w-10 h-10 mr-4 ${color}`} />}
        <div>
          <p className="text-3xl font-bold text-slate-100">{value}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </Card>
  );
};

export const LoadingSpinner: React.FC<{size?: string}> = ({size = 'w-12 h-12'}) => {
  return (
    <div className={`animate-spin rounded-full ${size} border-t-4 border-b-4 border-blue-500`}></div>
  );
};

// Tooltip component for badges
export const Tooltip: React.FC<{ text: string, children: ReactNode }> = ({ text, children }) => {
  return (
    <div className="relative group flex flex-col items-center">
      {children}
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};
