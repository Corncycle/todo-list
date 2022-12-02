import "./stylesheets/meyer-reset.css";
import "./stylesheets/style.css";

import {DOMSidebar} from "./scripts/dom/DOMSidebar.js";

console.log("Hello world");

let s = new DOMSidebar();
s.generateSkeleton();
s.render();