export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  default_branch: string;
  archived: boolean;
  is_pinned?: boolean;
}

export interface CustomLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Herramientas';
  level?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface CustomProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  image?: string;
}

export type ThemePreset = 'slate' | 'emerald' | 'purple' | 'midnight' | 'minimal';

export interface PortfolioConfig {
  theme: ThemePreset;
  title: string;
  role: string;
  tagline: string;
  aboutMe: string;
  statusText: string;
  statusType: 'available' | 'busy' | 'exploring';
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  resumeUrl: string;
  customLinks: CustomLink[];
  featuredRepoIds: number[];
  customProjects: CustomProject[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  showStats: boolean;
  showActivity: boolean;
  showContactForm: boolean;
  customAvatarUrl?: string;
}
