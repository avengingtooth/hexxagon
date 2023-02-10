function setUpHexagons(){
    for (let i = 0; i < 9; i++){
        let column = document.createElement('div')
        column.classList.add(`col${i}`)
        column.classList.add('column')
        column.style.gridAutoRows = "repeat(auto, i + 5)"
        document.querySelector('.hexagons').append(column)
        let nb = 5 + i % 5
        if ( i >= 5){
            nb = 9 - (i + 1) % 5
        }
        for (let j = 0; j < nb; j++){
            if (!((i == 4 && j == 3) || (j == 4 && (i == 3 || i == 5)))){
                let canvas = document.createElement('canvas')
                canvas.classList.add(`row${j}`)
                drawHexagon(canvas, i, j)
                addCircle(canvas)
                column.append(canvas)

                canvas.addEventListener('click', () => {
                    document.querySelectorAll('.selected').forEach(c => {
                        changeColor(c, 'black')
                        c.classList.remove('selected')
                    })
                    oneSqrAway(i, j)
                    changeColor(canvas, 'black')
                    canvas.classList.remove('selected')
                })
            }
            else{
                console.log(i, j)
                let empty = document.createElement('div')
                empty.classList.add('empty')
                column.append(empty)
            }
        }
    }
}

function oneSqrAway(i, j, times){
    let inverse = 1
    if (i >= 4){
        inverse = -1
    }
    for (let posCol = -1; posCol <= 1; posCol++){
        for (let posRow = 0; posRow < 2; posRow++){
            let add = 0
            if (posCol == 0){
                if(posRow == 0){
                    add -= 1
                }
            }
            else{
                if(i + posCol < 4){
                    if (posCol < 0){
                        add = posCol
                    }
                }
                else{
                    if (posCol > 0){
                        add = posCol * inverse
                    }
                }
            }
            let nextPieceRow = posRow + add + j
            let nextPieceCol = posCol + i
            try{
                let canvas = document.querySelector(`.col${nextPieceCol} .row${nextPieceRow}`)
                if(!times){
                    oneSqrAway(nextPieceCol, nextPieceRow, 1)
                    changeColor(canvas, 'red')
                }
                else{
                    if (!canvas.className.includes('selected')){
                        changeColor(canvas, 'yellow')
                    }
                }
                canvas.classList.add('selected')
            }
            catch{
                continue
            }
        }
    }
}

function changeColor(canvas, color){
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.fill()
}

function drawHexagon(canvas, i, j){
    const ctx = canvas.getContext("2d");
    ctx.beginPath()
    //top bar
    ctx.moveTo(canvas.width/3, 0)
    ctx.lineTo(canvas.width/3*2, 0)

    //right middle
    ctx.lineTo(canvas.width, canvas.height/2)

    //bottom bar
    ctx.lineTo(canvas.width/3*2, canvas.height)
    ctx.lineTo(canvas.width/3, canvas.height)

    //left middle
    ctx.lineTo(0, canvas.height/2)

    //back to start
    ctx.lineTo(canvas.width/3, 0)

    ctx.fillStyle = `rgba(${120}, ${i* 20}, ${j*20}, ${250})`
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 4
    ctx.fill();
    ctx.stroke()
}

function addCircle(canvas){
    const ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.moveTo(canvas.width/2, canvas.height/2)
    ctx.arc(canvas.width/2, canvas.height/2, canvas.height/4, 0, 2*Math.PI)
    ctx.fillStyle = 'black'
    ctx.stroke()
    ctx.fill()
}

setUpHexagons()
document.getElementById('startBtn').addEventListener('click', setUpHexagons)