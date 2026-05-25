export type Category =
  | "GH axis research"
  | "Tissue repair research"
  | "Cognitive research"
  | "Longevity research"
  | "Metabolic research";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  category: Category;
  format: string;
  price: number;
  purity: string;
  assayedMass: string;
  batch: string;
  lab: string;
  coaId: string;
  testDate: string;
  image: string;
  sourceUrl: string;
  labReportUrl?: string;
  reportStatus: "available" | "source-listed" | "pending";
  sourceNote?: string;
  concentration: string;
  storage: string;
  referenceStandard: string;
  molecular: string;
  overview: string;
  specs: Array<{ label: string; value: string }>;
  batchHistory: Array<{ batch: string; purity: string; lab: string; date: string }>;
};

export type CoaRecord = {
  id: string;
  productName: string;
  batch: string;
  purity: string;
  assayedMass: string;
  lab: string;
  testDate: string;
  method: string;
  pdf?: string;
  reportUrl?: string;
  reportStatus: Product["reportStatus"];
  sourceNote?: string;
  productSlug: string;
  productImage: string;
};

export type FaqGroup = {
  title: string;
  items: Array<{ question: string; answer: string }>;
};
