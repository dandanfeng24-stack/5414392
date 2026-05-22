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

export type ProjectResearchScore = {
  commercialization: number;
  experience: number;
  sceneFit: number;
  spread: number;
  gift: number;
  operation: number;
  total: number;
};

export type ProjectSku = {
  name: string;
  priceBand: string;
  targetUser: string;
  salesScene: string;
  reason: string;
};

export type ProjectExperience = {
  title: string;
  duration: string;
  capacity: string;
  process: string[];
  takeaway: string;
  staffing: string;
  riskNotes: string;
};

export type ProjectImplementationConditions = {
  space: string;
  staff: string;
  materials: string;
  equipment: string;
  operationDifficulty: "低" | "中" | "高" | string;
  minimumBudget: string;
  preparationCycle: string;
  notes: string;
};

export type ProjectRevenueModel = {
  type: string;
  description: string;
  suitableScene: string;
  difficulty: "低" | "中" | "高" | string;
  notes: string;
};

export type ProjectOfficialVerification = {
  status: "已核验" | "部分核验" | "待核验";
  verifiedFields: string[];
  pendingFields: string[];
  notes: string;
};

export type Project = {
  id: string;
  name: string;
  alias: string;
  theme?: string;
  themeId: string;
  category: string;
  officialCategory?: string;
  subCategory?: string;
  region: string;
  province?: string;
  city?: string;
  heritageLevel: string;
  level?: string;
  type: string;
  protectionUnit?: string;
  heritageCode?: string;
  summary: string;
  positioning: string;
  conversionGrade?: "A" | "B" | "C" | "D";
  priority?: string;
  score?: ProjectResearchScore;
  scoreReason?: string;
  scoreDetails?: Record<string, string>;
  uniqueValue?: string;
  recommendedSkus?: ProjectSku[];
  recommendedExperiences?: ProjectExperience[];
  implementationConditions?: ProjectImplementationConditions;
  revenueModels?: ProjectRevenueModel[];
  officialVerification?: ProjectOfficialVerification;
  productDirections: string[];
  experienceDirections: string[];
  courseDirections: string[];
  giftDirections: string[];
  bestScenes?: string[];
  secondaryScenes?: string[];
  avoidScenes?: string[];
  targetUsers: string[];
  scenes: string[];
  commercialTags?: string[];
  businessTags: string[];
  spreadTags: string[];
  riskTags: string[];
  riskLevel?: string;
  riskExplanation?: string;
  riskControl?: string[];
  priceBands?: string[];
  salesChannels?: string[];
  supplyDifficulty?: string;
  standardization?: string;
  operationNotes?: string;
  operationTags: string[];
  scores: ProjectScores;
  totalScore: number;
  scoreExplanation: string;
  suitableScenes: string[];
  unsuitableScenes: string[];
  risks: string[];
  cases: string[];
  sources: string[];
  sourceLinks?: string[];
  sourceNotes?: string;
  relatedCases?: string[];
  relatedPackages?: string[];
  image: string;
  imagePrompt: string;
  reviewStatus: string;
  confidence: string;
  contentStatus?: "AI 初稿" | "人工初审" | "已复核" | "待补充" | "待核验";
  contentStatusNote?: string;
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
  coverImage?: string;
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
