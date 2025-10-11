import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import supabase from "../services/supabaseClient";
import Notification from "../components/Notification";
import Letterhead from "../components/Letterhead";
import DownloadBtn from "../components/DownloadBtn";
import useScale from "../hooks/useScale";
import Loading from "../components/Loading";
import { House, SquareChevronLeft, SquareChevronRight } from "lucide-react";

function ViewMemo() {
   const { reference } = useParams();
   const decodedReference = decodeURIComponent(reference);

   const letterHeadRef = useRef(null);
   const previewRef = useRef(null);

   const navigate = useNavigate();
   const [error, setError] = useState();
   const [date, setDate] = useState();
   const [head, setHead] = useState();
   const [content, setContent] = useState();
   const [currentMemo, setCurrentMemo] = useState(null);
   const [nextMemo, setNextMemo] = useState(null);
   const [previousMemo, setPreviousMemo] = useState(null);
   const [loading, setLoading] = useState(true);


   const scale = useScale({ letterHeadRef, previewRef });

   useEffect(() => {
      const getAdjacentMemos = async () => {
         setLoading(true);

         try {
            // Get current memo first
            const { data: current, error: currentError } = await supabase
               .from('memo')
               .select('*')
               .eq('reference', decodedReference)
               .single();

            if (currentError || !current) {
               setError('Could not fetch memo');
               navigate('/', { replace: true });
               return;
            }

            // Set current memo data
            setCurrentMemo(current);
            setDate(current.date);
            setHead(current.head);
            setContent(current.content);

            const { data: previous } = await supabase
               .from('memo')
               .select()
               .eq('is_published', true)
               .gt('created_at', current.created_at)
               .order('created_at', { ascending: false })
               .limit(1);

            const { data: next } = await supabase
               .from('memo')
               .select()
               .eq('is_published', true)
               .lt('created_at', current.created_at)
               .order('created_at', { ascending: false })
               .limit(1);

            setPreviousMemo(previous?.[0] || null);
            setNextMemo(next?.[0] || null);
            setError(null);

         } catch (err) {
            setError('Failed to load memo');
            console.error(err);
            navigate('/', { replace: true });
         } finally {
            const timer = setTimeout(() => {
               setLoading(false);
            }, 500);
            return () => clearTimeout(timer);
         }
      };

      getAdjacentMemos();
   }, [reference, navigate, decodedReference]);

   const handleNext = () => {
      if (nextMemo) {
         navigate(`/${encodeURIComponent(nextMemo.reference)}`);
      }
   };

   const handlePrev = () => {
      if (previousMemo) {
         navigate(`/${encodeURIComponent(previousMemo.reference)}`);
      }
   };

   if (loading) return <Loading />;  

   return (
      <>
         {error && <Notification message={'Fail to get data'} type={"error"} />}
         <main className="preview-section" ref={previewRef}>
            <div className="view-btns">
               <DownloadBtn elementRef={letterHeadRef} referenceNumber={decodedReference} />
               <Link to={'/'}>
                  <button className="btn">
                     <House size={18} />
                  </button>
               </Link>
               <button
                  className="btn"
                  onClick={handlePrev}
                  disabled={!previousMemo}
               >
                  <SquareChevronLeft size={18} />
               </button> &ensp;
               <button
                  className="btn"
                  onClick={handleNext}
                  disabled={!nextMemo}
               >
                  <SquareChevronRight size={18} />
               </button>
            </div>

            <Letterhead
               date={date}
               referenceNumber={decodedReference}
               head={head}
               content={content}
               letterHeadRef={letterHeadRef}
            />
         </main>
      </>
   )
}

export default ViewMemo;