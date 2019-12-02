const readline = require('readline')
const fs = require('fs')

const readInterface = (output, path) => {
    return readline.createInterface({
        input: fs.createReadStream(path),
        output: output,
        console: false
    })
}

const star1 = () => {
    let sum = 0
    const rl = readInterface(sum, 'Inputs/Day1/star1.txt')
    rl.on('line', (line) => {
        sum += calcFuel(line)

    })
    rl.on('close', () => {
        console.log(`star1 result: ${sum}`)
        rl.close()
    })

}

const star2 = () => {
    let sum = 0
    const rl = readInterface(sum, 'Inputs/Day1/star1.txt')
    rl.on('line', (line) => {
        sum += calculateAllFuel(0, line)
    })

    rl.on('close', () => {
        console.log(`star2 result: ${sum}`)
        rl.close()
    })
}

const calcFuel = (fuel) => {
    return Math.floor(fuel / 3) - 2
}

const calculateAllFuel = (total, fuel) => {
    return (subModuleFuel = calcFuel(fuel)) > 0 ? calculateAllFuel(total + subModuleFuel, subModuleFuel) : total
}

star1()
star2()