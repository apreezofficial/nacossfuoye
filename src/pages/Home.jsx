import { Link } from "react-router-dom"

function Index() {
   return (
      <div className="nacoss-home">
         <h1 className="nacoss-home__title">NACOSS MEMO Generator</h1>
         <nav className="nacoss-home__nav">
            <Link to="/memos" className="nacoss-home__link">View Memos</Link>
            <Link to="/admin/login" className="nacoss-home__link">Admin Login</Link>
            <Link to="/admin/edit" className="nacoss-home__link">Create/Edit Memo</Link>
         </nav>
         <p className="nacoss-home__desc">
            Easily create, preview, and manage official NACOSS memos online.
         </p>
      </div>
   )
}

export default Index