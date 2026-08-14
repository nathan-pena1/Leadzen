function detectRelevance() {
  const HIGH_CONFIDENCE_WORDS = new Set([
    "realty", "realtor", "agent", "renters", "tenant", "listing",
    "apartment", "condo", "duplex", "triplex", "sublease", "escrow", 
    "appraisal", "foreclosure", "hoa", "mls", "har", "zillow", "redfin" 
    ]);
    
  const MED_CONFIDENCE_WORDS = new Set([
     "property", "house", "bedroom", "bathroom", "backyard", "sqft", "lead",  "seller",
     "buyer", "closing", "rental", "rent", "lease", "estate"
    ]);

  const emailSubject = getSubject().toLowerCase();
  const emailBody = getBody().toLowerCase();
  const email = emailSubject + " " + emailBody;
  let highConfidence = 0;
  let medConfidence = 0;
  const emailText =  email.match(/\b[a-z0-9]+\b/g) || [];


  for (const word of emailText) {
    if (HIGH_CONFIDENCE_WORDS.has(word)) {
      highConfidence += 1
    }
    else if (MED_CONFIDENCE_WORDS.has(word)) {
      medConfidence +=1
    }
  }

  if (highConfidence >= 1 || medConfidence >= 2) {
    return true;
  }
  return false;

}

const mockResponse = false;

const mockInsights = {
    summary: "John Doe, an agent from Cool Guys Realty, is inquiring about 124 Conch Street on behalf of a potential client, asking about current offer status and showing availability.",

    urgencyLevel: "Medium",

    urgencyDesc: "Recommended response delay: 1 hour. Responding quickly captures broker interest and keeps momentum moving with their potential client without looking overly desperate.",

    suggestedReply: `Hi John,
    
Thanks for reaching out about 124 Conch Street! I'd love to get your client scheduled for a showing.
    
Are you looking to view it later this week, or is there a specific day that works best for your client? Let me know, and I'll make it happen.
    
Best regards,
[Your Name]`
};
function showInsights(insights){
    summary.textContent = insights.summary;
    urgencyLevelTitle.textContent = insights.urgencyLevel;
    urgencyDesc.textContent = insights.urgencyDesc;
    suggestedReply.textContent = insights.suggestedReply;
    const urgency = insights.urgencyLevel.toLowerCase();
    urgencyLevelTitle.id = urgency;

    const subjectVar = getSubject();
    const receivedVar = getReceived();

    generateContainer.classList.add("hidden");
    emailContainer.innerHTML = `
    <div class="collapsed-email">
      <div class="subject-text">${subjectVar}</div>
      <div class="received-text">${receivedVar}</div>
    </div>
    `;
    loadingContainer.classList.add("hidden");
    generatedContainer.classList.remove("hidden");
}

function getName(){
  const senderName = document.querySelector("span.gD");
  let name = "Unable to pull name";

  if (senderName) {
    const nameId = senderName.getAttribute("name");

    if (nameId) { 
    name = nameId.trim();
    }

  }

  return name;
}

function getSubject(){
  const emailSubject = document.querySelector("h2.hP");
  let subject = "Unable to pull subject";
  if (emailSubject) { 
    subject = emailSubject.textContent.trim();
  }

  return subject;
}

function getReceived(){
  const emailReceived = document.querySelector(".g3");
  let received = "Unable to pull date & time";
  if (emailReceived) { 
    received = emailReceived.title.trim();
  }

  return received;
}

function getEmail() {
  const emailAddress = document.querySelector("span.gD");
  let email = "Unable to pull email";
  let emailId = null;
  if (emailAddress) {
    emailId = emailAddress.getAttribute("email");
  }
  if (emailId) {
    email = emailId.trim();
  }

  return email;
}

function getBody() {
  const emailBody = document.querySelector(".a3s.aiL");
  let body = "Unable to pull email body";
  if (emailBody) {
    body = emailBody.textContent.trim();
  }

  return body;
}

// gmail only for now
const emailDomains = ["mail.google.com", "www.gmail.com"];
const isEmail = emailDomains.includes(window.location.hostname);
let bar = null;

function handleBarInjection() {
  const existingBar = document.querySelector(".leadzen-bar");

  if (isEmail && detectRelevance()) {
    if (!existingBar) {
      bar = document.createElement("div");
      bar.classList.add("leadzen-bar");
      bar.innerHTML = `
        Leadzen<img src="${chrome.runtime.getURL("images/leadzen-icon-128.png")}" id="bar-logo" alt="leadzen logo">
      `;
      
      bar.addEventListener("click", function () {
        openSidebar();
      });

      document.body.appendChild(bar);
    }
  } 
  else if (existingBar && !isOpen) {
    existingBar.remove();
  }
}

