import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { House, Phone, Twitter, Linkedin, UserCircle2 } from 'lucide-react';
import { ManQuestion } from '@esvigy/react';
import stakeholdersData from '@/data/stakeholders.json';

export default function StakeholdersPage() {
   // Sort categories by priority
   const sortedCategories = [...stakeholdersData.categories].sort((a, b) => a.priority - b.priority);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader title="NACOSS Stakeholders">
            <Link href="/" aria-label="Go home" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <House size={22} />
            </Link>
         </PageHeader>

         <div className="mt-12 space-y-24">
            {sortedCategories.map((category) => (
               <section key={category.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both" style={{ animationDelay: `${category.priority * 150}ms` }}>
                  <div className="mb-10 text-center space-y-4">
                     <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {category.name}
                     </h2>
                     <div className="w-24 h-1.5 bg-linear-to-r from-primary to-green-400 mx-auto rounded-full"></div>
                  </div>

                  {category.members.length > 0 ? (
                     <div className={`grid gap-6 ${category.id === 'executive' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                        {category.members.map((member, index) => (
                           <div 
                              key={index}
                              className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2"
                           >
                              {/* Image Container */}
                              <div className="relative w-full aspect-4/5 bg-slate-100 overflow-hidden">
                                 {member.image ? (
                                    <img 
                                       src={member.image} 
                                       alt={member.name} 
                                       className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                 ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                       <UserCircle2 size={120} strokeWidth={1} />
                                    </div>
                                 )}
                                 
                                 {/* Gradient Overlay */}
                                 <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                 
                                 {/* Overlay Details (Socials & Phone) */}
                                 <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center gap-3">
                                    {member.phone && (
                                       <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors duration-300" title="Call">
                                          <Phone size={18} />
                                       </a>
                                    )}
                                    {member.socials?.twitter && member.socials.twitter !== '#' && (
                                       <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#1DA1F2] transition-colors duration-300" title="Twitter">
                                          <Twitter size={18} />
                                       </a>
                                    )}
                                    {member.socials?.linkedin && member.socials.linkedin !== '#' && (
                                       <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0A66C2] transition-colors duration-300" title="LinkedIn">
                                          <Linkedin size={18} />
                                       </a>
                                    )}
                                 </div>
                              </div>

                              {/* Details */}
                              <div className="p-6 relative bg-white z-10 flex flex-col items-center text-center">
                                 <div className="absolute -top-6 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    {member.post}
                                 </div>
                                 <h3 className="mt-2 text-xl font-bold text-slate-800 leading-tight">
                                    {member.name}
                                 </h3>
                                 <p className="text-sm font-medium text-slate-500 mt-1">
                                    {member.level}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-12 px-4 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center">
                        <ManQuestion animated={true} color="#039133" secondaryColor="rgba(3,145,51,0.08)" className="w-28 h-28 mb-3 opacity-90" />
                        <p className="text-slate-700 font-semibold text-lg">Profiles Updating Soon</p>
                        <p className="text-slate-400 font-medium text-sm mt-1 max-w-sm">The department secretariat is compiling the verified directory for this category.</p>
                     </div>
                  )}
               </section>
            ))}
         </div>
      </main>
   );
}
