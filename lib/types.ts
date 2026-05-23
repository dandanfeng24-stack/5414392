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

export type MarketEvidenceLevel = "强证据" | "中证据" | "弱证据" | "待核验";

export type MarketEvidenceDimension = {
  summary: string;
  evidenceLevel: MarketEvidenceLevel;
  evidenceTypes: string[];
};

export type MarketSearchVisibility = {
  level: "高" | "中" | "低" | "极低" | string;
  resultDensity: string;
  sourceDiversity: string[];
  commercialSignal: "强" | "中" | "弱" | "无" | string;
  experienceSignal: "强" | "中" | "弱" | "无" | string;
  notes: string;
};

export type ProjectMarketEvidence = {
  summary: string;
  evidenceLevel: MarketEvidenceLevel;
  dimensions: {
    commercialization: MarketEvidenceDimension;
    experience: MarketEvidenceDimension;
    sceneFit: MarketEvidenceDimension;
    spread: MarketEvidenceDimension;
    gift: MarketEvidenceDimension;
    operation: MarketEvidenceDimension;
  };
  sources: string[];
  searchVisibility?: MarketSearchVisibility;
  pendingReview?: boolean;
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
  marketEvidence?: ProjectMarketEvidence;
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
  scoringWeights: Record<AiAssessmentDimension, number>;
  scoringRules: Array<{
    field: keyof AiAssessmentInput;
    match: string;
    effects: Partial<Record<AiAssessmentDimension, number>>;
    reason: string;
    factorType: "positive" | "negative" | "neutral";
  }>;
  packageRules: Array<{
    packageId: string;
    matchAny: string[];
    reason: string;
  }>;
  outputTemplates: {
    paths: Array<{ matchAny: string[]; text: string; priority: number }>;
    notRecommended: Array<{ matchAny: string[]; text: string }>;
    conditions: Array<{ matchAny: string[]; text: string }>;
  };
  riskRules: Array<{ keyword: string; risk: string; penalty: number }>;
  recommendationTemplates: Record<string, string>;
  upgradePrompts: string[];
};

export type AiAssessmentDimension =
  | "productization"
  | "experience"
  | "course"
  | "gift"
  | "scene"
  | "operation"
  | "riskControl";

export type AiAssessmentInput = {
  region: string;
  city: string;
  heritageType: string;
  projectStage: string;
  userRole: string;
  conversionGoals: string[];
  applicationScenario: string;
  targetUsers: string[];
  expectedOutputs: string[];
  existingConditions: string[];
  productFoundation: string;
  experienceFoundation: string;
  courseFoundation: string;
  giftFoundation: string;
  businessFoundation: string;
  budgetStage: string;
  timeline: string;
  riskFactors: string[];
  localResources: string;
};

export type AiAssessmentEvidence = {
  option: string;
  dimension: AiAssessmentDimension;
  delta: number;
  reason: string;
};

export type AiAssessmentResult = {
  totalScore: number;
  score: number;
  grade: string;
  gradeNote: string;
  conclusion: string;
  dimensionScores: Record<AiAssessmentDimension, number>;
  evidence: AiAssessmentEvidence[];
  positiveFactors: string[];
  negativeFactors: string[];
  recommendedPaths: string[];
  notRecommendedDirections: string[];
  risks: string[];
  conditionsToImprove: string[];
  recommendedPackages: Array<Pick<PackageItem, "id" | "title"> & { reason: string }>;
};