function generateInsights(){
    const LeadEmail = {
        leadName: getName(),
        emailDate: getReceived(),
        emailSubject: getSubject(),
        emailBody: getBody()
    };

    generateContainer.classList.add("hidden");
    loadingContainer.classList.remove("hidden");
    const milliseconds = 3000;

    if (mockResponse){
        setTimeout(() => {
            showInsights(mockInsights);
        }, milliseconds);
        return;
    }

    chrome.runtime.sendMessage(LeadEmail, function(insights){

      if (!insights || insights.error){
        const loadingText = document.querySelector(".loading-text");
        loadingText.textContent = "Error gathering insights. Please try again.";
        setTimeout(() => {
          loadingContainer.classList.add("hidden");
          loadingText.textContent = "Analyzing lead...";
          generateContainer.classList.remove("hidden");
        }, milliseconds);
        console.error("Error gathering insights");
        return;
      }

      showInsights(insights);
    });
}

const observer = new MutationObserver(() => {
  handleBarInjection();
});
observer.observe(document.body, { childList: true, subtree: true });

const sidebar = document.createElement("div");
sidebar.classList.add("leadzen-sidebar");

document.body.appendChild(sidebar);

const sidebarContainer = document.createElement("div");
sidebarContainer.classList.add("container");
sidebar.appendChild(sidebarContainer);

const header = document.createElement("header");
header.classList.add("header");
sidebarContainer.appendChild(header);

const hContainer = document.createElement("div");
hContainer.classList.add("hContainer");
hContainer.innerHTML = `
  <h2 class="company-name">Leadzen</h2>
  <img src="${chrome.runtime.getURL("images/leadzen-icon-32.png")}" id="logo" alt="leadzen logo">
`;
header.appendChild(hContainer);

const closeButton = document.createElement("button");
closeButton.classList.add("close-btn");
closeButton.textContent = "⛌";
hContainer.appendChild(closeButton);

const tab = document.createElement("div");
tab.classList.add("header-tab");
tab.innerHTML = `
    <div class="tab overview" id="selected">Overview</div>
    <div class="tab history">History</div>
`;
header.appendChild(tab);

const overviewTab = document.querySelector(".tab.overview");
const historyTab = document.querySelector(".tab.history");

overviewTab.addEventListener("click", () => {
  historyTab.id = '';
  overviewTab.id = "selected";
  historyContainer.classList.add("hidden");
  overviewContainer.classList.remove("hidden");
});

historyTab.addEventListener("click", () => {
  overviewTab.id = '';
  historyTab.id = "selected";
  overviewContainer.classList.add("hidden");
  historyContainer.classList.remove("hidden");
});

const overviewContainer = document.createElement("div");
overviewContainer.classList.add("overview-container");
  
const leadContainer = document.createElement("div");
leadContainer.classList.add("lead-container");
leadContainer.innerHTML = `
  <div class="lead-overview-container">
    <div class="lead-title">Lead Status</div>
    <div class="lead-status" id="new-lead">NEW LEAD</div>
  </div>

  <div class="lead-info-card">

    <img class="blank-pfp" src="${chrome.runtime.getURL("images/blank-pfp.png")}" alt="blank profile picture">
      

    <div class="lead-info-container">
      <div class="lead-name"></div>
      <div class="lead-email"></div>
    </div>

  </div>
  `;

overviewContainer.appendChild(leadContainer);
  

const emailContainer = document.createElement("div");
emailContainer.classList.add("email-container");
emailContainer.innerHTML = `
  <div class="email-details">Email Details</div>

  <div class="email-info-card">

    <div class="subject-container">
      <div class="subject-title">Subject:</div>
      <div class="subject-text"></div>
    </div>

    <div class="received-container">
      <div class="received-title">Received:</div>
      <div class="received-text"></div>
    </div>

    </div>
  `;
overviewContainer.appendChild(emailContainer);

const insightTitle = document.createElement("div");
insightTitle.classList.add("insight-title-container");
insightTitle.innerHTML = `
  <img src="${chrome.runtime.getURL("images/leadzen-icon-32.png")}" id="insight-icon" alt="leadzen logo">
  <div class="insight-title">Leadzen Insights</div>
  `;
overviewContainer.appendChild(insightTitle);

