"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Author {
  id: number;
  name: string;
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/authors/")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error("Error fetching authors:", err));
  }, []);

  const handleAddAuthor = async () => {
    if (!authorName.trim() || !authorBio.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/authors/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: authorName, bio: authorBio }),
      });

      if (response.ok) {
        const addedAuthor = await response.json();
        setAuthors([...authors, addedAuthor]);
        setAuthorName("");
        setAuthorBio("");
        setIsDialogOpen(false);
        toast.success("Author added successfully!");
      } else {
        toast.error("Failed to add author!");
      }
    } catch (error) {
      console.error("Error adding author:", error);
      toast.error("An error occurred!");
    }
  };

  const handleDeleteAuthor = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:8000/api/authors/${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      setAuthors(authors.filter((author) => author.id !== id));
      toast.success("Author deleted successfully!");
    } else {
      toast.error("Failed to delete author!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Author</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Author</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="Enter author name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />

            <textarea
              className="border p-2 w-full rounded"
              placeholder="Enter author Bio"
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
            />
            <Button onClick={handleAddAuthor} className="mt-2">
              Save
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.length > 0 ? (
            authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteAuthor(author.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No authors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
