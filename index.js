import blueCardsData from "./data/mythicCards/blue/index.js";
import brownCardsData from "./data/mythicCards/brown/index.js";
import greenCardsData from "./data/mythicCards/green/index.js";


const shuffleCardsBtn = document.querySelector('.button_shuffle')

let blueCards = new Set;
let brownCards = new Set;
let greenCards = new Set;


shuffleCardsBtn.addEventListener('click', shuffleCards)

function shuffleCards() {
    setCards(3, blueCards, blueCardsData)
    setCards(2, brownCards, brownCardsData)
    setCards(3, greenCards, greenCardsData)
}

function setCards(quantity, deck, source) {
    while (deck.size < quantity) {
        let index = Math.floor(Math.random() * source.length)
        deck.add(source[index])
    }
    console.log(deck)
}