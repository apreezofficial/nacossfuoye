import FromGroup from "./FormGroup";
import QuilEditor from "./QuilEditor";

function Editor({ date, setDate, referenceNumber, setReferenceNumber, head, setHead, setContent }) {
   function handleDateChange(event) {
      setDate(event.target.value);
   }

   function handleRefChange(event) {
      const newRef = `NACOSS/25/${event.target.value}`;
      setReferenceNumber(newRef);
   }

   function handleHeadChange(event) {
      setHead(event.target.value);
   }

   function handleContentChange(html) {
      setContent(html);
   }
   return (
      <aside className="form-section">
         <FromGroup title="Date" type="date" name="dateInput" value={date} onChange={handleDateChange} />
         <FromGroup title="Reference Number" type="number" name="refInput" value={referenceNumber} onChange={handleRefChange} />
         <FromGroup title="Memo Subject" name="headInput" value={head} onChange={handleHeadChange} />
         <QuilEditor onChange={handleContentChange} />
      </aside>
   )
}

export default Editor;