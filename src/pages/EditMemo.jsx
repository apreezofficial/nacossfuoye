import { useParams, useNavigate } from "react-router-dom";
import CreateNewMemo from "./CreateNewMemo";
import supabase from "../services/supabaseClient";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const EditMemo = () => {
   const { reference } = useParams();
   const navigate = useNavigate();
   const decodedReference = decodeURIComponent(reference);
   const [error, setError] = useState(null);
   const [date, setDate] = useState('');
   const [head, setHead] = useState('');
   const [content, setContent] = useState('');
   const [loading, setLoading] = useState(true)


   useEffect(() => {
      const getMemo = async () => {
         try {
            const { data, error } = await supabase
               .from('memo')
               .select('*')
               .eq('reference', decodedReference)
               .single();

            setDate(data.date);
            setHead(data.head);
            setContent(data.content);
            setError(null);
            const timer = setTimeout(() => {
               setLoading(false);
            }, 500);
            return () => clearTimeout(timer);

         } catch (error) {
            console.log(error);
            navigate('/', { replace: true });
            setError(error);
            setLoading(false);
         }
      }

      getMemo();
   }, [reference, navigate, decodedReference]);

   if (loading) {
      return <Loading />
   }

   if (error) {
      return <div>{error}</div>
   }

   return (
      <CreateNewMemo Date={date} ReferenceNumber={decodedReference} Head={head} Content={content} is_New={false} />
   )
}

export default EditMemo;