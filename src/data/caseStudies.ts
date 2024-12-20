export interface CaseStudy {
  id: number;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  image: string;
  logo: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "E-commerce Revenue Growth",
    client: "Global Retail Chain",
    industry: "Retail",
    challenge: "Declining online sales and poor user engagement",
    solution: "Implemented AI-powered personalization and streamlined checkout",
    results: [
      { metric: "Revenue Increase", value: "156%" },
      { metric: "Customer Retention", value: "2.3x" },
      { metric: "Cart Abandonment", value: "-45%" }
    ],
    image: "/images/case-studies/ecommerce-growth.jpg",
    logo: "/images/case-studies/retail-logo.png"
  },
  {
    id: 2,
    title: "Healthcare Process Automation",
    client: "National Healthcare Provider",
    industry: "Healthcare",
    challenge: "Manual patient data processing causing delays",
    solution: "Automated workflow system with ML-powered data processing",
    results: [
      { metric: "Processing Time", value: "-85%" },
      { metric: "Accuracy Rate", value: "99.9%" },
      { metric: "Cost Savings", value: "$2.5M" }
    ],
    image: "/images/case-studies/healthcare-automation.jpg",
    logo: "/images/case-studies/healthcare-logo.png"
  },
  {
    id: 3,
    title: "Financial Services Digital Transformation",
    client: "Leading Bank",
    industry: "Finance",
    challenge: "Legacy systems limiting digital banking capabilities",
    solution: "Cloud migration and modern banking platform implementation",
    results: [
      { metric: "Digital Transactions", value: "+245%" },
      { metric: "System Uptime", value: "99.99%" },
      { metric: "New Customers", value: "+125K" }
    ],
    image: "/images/case-studies/finance-transform.jpg",
    logo: "/images/case-studies/bank-logo.png"
  }
];
