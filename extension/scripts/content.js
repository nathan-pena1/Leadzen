// gmail only for now
const emailDomains = ["mail.google.com", "www.gmail.com"];
const isEmail = emailDomains.includes(window.location.hostname);
let overview = true;
let generate = false;
let bar = null;
if (isEmail) {
  bar = document.createElement("div");
  bar.classList.add("realtor-assist-bar");
  bar.textContent = "Realtor Assist";
}

if (isEmail) {
  document.body.appendChild(bar);
}
const sidebar = document.createElement("div");
sidebar.classList.add("realtor-assist-sidebar");

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
  <h2 class="company-name">Realtor Assist</h2>
  <img src="${chrome.runtime.getURL("images/realtorAssist-icon-32.png")}" id="logo" alt="realtor assist logo">
`;
header.appendChild(hContainer);

const closeButton = document.createElement("button");
closeButton.classList.add("close-btn");
closeButton.textContent = "⛌";
hContainer.appendChild(closeButton);

const tab = document.createElement("div");
tab.classList.add("header-tab");
tab.innerHTML = `
    <div class="tab overview">Overview</div>
    <div class="tab history">History</div>
`;
header.appendChild(tab);
if (overview){
  const overview = document.querySelector(".overview");
  overview.id = "selected";
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
        <div class="lead-name">John Doe</div>
        <div class="lead-email">john.doe.realty12@gmail.com</div>
      </div>

    </div>
  `;
  sidebarContainer.appendChild(leadContainer);

  const emailContainer = document.createElement("div");
  emailContainer.classList.add("email-container");
  emailContainer.innerHTML = `
    <div class="email-details">Email Details</div>

    <div class="email-info-card">

      <div class="subject-container">
        <div class="subject-title">Subject:</div>
        <div class="subject-text">Interest in 124 Conch Street</div>
      </div>

      <div class="received-container">
        <div class="received-title">Received:</div>
        <div class="received-text">Today, 4:43 PM</div>
      </div>

    </div>
  `;
  sidebarContainer.appendChild(emailContainer);

  const insightTitle = document.createElement("div");
  insightTitle.classList.add("insight-title-container");
  insightTitle.innerHTML = `
    <img src="${chrome.runtime.getURL("images/realtorAssist-icon-32.png")}" id="insight-icon" alt="realtor assist logo">
    <div class="insight-title" style="color: #1975f7">Realtor Assist Insights</div>
  `;
  sidebarContainer.appendChild(insightTitle);
// Future implementation of AI insights will require a button click for cost saving purposes.
// if (generate){ 
// ai summary -> urgency report -> suggested reply

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


      `;
  //     <div class="lead-title">Lead Status</div>
  //     <div class="lead-status" id="new-lead">NEW LEAD</div>
  //   </div>

  //   <div class="lead-info-card">

  //     <img class="blank-pfp" src="${chrome.runtime.getURL("images/blank-pfp.png")}" alt="blank profile picture">
      

  //     <div class="lead-info-container">
  //       <div class="lead-name">John Doe</div>
  //       <div class="lead-email">john.doe@gmail.com</div>
  //     </div>

  //   </div>
  // `;
  sidebarContainer.appendChild(insightContainer);






// }
}
const content = document.createElement("div");
content.classList.add("content");
sidebarContainer.appendChild(content);

const box = document.createElement("div");
box.classList.add("box");
content.appendChild(box);

const boxTitle = document.createElement("h3");
boxTitle.textContent = "Review Suggestions";
box.appendChild(boxTitle);

const boxText = document.createElement("p");
boxText.textContent = "Nothing to report.";
box.appendChild(boxText);


let isOpen = false;

function openSidebar() {
  if (isOpen) {
    return;
  }

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