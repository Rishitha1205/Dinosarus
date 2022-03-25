function rawDinoData() {
    const dinos = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Jurassic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbivore",
            "where": "North America, Europe, Asia",
            "when": "Late Jurassic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate plates and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbivore",
            "where": "Worldwide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ];

    return dinos;
}

/**
 * @description Represents a dinosaur object
 * @constructor
 * @parameter {Object} dinoData A single dinosaur object containing facts
 */
function dinoConstructor(dinoData) {
    this.species = dinoData.species;
    this.diet = dinoData.diet;
    this.where = dinoData.where;
    this.when = dinoData.when;
    this.fact = dinoData.fact;
    this.weight = dinoData.weight;
    this.height = dinoData.height;
}

// Store the prototype dinosaur with methods, assign the prototype to the constructor
const protoDino = {
    compareWeight: function (humanWeight) {
        const weightRatio = (this.weight / humanWeight).toFixed(1);
        // Check for human less than, greater than, or same weight as dinos weight
        if (weightRatio > 1) {
            return `${this.species} weighed ${(this.weight / humanWeight).toFixed(1)} times more than you!`;
        }
        if (weightRatio < 1) {
            return `You weigh ${(humanWeight / this.weight).toFixed(1)} times more than ${this.species}!`;
        }
        return `You weigh the same as ${this.species}!`;

    },
    compareHeight: function (humanHeight) {
        const heightRatio = (this.height / humanHeight).toFixed(1);
        // Check for human less than, greater than, or same height as dinos height
        if (heightRatio > 1) {
            return `${this.species} was ${(this.height / humanHeight).toFixed(1)} times taller than you!`;
        }
        if (heightRatio < 1) {
            return `You are ${(humanHeight / this.height).toFixed(1)} times taller than ${this.species}!`;
        }
        return `You are the same height as ${this.species}!`;
    },
    compareDiet: function (humanDiet) {
        //'An' for omnivore or 'a' for herbivore/carnivore
        const article = humanDiet === 'omnivore' ? 'an' : 'a';

        if (humanDiet === this.diet) {
            return `You are ${article} ${humanDiet} and ${this.species} was too!`;
        } else {
            return `You are ${article} ${humanDiet}, but ${this.species} was a ${this.diet}.`;
        }
    }
};

// Assign the methods in the protoDino to all objects created with dinoConstructor
dinoConstructor.prototype = protoDino;

/**
 * @description Creates the dinosaur object array by calling constructor, inserts a human placeholder for proper iteration later
 * @returns {Array} Array of dinosaur objects from constructor
 */
function createDinoArray() {
    const dinos = rawDinoData();
    const dinoArray = [];

    dinos.forEach(function (dino) {
        dinoArray.push(new dinoConstructor(dino));
    });

    // in the grid element construction.  Human should be in the centre square.
    dinoArray.splice(4, 0, 'human placeholder');

    return dinoArray;
}

/**
 * @description Creates a grid element for a dinosaur object
 * @parameter {Object} dinoData An object representing a single dinosaur 
 * @parameter {Object} humanData Data grabbed from the user's input form
 * @returns {Element} An element to be added to the grid in the UI
 */
function createDinoElement(dinoData, humanData) {
    let fact;
    // Project requirement is that pigeon should always return the same fact,
    // Dinos each return one of 6 facts randomly chosen here
    const randomNumber = dinoData.species === 'Pigeon' ? 2 : Math.round(Math.random() * 5);

    switch (randomNumber) {
        case 0:
            fact = `The ${dinoData.species} lived in ${dinoData.where}.`;
            break;
        case 1:
            fact = `The ${dinoData.species} lived in the ${dinoData.when} period.`;
            break;
        case 2:
            fact = dinoData.fact;
            break;
        case 3:
            fact = dinoData.compareWeight(humanData.weight);
            break;
        case 4:
            fact = dinoData.compareHeight(humanData.height);
            break;
        case 5:
            fact = dinoData.compareDiet(humanData.diet);
            break;
        default:
            fact = 'Dinos are super cool!';
    }

    // Create the new grid item with title, image, and chosen fact
    const newDiv = document.createElement('div');
    newDiv.className = 'grid-item';
    newDiv.innerHTML = `<h3>${dinoData.species}</h3><img src="images/${(dinoData.species.toLowerCase())}.png" alt="image of ${dinoData.species}"><p>${fact}</p>`;

    return newDiv;
}

/**
 * @description Get the user's data from the contact form
 * @returns An object containing the user's data
 */
function getHumanData() {
    let height, weight;
    height = (document.getElementById('feet').value * 12) + Number(document.getElementById('inches').value);
    weight = document.getElementById('weight').value;
    const humanData = {
        name: document.getElementById('name').value,
        height: height,
        weight: weight,
        diet: document.getElementById('diet').value,
    };

    return humanData;
}


/**
 * @description Creates a grid element for the human object
 * @parameter {Object} humanData info grabbed from the user's input form
 * @returns {Element} An element to be added to the grid in the UI
 */
function createHumanElement(humanData) {
    // Create the human element for the grid, with user's name and an image
    const newDiv = document.createElement('div');
    newDiv.className = 'grid-item';
    newDiv.innerHTML = `<h3>${humanData.name}</h3><img src="images/human.png" alt="image of human">`;

    return newDiv;
}

/**
 * @description Creates the grid for the UI result
 * @param {Array} dinoArray Array of dinosaur objects
 * @param {Object} humanData The user's data object
 */
function updateUI(dinoArray, humanData) {
    document.querySelector('form').style.display = 'none';

    // Create fragment to attach div elements to
    const fragment = document.createDocumentFragment();

    // Call to create the dino and human div elements
    for (let i = 0; i < 9; i++) {
        // Center space (5th element, index 4) is always the human
        let gridSquare = i === 4 ? createHumanElement(humanData) : createDinoElement(dinoArray[i], humanData);

        fragment.appendChild(gridSquare);
    }
    // Attach fragment with grid elements to the DOM
    document.getElementById('grid').appendChild(fragment);
}

/**
 * @description Called when the user clicks the submit button, main function of the program which calls the other parts of the sequence
 * @parameter {event} e The click event on the form's submit button
 */
function clicked(e) {
    // Prevent default page reloading on submit
    e.preventDefault();

    const humanData = getHumanData();

    const errorMessage = document.getElementById('error');
    if (humanData.name === "") {
        errorMessage.innerHTML = '<p>Please enter a name</p>';
        return;
    } else if (humanData.height < 1) {
        errorMessage.innerHTML = '<p>Please enter a valid height </p>';
        return;
    } else if (humanData.weight < 1) {
        errorMessage.innerHTML = '<p>Please enter a valid weight </p>';
        return;
    }

    const dinoArray = createDinoArray(humanData.units);

    updateUI(dinoArray, humanData);
}


/**
 * @description IIFE to attach the event listeners on the buttons
 */
(function () {
    document.getElementById('btn').addEventListener('click', clicked);
})();
