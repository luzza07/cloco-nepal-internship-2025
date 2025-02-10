"use client";
import * as React from "react";

import { AppSidebar } from "@/components/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Charts } from "@/components/charts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Define Book Type
interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function Page() {
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:4000/books");
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>$123,456,789</CardContent>
                <CardDescription>+12% from last month</CardDescription>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>+2350</CardContent>
                <CardDescription>+120% from last month</CardDescription>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sales</CardTitle>
                </CardHeader>
                <CardContent>+15,154</CardContent>
                <CardDescription>+19% from last month</CardDescription>
              </Card>
           
              <Card>
                <Charts />
              </Card>

              {/* 📌 Books Card Added Here */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.slice(0, 7).map(
                        (
                          book // 👈 Display only first 7 books
                        ) => (
                          <TableRow key={book.id}>
                            <TableCell className="font-medium">
                              {book.id}
                            </TableCell>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell className="text-right">
                              ${book.price}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>

                  {/* Refresh Books Button */}
                  <div className="flex justify-center mt-4">
                    <form action="/books">
                      <Button>Show All Books</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
