"use strict";

const studentsTable = document.getElementById('students-table');
const classResults = document.getElementById('answer');
const totalGradesElement = document.getElementById('total-grades');
const amountOfGradesElement = document.getElementById('amount-of-grades');
let studentId = 0;

const allStudent = {
    grades: [],
    totalGrades: 0,
    amountOfGrades: 0,

    getData: function () {
        const gradeInput = document.getElementById('grade').value;
        if (!!gradeInput) {
            this.grades.push(parseInt(gradeInput));
            this.totalGrades += parseInt(gradeInput);
            this.amountOfGrades++;
            this.pushInTable();
        } else {
            alert('Enter the grade');
        }
    },

    updateStats: function () {
        this.updateAverage();
        this.updateStat('low', 'The lowest grade is');
        this.updateStat('high', 'The highest grade is');
        this.updateStat('totalGrades', 'Total of grades is');
        this.updateStat('amountOfGrades', 'Amount of grades is');
    },

    updateAverage: function () {
        const average = (this.totalGrades / this.amountOfGrades || 0).toFixed(2);
        classResults.innerText = `The grade average is ${average}%`;
    },

    updateStat: function (elementId, message) {
        const statElement = document.getElementById(elementId);
        if (elementId === 'totalGrades' || elementId === 'amountOfGrades') {
            statElement.innerText = `${message} ${this[elementId] || 0}`;
        } else {
            statElement.innerText = `${message} ${this[elementId]() || 0}%`;
        }
    },

    low: function () {
        return this.grades.length ? Math.min(...this.grades) : 0;
    },

    high: function () {
        return this.grades.length ? Math.max(...this.grades) : 100;
    },

    pushInTable: function () {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.setAttribute('id', `student-${studentId}`);

        const divGrade = document.createElement('div');
        divGrade.classList.add('student-grade');
        divGrade.innerText = `grade: ${this.grades[studentId]}%`;

        const buttonDel = document.createElement('button');
        buttonDel.innerText = 'Delete';

        divRow.appendChild(divGrade);
        divRow.appendChild(buttonDel);
        studentsTable.appendChild(divRow);

        studentId++;
        this.updateStats();
    },

    deleteRow: function (studId, indexNum) {
        this.totalGrades -= this.grades[indexNum];
        this.amountOfGrades--;
        this.grades.splice(indexNum, 1);
        const element = document.getElementById(studId);
        element.remove();

        // Adjust studentId to match the length of the grades array
        studentId = this.grades.length;

        // Call updateStats after removing a row
        this.updateStats();
    }
};

studentsTable.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const rowId = event.target.parentNode.id;
        const index = parseInt(rowId.split('-')[1]);
        allStudent.deleteRow(rowId, index);
    }
});

function rangeValidation(min, max) {
    const inputElement = document.getElementById("grade");
    const inputValue = parseInt(inputElement.value);

    if (isNaN(inputValue) || inputValue < min || inputValue > max || inputElement.value.length > 3) {
        inputElement.value = min;
    }
}

function handleKeyPress(event, id) {
    if (event.key === "Enter") {
        allStudent.updateStats();
    }
}

document.getElementById('full-name').addEventListener('keypress', function(event) {
    handleKeyPress(event, 1);
});

document.getElementById('grade').addEventListener('keypress', function(event) {
    handleKeyPress(event, 2);
});