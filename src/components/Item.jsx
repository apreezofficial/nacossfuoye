import { Link } from 'react-router-dom';

function Item(props) {

   function shortHead() {
      let newHead = `${props.head.substr(0, 35).toUpperCase().trim()}...`
      return newHead
   }

   return (
      <Link to={`/${encodeURIComponent(props.reference)}`} className='plain-link'>
         <div className="item-card" title={props.head.toUpperCase()}>
            <p className="item-ref">{props.reference}</p>
            <p className="item-date">{props.date}</p>
            <span className="item-head">{shortHead()}</span>
         </div >
      </Link>
   )
}

export default Item