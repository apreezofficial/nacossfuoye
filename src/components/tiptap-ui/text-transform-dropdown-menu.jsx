"use client";
import { forwardRef, useCallback, useState } from "react"

import { Type } from "lucide-react"
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuGroup,
} from "@/components/tiptap-ui-primitive/dropdown-menu"

const TRANSFORMS = [
   { label: 'Uppercase', value: 'uppercase' },
   { label: 'Lowercase', value: 'lowercase' },
   { label: 'Capitalize', value: 'capitalize' },
];

export const TextTransformDropdownMenu = forwardRef((
   {
      editor: providedEditor,
      modal = false,
      ...buttonProps
   },
   ref
) => {
   const { editor } = useTiptapEditor(providedEditor)
   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = useCallback(
      (open) => {
         if (!editor) return
         setIsOpen(open)
      },
      [editor]
   )

   if (!editor) {
      return null
   }

   const isActive = editor.isActive('textTransform');

   return (
      <DropdownMenu modal={modal} open={isOpen} onOpenChange={handleOpenChange}>
         <DropdownMenuTrigger asChild>
            <Button
               type="button"
               variant="ghost"
               role="button"
               data-active-state={isActive ? "on" : "off"}
               tabIndex={-1}
               aria-label="Text Case"
               tooltip="Text Case"
               {...buttonProps}
               ref={ref}
            >
               <Type className="tiptap-button-icon" />
               <ChevronDownIcon className="tiptap-button-dropdown-small ml-1" />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuGroup>
               {TRANSFORMS.map((transform) => (
                  <DropdownMenuItem
                     key={transform.value}
                     onSelect={() => editor.chain().focus().setTextTransform(transform.value).run()}
                     asChild
                  >
                     <Button
                        variant="ghost"
                        type="button"
                        role="menuitem"
                        data-active-state={editor.isActive('textTransform', { transform: transform.value }) ? "on" : "off"}
                        className="w-full justify-start font-normal"
                     >
                        <span className="tiptap-button-text capitalize">{transform.label}</span>
                        {editor.isActive('textTransform', { transform: transform.value }) && (
                           <span className="text-xs text-primary ml-auto">✓</span>
                        )}
                     </Button>
                  </DropdownMenuItem>
               ))}
               <DropdownMenuItem
                  onSelect={() => editor.chain().focus().unsetTextTransform().run()}
                  asChild
               >
                  <Button
                     variant="ghost"
                     type="button"
                     role="menuitem"
                     className="w-full justify-start font-normal text-slate-500"
                  >
                     <span className="tiptap-button-text">Normal Case</span>
                  </Button>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
})

TextTransformDropdownMenu.displayName = "TextTransformDropdownMenu"

export default TextTransformDropdownMenu
