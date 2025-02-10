'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<Book>({
    id: '',
    name: '',
    author: '',
    price: '',
  });

  useEffect(() => {
    fetchBook();
  }, );

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:4000/books/${id}`);
      const data: Book = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/books'); // Redirect to books list after editing
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Author:</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Price:</label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Update Book
        </Button>
      </form>
    </div>
  );
}