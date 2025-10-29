import {
  type LucideIcon,
  Home,
  PackageSearch,
  Wrench,
  DollarSign,
  Info,
  Mail,
  Truck,
  Globe,
  Warehouse,
  ShoppingCart,
  Twitter,
  Facebook,
  Linkedin,
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Track', href: '/track', icon: PackageSearch },
  { name: 'Services', href: '/services', icon: Wrench },
  { name: 'Pricing', href: '/pricing', icon: DollarSign },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: Truck,
    title: 'Domestic Shipping',
    description: 'Fast and reliable shipping across the country. We handle all sizes of packages with care.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    description: 'Connect to the world with our seamless international logistics and customs clearance.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure, scalable warehousing and fulfillment solutions to manage your inventory.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Tailored logistics for online businesses, from inventory to final-mile delivery.',
  },
];

export const TESTIMONIALS = [
    {
        name: 'Sarah Johnson',
        company: 'CEO, TechInnovate',
        quote: 'SwiftRoute has transformed our supply chain. Their reliability and real-time tracking are second to none. Our delivery times have improved by 40%!',
        imageId: 'avatar-2',
    },
    {
        name: 'Michael Chen',
        company: 'Founder, UrbanStyle Co.',
        quote: 'As an e-commerce brand, fast shipping is crucial. SwiftRoute provides the speed and efficiency we need to keep our customers happy. Truly a game-changer.',
        imageId: 'avatar-1',
    },
    {
        name: 'David Rodriguez',
        company: 'Operations Manager, Global Parts Inc.',
        quote: 'Their international shipping and customs handling are flawless. We no longer worry about delays at the border. Highly recommended for any business going global.',
        imageId: 'avatar-3',
    },
];

export const SOCIAL_LINKS = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
]
