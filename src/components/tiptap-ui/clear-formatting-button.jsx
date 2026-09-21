"use client";
import { forwardRef } from "react"
import { Eraser } from "lucide-react"

import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button } from "@/components/tiptap-ui-primitive/button"

export const ClearFormattingButton = forwardRef((
   {
      editor: providedEditor,
      children,
      ...buttonProps
   },
   ref
) => {
   const { editor } = useTiptapEditor(providedEditor)

   if (!editor) {
      return null
   }

   return (
      <Button
         type="button"
         variant="ghost"
         role="button"
         tabIndex={-1}
         aria-label="Clear formatting"
         tooltip="Clear formatting"
         onClick={() => {
            editor.chain().focus().unsetAllMarks().clearNodes().run()
         }}
         {...buttonProps}
         ref={ref}
      >
         {children ?? <Eraser className="tiptap-button-icon" />}
      </Button>
   )
})

ClearFormattingButton.displayName = "ClearFormattingButton"

export default ClearFormattingButton
