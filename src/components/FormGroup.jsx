
function FromGroup({ title, type = 'text', name, onChange }) {
   return (
      <div className="form-group">
         <label htmlFor={name}>{title}</label>
         <input
            type={type}
            id={name}
            name={name}
            onChange={onChange}
         />
      </div>
   );
}

export default FromGroup;