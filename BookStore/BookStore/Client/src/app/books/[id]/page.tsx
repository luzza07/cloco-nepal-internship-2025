"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    publisher: "",
    price: "",
    stock: 0,
    published_date: "",

    author_id: "",
    category_id: "",
    publisher_id: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const bookData = await response.json();
        console.log("Fetched book data:", bookData);

        const [authorsRes, categoriesRes, publishersRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/authors/"),
          fetch("http://127.0.0.1:8000/api/categories/"),
          fetch("http://127.0.0.1:8000/api/publishers/"),
        ]);

        const authorsData = await authorsRes.json();
        const categoriesData = await categoriesRes.json();
        const publishersData = await publishersRes.json();

        const authorObj = authorsData.find((a) => a.name === bookData.author);
        const categoryObj = categoriesData.find(
          (c) => c.name === bookData.category
        );
        const publisherObj = publishersData.find(
          (p) => p.name === bookData.publisher
        );

        setBook({
          ...bookData,
          author_id: authorObj ? authorObj.id.toString() : "",
          category_id: categoryObj ? categoryObj.id.toString() : "",
          publisher_id: publisherObj ? publisherObj.id.toString() : "",
        });

        setAuthors(authorsData);
        setCategories(categoriesData);
        setPublishers(publishersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load book data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();

    const apiData = {
      title: book.title,
      author_id: parseInt(book.author_id),
      category_id: parseInt(book.category_id),
      publisher_id: parseInt(book.publisher_id),
      price: book.price,
      stock: typeof book.stock === "string" ? parseInt(book.stock) : book.stock,
      published_date: book.published_date,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        router.push("/books");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setError("An error occurred while updating the book");
    }
  }

  // Helper function to update book data
  const updateBook = (field, value) => {
    setBook({
      ...book,
      [field]: value,
    });
  };

  const handleSelectChange = (field, idField, list, value) => {
    const selected = list.find((item) => item.id.toString() === value);
    setBook({
      ...book,
      [field]: selected ? selected.name : "",
      [idField]: value,
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => updateBook("title", e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <select
            value={book.author_id}
            onChange={(e) =>
              handleSelectChange("author", "author_id", authors, e.target.value)
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id.toString()}>
                {author.name}
              </option>
            ))}
          </select>
          <div className="text-sm text-gray-500 mt-1">
            Current: {book.author}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={book.category_id}
            onChange={(e) =>
              handleSelectChange(
                "category",
                "category_id",
                categories,
                e.target.value
              )
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="text-sm text-gray-500 mt-1">
            Current: {book.category}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Publisher</label>
          <select
            value={book.publisher_id}
            onChange={(e) =>
              handleSelectChange(
                "publisher",
                "publisher_id",
                publishers,
                e.target.value
              )
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id.toString()}>
                {publisher.name}
              </option>
            ))}
          </select>
          <div className="text-sm text-gray-500 mt-1">
            Current: {book.publisher}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={book.price}
            onChange={(e) => updateBook("price", e.target.value)}
            className="border p-2 w-full rounded"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={book.stock}
            onChange={(e) => updateBook("stock", Number(e.target.value))}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Published Date
          </label>
          <input
            type="date"
            value={book.published_date}
            onChange={(e) => updateBook("published_date", e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex-1 transition-colors"
          >
            Update Book
          </button>
          <button
            type="button"
            onClick={() => router.push("/books")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded flex-1 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
