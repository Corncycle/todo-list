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
    eventHandler.makeSampleProject();

    eventHandler.addTask("Sample Project", "Make Dinner", todayString(), "Describe the project here", "high");
    eventHandler.addTask("Sample Project", "Laundry", tomorrowString(), null, "medium");
    eventHandler.addTask("Sample Project", "Work Meeting", "2022-12-15", "Held at 2pm, should take about 1 hour", "high");
    eventHandler.addTask("Uncategorized", "An Uncategorized Task", todayString(), "This task is not categorized under any particular project.", "low");
}