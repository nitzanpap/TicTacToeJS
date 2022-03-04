document.addEventListener("DOMContentLoaded", () => {
    const spots = Array.from(document.querySelectorAll(".spot"))
    const msg = document.querySelector(".message-box")

    let board = ["", "", "", "", "", "", "", "", ""]
    let playerTurnSign = "X"
    let isGameOver = false
    let turnsCounter = 0

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
            let div = spot.children[0]

            // Handle spot is not empty
            if (div.className != "empty") {
                createMarkedSpotAnimation(spot)
            }
            // Handle spot is empty
            else {
                // Insert player's sign into the board array.
                let spotIndex = spot.id.slice(-1)
                board[spotIndex] = playerTurnSign
                // Add a cross if it's X's turn
                if (playerTurnSign == "X") addCrossAtSpot(spot)
                // Add a circle if it's O's turn
                else addCircleAtSpot(spot)
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
        }
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
                break
            case "Tie":
                msg.innerHTML = "It's a TIE!"
                msg.style.color = "gold"
                break
            default:
                alert("Invalid message.")
                break
        }
    }

    function switchTurn() {
        if (playerTurnSign == "X") playerTurnSign = "O"
        else playerTurnSign = "X"
    }

    function createMarkedSpotAnimation(spot) {
        let div1 = spot.children[0]
        div1.classList.add("marked-spot-click-animation")
        setTimeout(function () {
            div1.classList.remove("marked-spot-click-animation")
        }, 300)
    }

    function addCrossAtSpot(spot) {
        const cross = document.createElement("div")
        cross.classList.add("cross")

        const diagonal1 = document.createElement("div")
        diagonal1.classList.add("diagonal")
        diagonal1.setAttribute("id", "line1")

        const diagonal2 = document.createElement("div")
        diagonal2.classList.add("diagonal")
        diagonal2.setAttribute("id", "line2")

        cross.appendChild(diagonal1)
        cross.appendChild(diagonal2)
        spot.children[0].appendChild(cross)
        spot.children[0].remove()
        spot.appendChild(cross)
    }
    function addCircleAtSpot(spot) {
        const circle = document.createElement("div")
        circle.classList.add("circle")

        const ring = document.createElement("div")
        ring.classList.add("circle-component")
        ring.setAttribute("id", "ring")

        const cover = document.createElement("div")
        cover.classList.add("circle-component")
        cover.setAttribute("id", "cover")

        circle.appendChild(ring)
        circle.appendChild(cover)
        spot.children[0].appendChild(circle)
        spot.children[0].remove()
        spot.appendChild(circle)
    }

    spots.forEach((spot) => {
        spot.addEventListener("click", () => handleUserClick(spot))
    })
})
