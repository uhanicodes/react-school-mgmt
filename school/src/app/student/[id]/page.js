'use client';
import { Button } from "@/components/ui/button";
import { PenLine, Save, X } from "lucide-react";
import { use } from "react";
import { useState } from "react";

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
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function ViewStudent({ firstName, lastName, clazz, rollNumber, id }) {
  
  const form = useForm();

  function submitForm(data) {

      console.log(data);

      const url = `http://localhost:5000/students/${id}`
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify(data)
      }

      fetch(url, requestOptions)
          .then(response => console.log('Submit Successfully!'))
          .catch(error => console.log('Form submit error', error))
  }
  
  return (
    <div>
      <h1>{firstName + " " + lastName}</h1>
      <p>{clazz}</p>
      <p>{rollNumber}</p>
      <p>{id}</p>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PenLine/>Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Edit student here.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
              <FormField 
                control={form.control} 
                name='id'
                defaultValue={id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="ID" {...field} />
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
                defaultValue={clazz}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Class" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rollNumber'
                defaultValue={rollNumber}
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
                defaultValue={firstName}
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
                defaultValue={lastName}
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
              <Button type="submit">
                <Save/>Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function Student({ params }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clazz, setClazz] = useState("");
  const [rollNumber, setRoll] = useState("");
  const [id, setID] = useState("");

  const { id : studentId } = use(params); 
  // {
  //   id: "1"
  // }
  // console.log('parameters', parameters);

  const url = `http://localhost:5000/students/${studentId}`
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };

  // make request the 'url'
  fetch(url, requestOptions)
      // convert the response into JSON object.
      .then(response => response.json())
      // update the state variables using the data object.
      .then(data => {
        console.log('data:',data)
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setClazz(data.clazz);
        setRoll(data.rollNumber);
        setID(data.id);
      })
      // log the error if the request fails
      .catch(error => console.log('Form submit error', error))
 
  return (
    <div>
      <ViewStudent
        firstName={firstName}
        lastName={lastName}
        clazz={clazz}
        rollNumber={rollNumber}
        id={id} />
    </div>
  )
}