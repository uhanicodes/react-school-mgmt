"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React from "react";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function studentForm() {

  let submitFrom = (data) => {

    console.log("data", data);

    const url = 'http://localhost:5000/students'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
      .then(response => console.log('Submitted successfully'))
      .catch(error => console.log('Form submit error', error))
  }

  const form = useForm();

  return (
    <>
      <Link href={'/'}>Back to students</Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitFrom)} className="space-y-8">
          <FormField 
            control={form.control} 
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input placeholder="ID" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='clazz'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <FormControl>
                  <Input placeholder='Class' {...field}/>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rollNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll</FormLabel>
                <FormControl>
                  <Input placeholder="Roll" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />                
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}