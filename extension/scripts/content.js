// gmail only for now
const emailDomains = ["mail.google.com", "www.gmail.com"];
const isEmail = emailDomains.includes(window.location.hostname);
let overview = true;
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
header.appendChild(hContainer);

const title = document.createElement("h2");
title.classList.add("company-name")
title.textContent = "Realtor Assist";
hContainer.appendChild(title);

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
        <div class="lead-email">john.doe@gmail.com</div>
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
        <div class="received-text">Today, 9:52 AM</div>
      </div>

    </div>
  `;
  sidebarContainer.appendChild(emailContainer);

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