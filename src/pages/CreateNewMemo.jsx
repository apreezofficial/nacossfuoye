// * Imports
import { useState, useRef } from 'react';
import Letterhead from '../components/Letterhead';
import DownloadBtn from '../components/DownloadBtn';
import useScale from '../hooks/useScale';
import QuilEditor from '../components/QuilEditor';

function CreateNewMemo({Date = null, ReferenceNumber = null, Head = null, Content = null}) {
   // const currentDate = new Date();
   // const formattedDate = currentDate.toISOString().slice(0, 10);

   const [date, setDate] = useState(Date);
   const [referenceNumber, setReferenceNumber] = useState(`NACOSS/25/${ReferenceNumber}`);
   const [head, setHead] = useState(Head);
   const [content, setContent] = useState(Content);

   const letterHeadRef = useRef(null);
   const previewRef = useRef(null);

   const scale = useScale({ letterHeadRef, previewRef });

   function handleDateChange(event) {
      setDate(event.target.value);
   }

   function handleRefChange(event) {
      const newRef = `NACOSS/25/${event.target.value}`;
      setReferenceNumber(newRef);
   }

   function handleHeadChange(event) {
      setHead(event.target.value);
   }

   function handleContentChange(html) {
      setContent(html);
   }

   return (
      <div className="container">
         <header className="header">
            <h1>NACOSS MEMO Generator</h1>
         </header>

         <div className='main-content'>
            <aside className="form-section">
               <div className="form-group">
                  <label htmlFor="dateInput">Date</label>
                  <input type="date"
                     value={date}
                     id="dateInput"
                     name="dateInput"
                     min="2025-10-01"
                     onChange={handleDateChange} />
               </div>
               <div className="form-group">
                  <label htmlFor="refInput">Reference Number</label>
                  <input
                     type="number"
                     id="refInput"
                     name="refInput"
                     value={referenceNumber}
                     min={1}
                     onChange={handleRefChange}
                  />
               </div>
               <div className="form-group">
                  <label htmlFor="headInput">Memo Subject</label>
                  <input
                     type="text"
                     id="headInput"
                     name="headInput"
                     value={head}
                     placeholder="Enter memo subject"
                     onChange={handleHeadChange}
                  />
               </div>

               <QuilEditor onChange={handleContentChange} />

            </aside>

            <main className="preview-section" ref={previewRef}>
               <div className="download-buttons">
                  <DownloadBtn elementRef={letterHeadRef} referenceNumber={referenceNumber} />
                  {/* <PublishBtn /> */}
               </div>

               <Letterhead
                  date={date}
                  referenceNumber={referenceNumber}
                  head={head}
                  content={content}
                  letterHeadRef={letterHeadRef}
               />
            </main>
         </div>
      </div>
   )
}

export default CreateNewMemo