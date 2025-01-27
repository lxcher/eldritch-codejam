import blueCardsData from "./data/mythicCards/blue/index.js";
import brownCardsData from "./data/mythicCards/brown/index.js";
import greenCardsData from "./data/mythicCards/green/index.js";
import ancientsData from "./data/ancients.js";

const shuffleCardsBtn = document.querySelector('.button_shuffle')
const deck = document.querySelector('.deck')
const tracker = document.querySelector('.tracker')
const ancients = document.querySelector('.ancients')

const stageOneTracker = tracker.children[0].lastElementChild.children
const stageTwoTracker = tracker.children[1].lastElementChild.children
const stageThreeTracker = tracker.children[2].lastElementChild.children

const difficulty = document.querySelector('.difficulties')

let firstStageSum = 0
let secondStageSum = 0
let thirdStageSum = 0

let greenCardsQty = 0
let brownCardsQty = 0
let blueCardsQty = 0

let ancientObj = {}

let sortedGreenCards = []
let sortedBrownCards = []
let sortedBlueCards = []

let stageOne = []
let stageTwo = []
let stageThree = []

let result = []

let index = 0

let difficultyValue = ''

ancients.addEventListener('click', (e) => {
    removeAncientsActiveClass()
    chooseAncient(e)
})



shuffleCardsBtn.addEventListener('click', () => {
    index = 0
    deck.style.backgroundImage = `url('./assets/mythicCardBackground.png')`
    showShuffleError()
    setTrackerValues()
    sortCards()
    setStages()
    shuffleStages()
})

deck.addEventListener('click', () => {
    showDecktError()
    changeTrackerValues()
    changeCardsInDeck()
})

difficulty.addEventListener('click', (e) => {
    for (let i = 0; i < difficulty.children.length; i++) {
        difficulty.children[i].classList.remove('active')
    }
    if (e.target !== difficulty) {
        e.target.classList.add('active')
    }
    setDifficulty(e)
})

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
    sortedGreenCards = []
    sortedBrownCards = []
    sortedBlueCards = []
    stageOne = []
    stageTwo = []
    stageThree = []
    result = []
    deck.style.backgroundImage = `url('./assets/mythicCardBackground.png')`
}

function removeAncientsActiveClass() {
    for (let i = 0; i < ancients.children.length; i++) {
        ancients.children[i].classList.remove('active')
    }
}

