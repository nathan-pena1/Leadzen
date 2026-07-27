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
  if (emailAddress) {
    emailId = emailAddress.getAttribute("email");
  }
  if (emailId) {
    email = emailId.trim();
  }
  
  return email;
}

// gmail only for now
const emailDomains = ["mail.google.com", "www.gmail.com"];
const isEmail = emailDomains.includes(window.location.hostname);
let bar = null;
if (isEmail) {
  bar = document.createElement("div");
  bar.classList.add("leadzen-bar");
  bar.innerHTML = `
  Leadzen<img src="${chrome.runtime.getURL("images/leadzen-icon-128.png")}" id="bar-logo" alt="leadzen logo">
  
  `;
}

if (isEmail) {
  document.body.appendChild(bar);
}
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

const generatedContainer = document.createElement("div");
generatedContainer.classList.add("hidden");

const insightContainer = document.createElement("div");
insightContainer.classList.add("insight-container");
insightContainer.innerHTML = `
  <div class="ai-summary">John Doe is inquiring about your listing at 124 Conch Street. He
    is asking about current interest, and availability for a showing.</div>

  <div class="urgency-title-container">
    <div class="urgency-title">Urgency</div>
    <div class="urgency-level-title" id="medium">Medium</div>
  </div>

  <div class="urgency-card">
    <div class="urgency" id="medium">Medium</div>
    <div class="urgency-description">Interested buyer asking about a showing.</div>
  </div>

  <div class="suggested-reply-title">Suggested Reply</div>

  <div class="reply-card">
    <div class="reply-text">Hi John,

Thanks for your interest in 124 Conch Street!
    
Yes, the property is still available. I'd be happy to schedule a showing with you. How does this Tuesday at 2 pm look for you?
    
Best,
[Your Name]
    </div>

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

const genButton = generateContainer.querySelector(".generate-insights-btn");
genButton.addEventListener("click", () => {
  generateContainer.classList.add("hidden");
  generatedContainer.classList.remove("hidden");
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
  document.body.style.marginRight = "340px";
  document.documentElement.style.marginRight = "340px";
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