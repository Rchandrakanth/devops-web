
import React from 'react';
import { Module, Quiz, User, Badge, NavLinkItem, PipelineTool } from './types';

// SVG Icon Components
const createIcon = (pathData: React.ReactNode): React.FC<React.SVGProps<SVGSVGElement>> => (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    {pathData}
  </svg>
);

export const ICONS = {
  Home: createIcon(<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />),
  Dashboard: createIcon(<path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4a1 1 0 00-1-1H2a1 1 0 000 2h1a1 1 0 001-1zm13.293 0a1 1 0 00-.707-.293A1 1 0 0015 4.414V5a1 1 0 102 0v-.586a1 1 0 00-.293-.707zM6 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100-4 2 2 0 000 4zm-3 1a2 2 0 100-4 2 2 0 000 4zm12-1a2 2 0 100-4 2 2 0 000 4zm-3 1a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100-4 2 2 0 000 4zm-3 1a2 2 0 100-4 2 2 0 000 4zm12-1a2 2 0 100-4 2 2 0 000 4z" />),
  Modules: createIcon(<path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />),
  Visualizer: createIcon(<path fillRule="evenodd" d="M15.906 2.344a1.5 1.5 0 01.644 1.024l.004.057v1.956c.504.269.94.615 1.293 1.02A3.001 3.001 0 0119 8.5V14a1 1 0 01-1 1H2a1 1 0 01-1-1V8.5a3.001 3.001 0 011.153-2.195 2.951 2.951 0 011.293-1.02V3.425a1.5 1.5 0 01.644-1.024 1.5 1.5 0 011.11-.381c.284.037.55.16.766.348l1.095.962.76-.662c.216-.188.482-.31.766-.348a1.5 1.5 0 011.11-.381c.284.037.55.16.766.348l1.095.962.76-.662c.216-.188.482-.31.766-.348a1.5 1.5 0 011.11-.381zM5 13H3V8.5A1 1 0 014 7.5h1V13zm12-5.5A1 1 0 0116 8.5V13h-2V7.5h1zM13 5h- पॉइंट1v1.5H8.5V5H7v5h1.5V8.5H10V10h1.5V8.5H13V5z" clipRule="evenodd" />),
  Playground: createIcon(<path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 9.75A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75z" clipRule="evenodd" />),
  Quizzes: createIcon(<path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm5.75 10.75a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h3.5zm0-3a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h3.5zm0-3a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h3.5z" clipRule="evenodd" />),
  Leaderboard: createIcon(<path fillRule="evenodd" d="M2.5 2A1.5 1.5 0 001 3.5v2.75A.75.75 0 002.5 7h15a.75.75 0 001.5-1.25V3.5A1.5 1.5 0 0017.5 2h-15zm0 7A1.5 1.5 0 001 10.5v2.75A.75.75 0 002.5 14h15a.75.75 0 001.5-1.25V10.5A1.5 1.5 0 0017.5 9h-15zm0 7A1.5 1.5 0 001 17.5v.75c0 .414.336.75.75.75h16.5a.75.75 0 00.75-.75v-.75A1.5 1.5 0 0017.5 16h-15z" clipRule="evenodd" />),
  Git: createIcon(<path d="M10 1.132a.5.5 0 00-.776-.416L4.268 4H2.5A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-1.768l-4.956-3.284A.5.5 0 0010 1.132zM6.5 11a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-3.5-7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 8.5a.5.5 0 00-1 0v4a.5.5 0 001 0v-4z" />),
  Jenkins: createIcon(<path d="M5.055 2.354A1.5 1.5 0 016.5 1.5h7a1.5 1.5 0 011.445.854L16.5 5.5H3.5l1.555-3.146zM3 7.5v5A1.5 1.5 0 004.5 14h11a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0015.5 6H4.5A1.5 1.5 0 003 7.5zm3 .5a.5.5 0 000 1h8a.5.5 0 000-1H6zm-.5 2.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />),
  Docker: createIcon(<path d="M18.086 7.718a1.5 1.5 0 00-1.378-.695H3.292a1.5 1.5 0 00-1.378.695L.55 11.563A1.5 1.5 0 001.927 14h16.146a1.5 1.5 0 001.377-2.437l-1.364-3.845zM3.75 9.25a.75.75 0 110 1.5.75.75 0 010-1.5zm3 0a.75.75 0 110 1.5.75.75 0 010-1.5zm3 0a.75.75 0 110 1.5.75.75 0 010-1.5zm3 0a.75.75 0 110 1.5.75.75 0 010-1.5z" />),
  Kubernetes: createIcon(<path d="M8.188.227a.75.75 0 011.624 0l1.81 3.258 3.258 1.81a.75.75 0 010 1.624l-3.258 1.81-1.81 3.258a.75.75 0 01-1.624 0l-1.81-3.258L2.32 8.753a.75.75 0 010-1.624l3.258-1.81L8.188.227zm-.75 6.023a.75.75 0 001.5 0V3.125a.75.75 0 00-1.5 0v3.125zm0 7.5a.75.75 0 001.5 0v-3.125a.75.75 0 00-1.5 0v3.125zM3.125 9.25a.75.75 0 000 1.5h3.125a.75.75 0 000-1.5H3.125zm10.625 0a.75.75 0 000 1.5h3.125a.75.75 0 000-1.5h-3.125z" />),
  Terraform: createIcon(<path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.314 4.928A2.003 2.003 0 0113 16H5a2.003 2.003 0 01-1.314-2.072A7.001 7.001 0 012 9zM14.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />),
  Vault: createIcon(<path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />),
  SonarQube: createIcon(<path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.055 9.945a.5.5 0 01.707 0L6 12.182V4.5a.5.5 0 011 0v7.682l2.238-2.237a.5.5 0 01.707 0l2.475 2.475a.5.5 0 010 .707L10 13.818l-2.828-2.828-2.829-2.829a.5.5 0 010-.707l1.712-1.712z" />),
  Trophy: createIcon(<path fillRule="evenodd" d="M15.12 3.78a2.5 2.5 0 00-3.536 0L10 5.353 8.415 3.78a2.5 2.5 0 00-3.536 3.536L10 12.364l5.12-5.048a2.5 2.5 0 000-3.536zM8.5 14.5A1.5 1.5 0 017 13V9.914a1.5 1.5 0 113 0V13a1.5 1.5 0 01-1.5 1.5zm3 0A1.5 1.5 0 0110 13V9.914a1.5 1.5 0 113 0V13a1.5 1.5 0 01-1.5 1.5zM5 17a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />),
  Sparkles: createIcon(<path fillRule="evenodd" d="M10 1.562l.963 1.95L13.188 4l-1.225 2.488L10 8.438l-1.963-1.95L6.812 4l2.225-.488L10 1.562zM5 5.5L4.037 7.45 2.812 8l1.225 2.488L5 12.438l.963-1.95L7.188 10l-1.225-2.488L5 5.5zm10 0l-.963 1.95L12.812 8l1.225 2.488L15 12.438l.963-1.95L17.188 10l-1.225-2.488L15 5.5zM10 12.562l.963 1.95L13.188 15l-1.225 2.488L10 19.438l-1.963-1.95L6.812 17l2.225-.488L10 12.562z" clipRule="evenodd" />),
  Login: createIcon(<path fillRule="evenodd" d="M10 2.5a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0v-8.5a.75.75 0 01.75-.75zM4.524 6.024a.75.75 0 010 1.06l-1.969 1.97H10a.75.75 0 010 1.5H2.555l1.97 1.969a.75.75 0 11-1.061 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5a.75.75 0 011.06 0zm10.952 1.06a.75.75 0 000-1.06l-3.5-3.5a.75.75 0 00-1.06 1.06L12.896 5.5H10a.75.75 0 000 1.5h2.896l-1.97 1.97a.75.75 0 101.061 1.06l3.5-3.5z" clipRule="evenodd" />),
  Logout: createIcon(<path fillRule="evenodd" d="M2.75 2.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0V2.5zM6.03 3.78a.75.75 0 00-1.06 1.06L6.19 6H2.75a.75.75 0 000 1.5h3.44l-1.22 1.22a.75.75 0 001.06 1.06l2.75-2.75a.75.75 0 000-1.06L6.03 3.78zm10.47 3.97a.75.75 0 10-1.06-1.06L14.22 8H10a.75.75 0 000 1.5h4.22l-1.17 1.17a.75.75 0 101.06 1.06l2.75-2.75a.75.75 0 000-1.06l-2.75-2.75z" clipRule="evenodd" />)
};

export const NAV_LINKS: NavLinkItem[] = [
  { path: '/', label: 'Home', iconName: 'Home' },
  { path: '/dashboard', label: 'Dashboard', iconName: 'Dashboard' },
  { path: '/modules', label: 'Modules', iconName: 'Modules' },
  { path: '/visualizer', label: 'Visualizer', iconName: 'Visualizer' },
  { path: '/playground', label: 'Playground', iconName: 'Playground' },
  { path: '/quizzes', label: 'Quizzes', iconName: 'Quizzes' },
  { path: '/leaderboard', label: 'Leaderboard', iconName: 'Leaderboard' },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'badge1', name: 'Git Guru', description: 'Mastered the basics of Git.', iconName: 'Git', color: 'bg-orange-500' },
  { id: 'badge2', name: 'Docker Dynamo', description: 'Successfully containerized an application.', iconName: 'Docker', color: 'bg-blue-500' },
  { id: 'badge3', name: 'CI Commando', description: 'Built your first CI pipeline with Jenkins.', iconName: 'Jenkins', color: 'bg-gray-500' },
  { id: 'badge4', name: 'K8s Captain', description: 'Deployed an application to Kubernetes.', iconName: 'Kubernetes', color: 'bg-indigo-500' },
  { id: 'badge5', name: 'Terraform Trailblazer', description: 'Provisioned infrastructure with Terraform.', iconName: 'Terraform', color: 'bg-purple-500' },
  { id: 'badge6', name: 'Vault Voyager', description: 'Secured secrets with HashiCorp Vault.', iconName: 'Vault', color: 'bg-green-500' },
  { id: 'badge7', name: 'Sonar Scanner', description: 'Analyzed code with SonarQube.', iconName: 'SonarQube', color: 'bg-sky-500' },
  { id: 'badge8', name: 'DevOps Champion', description: 'Completed all core modules.', iconName: 'Trophy', color: 'bg-yellow-400' }
];

export const MOCK_MODULES: Module[] = [
  { 
    id: 'git-basics', 
    title: 'Git Basics & GitHub', 
    slug: 'git-basics', 
    level: 'Beginner', 
    description: 'Learn version control with Git and collaboration with GitHub.',
    longDescription: 'This module covers the fundamentals of Git, including repositories, commits, branches, merges, and remotes. You will also learn how to use GitHub for hosting your repositories and collaborating with others. Topics include: What is Version Control?, Installing Git, Basic Git Commands (init, add, commit, status, log), Branching and Merging, Working with Remote Repositories (clone, push, pull, fetch), Introduction to GitHub (Repositories, Issues, Pull Requests).',
    xpReward: 100, 
    iconName: 'Git',
    quizId: 'quiz-git',
    tags: ['Git', 'GitHub', 'Version Control']
  },
  { 
    id: 'jenkins-ci', 
    title: 'CI with Jenkins', 
    slug: 'jenkins-ci', 
    level: 'Intermediate', 
    description: 'Automate your build and test processes using Jenkins.',
    longDescription: 'Dive into Continuous Integration with Jenkins. This module will guide you through setting up Jenkins, creating your first CI pipeline, and integrating it with your Git repository. You will learn about Jenkins jobs, plugins, and best practices for CI. Key concepts: Introduction to CI/CD, Setting up Jenkins, Creating a Freestyle Project, Configuring SCM (Git), Build Triggers, Build Steps, Post-build Actions, Introduction to Jenkins Pipelines (Scripted and Declarative).',
    xpReward: 150, 
    iconName: 'Jenkins',
    quizId: 'quiz-jenkins',
    tags: ['Jenkins', 'CI', 'Automation']
  },
  { 
    id: 'docker-intro', 
    title: 'Dockerize Your Application', 
    slug: 'docker-intro', 
    level: 'Intermediate', 
    description: 'Understand Docker and learn to containerize applications.',
    longDescription: 'Learn how to package your applications into Docker containers for consistency and portability. This module covers Docker fundamentals, writing Dockerfiles, building images, and running containers. You will explore: What is Docker?, Docker Architecture (Client, Daemon, Images, Containers, Registry), Installing Docker, Writing Dockerfiles, Building Docker Images, Running Docker Containers, Docker Compose for multi-container applications, Basic Docker Networking.',
    xpReward: 150, 
    iconName: 'Docker',
    quizId: 'quiz-docker',
    tags: ['Docker', 'Containers', 'Microservices']
  },
  { 
    id: 'kubernetes-deploy', 
    title: 'Deploy with Kubernetes (EKS)', 
    slug: 'kubernetes-deploy', 
    level: 'Advanced', 
    description: 'Orchestrate containers at scale using Kubernetes, focusing on EKS.',
    longDescription: 'Master container orchestration with Kubernetes. This module introduces Kubernetes concepts like Pods, Deployments, Services, and Ingress. You will get an overview of Amazon EKS (Elastic Kubernetes Service) and learn how to deploy and manage applications on a Kubernetes cluster. Topics: Introduction to Kubernetes, Kubernetes Architecture (Master Node, Worker Nodes, etcd), Core Kubernetes Objects (Pods, Deployments, ReplicaSets, Services, Namespaces), Introduction to kubectl, Overview of Amazon EKS, Deploying an application to EKS.',
    xpReward: 200, 
    iconName: 'Kubernetes',
    quizId: 'quiz-k8s',
    tags: ['Kubernetes', 'EKS', 'Orchestration', 'AWS']
  },
  { 
    id: 'terraform-iac', 
    title: 'Infrastructure as Code with Terraform', 
    slug: 'terraform-iac', 
    level: 'Advanced', 
    description: 'Manage your cloud infrastructure using Terraform.',
    longDescription: 'Learn the principles of Infrastructure as Code (IaC) with Terraform. This module will teach you how to write Terraform configurations to provision and manage resources on cloud platforms like AWS. You will cover: What is IaC?, Introduction to Terraform, Terraform Syntax (HCL), Providers, Resources, Variables, Outputs, Terraform State, Terraform Commands (init, plan, apply, destroy), Managing AWS resources with Terraform.',
    xpReward: 200, 
    iconName: 'Terraform',
    quizId: 'quiz-terraform',
    tags: ['Terraform', 'IaC', 'AWS', 'Azure']
  },
  {
    id: 'sonarqube-scan',
    title: 'Static Code Analysis with SonarQube',
    slug: 'sonarqube-scan',
    level: 'Intermediate',
    description: 'Improve code quality and find vulnerabilities with SonarQube.',
    longDescription: 'This module introduces SonarQube for continuous inspection of code quality. Learn to set up SonarQube, integrate it into your CI pipeline, and interpret analysis reports to identify bugs, vulnerabilities, and code smells. Topics include: Importance of Code Quality, SonarQube Overview, Setting up SonarQube, Analyzing projects with SonarScanner, Understanding SonarQube Dashboards, Quality Gates, Integrating SonarQube with Jenkins.',
    xpReward: 120,
    iconName: 'SonarQube',
    quizId: 'quiz-sonarqube',
    tags: ['SonarQube', 'Code Quality', 'Security']
  },
  {
    id: 'vault-secrets',
    title: 'Secrets Management with Vault',
    slug: 'vault-secrets',
    level: 'Advanced',
    description: 'Secure, store, and tightly control access to tokens, passwords, certificates using Vault.',
    longDescription: 'Explore HashiCorp Vault for robust secrets management. This module covers Vault architecture, setting up a Vault server, managing secrets engines (e.g., KV store), authentication methods, and policies for access control. Learn how to integrate Vault into your applications and CI/CD pipelines. Topics: Introduction to Secrets Management, Vault Core Concepts (Server, Storage Backend, Secret Engines, Auth Methods, Policies), Setting up Vault, Writing and Reading Secrets, Dynamic Secrets, Vault Agent.',
    xpReward: 180,
    iconName: 'Vault',
    quizId: 'quiz-vault',
    tags: ['Vault', 'Secrets Management', 'Security']
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'quiz-git',
    moduleId: 'git-basics',
    title: 'Git Basics Quiz',
    questions: [
      { id: 'q1', text: 'What command initializes a new Git repository?', options: ['git start', 'git init', 'git new', 'git begin'], correctOptionIndex: 1, explanation: '`git init` creates a new Git repository in the current directory.' },
      { id: 'q2', text: 'What is the command to stage changes for a commit?', options: ['git commit', 'git stage', 'git add', 'git save'], correctOptionIndex: 2, explanation: '`git add <file>` or `git add .` stages changes for the next commit.' },
      { id: 'q3', text: 'Which command creates a new branch?', options: ['git branch <name>', 'git new-branch <name>', 'git checkout -b <name>', 'Both A and C'], correctOptionIndex: 3, explanation: '`git branch <name>` creates a branch, and `git checkout -b <name>` creates and switches to it.' },
    ]
  },
  {
    id: 'quiz-jenkins',
    moduleId: 'jenkins-ci',
    title: 'Jenkins CI Quiz',
    questions: [
      { id: 'q1', text: 'What is Jenkins primarily used for?', options: ['Version Control', 'Continuous Integration', 'Database Management', 'Text Editing'], correctOptionIndex: 1 },
      { id: 'q2', text: 'A Jenkins "Pipeline" is typically defined using a file named:', options: ['Jenkinsfile', 'Pipeline.yml', 'config.xml', 'build.sh'], correctOptionIndex: 0 },
    ]
  },
  {
    id: 'quiz-docker',
    moduleId: 'docker-intro',
    title: 'Docker Introduction Quiz',
    questions: [
      { id: 'q1', text: 'What is a Docker Image?', options: ['A running instance of a container', 'A lightweight, standalone, executable package', 'A virtual machine', 'A configuration file'], correctOptionIndex: 1 },
      { id: 'q2', text: 'Which command is used to build a Docker image from a Dockerfile?', options: ['docker run', 'docker create', 'docker build', 'docker image pull'], correctOptionIndex: 2 },
    ]
  },
   {
    id: 'quiz-k8s',
    moduleId: 'kubernetes-deploy',
    title: 'Kubernetes Quiz',
    questions: [
      { id: 'q1', text: 'What is the basic scheduling unit in Kubernetes?', options: ['Container', 'Node', 'Pod', 'Service'], correctOptionIndex: 2, explanation: 'A Pod represents a single instance of a running process in your cluster and can contain one or more containers.' },
      { id: 'q2', text: 'Which Kubernetes component is responsible for watching for new pods and assigning them to nodes?', options: ['kubelet', 'kube-proxy', 'etcd', 'kube-scheduler'], correctOptionIndex: 3, explanation: 'The kube-scheduler is responsible for assigning pods to available nodes based on resource requirements and other constraints.' },
    ]
  },
  {
    id: 'quiz-terraform',
    moduleId: 'terraform-iac',
    title: 'Terraform Quiz',
    questions: [
      { id: 'q1', text: 'What language is Terraform configuration written in?', options: ['YAML', 'JSON', 'HCL', 'Python'], correctOptionIndex: 2, explanation: 'Terraform configurations are written in HashiCorp Configuration Language (HCL).' },
      { id: 'q2', text: 'Which Terraform command is used to preview changes before applying them?', options: ['terraform apply', 'terraform init', 'terraform validate', 'terraform plan'], correctOptionIndex: 3, explanation: '`terraform plan` creates an execution plan, showing what Terraform will do when you call apply.' },
    ]
  },
  {
    id: 'quiz-sonarqube',
    moduleId: 'sonarqube-scan',
    title: 'SonarQube Quiz',
    questions: [
      { id: 'q1', text: 'SonarQube is primarily a tool for:', options: ['Deployment Automation', 'Continuous Code Quality Inspection', 'Infrastructure Provisioning', 'Version Control'], correctOptionIndex: 1 },
      { id: 'q2', text: 'What is a "Quality Gate" in SonarQube?', options: ['A type of firewall', 'A set of conditions a project must meet to be released', 'A security scanner', 'A project dashboard'], correctOptionIndex: 1 },
    ]
  },
  {
    id: 'quiz-vault',
    moduleId: 'vault-secrets',
    title: 'HashiCorp Vault Quiz',
    questions: [
      { id: 'q1', text: 'What is the primary purpose of HashiCorp Vault?', options: ['Code compilation', 'Container orchestration', 'Secrets management', 'Log aggregation'], correctOptionIndex: 2 },
      { id: 'q2', text: 'In Vault, what are "Secret Engines"?', options: ['The core Vault binary', 'Authentication methods', 'Components that store, generate, or encrypt data', 'Vault UI themes'], correctOptionIndex: 2 },
    ]
  }
];

export const MOCK_USERS: User[] = [
  { id: 'user1', name: 'DevOpsPro', avatarUrl: 'https://picsum.photos/seed/user1/100/100', xp: 1250, badges: [MOCK_BADGES[0], MOCK_BADGES[1], MOCK_BADGES[2], MOCK_BADGES[7]], completedModuleIds: ['git-basics', 'jenkins-ci', 'docker-intro'], quizScores: {'quiz-git': 90, 'quiz-jenkins': 85} },
  { id: 'user2', name: 'CloudNinja', avatarUrl: 'https://picsum.photos/seed/user2/100/100', xp: 980, badges: [MOCK_BADGES[0], MOCK_BADGES[2]], completedModuleIds: ['git-basics', 'jenkins-ci'], quizScores: {'quiz-git': 100} },
  { id: 'user3', name: 'CodeWizard', avatarUrl: 'https://picsum.photos/seed/user3/100/100', xp: 1500, badges: [MOCK_BADGES[0], MOCK_BADGES[1], MOCK_BADGES[3], MOCK_BADGES[4]], completedModuleIds: ['git-basics', 'docker-intro', 'kubernetes-deploy', 'terraform-iac'], quizScores: {'quiz-docker': 95, 'quiz-k8s': 80} },
  { id: 'user4', name: 'SecureSavvy', avatarUrl: 'https://picsum.photos/seed/user4/100/100', xp: 750, badges: [MOCK_BADGES[5], MOCK_BADGES[6]], completedModuleIds: ['vault-secrets', 'sonarqube-scan'], quizScores: {'quiz-vault': 90} },
  { id: 'user5', name: 'NewbieLearner', avatarUrl: 'https://picsum.photos/seed/user5/100/100', xp: 100, badges: [MOCK_BADGES[0]], completedModuleIds: ['git-basics'], quizScores: {} },
];

// For Visualizer Page
export const PIPELINE_TOOLS: PipelineTool[] = [
    { id: 'github', name: 'GitHub', iconName: 'Git', category: 'Source' },
    { id: 'jenkins', name: 'Jenkins', iconName: 'Jenkins', category: 'Build' },
    { id: 'docker', name: 'Docker Build', iconName: 'Docker', category: 'Build' },
    { id: 'sonarqube', name: 'SonarQube', iconName: 'SonarQube', category: 'Test' },
    { id: 'k8s', name: 'Kubernetes Deploy', iconName: 'Kubernetes', category: 'Deploy' },
    { id: 'terraform', name: 'Terraform Apply', iconName: 'Terraform', category: 'Infra' },
    { id: 'vault', name: 'Vault Read Secret', iconName: 'Vault', category: 'Secure' },
];

export const DEFAULT_USER_ID = 'currentUser';
export const INITIAL_USER_STATE: User = {
  id: DEFAULT_USER_ID,
  name: 'Quest Adventurer',
  avatarUrl: 'https://picsum.photos/seed/currentuser/100/100',
  xp: 0,
  badges: [],
  completedModuleIds: [],
  quizScores: {}
};

