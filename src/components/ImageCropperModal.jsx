import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';
import { X, Check } from 'lucide-react';

export default function ImageCropperModal({ imageSrc, onComplete, onCancel, aspect = 926 / 1270 }) {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const croppedAreaPixelsRef = useRef(null);
   const [isCropping, setIsCropping] = useState(false);

   const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
      croppedAreaPixelsRef.current = croppedAreaPixels;
   }, []);

   const handleSave = async () => {
      if (!croppedAreaPixelsRef.current) return;
      
      try {
         setIsCropping(true);
         const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixelsRef.current);
         onComplete(croppedImage);
      } catch (e) {
         console.error(e);
         alert('Failed to crop image');
      } finally {
         setIsCropping(false);
      }
   };

   return (
      <div className="fixed inset-0 z-100 flex flex-col bg-green-900/95 backdrop-blur-sm">
         <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
            <h2 className="text-lg font-bold">Crop Photo</h2>
            <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Cancel crop">
               <X size={24} />
            </button>
         </div>
         
         <div className="relative flex-1 bg-black overflow-hidden">
            <Cropper
               image={imageSrc}
               crop={crop}
               zoom={zoom}
               aspect={aspect}
               onCropChange={setCrop}
               onCropComplete={onCropCompleteHandler}
               onZoomChange={setZoom}
            />
         </div>

         <div className="p-6 bg-green-900 border-t border-white/10 flex flex-col items-center gap-6">
            <div className="w-full max-w-md">
               <label htmlFor="cropper-zoom-input" className="text-white/80 text-sm font-medium mb-2 block text-center">Zoom</label>
               <input
                  id="cropper-zoom-input"
                  aria-label="Zoom"
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-green-700 rounded-lg appearance-none cursor-pointer accent-primary"
               />
            </div>
            
            <button
               onClick={handleSave}
               disabled={isCropping}
               className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 active:scale-95 ${isCropping ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'}`}
            >
               {isCropping ? (
                  <>
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     Processing...
                  </>
               ) : (
                  <>
                     <Check size={20} />
                     Apply Crop
                  </>
               )}
            </button>
         </div>
      </div>
   );
}
