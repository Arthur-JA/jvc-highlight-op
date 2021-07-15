// ==UserScript==
// @name         JVC highlight op
// @version      2
// @description  Ajoute "OP" a coté du pseudo de l'op
// @author       Bernie
// @match        https://www.jeuxvideo.com/forums/*
// @grant        none
// ==/UserScript==

const parser = new DOMParser();
const msgContainer = document.querySelector('.conteneur-messages-pagi');
const pager = msgContainer.querySelector('.bloc-pagi-default .bloc-liste-num-page');

if (pager) {
    let opName = null;

    if (pager.querySelector('.page-active').textContent == '1') {
        opName = msgContainer.querySelector('.bloc-pseudo-msg').textContent;
        highlightOp();
    }
    else {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                const doc = parser.parseFromString(httpRequest.responseText, "text/html");
                opName = doc.querySelector('.bloc-pseudo-msg').textContent;
                highlightOp();
            }
        }
        httpRequest.open('GET', pager.querySelector('a.lien-jv').href, true);
        httpRequest.send();
    }

    function highlightOp() {
        if (opName) {
            msgContainer.querySelectorAll('.bloc-pseudo-msg').forEach(elem => {
                if (elem.textContent === opName) {
                    elem.innerHTML += ('<strong style="color: #FF6600;font-size: 12px;margin-left: 5px;vertical-align:bottom">OP</strong>');
                }
            });
        }
    }
}
