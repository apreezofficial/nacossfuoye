import nacossLogo from '../assets/nacossLogo.png';
import fuoyeLogo from '../assets/fuoyeLogo.png';
import genSign from '../assets/genSign.png';
import presidentSign from '../assets/presidentSign.png';
import proSign from '../assets/proSign.png';
import footer from '../assets/footer.png'

function Letterhead({ date, referenceNumber, head, content, letterHeadRef }) {

   return (
      <section className="letterHead" ref={letterHeadRef}>
         <div className="header-section">
            <div className="logos">
               <img src={nacossLogo} alt="NACOSS Logo" loading="lazy" />
               <img src={fuoyeLogo} alt="FUOYE Logo" loading="lazy" />
            </div>
            <h2 className="nacossName">NIGERIA ASSOCIATION OF COMPUTER SCIENCE STUDENTS (NACOSS)
               <span>Federal University Oye-Ekiti (FUOYE)</span>
            </h2>


            <div className="ref-date">
               <h2>REF:.............................</h2>
               <h2>DATE:..........................</h2>
            </div>
         </div>

         <div className="memoDate">{date}</div>
         <div className="memoRef">{referenceNumber}</div>
         <h1 className="memoHead">{head}</h1>

         <div className='memoContent' dangerouslySetInnerHTML={{ __html: content }} />

         <footer className="footer-section">
            <div className="signatures">
               <div className="signed">
                  <img src={presidentSign} alt="gensec signature" className="signature" />
                  <p className="name">Comr. Agbelekale David</p>
                  <p className="position">President</p>
                  <p className="contact">08108190023</p>
               </div>
               <div className="signed">
                  <img src={genSign} alt="gensec signature" className="signature" />
                  <p className="name">Comr. Ogunniran Damilola</p>
                  <p className="position">General Secretary</p>
                  <p className="contact">09036440269</p>
               </div>
               <div className="signed">
                  <img src={proSign} alt="gensec signature" className="signature" />
                  <p className="name">Comr. Idowu Emmanuel</p>
                  <p className="position">P.R.O.</p>
                  <p className="contact">08148310886</p>
               </div>

            </div>
            <img src={footer} alt="footer-img" />
         </footer>
      </section>
   )
}

export default Letterhead;