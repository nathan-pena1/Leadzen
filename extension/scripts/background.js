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
      let method = "POST";
      if (message.type === "save-email") {
        url = "http://localhost:8080/email";
      }
      else if (message.type === "generate-insights") {
        url = "http://localhost:8080/insights";
      }
      else if (message.type === "get-history") {
        url = "http://localhost:8080/history";
        method = "GET";
      }
      else {
        return;
      }
      const request = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        }
      };

      if (method !== "GET") {
        request.body = JSON.stringify(message.data);
      }

      const response = await fetch(url, request);

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
