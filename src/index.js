import "./stylesheets/meyer-reset.css";
import "./stylesheets/style.css";

import { EventHandler } from "./scripts/EventHandler.js";

import { todayString, tomorrowString } from "./scripts/util.js";

import circleSvg from "./images/circle.svg";

let eventHandler = new EventHandler();

let newButton = document.querySelector(".new-project-button");
newButton.addEventListener("click", e => { eventHandler.promptNewProject(); });

let taskButton = document.querySelector(".new-task-button");
taskButton.addEventListener("click", e => { eventHandler.promptNewTask(); });

initialActions();
function initialActions() {
    eventHandler.clickProject("Another Project");
    //eventHandler.promptNewTask();
    eventHandler.addTask("Another Project", "Wanikani", todayString(), "Describe the project here", "high");
    eventHandler.addTask("Another Project", "Laundry", tomorrowString(), null, "medium");
    //eventHandler.addTask("Another Project", "A task far in the future", "2022-12-25", null, "high");
}