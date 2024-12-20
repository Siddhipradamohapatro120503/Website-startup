export interface PathwayItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: {
    icon: string;
    label: string;
  }[];
  position: 'top' | 'left' | 'right' | 'bottom' | 'center';
}

export const pathwayData = {
  mainTitle: "Transform Your Business with Our Solutions",
  centerItem: {
    id: "center",
    title: "Enterprise Integration",
    description: "Seamlessly connect with your existing systems",
    icon: "FiDatabase",
    position: "center",
    integrations: ["SAP", "Salesforce", "ServiceNow", "Oracle"]
  },
  items: [
    {
      id: "automate",
      title: "Automate",
      description: "AI-powered automation for streamlined operations",
      icon: "FiZap",
      position: "top",
      features: [
        { icon: "FiMessageCircle", label: "Chat" },
        { icon: "FiMail", label: "Email" },
        { icon: "FiPhone", label: "Voice" }
      ]
    },
    {
      id: "analyze",
      title: "Analyze",
      description: "Data-driven insights and analytics",
      icon: "FiPieChart",
      position: "left",
      features: [
        { icon: "FiTrendingUp", label: "Performance Metrics" },
        { icon: "FiBarChart2", label: "Analytics Dashboard" }
      ]
    },
    {
      id: "manage",
      title: "Manage",
      description: "Comprehensive management tools",
      icon: "FiSettings",
      position: "right",
      features: [
        { icon: "FiUsers", label: "Team Management" },
        { icon: "FiDatabase", label: "Resource Control" }
      ]
    },
    {
      id: "assist",
      title: "Assist",
      description: "24/7 intelligent customer support",
      icon: "FiHelpCircle",
      position: "bottom",
      features: [
        { icon: "FiCloud", label: "Service Cloud" },
        { icon: "FiPhoneCall", label: "Contact Centre" }
      ]
    }
  ]
};
