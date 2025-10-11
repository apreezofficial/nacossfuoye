import { useParams, useNavigate } from "react-router-dom";
import CreateNewMemo from "./CreateNewMemo";
import supabase from "../services/supabaseClient";
import { useEffect, useState } from "react";

const EditMemo = () => {
   const { reference } = useParams();
   const navigate = useNavigate();
   const decodedReference = decodeURIComponent(reference);
   const [error, setError] = useState();
   const [date, setDate] = useState();
   const [head, setHead] = useState();
   const [content, setContent] = useState();


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
            setContent(data.content)
            setError(null);
         } catch (error) {
            console.log(error);
            navigate('/', { replace: true });
         }
      }

      getMemo();
   })

   return (
      <CreateNewMemo Date={date} ReferenceNumber={decodedReference} Head={head} Content={content}/>
   )
}

export default EditMemo;