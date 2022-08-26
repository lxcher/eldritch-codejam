import blueCardsData from "./data/mythicCards/blue/index.js";
import brownCardsData from "./data/mythicCards/brown/index.js";
import greenCardsData from "./data/mythicCards/green/index.js";

const shuffleCardsBtn = document.querySelector('.button_shuffle')
const deck = document.querySelector('.deck')

let index = 0

deck.addEventListener('click', () => {
    let step = 1
    if (result.length !== 0) {
        deck.style.backgroundImage = `url(${result[index].cardFace})`
        index < result.length
            ? step = 1
            : step = 0
        index += step
    }
    
})

let blueCards = []
let brownCards = []
let greenCards = []


shuffleCardsBtn.addEventListener('click', () => {
    shuffleCards()
    setStages()
    shuffleStages()
})

function shuffleCards() {
    setCards(2, blueCards, blueCardsData)
    setCards(9, brownCards, brownCardsData)
    setCards(5, greenCards, greenCardsData)
}

function setCards(quantity, deck, source) {
    let set = new Set
    while (set.size < quantity) {
        let index = Math.floor(Math.random() * source.length)
        set.add(source[index])
    }
    for (let item of set) {
        deck.push(item)
    }
}

let stageOne = []
let stageTwo = []
let stageThree = []


function setStages() {
    setStage(stageOne, 1, greenCards)
    setStage(stageOne, 2, brownCards)
    setStage(stageOne, 1, blueCards)
    setStage(stageTwo, 2, greenCards)
    setStage(stageTwo, 3, brownCards)
    setStage(stageTwo, 1, blueCards)
    setStage(stageThree, 2, greenCards)
    setStage(stageThree, 4, brownCards)
    setStage(stageThree, 0, blueCards)
}

function setStage(stage, quantity, source) {
    for (let i = 0; i < quantity; i++) {
        let item = source.shift()
        stage.push(item)
        
    }
}

let result = []

function shuffleStage(stage) {
    let set = new Set
    while (set.size !== stage.length) {
        let index = Math.floor(Math.random() * stage.length)
        set.add(stage[index])
    }
    for (let item of set) {
        result.push(item)
    }
}

function shuffleStages() {
    result = []
    shuffleStage(stageOne)
    shuffleStage(stageTwo)
    shuffleStage(stageThree)
    console.log(result)
}

