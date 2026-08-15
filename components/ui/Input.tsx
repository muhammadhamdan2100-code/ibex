import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared input styling — glass surface, premium border, high-contrast
 * white text with a visible placeholder, strong focus state. Exported so
 * non-<input> elements that need the identical look (e.g. a wrapping
 * <div> around an input+suffix) can apply it via `cn(inputStyles, ...)`
 * without redefining the string.
 */
export const inputStyles =
  "glass w-full rounded-md border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-fast ease-standard focus:border-gold-500/70 focus-visible:outline-2 focus-visible:outline-gold-500";

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputStyles, className)} {...props} />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(inputStyles, className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(inputStyles, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";

/** File input — same visual language, but browsers render the native picker button, so padding/appearance differ slightly from the text inputs. */
export const FileInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="file"
      className={cn(
        inputStyles,
        "cursor-pointer py-2.5 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-gold-500/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-gold-500 file:transition-colors hover:file:bg-gold-500/25",
        className
      )}
      {...props}
    />
  )
);
FileInput.displayName = "FileInput";

export default Input;
