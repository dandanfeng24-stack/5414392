export type Theme = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  image: string;
  imagePrompt: string;
  tags: string[];
  subcategories: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ProjectScores = {
  commodity: number;
  experience: number;
  scenario: number;
  spread: number;
  gift: number;
  operation: number;
};

export type Project = {
  id: string;
  name: string;
  alias: string;
  themeId: string;
  category: string;
  region: string;
  heritageLevel: string;
  type: string;
  summary: string;
  positioning: string;
  productDirections: string[];
  experienceDirections: string[];
  courseDirections: string[];
  giftDirections: string[];
  targetUsers: string[];
  scenes: string[];
  businessTags: string[];
  spreadTags: string[];
  riskTags: string[];
  operationTags: string[];
  scores: ProjectScores;
  totalScore: number;
  scoreExplanation: string;
  suitableScenes: string[];
  unsuitableScenes: string[];
  risks: string[];
  cases: string[];
  sources: string[];
  image: string;
  imagePrompt: string;
  reviewStatus: string;
  confidence: string;
  updatedAt: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  relatedProjects: string[];
  city: string;
  scene: string;
  targetUsers: string[];
  transformationLogic: string;
  successFactors: string[];
  risks: string[];
  replicability: string;
  sourceLinks: string[];
  image: string;
  imagePrompt: string;
  reviewStatus: string;
};

export type Ranking = {
  id: string;
  title: string;
  description: string;
  criteria: string[];
  relatedTags: string[];
  items: string[];
  updateCycle: string;
};

export type Tag = {
  id: string;
  name: string;
  type: string;
  description: string;
  userNeed: string;
  relatedScenes: string[];
  priority: number;
};

export type PackageItem = {
  id: string;
  title: string;
  subtitle: string;
  targetUsers: string[];
  problemsSolved: string[];
  contents: string[];
  relatedTags: string[];
  relatedProjects: string[];
  previewSections: string[];
  price: string;
  status: string;
  cta: string;
};

export type AiRules = {
  inputOptions: Record<string, string[]>;
  matchingRules: Array<{
    when: Record<string, string>;
    recommendThemes: string[];
    recommendProjects: string[];
    risks: string[];
  }>;
  scoringWeights: Record<string, number>;
  riskRules: Array<{ keyword: string; risk: string }>;
  recommendationTemplates: Record<string, string>;
  upgradePrompts: string[];
};

export type AiAssessmentInput = {
  region: string;
  projectType: string;
  targetUsers: string;
  budget: string;
  goal: string;
  localResources: string;
};

export type AiAssessmentResult = {
  conclusion: string;
  score: number;
  recommendedThemes: string[];
  recommendedProjects: Project[];
  risks: string[];
  sceneSuggestions: string[];
  recommendedCases: CaseStudy[];
  recommendedPackages: PackageItem[];
};
