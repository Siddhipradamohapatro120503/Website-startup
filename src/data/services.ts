import {
  FiCpu,
  FiCamera,
  FiCode,
  FiLayout,
  FiMessageSquare,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiCloud,
  FiServer,
  FiPenTool,
  FiGrid,
  FiUsers,
} from 'react-icons/fi';
import { ServiceCategory } from '../types/service';

export const serviceCategories: ServiceCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: FiCpu,
    services: [
      {
        name: 'Custom AI Solutions',
        icon: FiCpu,
        description: 'Custom AI Model Development and Integration',
        features: ['Model Development', 'Integration', 'Training', 'Deployment'],
        technologies: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'],
        useCases: ['Predictive Maintenance', 'Image Classification', 'Natural Language Processing', 'Recommendation Systems'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Ai ML services Brochure.pdf',
      },
      {
        name: 'Computer Vision',
        icon: FiCamera,
        description: 'Image Recognition & Classification Solutions',
        features: ['Object Detection', 'Image Recognition', 'Video Analysis', 'Pattern Recognition'],
        technologies: ['OpenCV', 'TensorFlow', 'PyTorch', 'Keras'],
        useCases: ['Image Classification', 'Object Detection', 'Facial Recognition', 'Image Segmentation'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Ai ML services Brochure.pdf',
      },
      {
        name: 'Natural Language Processing',
        icon: FiMessageSquare,
        description: 'Text Classification & Analysis',
        features: ['Text Analysis', 'Sentiment Analysis', 'Language Translation', 'Named Entity Recognition'],
        technologies: ['NLTK', 'spaCy', 'TensorFlow', 'PyTorch'],
        useCases: ['Text Classification', 'Sentiment Analysis', 'Language Translation', 'Named Entity Recognition'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Ai ML services Brochure.pdf',
      },
      {
        name: 'Predictive Analytics',
        icon: FiBarChart2,
        description: 'Time Series Analysis and Forecasting',
        features: ['Time Series Analysis', 'Forecasting', 'Pattern Detection', 'Anomaly Detection'],
        technologies: ['ARIMA', 'Prophet', 'LSTM', 'GRU'],
        useCases: ['Time Series Forecasting', 'Anomaly Detection', 'Pattern Recognition', 'Predictive Maintenance'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Ai ML services Brochure.pdf',
      },
    ],
  },
  {
    title: 'Content Creation',
    icon: FiCamera,
    services: [
      {
        name: 'Video Editing',
        icon: FiCamera,
        description: 'Short-form Content Creation and Editing',
        features: ['Video Editing', 'Motion Graphics', 'Color Grading', 'Sound Design'],
        technologies: ['Adobe Premiere Pro', 'Final Cut Pro', 'Avid Media Composer', 'DaVinci Resolve'],
        useCases: ['Social Media Videos', 'Event Videos', 'Product Videos', 'Explainer Videos'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Graphic Design and Video editing services Brochure.pdf',
      },
      {
        name: 'Graphic Design',
        icon: FiPenTool,
        description: 'Branding and Visual Identity Design',
        features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media Graphics'],
        technologies: ['Adobe Creative Cloud', 'Sketch', 'Figma', 'InVision'],
        useCases: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Social Media Graphics'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Graphic Design and Video editing services Brochure.pdf',
      },
    ],
  },
  {
    title: 'Digital Marketing',
    icon: FiTrendingUp,
    services: [
      {
        name: 'Social Media Management',
        icon: FiUsers,
        description: 'Content Planning and Strategy',
        features: ['Content Strategy', 'Community Management', 'Analytics', 'Campaign Planning'],
        technologies: ['Hootsuite', 'Sprout Social', 'Buffer', 'SocialPilot'],
        useCases: ['Social Media Management', 'Content Creation', 'Community Engagement', 'Influencer Marketing'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Social Media  services Brochure.pdf',
      },
      {
        name: 'Social Media Marketing',
        icon: FiBarChart2,
        description: 'Strategic social media marketing solutions',
        features: [
          'Platform Setup',
          'Campaign Management',
          'Budget Optimization',
          'Performance Tracking',
          'Competitor Analysis',
        ],
        technologies: ['Facebook Ads', 'Google Ads', 'LinkedIn Ads', 'Twitter Ads'],
        useCases: ['Lead Generation', 'Brand Awareness', 'Product Launch', 'Event Promotion'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Social Media  services Brochure.pdf',
      },
    ],
  },
  {
    title: 'Development',
    icon: FiCode,
    services: [
      {
        name: 'Web Development',
        icon: FiCode,
        description: 'Responsive Design and Development',
        features: ['Frontend Development', 'Backend Development', 'API Integration', 'Database Design'],
        technologies: ['HTML/CSS', 'JavaScript', 'React', 'Angular', 'Vue.js'],
        useCases: ['Web Application Development', 'E-commerce Solutions', 'Responsive Design', 'API Integration'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Web dev & web application services Brochure.pdf',
      },
      {
        name: 'Web App Design',
        icon: FiLayout,
        description: 'UI Design and Implementation',
        features: ['UI Design', 'Prototyping', 'Responsive Design', 'User Testing'],
        technologies: ['Sketch', 'Figma', 'InVision', 'Adobe XD'],
        useCases: ['Web Application Design', 'Mobile App Design', 'Responsive Design', 'User Experience'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Web dev & web application services Brochure.pdf',
      },
      {
        name: 'UI/UX Design',
        icon: FiGrid,
        description: 'Create intuitive and engaging user experiences through research-driven design processes and modern UI implementations',
        features: [
          'User Research & Analysis',
          'Information Architecture',
          'Wireframing & Prototyping',
          'Interaction Design',
          'Visual Design Systems',
          'Usability Testing',
          'Accessibility Implementation',
          'Mobile-First Design'
        ],
        technologies: [
          'Figma',
          'Adobe XD',
          'Sketch',
          'InVision',
          'Principle',
          'Maze',
          'Zeplin',
          'Abstract'
        ],
        useCases: [
          'E-commerce Platform Redesign',
          'Mobile App User Experience',
          'SaaS Dashboard Design',
          'Design System Creation',
          'User Flow Optimization',
          'Cross-Platform Experience Design'
        ],
        whyChooseUs: [
          'User-Centered Design Approach',
          'Research-Driven Solutions',
          'Industry Best Practices',
          'Cross-Platform Expertise',
          'Iterative Design Process',
          'Accessibility Focused'
        ],
        contactInfo: {
          phone: 'NA',
          email: 'design@shreetech.org'
        },
        brochureUrl: '/Brochures/Web dev & web application services Brochure.pdf'
      },
    ],
  },
  {
    title: 'Technical Solutions',
    icon: FiSettings,
    services: [
      {
        name: 'Infrastructure Setup',
        icon: FiServer,
        description: 'Network Design and Implementation',
        features: ['Network Architecture', 'Security Setup', 'Performance Optimization', 'Monitoring'],
        technologies: ['AWS', 'Azure', 'GCP', 'VMware'],
        useCases: ['Cloud Infrastructure', 'On-premises Infrastructure', 'Hybrid Infrastructure', 'Disaster Recovery'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Cloud Solutions services Brochure.pdf',
      },
      {
        name: 'Cloud Solutions',
        icon: FiCloud,
        description: 'AWS/Azure/GCP Implementation',
        features: ['Cloud Migration', 'Architecture Design', 'Cost Optimization', 'Security'],
        technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes'],
        useCases: ['Cloud Migration', 'Cloud Native Applications', 'Hybrid Cloud', 'Cloud Security'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Cloud Solutions services Brochure.pdf',
      },
      {
        name: 'DevOps Solutions',
        icon: FiSettings,
        description: 'CI/CD Pipeline Implementation',
        features: ['Pipeline Setup', 'Automation', 'Monitoring', 'Security Integration'],
        technologies: ['Jenkins', 'GitLab CI/CD', 'CircleCI', 'Travis CI'],
        useCases: ['Continuous Integration', 'Continuous Deployment', 'Continuous Monitoring', 'Continuous Security'],
        whyChooseUs: ['Expert Consultation', 'Customized Solutions', 'Dedicated Support', 'Industry Best Practices'],
        contactInfo: {
          phone: 'NA',
          email: 'support@shreetech.org',
        },
        brochureUrl: '/Brochures/Cloud Solutions services Brochure.pdf',
      },
    ],
  },
];

export const services = {
  "computer-vision": {
    id: "computer-vision",
    title: "Computer Vision Solutions",
    shortDescription: "Advanced computer vision solutions for automated visual inspection and analysis.",
    description: `Our cutting-edge computer vision solutions leverage deep learning and advanced AI algorithms to transform how businesses process and analyze visual data. We specialize in developing custom solutions that can detect objects, recognize patterns, and make intelligent decisions based on visual input.

    Our systems can be integrated into existing workflows or deployed as standalone solutions, offering real-time processing capabilities and high accuracy rates exceeding 99% in most applications.`,
    features: [
      "Real-time object detection and tracking",
      "Facial recognition and emotion analysis",
      "Quality control and defect detection",
      "OCR and document processing",
      "3D scene reconstruction",
      "Motion analysis and tracking",
      "Gesture recognition systems",
      "Automated visual inspection"
    ],
    benefits: [
      "Increased accuracy in quality control",
      "Reduced operational costs",
      "24/7 automated monitoring",
      "Scalable solutions for growing businesses",
      "Enhanced safety and security",
      "Improved customer experience",
      "Real-time analytics and reporting",
      "Reduced human error"
    ],
    technologies: [
      "TensorFlow and PyTorch",
      "OpenCV",
      "YOLO and R-CNN",
      "Custom CNN architectures",
      "Edge computing solutions",
      "Cloud integration capabilities",
      "Real-time processing frameworks",
      "Advanced image processing libraries"
    ],
    whyChooseUs: [
      "15+ years of computer vision expertise",
      "Custom-tailored solutions for your needs",
      "Dedicated support and maintenance",
      "Industry-leading accuracy rates",
      "Scalable and future-proof solutions",
      "Rapid deployment capabilities",
      "Continuous optimization and updates",
      "Cost-effective implementation"
    ],
    contactInfo: {
      phone: '+1 (234) 567-8900',
      email: 'support@shreetech.org',
      supportHours: '24/7 Technical Support',
      emergencyContact: '+1 (234) 567-8901'
    },
    brochureUrl: '/brochures/computer-vision.pdf',
    casestudies: [
      {
        title: "Manufacturing Quality Control",
        description: "Implemented an automated inspection system that reduced defect rates by 95%",
        results: "Saved $2M annually in quality control costs"
      },
      {
        title: "Retail Analytics",
        description: "Deployed customer tracking solution for optimal store layout",
        results: "Increased sales by 30% through improved product placement"
      }
    ]
  },
  "cloud-computing": {
    id: "cloud-computing",
    title: "Cloud Computing Services",
    shortDescription: "Scalable and secure cloud solutions for modern businesses.",
    description: `Transform your business with our comprehensive cloud computing services. We offer end-to-end cloud solutions that help organizations migrate, optimize, and manage their infrastructure in the cloud. Our expertise spans across major cloud platforms including AWS, Azure, and Google Cloud.

    We focus on delivering secure, scalable, and cost-effective solutions that drive business growth and innovation.`,
    features: [
      "Cloud migration and strategy",
      "Multi-cloud management",
      "Cloud security and compliance",
      "DevOps automation",
      "Serverless architecture",
      "Disaster recovery",
      "Performance optimization",
      "Cost management and optimization"
    ],
    benefits: [
      "Reduced infrastructure costs",
      "Improved scalability",
      "Enhanced security",
      "Better disaster recovery",
      "Increased business agility",
      "Global accessibility",
      "Automated deployments",
      "Pay-as-you-go model"
    ],
    technologies: [
      "AWS, Azure, Google Cloud",
      "Kubernetes and Docker",
      "Terraform and CloudFormation",
      "Jenkins and GitLab CI",
      "Prometheus and Grafana",
      "ELK Stack",
      "Redis and MongoDB",
      "Microservices architecture"
    ],
    whyChooseUs: [
      "Certified cloud experts",
      "Multi-cloud expertise",
      "24/7 monitoring and support",
      "Cost optimization focus",
      "Security-first approach",
      "Rapid implementation",
      "Comprehensive documentation",
      "Regular security audits"
    ],
    contactInfo: {
      phone: '+1 (234) 567-8902',
      email: 'support@shreetech.org',
      supportHours: '24/7 Cloud Support',
      emergencyContact: '+1 (234) 567-8903'
    },
    brochureUrl: '/brochures/cloud-computing.pdf',
    casestudies: [
      {
        title: "E-commerce Platform Migration",
        description: "Migrated legacy system to cloud-native architecture",
        results: "Achieved 99.99% uptime and 40% cost reduction"
      },
      {
        title: "Financial Services Infrastructure",
        description: "Implemented secure cloud infrastructure for banking services",
        results: "Reduced transaction processing time by 60%"
      }
    ]
  },
  "artificial-intelligence": {
    id: "artificial-intelligence",
    title: "Artificial Intelligence Solutions",
    shortDescription: "Custom AI solutions to automate and optimize business processes.",
    description: `Harness the power of artificial intelligence to transform your business operations. Our AI solutions combine cutting-edge machine learning algorithms with deep industry expertise to deliver intelligent automation and decision-making capabilities.

    We specialize in developing custom AI models that can understand, learn, and adapt to your specific business needs.`,
    features: [
      "Natural Language Processing",
      "Predictive Analytics",
      "Machine Learning Models",
      "Deep Learning Solutions",
      "AI-powered Automation",
      "Intelligent Decision Support",
      "Neural Networks",
      "Reinforcement Learning"
    ],
    benefits: [
      "Automated decision making",
      "Predictive insights",
      "Improved efficiency",
      "Reduced operational costs",
      "Enhanced customer experience",
      "Data-driven strategies",
      "Competitive advantage",
      "Scalable solutions"
    ],
    technologies: [
      "TensorFlow and PyTorch",
      "Scikit-learn",
      "BERT and GPT models",
      "Custom ML pipelines",
      "AutoML platforms",
      "Neural network architectures",
      "GPU acceleration",
      "Distributed training systems"
    ],
    whyChooseUs: [
      "Expert AI researchers",
      "Custom model development",
      "Ethical AI practices",
      "Scalable solutions",
      "Continuous learning systems",
      "Industry expertise",
      "ROI-focused approach",
      "Ongoing optimization"
    ],
    contactInfo: {
      phone: '+1 (234) 567-8904',
      email: 'support@shreetech.org',
      supportHours: '24/7 AI Support',
      emergencyContact: '+1 (234) 567-8905'
    },
    brochureUrl: '/brochures/artificial-intelligence.pdf',
    casestudies: [
      {
        title: "Customer Service Automation",
        description: "Implemented AI chatbot for 24/7 customer support",
        results: "Handled 80% of queries automatically, reduced response time by 90%"
      },
      {
        title: "Predictive Maintenance",
        description: "Developed AI system for equipment failure prediction",
        results: "Reduced downtime by 75% and maintenance costs by 50%"
      }
    ]
  }
};

export type Service = typeof services[keyof typeof services];
export type ServiceId = keyof typeof services;