const documentation = document.createElement("div");
documentation.classList.add("documentation", "bottom");
documentation.innerHTML = `
  <button class="mark-responded-container">
    ✓&nbsp;&nbsp;Mark As Responded
  </button>

  <button class="add-note-container">
    <img class="note-icon" src="${chrome.runtime.getURL("images/notes.svg")}" alt="note icon">
    <div class="note-text">Add Note</div>
  </button>
`;

const generateContainer = document.createElement("div");
generateContainer.classList.add("generate-container");
generateContainer.innerHTML = `
  <div class="generate-desc">Get help with this lead. Receive tailored insights, analysis, and strategy recommendations.</div>
  <button class="generate-insights-btn">Generate Insights</button>
`;
overviewContainer.appendChild(generateContainer);

const loadingContainer = document.createElement("div");
loadingContainer.classList.add("loading-container", "hidden");
loadingContainer.innerHTML = `
  <div class="loading-graphic"></div>
  <div class="loading-text">Analyzing lead...</div>
`;
overviewContainer.appendChild(loadingContainer);

const generatedContainer = document.createElement("div");
generatedContainer.classList.add("hidden");

const insightContainer = document.createElement("div");
insightContainer.classList.add("insight-container");
insightContainer.innerHTML = `
  <div class="ai-summary"></div>

  <div class="urgency-title-container">
    <div class="urgency-title">Urgency</div>
    <div class="urgency-level-title" id="medium"></div>
  </div>

  <div class="urgency-card">
    <div class="urgency-description"></div>
  </div>

  <div class="suggested-reply-title">Suggested Reply</div>

  <div class="reply-card">
    <div class="reply-text"></div>

    <button class="reply-copy-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
      </svg>
    </button>
  </div>
`;
generatedContainer.appendChild(insightContainer);
overviewContainer.appendChild(generatedContainer);
overviewContainer.appendChild(documentation);
sidebarContainer.appendChild(overviewContainer);

const summary = document.querySelector(".ai-summary");
const urgencyLevelTitle = document.querySelector(".urgency-level-title");
const urgencyDesc = document.querySelector(".urgency-description");
const suggestedReply = document.querySelector(".reply-text");
const genButton = generateContainer.querySelector(".generate-insights-btn");
genButton.addEventListener("click", generateInsights);
const copyButton = document.querySelector(".reply-copy-btn");

copyButton.addEventListener("click", async function() {
    const text = suggestedReply.textContent;
    if (!text) {
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        copyButton.classList.add("copied");
        setTimeout(() => {
            copyButton.classList.remove("copied");
        }, 1000);

    } 
    catch (error) {
        console.error("Error trying to copy reply", error);
    }
});
    
const historyContainer = document.createElement("div");
historyContainer.classList.add("hidden");

const optionContainer = document.createElement("div");
optionContainer.classList.add("option-container");
optionContainer.innerHTML = `
  <div class="option-btn-container">

    <button class="option-btn all" id="selected">All</button>

    <button class="option-btn leads">Leads</button>

    <button class="option-btn replied">Replied</button>

    <button class="option-btn archived">Archived</button>

  </div>

  <button class="option-trash">
    <img class="trash-icon" alt="trash icon" src="${chrome.runtime.getURL("images/trash-icon.svg")}">
  </button>
  `;
  historyContainer.appendChild(optionContainer);
  sidebarContainer.appendChild(historyContainer);

let isOpen = false;
function openSidebar() {
  if (isOpen) {
    return;
  }
  const leadName = document.querySelector(".lead-name");
  leadName.textContent = getName();

  const subjectText = document.querySelector(".subject-text");
  subjectText.textContent = getSubject();

  const receivedText = document.querySelector(".received-text");
  receivedText.textContent = getReceived();

  const senderEmail = document.querySelector(".lead-email");
  senderEmail.textContent = getEmail();

  isOpen = true;
  sidebar.style.display = "block";
  if (bar) {
    bar.style.display = "none";
  }
  document.body.style.marginRight = "430px";
  document.documentElement.style.marginRight = "430px";
}

function closeSidebar() {
  if (!isOpen) {
    return;
  }

  isOpen = false;
  sidebar.style.display = "none";
  if (bar) {
    bar.style.display = "flex";
  }
  document.body.style.marginRight = "0px";
  document.documentElement.style.marginRight = "0px";
}

closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  closeSidebar();
});

if (bar) {
  bar.addEventListener("click", function () {
    openSidebar();
  });
}

chrome.runtime.onMessage.addListener(function (message) {
  if (!message) {
    return;
  }

  if (message.type === "open-sidebar") {
    openSidebar();
  }

  if (message.type === "close-sidebar") {
    closeSidebar();
  }
});