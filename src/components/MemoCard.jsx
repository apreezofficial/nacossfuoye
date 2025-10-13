import { Eye, EyeOff, Trash, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../services/supabaseClient';

function MemoCard(props) {

   function shortHead() {
      let newHead = `${props.head.substr(0, 35).toUpperCase().trim()}...`
      return newHead
   }

   return (

      <div className={`item-card remove-pointer ${props.is_published ? '' : 'notPublished-card'}`} title={props.head.toUpperCase() || ''}>

         <p className='memoCard-head'>
            <Link to={`/admin/edit/${encodeURIComponent(props.reference)}`} className='plain-link'>
               <SquarePen size={18} />
            </Link>
            <span>
               <span onClick={() => props.onToggleVisibility(props.reference, props.is_published)}>
                  {props.is_published ? <Eye size={18} className='add-pointer' /> : <EyeOff size={18} className='add-pointer' />} &ensp;
               </span>
               <Trash size={18} color='tomato' className='add-pointer' onClick={() => props.onDelete(props.reference)} />
            </span>
         </p>
         <p className="item-ref">{props.reference}</p>
         <p className="item-date">{props.date}</p>
         <span className="item-head">{shortHead()}</span>
      </div >

   )
}

export default MemoCard