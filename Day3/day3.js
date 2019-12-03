const fs = require('fs')
const file = fs.readFileSync('../Inputs/Day3/star1.txt').toString().split(/\r?\n/)

const directions = {
    "U": [0,1],
    "D": [0,-1],
    "R": [1,0],
    "L": [-1,0]
}

const star1 = () => {
    const firstWire = file[0].split(',')
    let pos = [0,0]
    let circuitboard = {}
    for(const step of firstWire){ 
        let instr = step.split(/([a-zA-Z])([0-9]+)/g)
        let dir = directions[instr[1]] // (0,1)
        let amountOfSteps = parseInt(instr[2]) // 5454
        for(let i = 0; i< amountOfSteps; i++ ){
            pos = [pos[0] + dir[0], pos[1] + dir[1]]
            circuitboard[[...pos]] = true
        }

    }
    //wire2
    pos = [0,0]
    let intersections = []
    const secondWire = file[1].split(',')
    for(const step of secondWire){
        let instr = step.split(/([a-zA-Z])([0-9]+)/g)
        let dir = directions[instr[1]]
        let amountOfSteps = parseInt(instr[2])

        for(let i = 0; i< amountOfSteps; i++ ){
            pos = [pos[0] + dir[0], pos[1] + dir[1]]
            if(circuitboard[pos]){
                intersections.push(pos)
            }
        }
    }
    console.log(manhattanDistance(intersections))
}

const manhattanDistance = (intersections) =>{
    distances = []
    for(const [x1,y1] of intersections){
        distances.push(Math.abs(x1) + Math.abs(y1))
        
    }
    return Math.min(...distances)
}

star1()