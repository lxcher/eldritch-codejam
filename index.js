import blueCardsData from "./data/mythicCards/blue/index.js";
import brownCardsData from "./data/mythicCards/brown/index.js";
import greenCardsData from "./data/mythicCards/green/index.js";
import ancientsData from "./data/ancients.js";

const shuffleCardsBtn = document.querySelector('.button_shuffle')
const deck = document.querySelector('.deck')
const tracker = document.querySelector('.tracker')
const ancients = document.querySelector('.ancients')

ancients.addEventListener('click', chooseAncient)

let greenCardsQty = 0
let brownCardsQty = 0
let blueCardsQty = 0

let ancientObj = {}

function getSumOfCards() {
    greenCardsQty = +ancientObj.firstStage.greenCards + +ancientObj.secondStage.greenCards + +ancientObj.thirdStage.greenCards
    brownCardsQty = +ancientObj.firstStage.brownCards + +ancientObj.secondStage.brownCards + +ancientObj.thirdStage.brownCards
    blueCardsQty = +ancientObj.firstStage.blueCards + +ancientObj.secondStage.blueCards + +ancientObj.thirdStage.blueCards
}

function clearEverything() {
    ancientObj = {}
    greenCardsQty = 0
    brownCardsQty = 0
    blueCardsQty = 0
    index = 0
    firstStageSum = 0
    secondStageSum = 0
    thirdStageSum = 0
    blueCards = []
    brownCards = []
    greenCards = []
    stageOne = []
    stageTwo = []
    stageThree = []
    result = []
    deck.style.backgroundImage = `url('./assets/mythicCardBackground.png')`
}

function chooseAncient(e) {
    clearEverything()
    let ancient = e.target
    if (ancient.classList.contains('ancients__ancient_azathoth')) {
        ancientObj = ancientsData[0]
    }
    if (ancient.classList.contains('ancients__ancient_cthulthu')) {
        ancientObj = ancientsData[1]
    }
    if (ancient.classList.contains('ancients__ancient_iogsothot')) {
        ancientObj = ancientsData[2]
    }
    if (ancient.classList.contains('ancients__ancient_shubniggurath')) {     
        ancientObj = ancientsData[3]
    }
    getSumOfCards()
    setTrackerValues()
    setStagesSums()
}

const stageOneTracker = tracker.children[0].lastElementChild.children
const stageTwoTracker = tracker.children[1].lastElementChild.children
const stageThreeTracker = tracker.children[2].lastElementChild.children

function setTrackerValues() {
    stageOneTracker[0].textContent = ancientObj.firstStage.greenCards
    stageOneTracker[1].textContent = ancientObj.firstStage.brownCards
    stageOneTracker[2].textContent = ancientObj.firstStage.blueCards
    stageTwoTracker[0].textContent = ancientObj.secondStage.greenCards
    stageTwoTracker[1].textContent = ancientObj.secondStage.brownCards
    stageTwoTracker[2].textContent = ancientObj.secondStage.blueCards
    stageThreeTracker[0].textContent = ancientObj.thirdStage.greenCards
    stageThreeTracker[1].textContent = ancientObj.thirdStage.brownCards
    stageThreeTracker[2].textContent = ancientObj.thirdStage.blueCards
}

let index = 0

deck.addEventListener('click', () => {
    changeTrackerValues()
    changeCardsInDeck()
})

function decreaseTrackerValue(color, stage, i) {
    if (result[index].color === color) {
        stage[i].textContent = `${stage[i].textContent - 1}`
    }
}

let firstStageSum = 0
let secondStageSum = 0
let thirdStageSum = 0

function setStagesSums() {
    firstStageSum = +ancientObj.firstStage.greenCards + +ancientObj.firstStage.brownCards + +ancientObj.firstStage.blueCards
    secondStageSum = +ancientObj.secondStage.greenCards + +ancientObj.secondStage.brownCards + +ancientObj.secondStage.blueCards
    thirdStageSum = +ancientObj.thirdStage.greenCards + +ancientObj.thirdStage.brownCards + +ancientObj.thirdStage.blueCards
}

function changeTrackerValues() {
    if (index < firstStageSum) {
        decreaseTrackerValue('green', stageOneTracker, 0)
        decreaseTrackerValue('brown', stageOneTracker, 1)
        decreaseTrackerValue('blue', stageOneTracker, 2)
    }
    if (index < secondStageSum + firstStageSum && index >= firstStageSum) {
        decreaseTrackerValue('green', stageTwoTracker, 0)
        decreaseTrackerValue('brown', stageTwoTracker, 1)
        decreaseTrackerValue('blue', stageTwoTracker, 2)
    }
    if (index >= secondStageSum + firstStageSum) {
        decreaseTrackerValue('green', stageThreeTracker, 0)
        decreaseTrackerValue('brown', stageThreeTracker, 1)
        decreaseTrackerValue('blue', stageThreeTracker, 2)
    }
}

function changeCardsInDeck() {
    let step = 1
    if (result.length !== 0) {
        deck.style.backgroundImage = `url(${result[index].cardFace})`
        index < result.length
            ? step = 1
            : step = 0
        index += step
    }
}

let blueCards = []
let brownCards = []
let greenCards = []


shuffleCardsBtn.addEventListener('click', () => {
    shuffleCards()
    setStages()
    shuffleStages()
})

function shuffleCards() {
    setCards(blueCardsQty, blueCards, blueCardsData)
    setCards(brownCardsQty, brownCards, brownCardsData)
    setCards(greenCardsQty, greenCards, greenCardsData)
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
    setStage(stageOne, ancientObj.firstStage.greenCards, greenCards)
    setStage(stageOne, ancientObj.firstStage.brownCards, brownCards)
    setStage(stageOne, ancientObj.firstStage.blueCards, blueCards)
    setStage(stageTwo, ancientObj.secondStage.greenCards, greenCards)
    setStage(stageTwo, ancientObj.secondStage.brownCards, brownCards)
    setStage(stageTwo, ancientObj.secondStage.blueCards, blueCards)
    setStage(stageThree, ancientObj.thirdStage.greenCards, greenCards)
    setStage(stageThree, ancientObj.thirdStage.brownCards, brownCards)
    setStage(stageThree, ancientObj.thirdStage.blueCards, blueCards)
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

