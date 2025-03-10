'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/books/edit/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      <div className="space-y-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="p-4 border rounded shadow-md">
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <Button
                onClick={() => handleEdit(book.id)}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit Book
              </Button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}
