import { useState } from "react";
import type { FormEvent } from "react";
import type { BookFormValues } from "../types";

interface BookFormProps {
  initialValues?: BookFormValues;
  submitLabel: string;
  onSubmit: (values: BookFormValues) => Promise<void>;
}

interface FormState {
  title: string;
  author: string;
  year: string;
  genre: string;
  pages: string;
  description: string;
  available: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

function toState(values?: BookFormValues): FormState {
  return {
    title: values?.title ?? "",
    author: values?.author ?? "",
    year: values ? String(values.year) : "",
    genre: values?.genre ?? "",
    pages: values ? String(values.pages) : "",
    description: values?.description ?? "",
    available: values?.available ?? true,
  };
}

function validate(form: FormState): Errors {
  const errors: Errors = {};
  const year = Number(form.year);
  const pages = Number(form.pages);

  if (form.title.trim().length < 2) errors.title = "Title must have at least 2 characters";
  if (form.author.trim().length < 2) errors.author = "Author must have at least 2 characters";
  if (!Number.isInteger(year) || year < 1000 || year > new Date().getFullYear()) {
    errors.year = "Enter a valid year";
  }
  if (form.genre.trim() === "") errors.genre = "Genre is required";
  if (!Number.isInteger(pages) || pages < 1) errors.pages = "Pages must be a positive number";
  if (form.description.trim().length < 10) {
    errors.description = "Description must have at least 10 characters";
  }
  return errors;
}

function BookForm({ initialValues, submitLabel, onSubmit }: BookFormProps) {
  const [form, setForm] = useState<FormState>(toState(initialValues));
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm({ ...form, [key]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    setSubmitError("");
    try {
      await onSubmit({
        title: form.title.trim(),
        author: form.author.trim(),
        year: Number(form.year),
        genre: form.genre.trim(),
        pages: Number(form.pages),
        description: form.description.trim(),
        available: form.available,
      });
    } catch {
      setSubmitError("Could not save the book. Is the API running?");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Title
          <input value={form.title} onChange={(e) => update("title", e.target.value)} />
        </label>
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label>
          Author
          <input value={form.author} onChange={(e) => update("author", e.target.value)} />
        </label>
        {errors.author && <p>{errors.author}</p>}
      </div>
      <div>
        <label>
          Year
          <input value={form.year} onChange={(e) => update("year", e.target.value)} />
        </label>
        {errors.year && <p>{errors.year}</p>}
      </div>
      <div>
        <label>
          Genre
          <input value={form.genre} onChange={(e) => update("genre", e.target.value)} />
        </label>
        {errors.genre && <p>{errors.genre}</p>}
      </div>
      <div>
        <label>
          Pages
          <input value={form.pages} onChange={(e) => update("pages", e.target.value)} />
        </label>
        {errors.pages && <p>{errors.pages}</p>}
      </div>
      <div>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => update("available", e.target.checked)}
          />
          Available
        </label>
      </div>
      {submitError && <p>{submitError}</p>}
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default BookForm;