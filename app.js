document.addEventListener("DOMContentLoaded", () => {
    //card options
    const cardArray = [
        {
            name: "fries",
            img: "images/fries.png",
        },
        {
            name: "cheeseburger",
            img: "images/cheeseburger.png",
        },
    ]

    const board = document.querySelector(".board")
    const spots = document.querySelectorAll(".spot")
    console.log(spots)
    let matrix = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    console.log(spots[0].children[0].className)

    // Create yout board
    function createBoard() {
        for (let i = 0; i < spots.length; i++) {
            let spot = spots[i].children[0]

            card.addEventListener("click", flipCard)
            grid.appendChild(card)
        }
    }

    function addCrossAtSpot(spot) {
        let cross = document.createElement("div")
    }

    // Check for a match
    function checkForMatch() {
        let cards = document.querySelectorAll("img")
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute("src", "images/white.png")
            cards[optionTwoId].setAttribute("src", "images/white.png")
            alert("You found a match!")
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute("src", "images/blank.png")
            cards[optionTwoId].setAttribute("src", "images/blank.png")
            alert("Sorry! try again.")
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congratulations! You won the game!"
            grid.classList.toggle("disabled")
        }
    }

    // Flip your card
    function flipCard() {
        let cardId = this.getAttribute("data-id")
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute("src", cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()
})
