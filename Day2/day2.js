const fs = require('fs')

const star1 = () => {
    const intcode = fs.readFileSync('/home/lukas/Dev/adventOfCode/Inputs/Day2/star1.txt').toString().split(",").map((value) => parseInt(value))
    intcode[1] = 12
    intcode[2] = 2
    console.log(runIntCode(intcode)[0])
}

const star2 = () => {
    let initialIntcode = fs.readFileSync('/home/lukas/Dev/adventOfCode/Inputs/Day2/star1.txt').toString().split(",").map((value) => parseInt(value))
    for (let i = 0; i <= 99; i++) {
        for (let j = i; j <= 99; j++) {
            let intcode = [...initialIntcode]
            intcode[1] = i
            intcode[2] = j
            intcode = runIntCode(intcode)
            if (intcode[0] === 19690720) {
                console.log(100 * intcode[1] + intcode[2])
                break;
            }
        }
    }
}

const runIntCode = (intcode) => {
    for (let i = 0; i < intcode.length - 1; (i = i + 4)) {
        (intcode[i] === 1 || intcode[i] === 2) ? intcode[(intcode[i + 3])] = addMul(intcode[i], intcode[intcode[i + 1]], intcode[intcode[i + 2]]) : i = i + intcode.length
    }
    return intcode
}

const addMul = (opcode, val1, val2) => {
    return (opcode === 1) ? val1 + val2 : val1 * val2
}

star1()
star2()

