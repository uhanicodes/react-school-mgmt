'use client';
import { useEffect, useState } from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Eye, UserRoundPlus } from "lucide-react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const list = [1, 2, 3, 4];

export default function Home() {

  const searchParams = useSearchParams();

  let startFrom = 0;
  let maxResults = 5;

  if (searchParams.get('startFrom') !== null) {
    startFrom = parseInt(searchParams.get('startFrom'));
  }

  if (searchParams.get('maxResults') !== null) {
    maxResults = parseInt(searchParams.get('maxResults'));
  }

  console.log("query:", startFrom, maxResults);

  console.log("Component initializing...")

  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  const listItems = list.map(page => 
  <PaginationItem key={page}><PaginationLink href={`http://localhost:3000/?startFrom=${(page - 1) * maxResults}&maxResults=${maxResults}`} isActive={page == startFrom/maxResults + 1 ? true : false}>{page}
  </PaginationLink></PaginationItem>)

  const table = useReactTable({
    data: students,
    columns: [
      {
        accessorKey: 'ID',
        header: () => <span>ID</span>
      },
      {
        accessorKey: 'Class',
        header: () => <span>Class</span>
      },
      {
        accessorKey: 'RollNumber',
        header: () => <span>Roll Number</span>
      },
      {
        accessorKey: 'FirstName',
        header: () => <span>First Name</span>
      },
      {
        accessorKey: 'LastName',
        header: () => <span>Last Name</span>
      },
      {
        id: 'view',
        cell: ({ row }) => (
          <Link href={`/student/${row.original.ID}`}>
            <Button variant="outline">
              <Eye />
            </Button>
          </Link>
        )
      },
      {
        id: 'delete',
        cell: ({ row }) => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This student will be deleted permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  const url = `http://localhost:5000/students/${row.original.ID}`
                  const requestOptions = {
                    method: 'DELETE'
                  }

                  fetch(url, requestOptions)
                    .then(response => {
                      console.log('Delete Successfull!');
                      console.log(response);
                      const url = `http://localhost:5000/students`
                      const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type' : 'application/json' },
                        // body: JSON.stringify({firstName, lastName, rollNumber}) // what is this?
                      }

                      fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                          console.log('data:', data)

                          setStudents(data);
                        })
                    })
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const url = `http://localhost:5000/students?startFrom=${startFrom}&maxResults=${maxResults}`
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };

  useEffect(() => {
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('data:', data)

        setStudents(data.students);
        setCount(data.count);
      })
      .catch(error => console.log('Submit error:', error));
  }, []);
 
  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse">
        <Button asChild className="align-right">
          <Link href="/student-form"><UserRoundPlus /> Create New</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center justify-between">
                      <span>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`http://localhost:3000/?startFrom=${Math.max(0, startFrom - maxResults)}&maxResults=${maxResults}`} />
          </PaginationItem>
          {listItems}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`http://localhost:3000/?startFrom=${Math.min(count - 1 , startFrom + maxResults)}&maxResults=${maxResults}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}