"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

/**
 * Accessible form fields on the `.field-*` recipe. Each field wires its label,
 * hint and error to the control, and reserves the line beneath it so a
 * validation message never shifts the layout.
 */

type Common = { label: string; hint?: string; error?: string; className?: string };

function Message({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  return (
    <p
      id={id}
      className={`mt-2 min-h-[1.25rem] font-sans text-[12px] leading-snug ${
        error ? "text-alert" : "text-olive-500"
      }`}
      aria-live={error ? "polite" : undefined}
    >
      {error ?? hint ?? ""}
    </p>
  );
}

export function TextField({
  label,
  hint,
  error,
  className = "",
  id,
  required,
  ...props
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const fieldId = id ?? auto;
  const msg = `${fieldId}-msg`;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={msg}
        className="field-input"
        {...props}
      />
      <Message id={msg} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({
  label,
  hint,
  error,
  className = "",
  id,
  required,
  ...props
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId();
  const fieldId = id ?? auto;
  const msg = `${fieldId}-msg`;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={msg}
        className="field-input"
        {...props}
      />
      <Message id={msg} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  hint,
  error,
  className = "",
  id,
  required,
  options,
  placeholder,
  ...props
}: Common &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: (string | { value: string; label: string })[];
    placeholder?: string;
  }) {
  const auto = useId();
  const fieldId = id ?? auto;
  const msg = `${fieldId}-msg`;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={msg}
        className="field-input"
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
      <Message id={msg} hint={hint} error={error} />
    </div>
  );
}

export function Checkbox({
  label,
  className = "",
  id,
  ...props
}: { label: ReactNode; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <span className="relative mt-[3px] block h-4 w-4 shrink-0">
        <input
          id={fieldId}
          type="checkbox"
          className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none border border-olive-700/50 bg-transparent transition-colors duration-300 checked:border-olive-800 checked:bg-olive-800"
          {...props}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute inset-0 hidden h-4 w-4 peer-checked:block"
        >
          <path d="M4 8.2l2.6 2.6L12 5.4" fill="none" stroke="#FBF8F1" strokeWidth="1.6" />
        </svg>
      </span>
      <label htmlFor={fieldId} className="cursor-pointer font-sans text-[13px] leading-relaxed text-olive-600">
        {label}
      </label>
    </div>
  );
}

/** Confirmation or error line for a whole form, announced to screen readers. */
export function FormStatus({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: "success" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`border-l-2 py-1 pl-5 font-sans text-[14px] leading-relaxed ${
        tone === "error" ? "border-alert text-alert" : "border-olive-700 text-olive-700"
      }`}
    >
      {children}
    </div>
  );
}

/** Submit button on the shared `.btn` recipe. */
export function SubmitButton({
  children,
  variant = "solid",
  className = "",
  disabled,
}: {
  children: ReactNode;
  variant?: "solid" | "dark";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button type="submit" disabled={disabled} className={`btn btn-${variant} px-12 disabled:opacity-60 ${className}`}>
      <span className="eyebrow text-[10px]">{children}</span>
    </button>
  );
}

/** Minimal email check used by every form on the site. */
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
