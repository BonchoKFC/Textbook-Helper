// Create a context menu item for "Find Definition"
chrome.contextMenus.create({
    id: "findDefinition",
    title: "Find Definition",
    contexts: ["selection"]
  });
  
  // Event listener for the context menu item
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "findDefinition") {
      const selectedText = info.selectionText;
      
      // Send a message to the content script with the selected text
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (text) => {
          // Send the selected text to the content script
          chrome.runtime.sendMessage({ action: "fetchDefinition", selectedText: text });
        },
        args: [selectedText]
      });
    }
  });
  