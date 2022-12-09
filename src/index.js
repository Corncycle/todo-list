import "./stylesheets/meyer-reset.css";
import "./stylesheets/style.css";

import { EventHandler } from "./scripts/EventHandler.js";

import { todayString, tomorrowString } from "./scripts/util.js";

import { parse } from "flatted/esm";

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

let eventHandler;

if (storageAvailable("localStorage")) {
    if (localStorage.getItem("eventHandler") !== null) {
        let ehs = localStorage.getItem("eventHandler");
        eventHandler = new EventHandler(parse(ehs));
    } else {
        eventHandler = new EventHandler();
        initialActions();
    }
} else {
    eventHandler = new EventHandler();
    initialActions();
}

let newButton = document.querySelector(".new-project-button");
newButton.addEventListener("click", e => { eventHandler.promptNewProject(); });

let taskButton = document.querySelector(".new-task-button");
taskButton.addEventListener("click", e => { eventHandler.promptNewTask(); });

function initialActions() {
    eventHandler.makeSampleProject();

    eventHandler.addTask("Sample Project", "Make Dinner", todayString(), null, "high");
    eventHandler.addTask("Sample Project", "Laundry", tomorrowString(), null, "medium");
    eventHandler.addTask("Sample Project", "Work Meeting", "2022-12-15", "Held at 2pm, should take about 1 hour", "high");
    eventHandler.addTask("Uncategorized", "An Uncategorized Task", todayString(), "This task is not categorized under any particular project.", "low");
}

function clearStorage() {
    localStorage.clear();
}