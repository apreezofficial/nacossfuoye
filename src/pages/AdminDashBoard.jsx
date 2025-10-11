import supabase from '../services/supabaseClient';
import { useEffect, useState } from 'react';
// import Item from '../components/Item';
import MemoCard from '../components/MemoCard';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Loading from '../components/Loading';

function AdminDashBoard() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const { data, error } = await supabase
            .from('memo')
            .select()
            .order('created_at', { ascending: false });

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
   }, []);

   if (loading) return <Loading />;  

   return (
      <div>
         {fetchError && <h1>{fetchError}</h1>}
         <Link to='/admin/edit' className='plain-link'>
            <div className="create-memo" title='Create new memo'>
               <Plus size={50}/>
               <p>Create New Memo</p>
            </div >
         </Link>

         {data && (
            <div className="item-container">
               {data.map(item => (
                  <MemoCard key={item.id} {...item} />
               ))}
            </div>
         )}
      </div>
   );
}

export default AdminDashBoard;