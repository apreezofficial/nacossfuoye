'use client';

export default function PageHeader({
   title,
   description,
   onSortChange,
   children
}) {
   return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            {description && <p className="mt-2 text-lg text-slate-600">{description}</p>}
         </div>

         <div className="flex items-center gap-4">
            {onSortChange && (
               <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/60">
                  <label htmlFor="order" className="text-sm font-medium text-slate-600">Sort:</label>
                  <select
                     id="order"
                     className="text-sm font-semibold bg-transparent border-none outline-none text-slate-900 cursor-pointer focus:ring-0 pl-1 pr-6 py-0.5"
                     onChange={e => onSortChange(e.target.value === "true")}
                  >
                     <option value="false">Newest</option>
                     <option value="true">Oldest</option>
                  </select>
               </div>
            )}

            {children}
         </div>
      </div>
   );
}
