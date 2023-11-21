"use strict"

// Place of students
const studentsTable = document.getElementById('students-table');

// Place of results
const classResults = document.getElementById('answer');

// Id for each
let studentId = 0;

const allStudent = {
    grades: [],
    names: [],
    getData: function () {
        let grade = document.getElementById('grade').value;
        let sName = document.getElementById('full-name').value;
        if (!!sName && !!grade) {
        this.grades.push(parseInt(grade));
        this.names.push(sName);
        this.pushInTable();
        } else {
            alert('Enter the name or grade');
        }
    },

    average: function () {

        let sum = 0;
        for (let i = 0; this.grades.length > i; i++) {
            sum += parseInt(this.grades[i]);
        }
        document.getElementById('answer').innerText = `${(sum / this.grades.length).toFixed(2)}%`;        
    },

    pushInTable: function () {
        let divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.setAttribute('id', `student-${studentId}`);

        let divName = document.createElement('div');
        divName.classList.add('name');
        divName.innerText = allStudent.names[studentId];

        let divGrade = document.createElement('div');
        divGrade.classList.add('student-grade');
        divGrade.innerText = allStudent.grades[studentId];

        // Button for deletion
        let buttonDel = document.createElement('button');
        buttonDel.setAttribute('onclick', `allStudent.deleteRow('student-${studentId}', ${studentId})`);
        buttonDel.innerText = 'Delete';
        
        studentsTable.appendChild(divRow);

        let newPlace = document.getElementById(`student-${studentId}`);
        newPlace.appendChild(divName);
        newPlace.appendChild(divGrade);
        newPlace.appendChild(buttonDel);

                

        studentId++;

        this.average();
    },

    deleteRow: function (studId, indexNum) {
        console.log(this.grades);
        this.grades.splice(indexNum, 1);
        this.names.splice(indexNum, 1);
        const element = document.getElementById(studId);
        element.remove();
        console.log(this.grades);
        studentId--;
        this.average();
    }
};

// Input validation for first field
function rangeValidation(min, max) {
    let inputElement = document.getElementById("grade");
    let inputValue = parseInt(inputElement.value);
    if (inputValue > max) {
        inputElement.value = max;
    } else if (isNaN(inputValue)) {
        inputElement.value = "";
    } else if (inputValue < min) {
        inputElement.value = min;
    } else if (inputElement.value.length > 3) {
        inputElement.value = min;
    }
}
