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

chrome.runtime.onMessage.addListener(function(LeadEmail, sender, sendResponse) {
    async function fetchInsights() {
    try {
      const response = await fetch("http://localhost:8080/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LeadEmail)
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
    
      const insights = await response.json();
      sendResponse(insights);
    }
    catch(error) {
      console.error("Error gathering insights from Leadzen API", error);
    }
  }

  fetchInsights();

  return true;

});
