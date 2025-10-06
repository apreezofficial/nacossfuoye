import { Link } from "react-router-dom"

function Index() {
   return (
      <div style={{
         minHeight: "100vh",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         background: "#f7f9fc"
      }}>
         <h1 style={{ color: "#039133", marginBottom: "1.5rem" }}>NACOSS MEMO Generator</h1>
         <nav style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <Link to="/memos" style={linkStyle}>View Memos</Link>
            <Link to="/admin/login" style={linkStyle}>Admin Login</Link>
            <Link to="/admin/edit" style={linkStyle}>Create/Edit Memo</Link>
         </nav>
         <p style={{ color: "#039133", fontSize: "1.1rem", maxWidth: "400px", textAlign: "center" }}>
            Easily create, preview, and manage official NACOSS memos online.
         </p>
      </div>
   )
}

const linkStyle = {
   padding: "0.75rem 1.5rem",
   background: "#039133",
   color: "#fff",
   borderRadius: "6px",
   textDecoration: "none",
   fontWeight: "500",
   transition: "background 0.2s",
   boxShadow: "0 2px 8px rgba(42,58,94,0.08)"
}

export default Index