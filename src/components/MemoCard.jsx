import { Eye, EyeOff, Trash, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';

function MemoCard(props) {

   function shortHead() {
      let newHead = `${props.head.substr(0, 35).toUpperCase().trim()}...`
      return newHead
   }

   return (

      <div className="item-card" title={props.head.toUpperCase()}>
         <p className='memoCard-head'>
            <Link to={`/admin/edit/${encodeURIComponent(props.reference)}`} className='plain-link'>
               <SquarePen size={18} />
            </Link>
            <span>
               {props.is_published ? <Eye size={18} /> : <EyeOff size={18} />} &ensp;
               <Trash size={18} color='tomato' />
            </span>
         </p>
         <p className="item-ref">{props.reference}</p>
         <p className="item-date">{props.date}</p>
         <span className="item-head">{shortHead()}</span>
      </div >

   )
}

export default MemoCard