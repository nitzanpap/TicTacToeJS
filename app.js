document.addEventListener("DOMContentLoaded", () => {
    const spots = Array.from(document.querySelectorAll(".spot"))
    console.log(spots)

    let board = ["", "", "", "", "", "", "", "", ""]
    let playerTurn = "X"
    let isGameOver = false

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

    spots.forEach((spot, index) => {
        let sign = spot.children[0]
        sign.addEventListener("click", () => handleUserClick(spot))
    })

    function handleUserClick(spot) {
        let div = spot.children[0]
        if (div.className == "empty") {
            if (playerTurn == "X") addCrossAtSpot(spot)
            else addCircleAtSpot(spot)
            switchTurn()
        } else {
            alert("This spot has already been marked.")
        }
    }

    function switchTurn() {
        if (playerTurn == "X") playerTurn = "O"
        else playerTurn = "X"
    }

    function addCrossAtSpot(spot, index) {
        let div = spot.children[0]
        console.log(div.className)
        if (div.className == "empty") {
            const cross = document.createElement("div")
            cross.classList.add("cross")

            console.log(cross)

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
        console.log(div.className)
        if (div.className == "empty") {
            const circle = document.createElement("div")
            circle.classList.add("circle")

            console.log(circle)

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
