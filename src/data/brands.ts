export interface Brand {
  id: number;
  name: string;
  logo: string;
}

export const trustedBrands: Brand[] = [
  {
    id: 1,
    name: 'Dominos',
    logo: '/images/brands/dominos.png'
  },
  {
    id: 2,
    name: 'Hindustan Unilever',
    logo: '/images/brands/hindustan-unilever.png'
  },
  {
    id: 3,
    name: 'Chevrolet',
    logo: '/images/brands/chevrolet.png'
  },
  {
    id: 4,
    name: 'Volkswagen',
    logo: '/images/brands/volkswagen.png'
  },
  {
    id: 5,
    name: 'Bumper',
    logo: '/images/brands/bumper.png'
  },
  {
    id: 6,
    name: 'Skoda',
    logo: '/images/brands/skoda.png'
  }
];
