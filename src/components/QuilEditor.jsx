/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function QuilEditor({ onChange, value = null }) {
   const editorRef = useRef(null);
   const quillRef = useRef(null);

   useEffect(() => {
      if (editorRef.current) {
         // Register font whitelist
         const Font = Quill.import('formats/font');
         Font.whitelist = ['poppins', 'raleway', 'segoe-ui', 'times-new-roman'];
         Quill.register(Font, true);

         const Size = Quill.import('attributors/style/size');
         Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '22px'];
         Quill.register(Size, true);

         quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
               toolbar: [
                  [{ 'font': Font.whitelist }],
                  [{ size: Size.whitelist }],
                  [{ align: [] }],
                  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ script: "sub" }, { script: "super" }],
                  ["link"],
                  [{ color: [] }, { background: [] }],
                  ["clean"],
               ],
            },
            placeholder: "Enter your memo content here...",
         });

         // Listen for changes and call onChange with HTML content
         quillRef.current.on('text-change', function () {
            if (onChange) {
               onChange(quillRef.current.root.innerHTML);
            }
         });
      }
   }, []);

   return (
      <div className="form-group">
         <label>Memo Content</label>
         <div className="editor-container">
            <div ref={editorRef}>
               {value && <div dangerouslySetInnerHTML={{ __html: value }} />}
            </div>
         </div>
      </div>
   );
}

export default QuilEditor;