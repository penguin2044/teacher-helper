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
    ben: 0,
    bob: 100,
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
        document.getElementById('answer').innerText = `The grade average is ${(sum / this.grades.length).toFixed(2)}%`;
        document.getElementById('low').innerText = `The lowest grade is ${this.low()}%`;
        document.getElementById('high').innerText = `The highest grade is ${this.high()}%`;
    },
    low: function () {
        let bob = 100;
        for (let i = 0; i < this.grades.length; i++) {
            if (this.grades[i] < bob)
                bob = this.grades[i];
        };
        
        return bob;
    },
    high: function () {
        let ben = 0;
        for (let i = 0; i < this.grades.length; i++) {
            if (this.grades[i] > ben)
                ben = this.grades[i];
        };
        console.log('ben');
        return ben;
    },

    pushInTable: function () {
        let divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.setAttribute('id', `student-${studentId}`);

        let divName = document.createElement('div');
        divName.classList.add('name');
        divName.innerText = `name: ${allStudent.names[studentId]}`;


        let divGrade = document.createElement('div');
        divGrade.classList.add('student-grade');
        divGrade.innerText = `grade: ${allStudent.grades[studentId]}%`;


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

// Submission form on Enter (I confess, I cheated and used chatGPT for that, but I understand this part )
function handleKeyPress(event, id) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        const inputs = document.querySelectorAll("input");
        const currentInput = document.activeElement;
        const currentIndex = Array.from(inputs).indexOf(currentInput);

        if (currentIndex < inputs.length - 1) {
            // If not the last input, focus on the next input
            inputs[currentIndex + 1].focus();
        } else {
            // If the last input, call the appropriate function based on the 'id'
            if (id === 1) {
                getData();
            } else {
                getGrades();
            }
        }
    }
}