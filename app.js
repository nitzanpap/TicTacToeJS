// Wait for the whole document and its styles to load, and then run the script.
document.addEventListener("DOMContentLoaded", () => {
    const spots = Array.from(document.querySelectorAll(".spot"))
    const msg = document.querySelector(".message-box")

    let board = ["", "", "", "", "", "", "", "", ""]
    let playerTurnSign = "X"
    let isGameOver = false
    let turnsCounter = 0

    let isGameVsPc = true
    let opponentModes = ["dumb", "easy", "hard", "impossible"]
    let Mode = 1

    /*
     [0] [1] [2]
     [3] [4] [5]
     [6] [7] [8]
    */
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    function handleUserClick(spot) {
        if (!isGameOver) {
            // Reset message box
            updateMsgBox("No Message")
            // Check the sign in the spot
            let sign = spot.children[0]
            // Handle spot is not empty
            if (sign.className != "empty") {
                activateMarkedSpotAnimation(spot)
            }
            // Handle spot is empty
            else {
                playTurn(spot)
                if (!isGameOver && isGameVsPc) opponentTurn()
            }
        }
    }

    function opponentTurn() {
        let spotIndex = -1
        switch (opponentModes[Mode]) {
            case "dumb":
                spotIndex = opponentDumbMode()
                break
            case "easy":
                spotIndex = opponentEasyMode()
                break
            case "hard":
                break
            case "impossible":
                break
            default:
                alert("Invalid opponent mode")
        }
        playTurn(spots[spotIndex])
    }

    /* Priorities:
        1. If there are 2 'O' and one empty, then return the empty one.
        2. If there are 2 'X and one empty, then return the empty one.
        3. Continue a previous 'O'.
        4. Return an empty index.
     */
    function opponentEasyMode() {
        let numOfO
        let numOfX
        let numOfEmpties
        let indexOfEmpty
        let finalIndex
        let OcombinationFound = false
        let XcombinationFound = false

        // For each possible combination, check for a possible move that:
        // 1. Wins the game.
        // 2. Prevents the player from winning the game.
        // Otherwise, select a random spot.
        winningCombinations.forEach((combination) => {
            numOfO = 0
            numOfX = 0
            indexOfEmpty = 0
            numOfEmpties = 0
            let indexCounter = 0
            combination.forEach((index) => {
                if (board[index] == "O") numOfO++
                else if (board[index] == "X") numOfX++
                else {
                    indexOfEmpty = index
                    numOfEmpties++
                }
                console.log(index)
                if (indexCounter == 2) {
                    console.log(
                        "O: " +
                            numOfO +
                            ", X: " +
                            numOfX +
                            " empty: " +
                            numOfEmpties
                    )
                }
                indexCounter++
            })
            console.log("-----")
            // Priority 1 - Win the game. ex: O-O-_
            if (numOfO == 2 && numOfEmpties == 1) {
                finalIndex = indexOfEmpty
                OcombinationFound = true
            }
            // Priority 2 - Block opponent win. ex: X-X-_
            else if (numOfX == 2 && numOfEmpties == 1 && !OcombinationFound) {
                finalIndex = indexOfEmpty
                XcombinationFound = true
            }
        })
        console.log(
            "Completed move.---------- indexOfEmpty: " +
                indexOfEmpty +
                ", finalIndex: " +
                finalIndex
        )
        if (XcombinationFound) return finalIndex
        return opponentDumbMode()
    }

    function opponentDumbMode() {
        let i = Math.floor(Math.random() * 9)
        // Choose an empty random spot on the board.
        while (board[i % 9] != "") i++
        return i % 9
    }

    function playTurn(spot) {
        // Add sign to the board array and draw it
        addSignToBoard(spot)
        turnsCounter++
        if (checkWin()) {
            updateMsgBox("Game Won")
            isGameOver = true
        } else if (turnsCounter == 9) {
            updateMsgBox("Tie")
            isGameOver = true
        }
        switchTurn()
    }

    function addSignToBoard(spot) {
        // Insert player's sign into the board array.
        let spotIndex = spot.id.slice(-1)
        board[spotIndex] = playerTurnSign
        drawSignAtSpot(spot)
        activateEmptySpotAnimation(spot)
    }

    function checkWin() {
        let numOfConsecutiveSigns = 0
        let gameWon = false
        winningCombinations.forEach((combination) => {
            numOfConsecutiveSigns = 0
            combination.forEach((index) => {
                if (board[index] == playerTurnSign) numOfConsecutiveSigns++
            })
            if (numOfConsecutiveSigns == 3) gameWon = true
        })
        if (gameWon) return true
        return false
    }

    function updateMsgBox(message) {
        switch (message) {
            case "No Message":
                msg.innerHTML = ""
                break
            case "Game Won":
                msg.innerHTML = "Player " + playerTurnSign + " Won the game!"
                msg.style.color = "springgreen"
                makeBoardGrey()
                break
            case "Tie":
                msg.innerHTML = "It's a TIE!"
                msg.style.color = "gold"
                makeBoardGrey()
                break
            default:
                alert("Invalid case.")
                break
        }
    }
    function makeBoardGrey() {
        spots.forEach((spot) => {
            spot.style.opacity = 0.6
        })
    }

    function switchTurn() {
        if (playerTurnSign == "X") playerTurnSign = "O"
        else playerTurnSign = "X"
    }

    function activateMarkedSpotAnimation(spot) {
        let shape = spot.children[0]
        shape.classList.add("marked-spot-clicked")
        setTimeout(function () {
            shape.classList.remove("marked-spot-clicked")
        }, 300)
    }

    function activateEmptySpotAnimation(spot) {
        let shape = spot.children[0]
        shape.classList.add("empty-spot-clicked")
        setTimeout(function () {
            shape.classList.remove("empty-spot-clicked")
        }, 300)
    }

    function drawSignAtSpot(spot) {
        let shape = document.createElement("div")
        let shapeInnerDiv1 = document.createElement("div")
        let shapeInnerDiv2 = document.createElement("div")
        // Draw a cross if it's X's turn
        if (playerTurnSign == "X") {
            shape.classList.add("cross")
            shapeInnerDiv1.classList.add("diagonal")
            shapeInnerDiv1.setAttribute("id", "line1")
            shapeInnerDiv2.classList.add("diagonal")
            shapeInnerDiv2.setAttribute("id", "line2")
            // Draw a circle if it's O's turn
        } else {
            shape.classList.add("circle")
            shapeInnerDiv1.classList.add("circle-component")
            shapeInnerDiv1.setAttribute("id", "ring")
            shapeInnerDiv2.classList.add("circle-component")
            shapeInnerDiv2.setAttribute("id", "cover")
        }
        shape.appendChild(shapeInnerDiv1)
        shape.appendChild(shapeInnerDiv2)
        spot.children[0].appendChild(shape)
        spot.children[0].remove()
        spot.appendChild(shape)
    }

    function hoverSpot(spot) {
        let shape = spot.children[0]
        if (shape.classList[0] == "circle")
            shape.children[1].style.backgroundColor = "#3b4450"
    }

    function removeHoverSpot(spot) {
        let shape = spot.children[0]
        if (shape.classList[0] == "circle")
            shape.children[1].style.backgroundColor = "#2c394b"
    }

    spots.forEach((spot) => {
        spot.addEventListener("click", () => handleUserClick(spot))
        // Ugly implementation of hover, but it works. needs to be replaced later.
        // Also this solution needs to import colors from a main colors file.
        spot.addEventListener("mouseenter", () => hoverSpot(spot))
        spot.addEventListener("mouseleave" || "mouseup", () =>
            removeHoverSpot(spot)
        )
    })
})
