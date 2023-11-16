// Define variables for DOM elements
const definitionElement = document.getElementById("definition");
const addToListButton = document.getElementById("add-to-list");
const wordListElement = document.getElementById("word-list");
const exportListButton = document.getElementById("export-list");
const checkListButton = document.getElementById("check-list");

// Define an array to store custom definitions
const customDefinitions = [];

// Function to display a definition in the popup
function displayDefinition(word, definition) {
    definitionElement.textContent = `${word}: ${definition}`;
}

// Function to add a word and its definition to the custom list
function addToCustomList(word, definition) {
    const listItem = document.createElement("li");
    listItem.textContent = `${word}: ${definition}`;
    wordListElement.appendChild(listItem);
    customDefinitions.push({ word, definition });
}

// Event listener for the "Add to Your List" button
addToListButton.addEventListener("click", () => {
    // Replace 'ExampleWord' with the selected word
    const word = 'ExampleWord';

    // Fetch the word definition from the API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const firstDefinition = data[0];
                const wordDefinition = firstDefinition.meanings[0].definitions[0].definition;
                displayDefinition(word, wordDefinition);
                addToCustomList(word, wordDefinition);
            } else {
                // Handle the case when the word is not found
                displayDefinition(word, 'Definition not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching word definition:', error);
            displayDefinition(word, 'An error occurred.');
        });
});

// Event listener for the "Export to Excel" button
exportListButton.addEventListener("click", () => {
    // Implement the code to export the custom list to Excel (e.g., using SheetJS or XLSX).
    // This code will vary depending on the library you choose.
});

// Event listener for the "Check Your List" button
checkListButton.addEventListener("click", () => {
    // Implement the code to open a new page or display the custom list within the popup.
    // You can iterate through the customDefinitions array to display the list.
});
