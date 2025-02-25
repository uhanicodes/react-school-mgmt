import studentList from "../../students";

export default function Student({ params }) {

  console.log("students", studentList);

  let student = null;

  for (let i = 0; i < studentList.length; i++) {

    if (studentList[i].id == params.id) {
      student = studentList[i];
    }
  }

  console.log(student);
  
  return (
    <div>
      <h1>{student.name}</h1>
      <p>{student.clzz}</p>
      <p>{student.roll}</p>
    </div>
  )
}