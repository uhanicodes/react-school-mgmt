class Students {

    constructor(id, name, clzz, roll) {
        this.id = id;
        this.name = name;
        this.clzz = clzz;
        this.roll = roll;
    }
}

let studentList = [new Students(1, "Abid", 5, 1), 
    new Students(2, "Jahid", 5, 2), 
    new Students(3, "Faria", 4, 5),
    new Students(4, "Nabila", 3, 2)];

export default studentList;