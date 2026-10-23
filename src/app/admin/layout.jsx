import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Executive Admin Portal',
   description: 'Administrative portal for departmental executives and committee heads.',
   pathname: '/admin',
   noIndex: true,
});

export default function AdminLayout({ children }) {
   return children;
}
