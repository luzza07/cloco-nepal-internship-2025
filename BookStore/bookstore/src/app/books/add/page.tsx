"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/books");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
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
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Price:</label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Add Book
        </Button>
      </form>
    </div>
  );
}
