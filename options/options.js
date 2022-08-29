function saveOptions(e) {
    const simplifiedElem = document.querySelector("#simplified").checked;
    const highlightElem = document.querySelector("#highlight").checked;
    browser.storage.local.set({
        simplified: simplifiedElem,
        highlight: highlightElem
    });
    e.preventDefault();
    window.location.reload();
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