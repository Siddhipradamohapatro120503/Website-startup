export interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
  color: string;
}

export const statsData: Stat[] = [
  {
    id: 1,
    value: "98%",
    label: "Client Satisfaction",
    icon: "FiSmile",
    color: "blue"
  },
  {
    id: 2,
    value: "200+",
    label: "Projects Delivered",
    icon: "FiCheckCircle",
    color: "purple"
  },
  {
    id: 3,
    value: "24/7",
    label: "Support Available",
    icon: "FiClock",
    color: "green"
  },
  {
    id: 4,
    value: "4+",
    label: "Years Experience",
    icon: "FiAward",
    color: "orange"
  }
];
