const fs = require('fs')
const io = require('console-read-write');

const instructions = {
    '1': (x,y) => {return x + y},
    '2': (x,y) => {return x * y},
    '7': (x,y) => {
        if(x < y){
            return 1
        }else{
            return 0
        }
    },
    '8': (x,y) => {
        if(x === y){
            return 1
        }else{
            return 0
        }
    }
}

const jumpIf = {
    '5': (x, y, pointer) => {
        if(x > 0){
            return y
        }else{
            return pointer + 3
        }
    },
    '6': (x, y, pointer) => {
        if(x === 0){
            return y
        }else{
            return pointer + 3
        }   
    }
}


const day5 = async () => {
    const IntCode = fs.readFileSync("../Inputs/Day5/star1.txt").toString().split(",").map((value) => parseInt(value))
    let pointer = 0
    while(pointer < IntCode.length){
        let opcode = `${IntCode[pointer]}`
        let paddedOpcode = padOpcode(opcode)
        if(paddedOpcode.charAt(4) === '1' || paddedOpcode.charAt(4) === '2' || paddedOpcode.charAt(4) === '7' || paddedOpcode.charAt(4) === '8'){
            let instr = instructions[paddedOpcode.charAt(4)]
            let [a,b] = [paddedOpcode.charAt(2), paddedOpcode.charAt(1)] // parameter modes for: a= param 1, b = param 2
            let x1 = (a === '0') ? IntCode[IntCode[pointer + 1]] : IntCode[pointer + 1]
            let x2 = (b === '0') ? IntCode[IntCode[pointer + 2]] : IntCode[pointer + 2]
            IntCode[IntCode[pointer+3]] = instr(x1,x2)
            pointer += 4
        }else if(paddedOpcode.charAt(4) === '3'){
            io.write('Enter input: ')
            let value = parseInt(await io.read());
            IntCode[IntCode[pointer + 1]] = value
            pointer += 2
        }        
        else if(paddedOpcode.charAt(4) === '4'){
           let mode = paddedOpcode.charAt(2)
           if(mode === '0'){
               console.log(IntCode[IntCode[pointer + 1]])
            }
           else{
               console.log(IntCode[pointer + 1])
           }
           pointer += 2
        }else if(paddedOpcode.charAt(4) === '5' || paddedOpcode.charAt(4) === '6'){
            let jump = jumpIf[paddedOpcode.charAt(4)]
            let [a,b] = [paddedOpcode.charAt(2), paddedOpcode.charAt(1)] 
            let x = (a === '0') ? IntCode[IntCode[pointer + 1]] : IntCode[pointer + 1]
            let y = (b === '0') ? IntCode[IntCode[pointer + 2]] : IntCode[pointer + 2]
            pointer = jump(x,y,pointer)
        }
        else if(paddedOpcode.charAt(4) === '9'){
            pointer = IntCode.length
        }
    }
}

const padOpcode = (opcode) => {
    let length = opcode.length
    while(length < 5){
        opcode = '0' + opcode
        length++;
    }
    return opcode
}

day5()