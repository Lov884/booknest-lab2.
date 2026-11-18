import type { Book, BookFormValues } from "./types";

const API_URL = "http://localhost:3001/books";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getBooks(): Promise<Book[]> {
  return request<Book[]>(API_URL);
}

export function getBook(id: number): Promise<Book> {
  return request<Book>(`${API_URL}/${id}`);
}

export function createBook(values: BookFormValues): Promise<Book> {
  return request<Book>(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

export function updateBook(id: number, values: BookFormValues): Promise<Book> {
  return request<Book>(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

export async function deleteBook(id: number): Promise<void> {
  await request<unknown>(`${API_URL}/${id}`, { method: "DELETE" });
}