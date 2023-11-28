"use strict";

const studentsTable = document.getElementById('students-table');
const totalGradesElement = document.getElementById('total-grades');
const amountOfGradesElement = document.getElementById('amount-of-grades');

function rangeValidation(min, max) {
    const inputElement = document.getElementById("grade");
    const inputValue = parseInt(inputElement.value);

    if (isNaN(inputValue) || inputValue < min || inputValue > max || inputElement.value.length > 3) {
        inputElement.value = min;
    }
};

function handleKeyPress(event) {
    if (event.key === "Enter") {
        allStudent.updateStats();
    }
};



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

            this.generateTable();
        } else {
            alert('Enter the grade');
        }
    },

    updateStats: function () {
        this.updateStat('low', 'The lowest grade is');
        this.updateStat('high', 'The highest grade is');
        this.updateStat('totalGrades', 'Total of grades is');
        this.updateStat('amountOfGrades', 'Amount of grades is');
        this.updateStat('averageGrades', 'The grade average is')
    },

    averageGrades: function () {
        return (this.totalGrades / this.amountOfGrades || 0).toFixed(2);
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

    generateTable: function () {
        studentsTable.innerHTML = '';
        for (let i = 0; i < this.grades.length; i++) {
            const divRow = document.createElement('div');
            divRow.classList.add('row');
            divRow.setAttribute('id', `student-${i}`);

            const divGrade = document.createElement('div');
            divGrade.classList.add('student-grade');
            divGrade.innerText = `grade: ${this.grades[i]}%`;

            const buttonDel = document.createElement('button');
            buttonDel.innerText = 'Delete';
            buttonDel.setAttribute('id', i);

            divRow.appendChild(divGrade);
            divRow.appendChild(buttonDel);
            studentsTable.appendChild(divRow);

            this.updateStats();
        }
    },

    deleteRow: function (rowId) {
        this.totalGrades -= this.grades[rowId];
        this.amountOfGrades--;
        this.grades.splice(rowId, 1);
        this.generateTable();
        this.updateStats();
    }
};

let buttons = document.querySelectorAll('button');

function handleButtonClick(event) {
    let buttonId = event.target.id;

    allStudent.deleteRow(buttonId);
}

buttons.forEach(function (button) {
    button.addEventListener('click', handleButtonClick);
});

document.addEventListener('DOMContentLoaded', function () {
    let deleteButtons = document.querySelectorAll('.deleteButton');

    function handleButtonClick(event) {
      let button = event.target;
      let row = button.closest('tr');
      let table = document.getElementById('studentTable');

      table.deleteRow(row.rowIndex);
    }

    deleteButtons.forEach(function (button) {
      button.addEventListener('click', handleButtonClick);