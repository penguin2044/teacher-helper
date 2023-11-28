"use strict";

// Get references to HTML elements
const studentsTable = document.getElementById('students-table');
const totalGradesElement = document.getElementById('total-grades');
const amountOfGradesElement = document.getElementById('amount-of-grades');

// Function to validate input range
function rangeValidation(min, max) {
    const inputElement = document.getElementById("grade");
    const inputValue = parseInt(inputElement.value);

    // Check if input is a number within the specified range
    if (isNaN(inputValue) || inputValue < min || inputValue > max || inputElement.value.length > 3) {
        inputElement.value = min;
    }
};

// Event handler for Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        allStudent.updateStats();
    }
};

// Object to manage student data and statistics
const allStudent = {
    grades: [],
    totalGrades: 0,
    amountOfGrades: 0,

    // Method to get data from input and update statistics
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

    // Method to delete data at a specific index and update statistics
    deleteData: function (index) {
        if (index >= 0 && index < this.grades.length) {
            const deletedGrade = this.grades.splice(index, 1)[0];
            this.totalGrades -= deletedGrade;
            this.amountOfGrades--;

            this.generateTable();
        }
    },

    // Method to update various statistics
    updateStats: function () {
        this.updateStat('low', 'The lowest grade is');
        this.updateStat('high', 'The highest grade is');
        this.updateStat('totalGrades', 'Total of grades is');
        this.updateStat('amountOfGrades', 'Amount of grades is');
        this.updateStat('averageGrades', 'The grade average is')
    },

    // Method to calculate average grades
    averageGrades: function () {
        return (this.totalGrades / this.amountOfGrades || 0).toFixed(2);
    },

    // Method to update a specific statistic element
    updateStat: function (elementId, message) {
        const statElement = document.getElementById(elementId);
        if (elementId === 'totalGrades' || elementId === 'amountOfGrades') {
            statElement.innerText = `${message} ${this[elementId] || 0}`;
        } else {
            statElement.innerText = `${message} ${this[elementId]() || 0}%`;
        }
    },

    // Method to get the lowest grade
    low: function () {
        return this.grades.length ? Math.min(...this.grades) : 0;
    },

    // Method to get the highest grade
    high: function () {
        return this.grades.length ? Math.max(...this.grades) : 100;
    },

    // Method to generate the table of student grades
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
            buttonDel.setAttribute('data-index', i);
            buttonDel.addEventListener('click', function () {
                const indexToDelete = parseInt(this.getAttribute('data-index'));
                allStudent.deleteData(indexToDelete);
            });

            divRow.appendChild(divGrade);
            divRow.appendChild(buttonDel);
            studentsTable.appendChild(divRow);

            this.updateStats();
        }
    },
};
