const fs = require('fs')
const input = fs.readFileSync('../Inputs/Day8/star1.txt').toString()

const day8 =  () =>{
    const width = 25
    const height = 6
    const layers =  []
    let s = ''
    for(const pixel of input){
        if(s.length !== width * height){
            s = s.concat(`${pixel}`)
        }
        if( s.length === width * height ){
            layers.push(s)
            s = ''
        }
    }
    let minZeroes = Number.MAX_VALUE
    let index = 0
    for(let i = 0; i< layers.length; i++){
        zeroes = countZeroes(layers[i])
        if(zeroes < minZeroes){
            minZeroes = zeroes
            index = i
        }
    }   
    star1(layers[index])
    star2(layers)
}


const star2 = (layers) => {
    let image = layers[0].split("")
    for(let i = 0 ; i< image.length; i++){
        for(let j= 1 ; j < layers.length; j++){
            if(image[i] === '2'){
                image[i] = layers[j][i]
            }
        }
    }
    splitIntoLayers(image)
}

const splitIntoLayers = (image) =>{
    let s = ''
    for(let i = 0; i< 25*6 ; i++){
        if(i % 25 === 0){
            s += '\n'
        }
        if(image[i] === '0'){
            s += ' '
        } 
        if(image[i] === '1'){
            s+= '#'
        }
    }
   console.log(s)
}

const star1 = (layer) => {
    let ones = 0;
    let twos = 0;
    for(const c of layer){
        if(c === `1`){
            ones++
        }
        if(c === `2`){
            twos++
        }
    }
    console.log(twos * ones)
}

const countZeroes = (layer) => {
    let zeroes = 0
    for(const digit of layer){
        if(digit === `0` ){
            zeroes++
        }
    }
    return zeroes
}

day8()