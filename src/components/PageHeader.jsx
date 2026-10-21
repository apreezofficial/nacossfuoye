'use client';

export default function PageHeader({
   title,
   description,
   onSortChange,
   className = '',
   children
}) {
   return (
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${className}`}>
         <div className="shrink-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            {description && <p className="mt-1.5 text-base sm:text-lg text-slate-600">{description}</p>}
         </div>

         {(onSortChange || children) && (
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
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
         )}
      </div>
   );
}
