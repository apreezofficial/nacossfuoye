import { buildPageMetadata } from '@/lib/site-config';

export const metadata = buildPageMetadata({
   title: 'Departmental Governance, Leadership & Voting',
   description:
      'Verified directory of executive officers, academic level advisers, SRC representatives, society constitution, and live ballot voting during election cycles.',
   pathname: '/governance',
});

export default function GovernanceLayout({ children }) {
   return children;
}
