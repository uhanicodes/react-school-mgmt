'use client';
import { Button } from "@/components/ui/button";
import { PenLine, X } from "lucide-react";
import { use } from "react";
import { useState } from "react";

function ViewStudent({ firstName, lastName, rollNumber, id, action }) {

  return (
    <div>
      <h1>{firstName + " " + lastName}</h1>
      <p>{rollNumber}</p>
      <p>{id}</p>
      <Button onClick={action} variant="outline">
        <PenLine/>Edit
      </Button>
    </div>
  )
}

function EditStudent({ action }) {
  return (<div>
    <h1>Hello!</h1>
    <Button onClick={action} variant="outline">
      <X/>Cancel
    </Button>
  </div>)
}

export default function Student({ params }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNumber, setRoll] = useState("");
  const [id, setID] = useState("");
  const [isEdit, setEdit] = useState(false);

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
        setRoll(data.rollNumber);
        setID(data.id);
      })
      // log the error if the request fails
      .catch(error => console.log('Form submit error', error))
 
  return (
    <div>
      { isEdit ? <EditStudent 
        action={() => setEdit(false)}/> : <ViewStudent
        firstName={firstName}
        lastName={lastName}
        rollNumber={rollNumber}
        id={id}
        action={() => setEdit(true)}/>}
    </div>
  )
}