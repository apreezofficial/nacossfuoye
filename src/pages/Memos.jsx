import supabase from '../services/supabaseClient';
import { useEffect, useState } from 'react';
import Item from '../components/Item';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { UserStar } from 'lucide-react';

function Memos() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState(null);
   const [order, setOrder] = useState(true);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const { data, error } = await supabase
            .from('memo')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: order });

         if (error) {
            setFetchError('Could not fetch');
            setData(null);
         } else {
            setData(data);
            setFetchError(null);
            const timer = setTimeout(() => {
               setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
         }
      };

      fetchData();
   }, [order, data]);

   if (loading) return <Loading />;

   return (
      <div>
         <div className='page-title'>
            <Link to={'/admin/dashboard'}>
               <button className="btn btn-primary">
                  <UserStar size={20} />
               </button>
            </Link>
            <h1>Student View</h1>
         </div>
         <div className="filter-container">
            <h3>Date Created:</h3>
            <select name="order" id="order" onChange={e => setOrder(e.target.value === "true")}>
               <option value="true">Newest</option>
               <option value="false">Oldest</option>
            </select>
         </div>

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