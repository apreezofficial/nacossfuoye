import supabase from '../services/supabaseClient';
import { useEffect, useState } from 'react';
import Item from '../components/Item';

function Memos() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const { data, error } = await supabase
            .from('memo')
            .select();

         if (error) {
            setFetchError('Could not fetch');
            setData(null);
            console.log(error);
         } else {
            setData(data);
            setFetchError(null);
            console.log(data);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         {fetchError && <h1>{fetchError}</h1>}
         {data && (
            <div className="item-container">
               {data.map(item => (
                  <Item key={item.id} {...item} />
               ))}
            </div>
         )}
      </div>
   );
}

export default Memos;