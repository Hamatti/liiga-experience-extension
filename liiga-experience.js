const SPAN_ROW_OFFSET = 17;

const SIMPLIFY_STYLES = `#main-partners-banner-container {
    display: none;
}

#main-right-container {
    display: none;
}

#main-standings-container {
    margin-top: 0;
    margin-left: 3em;
    width: 600px;
}

#main-left-container {
    flex-direction: row;
    max-width: 80%;
}


#main-latest-games-container {
    width: 600px;
}

#main-latest-games-container-chl {
    display: none;
}`;

const HIGHLIGHT_STYLE = `.highlight {
    background: black !important;
    color: white !important;
}`;

function run() {
    const localStorage = browser.storage.local.get(['simplified', 'highlight']);
    localStorage.then(res => {
        if (res.simplified) {
            const style = document.createElement('style');
            style.textContent = SIMPLIFY_STYLES;
            document.head.appendChild(style);
        }
        
        if (res.highlight) {
            const style = document.createElement('style');
            style.textContent = HIGHLIGHT_STYLE;
            document.head.appendChild(style);
            
            function findTeam(teamName) {
                let standings = document.getElementById('main-standings-container');
                let spans = Object.values(standings.querySelectorAll('span'));
                let teamNameElem = spans.find(elem => {
                    const lastSpan = elem.querySelector('span:last-child');
                    return lastSpan?.textContent.trim() === teamName;
                })
                return spans.indexOf(teamNameElem)
            }

            
            let standingsNode = document
                .getElementById("main-standings-container")

            function onHover(event) {
                let children = event.target.children;

                let teamsContainer;
                if (children.length === 5) {
                    teamsContainer = children[3];
                } else {
                    teamsContainer = children[1];
                }
                let homeTeam = teamsContainer.children[0].children[0].innerText;
                let awayTeam = teamsContainer.children[2].children[1].innerText;

                let homeTeamNodeIndex = findTeam(homeTeam);
                let awayTeamNodeIndex = findTeam(awayTeam);
                
                let teamNodes = standingsNode.querySelectorAll("span");
                teamNodes.forEach((node) => node.classList.remove("highlight"));
                
                let allNodes = Object.values(standingsNode.querySelectorAll('span'));
                let homeHiglightNodes = allNodes.slice(homeTeamNodeIndex, homeTeamNodeIndex + SPAN_ROW_OFFSET);
                let awayHiglightNodes = allNodes.slice(awayTeamNodeIndex, awayTeamNodeIndex + SPAN_ROW_OFFSET);
                
                homeHiglightNodes.forEach(span => span.classList.add('highlight'))
                awayHiglightNodes.forEach(span => span.classList.add('highlight'))
            }

            let scoreContainers = Object.values(
                document.querySelectorAll(".LatestGames_gameCardContainer__CCvGv")
            );

            scoreContainers.forEach((container) =>
                container.addEventListener("mouseenter", onHover)
            );
        }
    })

}


setTimeout(() => run(), 300)