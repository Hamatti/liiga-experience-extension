function refresh(tabs) {
    /* tell the active tab to refresh after settings are saved */
    browser.tabs.sendMessage(
        tabs[0].id,
        { refresh: true }
    )
}

function saveOptions(e) {
    const simplifiedElem = document.querySelector("#simplified").checked;
    const highlightElem = document.querySelector("#highlight").checked;
    browser.storage.local.set({
        simplified: simplifiedElem,
        highlight: highlightElem
    });
    e.preventDefault();

    browser.tabs.query({ active: true, currentWindow: true }).then(refresh)
}

function restoreOptions() {
    let localStorage = browser.storage.local.get(['simplified', 'highlight']);
    localStorage.then((res) => {
        document.querySelector('#simplified').checked = res.simplified
        document.querySelector('#highlight').checked = res.highlight
    });


}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);