function chooseAncient(e) {
    clearEverything()
    let ancient = e.target
    ancient.classList.add('active')
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

function sortCards() {
    sortedGreenCards = []
    sortedBrownCards = []
    sortedBlueCards = []
    if (difficultyValue === 'easy' || difficultyValue === 'hard') {
        sortCardsEasyHard(greenCardsData, greenCardsQty, sortedGreenCards)
        sortCardsEasyHard(brownCardsData, brownCardsQty, sortedBrownCards)
        sortCardsEasyHard(blueCardsData, blueCardsQty, sortedBlueCards)
    }
    if (difficultyValue === 'very-easy' || difficultyValue === 'very-hard') {
        sortCardsVeryEasyHard(greenCardsData, greenCardsQty, sortedGreenCards)
        sortCardsVeryEasyHard(brownCardsData, brownCardsQty, sortedBrownCards)
        sortCardsVeryEasyHard(blueCardsData, blueCardsQty, sortedBlueCards)
    }
    if (difficultyValue === 'normal')  {
        sortCardsNormal(greenCardsData, greenCardsQty, sortedGreenCards)
        sortCardsNormal(brownCardsData, brownCardsQty, sortedBrownCards)
        sortCardsNormal(blueCardsData, blueCardsQty, sortedBlueCards)
    }
}



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



function showDecktError() {
    if (Object.keys(ancientObj).length === 0) {
        alert('Выберите Древнего!')
    }
    if (Object.keys(ancientObj).length !== 0 && difficultyValue === '') {
        alert('Выберите сложность!')
    }
    if (Object.keys(ancientObj).length !== 0 && difficultyValue !== '' && result.length === 0) {
        alert('Перемешайте колоду!')
    }
}

function showShuffleError() {
    if (Object.keys(ancientObj).length === 0) {
        alert('Выберите Древнего!')
    }
    if (Object.keys(ancientObj).length !== 0 && difficultyValue === '') {
        alert('Выберите сложность!')
    }

}

function decreaseTrackerValue(color, stage, i) {
    if (result[index].color === color) {
        stage[i].textContent = `${stage[i].textContent - 1}`
    }
}



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

function setStages() {
    stageOne = []
    stageTwo = []
    stageThree = []

    setStage(stageOne, ancientObj.firstStage.greenCards, sortedGreenCards)
    setStage(stageOne, ancientObj.firstStage.brownCards, sortedBrownCards)
    setStage(stageOne, ancientObj.firstStage.blueCards, sortedBlueCards)
    setStage(stageTwo, ancientObj.secondStage.greenCards, sortedGreenCards)
    setStage(stageTwo, ancientObj.secondStage.brownCards, sortedBrownCards)
    setStage(stageTwo, ancientObj.secondStage.blueCards, sortedBlueCards)
    setStage(stageThree, ancientObj.thirdStage.greenCards, sortedGreenCards)
    setStage(stageThree, ancientObj.thirdStage.brownCards, sortedBrownCards)
    setStage(stageThree, ancientObj.thirdStage.blueCards, sortedBlueCards)
}

function setStage(stage, quantity, source) {
    for (let i = 0; i < quantity; i++) {
        let item = source.shift()
        stage.push(item)
    }
}

function shuffleStage(stage) {
    let set = new Set
    while (set.size !== stage.length) {
        let index = getRandomNumber(stage.length)

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
}

function setDifficulty(e) {
    difficultyValue = e.target.getAttribute('id')
}

function sortCardsVeryEasyHard(source, qty, result) {
    let array = []
    let set = new Set
    source.forEach(el => {
        if (difficultyValue === 'very-easy') {
            if (el.difficulty === 'easy') {
                array.push(el)
            }
        }
        if (difficultyValue === 'very-hard') {
            if (el.difficulty === 'hard') {
                array.push(el)
            }
        }
    });
    if(array.length < qty) {
        let additionalSet = new Set
        let additionalArray = []
        source.forEach(el => {
            if (el.difficulty === 'normal') {
                additionalArray.push(el)
            }
        })
        while (additionalSet.size < qty - array.length) {
            let index = getRandomNumber(additionalArray.length)
            additionalSet.add(additionalArray[index])
        }
        for (let item of additionalSet) {
            array.push(item)
        }
    }
    if (array.length > qty) {
        for (let i = 0; i <= array.length - qty; i++) {
            let index = getRandomNumber(array.length)
            array.splice(index, 1)
        }
    }
    while (set.size !== array.length) {
        let index = getRandomNumber(array.length)
        set.add(array[index])
    }
    for (let item of set) {
        result.push(item)
    }
    
}

function sortCardsEasyHard (source, qty, result) {
    let array = []
    let set = new Set
    source.forEach(el => {
        if (difficultyValue === 'easy') {
            if (el.difficulty !== 'hard') {
                array.push(el)
            }
        }
        if (difficultyValue === 'hard') {
            if (el.difficulty !== 'easy') {
                array.push(el)
            }
        }
    })
    while (set.size !== qty) {
        let index = getRandomNumber(array.length)
        set.add(array[index])
    }
    for (let item of set) {
        result.push(item)
    }
}

function sortCardsNormal(source, qty, result) {
    let array = []
    let set = new Set
    source.forEach(el => {
        array.push(el)
    })
    while (set.size !== qty) {
        let index = getRandomNumber(array.length)
        set.add(array[index])
    }
    for (let item of set) {
        result.push(item)
    }
}

function getRandomNumber(number) {
    return Math.floor(Math.random() * number)
}
