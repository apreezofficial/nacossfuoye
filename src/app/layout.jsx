import localFont from 'next/font/local';
import { Raleway, Inter, DM_Sans, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const nasalization = localFont({
   src: '../../public/fonts/nasalization.otf',
   variable: '--font-nasalization',
});

const raleway = Raleway({
   subsets: ['latin'],
   variable: '--font-raleway',
});

const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
});

const dmSans = DM_Sans({
   subsets: ['latin'],
   variable: '--font-dm-sans',
});

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-poppins',
});

export const metadata = {
   title: 'NACOSS Portal',
   description: 'An official portal for the Department of Computer Science, NACOSS.',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en" className="scroll-smooth">
         <body className={`${raleway.variable} ${nasalization.variable} ${inter.variable} ${dmSans.variable} ${poppins.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-green-100 selection:text-green-900 pt-20 sm:pt-24`}>
            <Navbar />
            <div className="flex-1 w-full">
               {children}
            </div>
            <Footer />
         </body>
      </html>
   );
}
