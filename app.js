document.addEventListener("DOMContentLoaded", () => {
    const spots = Array.from(document.querySelectorAll(".spot"))
    console.log(spots)

    let board = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer = "X"
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
        sign.addEventListener("click", () => addCrossAtSpot(spot))
    })

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
})
