"use strict";

const student = {
    firstName: "",
    lastName: "",
    grades: undefined,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    },
    assignName: function() {
        const nameArr = document.getElementById('full-name').value.split(" ");
        this.firstName = nameArr[0];
        this.lastName = nameArr[1];
    }
}

const studentsGrades = {
addStudent: function(studentName, grade) {
this[studentName] = grade;
}
}

function getData() {
    const amGrades = parseInt(document.getElementById("grades-amount").value);
    preGenerator();
    tableGenerator(amGrades);
}

function preGenerator() {
    let place = document.getElementById('grades-div');
    place.innerHTML = '';
    place.innerHTML = `<form id="form2" onsubmit="return false;" onkeydown="handleKeyPress(event)">
            <fieldset id="grades">
            </fieldset>
        </form>
        <div id="button"></div>
        <div id="result"></div>`;
}
// Input validation for first field
function validateInputFirst() {
    let inputElement = document.getElementById("grades-amount");
    let inputValue = parseInt(inputElement.value);
    if (inputValue > 50) {
        inputElement.value = "50";
    } else if (isNaN(inputValue)) {
        inputElement.value = "";
    } else if (inputValue < 0) {
        inputElement.value = "0";
    } else if (inputElement.value.length > 2) {
        inputElement.value = "0";
    }
}

// Validating of input for grades in between 0 an 100
function validateInput(id) {
    let inputElement = document.getElementById(id);
    let inputValue = parseInt(inputElement.value);
    let numberOfRow = id.match(/\d+/);
    let num = parseInt(numberOfRow) + 1;
    //Pass or fail colours
    if (inputValue < 0) {
        alert("Pleae enter a number in between 0 and 100 for #" + num + ".");
        inputElement.value = "0"; // Clear the input field
    } else if (inputValue > 100) {
        inputElement.value = "100";
        document.getElementById(id).style.backgroundColor = '#4bde72';
    } else if (inputElement.value.length > 3) {
        inputElement.value = "0"
    } else if (inputValue < 50) {
        document.getElementById(id).style.backgroundColor = '#fc7168';
    } else if (isNaN(inputValue)) {
        inputElement.value = "";
    } else {
        document.getElementById(id).style.backgroundColor = '#4bde72';
    }
}

//Outputs the result
function tableGenerator(grades) {

    // Get a reference to the place where we insert our grades fields
    let place = document.getElementById("grades");

    for (let i = 0; i < grades; i++) {
        // Div box for every row
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("input-num")

        // Create a label element
        let label = document.createElement("label");
        label.setAttribute("for", `grade${i}`);
        label.setAttribute("class", "label-grades")
        label.innerText = `Student #${i + 1}:`;

        // Input for grade
        let input = document.createElement("input");
        input.setAttribute("id", `grade${i}`);
        input.setAttribute("type", "number");
        input.setAttribute("placeholder", 0);
        input.setAttribute("min", 0);
        input.setAttribute("max", 100);
        input.setAttribute("class", "data input-grades");
        input.setAttribute("oninput", `validateInput("grade${i}")`);

        // Label for name
        let nameLabel = document.createElement('label');
        nameLabel.setAttribute("id", `name${i}`);
        nameLabel.innerText = "enter student's name";

        // Input for name
        let nameInput = document.createElement('input');
        nameInput.classList.add('full-name');
        nameInput.setAttribute("id", `name${i}`);
        nameInput.setAttribute('placeholder', 'Jesse Kleinschmit');

        // Appending label and input to designated place in the document
        place.appendChild(rowDiv);
        rowDiv.appendChild(nameLabel);
        rowDiv.appendChild(nameInput);
        rowDiv.appendChild(label);
        rowDiv.appendChild(input);
    }
    let button = document.createElement("button");
    button.innerText = "Calculate";
    button.setAttribute("onclick", "getGrades()");
    document.getElementById('button').appendChild(button);
    button.classList.add("button");
}

// Value entered by the user
function getGrades() {
    // Grades
    const gradesArr = Array.from(document.getElementsByClassName('data'));
    const myArr = gradesArr.map((el) => el.value);

    //Names
    const namesArr = Array.from(document.getElementsByClassName('full-name'));
    const studentNames = namesArr.map((el) => el.value);

    // Assigning each grade to a student
    for (let i = 0; i < myArr.length; i++) {
        studentsGrades.addStudent(studentNames[i], myArr[i]);
    }

    console.log(studentsGrades);

    // Check and build
    if (!!calFromArr(myArr)) {
        reportCard(calFromArr(myArr));
    } else {
        alert('You missed entered some grades');
    }
}

// Report builder
function reportCard(avr) {
    if (avr < 70) {
        document.getElementById("result").innerHTML = `${avr.toFixed(3)}% <br /> Hint: Average is below 70%. Consider reviewing concepts from the unit before moving on.`;
    } else {
        document.getElementById("result").innerHTML = `${avr.toFixed(3)}%`;
    }
}

// Calculate the average
function calFromArr(arr) {
    let sum = 0;
    for (let i = 0; arr.length > i; i++) {
        sum += parseInt(arr[i]);
    }
    return sum / arr.length;
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