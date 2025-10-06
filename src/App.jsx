/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import './App.css'
import Editor from './Editor'
import Letterhead from './Letterhead';
import Buttons from './Buttons';
import Memos from './Memos';
import ViewMemo from './ViewMemo'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import ProtectedRoute from './ProtectedRoute';
import supabase from '../supabaseClient';

function App() {
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().slice(0, 10);

   const [date, setDate] = useState(formattedDate);
   const [referenceNumber, setReferenceNumber] = useState('NACOSS/25__');
   const [head, setHead] = useState('This is a demo');
   const [content, setContent] = useState('');

   const letterHeadRef = useRef(null);
   const previewRef = useRef(null);

   const [user, setUser] = useState();

   useEffect(() => {
      function scalePaper() {
         const paper = letterHeadRef.current;
         const wrapper = previewRef.current;
         if (!paper || !wrapper) return;
         const baseWidth = 794;
         const baseHeight = 1123;
         const scale = wrapper.offsetWidth / (baseWidth + 100);
         paper.style.transform = `scale(${scale})`;
      }
      window.addEventListener("resize", scalePaper);
      window.addEventListener("load", scalePaper);

      scalePaper();

      return () => {
         window.removeEventListener("resize", scalePaper);
         window.removeEventListener("load", scalePaper);
      };
   }, []);

   useEffect(() => {
      // Get current session (if user already logged in)
      supabase.auth.getSession().then(({ data }) => {
         setUser(data.session?.user ?? null);
      });

      // Listen for login/logout changes
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user ?? null);
      });

      return () => listener.subscription.unsubscribe();
   }, []);

   return (
      <Routes>
         <Route path='/admin/edit' element={
            <ProtectedRoute user={user}>
               <div className="container">
                  <header className="header">
                     <h1>NACOSS MEMO Generator</h1>
                  </header>

                  <div className='main-content'>
                     <Editor
                        date={date}
                        setDate={setDate}
                        referenceNumber={referenceNumber}
                        setReferenceNumber={setReferenceNumber}
                        head={head}
                        setHead={setHead}
                        setContent={setContent}
                     />
                     <main className="preview-section" ref={previewRef}>
                        <Buttons elementRef={letterHeadRef} referenceNumber={referenceNumber} date={date} head={head} content={content} />

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
            </ProtectedRoute>
         }

         />

         <Route path='/memos' element={<Memos />} />

         <Route path='/memos/:reference' element={<ViewMemo />} />
         <Route path="/admin/login" element={<AdminLogin />}
         />
      </Routes>

   )
}

export default App
