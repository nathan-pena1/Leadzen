// gmail only for now
const emailDomains = ["mail.google.com", "www.gmail.com"];
const isEmail = emailDomains.includes(window.location.hostname);

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

const title = document.createElement("h2");
title.classList.add("company-name")
title.textContent = "Realtor Assist";
header.appendChild(title);

const closeButton = document.createElement("button");
closeButton.classList.add("close-btn");
closeButton.textContent = "X";
header.appendChild(closeButton);

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