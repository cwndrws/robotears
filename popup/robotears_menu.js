import { getCurrentPageText } from "./browser_utilities"

async function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const form = findForm("robo_tears_form");
    const formData = new FormData(form);

    const text = await getCurrentPageText();
    console.log(`got the following page text\n${text}`);
    return false;
}


function findForm(name) {
    const form = document.getElementById(name);
    return form;
}

form = findForm("robo_tears_form");
if (form.attachEvent) {
    form.attachEvent("submit", processForm)
} else {
    form.addEventListener("submit", processForm)
}
