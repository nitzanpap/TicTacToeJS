document.addEventListener("DOMContentLoaded", () => {
    const spots = Array.from(document.querySelectorAll(".spot"))
    const msg = document.querySelector(".message-box")
    console.log(spots)

    let board = ["", "", "", "", "", "", "", "", ""]
    let playerTurn = "X"
    let isGameOver = false
    let numOfOverallTurns = 0

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

    spots.forEach((spot) => {
        spot.addEventListener("click", () => handleUserClick(spot))
    })

    function handleUserClick(spot) {
        // Reset message box
        msg.innerHTML = ""
        let div = spot.children[0]
        // Handle the case in which the spot is empty
        if (div.className != "empty") {
            // Handle the case in which the spot is not empty
            msg.innerHTML = "This spot has already been marked."
            msg.style.color = "crimson"
        } else {
            // Insert player's sign into the board array.
            let spotIndex = spot.id.slice(-1)
            board[spotIndex] = playerTurn
            console.log(board)
            // Add a cross if it's X's turn
            if (playerTurn == "X") addCrossAtSpot(spot)
            // Add a circle if it's O's turn
            else addCircleAtSpot(spot)
            checkWin()
            switchTurn()
        }
    }

    function checkWin() {}

    function switchTurn() {
        if (playerTurn == "X") playerTurn = "O"
        else playerTurn = "X"
    }

    function addCrossAtSpot(spot, index) {
        let div = spot.children[0]
        if (div.className == "empty") {
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
    }
    function addCircleAtSpot(spot, index) {
        let div = spot.children[0]
        if (div.className == "empty") {
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
    }
})
