'use client';

import Link from "next/link";
import studentList from "./students";

export default function Home() {

  let students = [];

  for (let i = 0; i < studentList.length; i++) {

    students.push((<tr key={studentList[i].id} onClick={() => {
      alert("You click me!");
    }}>
      <td>{studentList[i].name}</td>
      <td>{studentList[i].clzz}</td>
      <td>{studentList[i].roll}</td>
      <td><Link href={'/student/' + studentList[i].id}>details</Link></td>
    </tr>))
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Clazz</th>
            <th>Roll</th>
          </tr>
          {students}
        </tbody>
      </table>
    </div>
  );
}
