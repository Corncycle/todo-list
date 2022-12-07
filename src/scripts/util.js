export function todayString() {
    let d = new Date();
    return d.toLocaleDateString("en-CA");
}

export function tomorrowString() {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString("en-CA");
}

export function relativeTimeString(date) {
    if (date.toLocaleDateString("en-CA") == todayString()) return "today";
    if (date.toLocaleDateString("en-CA") == tomorrowString()) return "tomorrow";
    let d = new Date();
    if (date.getFullYear() == d.getFullYear()) {
        let opts = {
            month: "short",
            day: "numeric"
        };
        return date.toLocaleDateString("en-US", opts);
    } else {
        let opts = {
            month: "short",
            day: "numeric",
            year: "numeric"
        };
        return date.toLocaleDateString("en-US", opts);
    }
}