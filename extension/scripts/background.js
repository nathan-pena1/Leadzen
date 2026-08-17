chrome.action.onClicked.addListener(function (tab) {
  if (!tab || !tab.id) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "open-sidebar" }, function () {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    }
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  async function sendToBackend() {
    try {
      let url;
      if (message.type === "save-email") {
        url = "http://localhost:8080/email";
      }
      else if (message.type === "generate-insights") {
        url = "http://localhost:8080/insights";
      }
      else {
        return;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message.data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      sendResponse(result);
      }
    catch (error) {
      console.error("Backend error", error);
      sendResponse({ error: true });
    }
  }
  
  sendToBackend();
  return true;

});
