'use client';

import { useState, useRef } from 'react';
import useScale from '@/hooks/useScale';
import { House, ImagePlus, FileDown } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Notification from '@/components/Notification';
import { toPng } from 'html-to-image';
import ImageCropperModal from '@/components/ImageCropperModal';

export default function BirthdayTemplateEditor() {
   const [firstname, setFirstname] = useState('John');
   const [lastname, setLastname] = useState('Doe');
   const [post, setPost] = useState('Member');
   const [date, setDate] = useState('March, 03');

   const [rawImage, setRawImage] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
   const [isGenerating, setIsGenerating] = useState(false);
   const [notification, setNotification] = useState(null);

   const flyerRef = useRef(null);
   const previewWrapperRef = useRef(null);

   useScale({ letterHeadRef: flyerRef, previewRef: previewWrapperRef, baseWidth: 3000 });

   const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Check if file is image
      if (!file.type.startsWith('image/')) {
         showNotification('Please upload a valid image file.', 'error');
         return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
         showNotification('Image must be less than 10MB.', 'error');
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
         setRawImage(reader.result); // Opens cropper modal
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset input
   };

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   const downloadFlyer = async () => {
      setIsGenerating(true);

      // 1. Preload the high-quality background to ensure it's in browser cache before html-to-image runs
      await new Promise((resolve) => {
         const img = new Image();
         img.onload = resolve;
         img.onerror = resolve; // Proceed anyway if it fails
         img.src = '/assets/birthday_template_high.png';
      });

      const paper = flyerRef.current;

      if (!paper) {
         showNotification('Template not found', 'error');
         setIsGenerating(false);
         return;
      }

      const originalTransform = paper.style.transform;
      const originalOrigin = paper.style.transformOrigin;
      const originalTransition = paper.style.transition;

      try {
         // Temporarily remove transform to capture full 3000x3000 quality
         paper.style.transition = 'none';
         paper.style.transform = 'none';
         paper.style.transformOrigin = 'top left';

         // Wait a moment for React to apply the high-res background image and DOM to settle
         await new Promise(r => setTimeout(r, 800));

         const dataUrl = await toPng(paper, {
            pixelRatio: 1, // 3000px is already very large, no need to multiply
            backgroundColor: '#ffffff',
         });

         const link = document.createElement('a');
         link.download = `${firstname}_${lastname}_Birthday.png`;
         link.href = dataUrl;
         link.click();

         showNotification('Flyer downloaded successfully!', 'success');
      } catch (error) {
         console.error('Download error:', error);
         showNotification(`Download failed: ${error.message}`, 'error');
      } finally {
         // Restore transform
         paper.style.transform = originalTransform;
         paper.style.transformOrigin = originalOrigin;
         paper.style.transition = originalTransition;

         setIsGenerating(false);
      }
   };

   return (
      <div>
         {notification && <Notification message={notification.message} type={notification.type} />}

         {/* Cropper Modal */}
         {rawImage && (
            <ImageCropperModal
               imageSrc={rawImage}
               onComplete={(croppedImg) => {
                  setImagePreview(croppedImg);
                  setRawImage(null);
               }}
               onCancel={() => setRawImage(null)}
            />
         )}

         <PageHeader title="Birthday Template Generator">
            <div className="flex flex-wrap items-center gap-3">
               <Link href="/admin/dashboard" aria-label="Go back to dashboard" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-primary hover:border-primary/30 transition-all duration-300">
                  <House size={22} />
               </Link>
               <button
                  onClick={downloadFlyer}
                  disabled={isGenerating}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${isGenerating ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'}`}
               >
                  {isGenerating ? (
                     <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                     </div>
                  ) : (
                     <div className="flex items-center gap-2">
                        <FileDown size={20} />
                        Download Flyer
                     </div>
                  )}
               </button>
            </div>
         </PageHeader>

         <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start mt-4">
            {/* Sidebar Form */}
            <aside className="p-6 rounded-2xl bg-white shadow-xl lg:sticky lg:top-8 border border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 mb-6">Flyer Details</h3>
               <div className="space-y-5">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Picture</label>
                     <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/40 rounded-xl cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-primary">
                           {imagePreview ? (
                              <img src={imagePreview} alt="Preview" className="h-28 object-contain rounded-md" />
                           ) : (
                              <>
                                 <ImagePlus size={32} className="mb-2 opacity-70" />
                                 <p className="text-sm font-semibold">Upload Photo</p>
                                 <p className="text-xs opacity-70 mt-1">Max 10MB</p>
                              </>
                           )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                     </label>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                     <input
                        type="text"
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all duration-300 text-slate-900 bg-slate-50 focus:bg-white"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                     <input
                        type="text"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all duration-300 text-slate-900 bg-slate-50 focus:bg-white"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Post</label>
                     <input
                        type="text"
                        value={post}
                        onChange={e => setPost(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all duration-300 text-slate-900 bg-slate-50 focus:bg-white"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date (e.g. March 03, 2026)</label>
                     <input
                        type="text"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all duration-300 text-slate-900 bg-slate-50 focus:bg-white"
                     />
                  </div>
               </div>
            </aside>

            {/* Canvas Preview Area */}
            <main className="shadow-2xl rounded-2xl w-full relative flex flex-col min-w-0 bg-slate-100 overflow-hidden border border-slate-200">
               <div ref={previewWrapperRef} className="w-full relative aspect-square">
                  {/* The actual 3000x3000 canvas */}
                  <div
                     ref={flyerRef}
                     className="absolute top-0 left-0 bg-white overflow-hidden"
                     style={{
                        width: '3000px',
                        height: '3000px',
                        transformOrigin: 'top left'
                     }}
                  >
                     {/* Background Images - rendered as actual DOM elements for reliable html-to-image capture */}
                     <img
                        src="/assets/birthday_template_low.jpg"
                        alt="Background Low"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ display: isGenerating ? 'none' : 'block' }}
                     />
                     <img
                        src="/assets/birthday_template_high.png"
                        alt="Background High"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ display: isGenerating ? 'block' : 'none' }}
                     />

                     {/* Picture Frame - Masked with CSS to solid white background shape */}
                     <div
                        className="absolute top-187 left-165 w-231.5 h-317.5 bg-slate-200 overflow-hidden flex items-center justify-center"
                        style={{
                           WebkitMaskImage: 'url(/assets/frame_background.png)',
                           maskImage: 'url(/assets/frame_background.png)',
                           WebkitMaskSize: 'contain',
                           maskSize: 'contain',
                           WebkitMaskPosition: 'center',
                           maskPosition: 'center',
                           WebkitMaskRepeat: 'no-repeat',
                           maskRepeat: 'no-repeat'
                        }}
                     >
                        {imagePreview ? (
                           <img src={imagePreview} alt="User" className="w-full h-full object-cover" />
                        ) : (
                           <span className="text-4xl text-slate-400 font-bold font-raleway">Photo</span>
                        )}
                     </div>

                     {/* Text Elements - Each is independently positioned */}

                     {/* Firstname: 19pt, color #0e2a1a, bold */}
                     <div
                        className="absolute bottom-255 left-515 w-max -translate-x-1/2 text-center font-raleway font-bold"
                        style={{ fontSize: '60pt', color: '#0e2a1a' }}
                     >
                        {firstname}
                     </div>

                     {/* Lastname: 18pt, color white, medium */}
                     <div
                        className="absolute bottom-225 left-515 w-max -translate-x-1/2 text-center font-raleway font-semibold"
                        style={{ fontSize: '59pt', color: '#ffffff' }}
                     >
                        {lastname}
                     </div>

                     {/* Post: 30pt, color white, bold */}
                     <div
                        className="absolute bottom-163 left-1/2 w-max -translate-x-1/2 text-center font-raleway font-bold"
                        style={{ fontSize: '95pt', color: '#ffffff' }}
                     >
                        {post}
                     </div>

                     {/* Date - Rotated and anchored at bottom-left so it grows upwards. 
                         Must use `left` instead of `right` so the pivot point never moves when text grows! */}
                     <div
                        className="absolute bottom-295 left-[2372px] w-max origin-bottom-left -rotate-90 font-raleway font-semibold text-left"
                        style={{ fontSize: '60pt', color: '#ffffff' }}
                     >
                        {date}
                     </div>
                  </div>
               </div>

               {/* Overlay when generating */}
               {isGenerating && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
                     <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                     <p className="text-xl font-bold font-raleway">Rendering High-Quality Image...</p>
                  </div>
               )}
            </main>
         </div>
      </div>
   );
}
