class Student {

    constructor(name, clzz, roll) {
        this.name = name;
        this.clzz = clzz;
        this.roll = roll;
    }
}

let studentList = [new Student("Abid", 5, 1), 
    new Student("Jahid", 5, 2), 
    new Student("Faria", 4, 5),
    new Student("Nabila", 3, 2)];

export default studentList;