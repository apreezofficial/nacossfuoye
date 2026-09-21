"use client";
import { forwardRef, useCallback, useState } from "react"

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

const FONTS = [
   { label: 'Inter', value: 'var(--font-inter)' },
   { label: 'DM Sans', value: 'var(--font-dm-sans)' },
   { label: 'Poppins', value: 'var(--font-poppins)' },
   { label: 'Raleway', value: 'var(--font-raleway)' },
   { label: 'Nasalization', value: 'var(--font-nasalization)' },
   { label: 'Serif', value: 'serif' },
   { label: 'Monospace', value: 'monospace' },
];

export const FontFamilyDropdownMenu = forwardRef((
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

   const currentFont = FONTS.find(f => editor.isActive('textStyle', { fontFamily: f.value }))?.label || 'Font'

   return (
      <DropdownMenu modal={modal} open={isOpen} onOpenChange={handleOpenChange}>
         <DropdownMenuTrigger asChild>
            <Button
               type="button"
               variant="ghost"
               role="button"
               tabIndex={-1}
               aria-label="Font Family"
               tooltip="Font Family"
               {...buttonProps}
               ref={ref}
            >
               <span className="text-sm font-medium px-1 truncate max-w-20">{currentFont}</span>
               <ChevronDownIcon className="tiptap-button-dropdown-small ml-1" />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuGroup>
               {FONTS.map((font) => (
                  <DropdownMenuItem
                     key={font.value}
                     onSelect={() => editor.chain().focus().setFontFamily(font.value).run()}
                     asChild
                  >
                     <Button
                        variant="ghost"
                        type="button"
                        role="menuitem"
                        data-active-state={editor.isActive('textStyle', { fontFamily: font.value }) ? "on" : "off"}
                        className="w-full justify-start font-normal"
                        style={{ fontFamily: font.value }}
                     >
                        <span className="tiptap-button-text">{font.label}</span>
                        {editor.isActive('textStyle', { fontFamily: font.value }) && (
                           <span className="text-xs text-primary ml-auto">✓</span>
                        )}
                     </Button>
                  </DropdownMenuItem>
               ))}
               <DropdownMenuItem
                  onSelect={() => editor.chain().focus().unsetFontFamily().run()}
                  asChild
               >
                  <Button
                     variant="ghost"
                     type="button"
                     role="menuitem"
                     className="w-full justify-start font-normal text-slate-500"
                  >
                     <span className="tiptap-button-text">Default Font</span>
                  </Button>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
})

FontFamilyDropdownMenu.displayName = "FontFamilyDropdownMenu"

export default FontFamilyDropdownMenu
