export interface CarouselItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    type: 'image',
    src: '/image/a-minimalist-logo-for-a-tech-services-startup-with-jNBDqKCjRS23UHdv-8e5cw-TR0YvhtSSpOBikABYo97dg.jpeg',
    title: '60% more engagement with omni-channel support',
    description: 'Streamline customer interactions across all platforms'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/carousel/ai-analytics.jpg',
    title: 'AI-Powered Analytics',
    description: 'Make data-driven decisions with advanced analytics'
  },
  {
    id: 3,
    type: 'image',
    src: '/images/carousel/digital-transformation.jpg',
    title: 'Digital Transformation',
    description: 'Transform your business with cutting-edge solutions'
  }
];
