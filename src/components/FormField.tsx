import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="field">
      <label>
        {label}
        {children}
      </label>
      {error && <p className="form-message error">{error}</p>}
    </div>
  );
}

export default FormField;