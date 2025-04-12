'use client';
import { useEffect, useState } from "react";

import Link from "next/link";

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
import { MoreHorizontal } from "lucide-react";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Home() {

  console.log("Component initializing...")

  const [students, setStudents] = useState([]);

  const table = useReactTable({
    data: students,
    columns: [
      {
        accessorKey: 'ID',
        header: () => <span>ID</span>
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
        id: 'actions',
        header: () => <span>Actions</span>,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={'/student/' + row.original.id}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/student/edit/' + row.original.id}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div onClick={() => {
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
                }}>Delete</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const url = `http://localhost:5000/students`
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };

  useEffect(() => {
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('data:', data)

        setStudents(data);
      })
      .catch(error => console.log('Submit error:', error));
  }, []);
 
  return (
    <div>
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
    </div>
  );
}