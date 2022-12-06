import "./stylesheets/meyer-reset.css";
import "./stylesheets/style.css";

import { EventHandler } from "./scripts/EventHandler.js";

import circleSvg from "./images/circle.svg";

let eventHandler = new EventHandler();

let newButton = document.querySelector(".new-project-button");
newButton.addEventListener("click", e => { eventHandler.addProject("aNewProject", circleSvg, "projects"); });

let taskButton = document.querySelector(".new-task-button");
taskButton.addEventListener("click", e => { eventHandler.addTask("a Task"); });