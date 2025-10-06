/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
   // Input elements
   const dateInput = document.getElementById('dateInput');
   const refInput = document.getElementById('refInput');
   const headInput = document.getElementById('headInput');

   // Display elements
   const memoDate = document.getElementById('memoDate');
   const memoRef = document.getElementById('memoRef');
   const memoHead = document.getElementById('memoHead');
   const memoContent = document.getElementById('memoContent');

   // Button elements
   const downloadPDFBtn = document.getElementById('downloadPDF');
   const downloadPNGBtn = document.getElementById('downloadPNG');

   // Event listeners for download buttons
   downloadPDFBtn.addEventListener('click', downloadPDF);
   downloadPNGBtn.addEventListener('click', downloadPNG);

   // Set initial Date to today
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().slice(0, 10);
   dateInput.value = formattedDate;

   // Input to display mapping
   const inputMappings = {
      dateInput: (value) => {
         const date = new Date(value);
         return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
         });
      },
      refInput: (value) => `NACOSS/25/${value}`,
      headInput: (value) => value.toUpperCase()
   };

   // Set up input event listeners
   dateInput.addEventListener('change', () => {
      memoDate.textContent = inputMappings.dateInput(dateInput.value);
   });

   refInput.addEventListener('input', () => {
      memoRef.textContent = inputMappings.refInput(refInput.value);
   });

   headInput.addEventListener('input', () => {
      memoHead.textContent = inputMappings.headInput(headInput.value);
   });

   // Initialize display values
   memoDate.textContent = inputMappings.dateInput(dateInput.value);
   memoRef.textContent = inputMappings.refInput(refInput.value);
   memoHead.textContent = inputMappings.headInput(headInput.value);

   // Initialize Quill editor
   // Register font whitelist
   const Font = Quill.import('formats/font');
   Font.whitelist = ['poppins', 'raleway', 'segoe-ui', 'times-new-roman'];
   Quill.register(Font, true);

   const Size = Quill.import('attributors/style/size');
   Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '22px'];
   Quill.register(Size, true);

   const quill = new Quill('#contentInput', {
      theme: 'snow',
      modules: {
         toolbar: [
            [{ 'font': Font.whitelist }],
            [{ 'size': Size.whitelist }],
            // [{ 'header': [2, 3, 4, false] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
         ]
      },
      placeholder: 'Enter your memo content here...'
   });


   // Update memo content when editor changes
   quill.on('text-change', function () {
      memoContent.innerHTML = quill.root.innerHTML;
      // console.log(length);
   });

   // Initialize memo content
   memoContent.innerHTML = quill.root.innerHTML;

   // Utility functions
   function setButtonLoading(button, isLoading) {
      if (isLoading) {
         button.classList.add('loading');
         button.disabled = true;
      } else {
         button.classList.remove('loading');
         button.disabled = false;
      }
   }

   function showNotification(message, type = 'success') {
      // Simple notification system
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
   position: fixed;
   top: 20px;
   right: 20px;
   padding: 1rem 1.5rem;
   background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
   color: white;
   border-radius: 8px;
   font-weight: 600;
   z-index: 1000;
   animation: slideIn 0.3s ease;
   `;

      document.body.appendChild(notification);

      setTimeout(() => {
         notification.remove();
      }, 3000);
   }

   // Download functions
   async function downloadPDF() {
      try {
         setButtonLoading(downloadPDFBtn, true);

         const { jsPDF } = window.jspdf;
         const element = document.querySelector('.letterHead');

         const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
         });

         const imgData = canvas.toDataURL("image/png", 2.0);
         const pdf = new jsPDF("p", "pt", "a4");

         const pageWidth = pdf.internal.pageSize.getWidth();
         const pageHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = pageWidth;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;

         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

         const filename = `${refInput.value}-${dateInput.value}.pdf`;
         pdf.save(filename);

         showNotification('PDF downloaded successfully!');
      } catch (error) {
         console.error('PDF download error:', error);
         showNotification('Failed to download PDF. Please try again.', 'error');
      } finally {
         setButtonLoading(downloadPDFBtn, false);
      }
   }

   async function downloadPNG() {
      try {
         setButtonLoading(downloadPNGBtn, true);

         const element = document.querySelector('.letterHead');
         const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
         });

         const link = document.createElement("a");
         const filename = `${refInput.value}-${dateInput.value}.png`;

         link.download = filename;
         link.href = canvas.toDataURL("image/png", 2.0);
         link.click();

         showNotification('PNG downloaded successfully!');
      } catch (error) {
         console.error('PNG download error:', error);
         showNotification('Failed to download PNG. Please try again.', 'error');
      } finally {
         setButtonLoading(downloadPNGBtn, false);
      }
   };

   // Add CSS animation for notifications
   const style = document.createElement('style');
   style.textContent = `
   @keyframes slideIn {
      from {
      transform: translateX(100%);
   opacity: 0;
               }
   to {
      transform: translateX(0);
   opacity: 1;
               }
            }
   `;
   document.head.appendChild(style);

   function scalePaper() {
      const paper = document.querySelector(".letterHead");
      const wrapper = document.querySelector(".preview-section");
      const baseWidth = 794;
      const baseHeight = 1123;
      const scale = wrapper.offsetWidth / (baseWidth + 100);
      // scale the paper
      paper.style.transform = `scale(${scale})`;
   }
   // run when page loads & when window resizes
   window.addEventListener("resize", scalePaper);
   window.addEventListener("load", scalePaper);
});

