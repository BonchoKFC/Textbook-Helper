// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchDefinition") {
      // Replace 'ExampleWord' with the selected word
      const word = message.selectedText;
  
      // Fetch the word definition from the API
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const firstDefinition = data[0];
            const wordDefinition = firstDefinition.meanings[0].definitions[0].definition;
            // Send the definition back to the popup
            sendResponse({ definition: wordDefinition });
          } else {
            // Handle the case when the word is not found
            sendResponse({ definition: 'Definition not found.' });
          }
        })
        .catch(error => {
          console.error('Error fetching word definition:', error);
          sendResponse({ definition: 'An error occurred.' });
        });
      return true;
    }
  });
  