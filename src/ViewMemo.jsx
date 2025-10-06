import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import Notification from "./Notification";
import Letterhead from "./Letterhead";

function ViewMemo() {

   const { reference } = useParams();

   const navigate = useNavigate();
   const [error, setError] = useState();
   const [date, setDate] = useState();
   const [head, setHead] = useState();
   const [content, setContent] = useState();

   useEffect(() => {
      const getMemo = async () => {
         const { data, error } = await supabase
            .from('memo')
            .select()
            .eq('reference', reference)
            .single();

         if (error) {
            setError('Could not fetch');
            console.log(error);
            navigate('/', { replace: true });
         }
         if (data) {
            setDate(data.date);
            setHead(data.head);
            setContent(data.content);
            setError(null);
            console.log(data)
         }
      }
      getMemo()
   }, [reference, navigate])

   return (
      <>
         {error && <Notification message={'Fail to get data'} type={"error"} />}
         <section className="view-memo">
            <Link to={'/memos'}>
               <button className="btn btn-primary" style={{marginBottom : '20px'}}>HOME</button>
         </Link>

         <Letterhead date={date} referenceNumber={reference} head={head} content={content} letterHeadRef={null} />
      </section >
      </>
   )
}

export default ViewMemo