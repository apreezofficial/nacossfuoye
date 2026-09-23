"use client";
import { forwardRef, Fragment, useMemo } from "react"

// --- Tiptap UI Primitive ---
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/tiptap-ui-primitive/tooltip"

// --- Icons ---
import { CheckIcon } from "@/components/tiptap-icons/check-icon"

// --- Lib ---
import { cn, parseShortcutKeys } from "@/lib/tiptap-utils"

import "@/components/tiptap-ui-primitive/button/button-colors.scss"
import "@/components/tiptap-ui-primitive/button/button.scss"

export const ShortcutDisplay = ({
   shortcuts,
}) => {
   if (shortcuts.length === 0) return null

   return (
      <div>
         {shortcuts.map((key, index) => (
            <Fragment key={index}>
               {index > 0 && <kbd>+</kbd>}
               <kbd>{key}</kbd>
            </Fragment>
         ))}
      </div>
   )
}

export const Button = forwardRef((
   {
      className,
      children,
      tooltip,
      showTooltip = true,
      shortcutKeys,
      variant,
      size,
      role,
      "aria-checked": ariaChecked,
      onMouseDown,
      ...props
   },
   ref
) => {
   const isCheckVariant = variant === "check"
   const buttonStyle = isCheckVariant
      ? "ghost"
      : variant
   const buttonSize = isCheckVariant ? (size ?? "small") : size
   const buttonRole = isCheckVariant ? (role ?? "checkbox") : role
   const buttonAriaChecked = isCheckVariant
      ? (ariaChecked ?? false)
      : ariaChecked
   const shortcuts = useMemo(() => parseShortcutKeys({ shortcutKeys }), [shortcutKeys])
   const content = (
      <>
         {children}
         {isCheckVariant && (
            <span className="tiptap-button-check" aria-hidden="true">
               <CheckIcon />
            </span>
         )}
      </>
   )

   const handleMouseDown = (e) => {
      // Prevent focus from being stolen by the toolbar button.
      // This keeps the editor focused and the mobile keyboard open.
      e.preventDefault();
      onMouseDown?.(e);
   };

   if (!tooltip || !showTooltip) {
      return (
         <button
            data-slot="tiptap-button"
            className={cn("tiptap-button", className)}
            ref={ref}
            data-style={buttonStyle}
            data-size={buttonSize}
            data-variant={isCheckVariant ? "check" : undefined}
            role={buttonRole}
            aria-checked={buttonAriaChecked}
            onMouseDown={handleMouseDown}
            {...props}
         >
            {content}
         </button>
      )
   }

   return (
      <Tooltip delay={200}>
         <TooltipTrigger
            data-slot="tiptap-button"
            className={cn("tiptap-button", className)}
            ref={ref}
            data-style={buttonStyle}
            data-size={buttonSize}
            data-variant={isCheckVariant ? "check" : undefined}
            role={buttonRole}
            aria-checked={buttonAriaChecked}
            onMouseDown={handleMouseDown}
            {...props}
         >
            {content}
         </TooltipTrigger>
         <TooltipContent>
            {tooltip}
            <ShortcutDisplay shortcuts={shortcuts} />
         </TooltipContent>
      </Tooltip>
   )
})

Button.displayName = "Button"

export default Button
