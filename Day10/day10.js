const fs = require('fs')
const input = fs.readFileSync('../Inputs/Day10/star1.txt').toString().split('\r\n')

const star1 = () => {
    let matrix = new Set()
    let seenAsteroids = {}
    let m = -1
    for(const line of input){
        m++
        for(let i = 0 ; i < line.length ; i++){
            if(line.charAt(i) === '#'){
                matrix.add(`${[i,m]}`)
                seenAsteroids[`${[i,m]}`] = 0

            }
        }  
    }
    for(const point1 of matrix.values()){
        let asteroid1 = point1.split(',').map((s) => parseInt(s))
        let seenAngles = new Set()
        for(const point2 of matrix.values()){
            if(point1 !== point2){
                let asteroid2 = point2.split(',').map((s) => parseInt(s))
                let angle = calcAng(asteroid1,asteroid2)
                if(!seenAngles.has(angle)){
                    seenAngles.add(angle)
                    seenAsteroids[`${[...asteroid1]}`] +=1
                }
            }
        }
    }
    let max = -1
    let maxPoint = ''
    for(const point in seenAsteroids){
        if(max < seenAsteroids[point]){
            max = seenAsteroids[point]
            maxPoint = point
        }
    }
    console.log(maxPoint)
    console.log(max)
}

const calcAng = ([x1,y1],[x2,y2]) => {
    return Math.atan2(y2-y1,x2-x1) * 180/Math.PI +180
}



const degreeClosesTo = (vals, goal) => {
    values = [...vals]
    let closes = values.reduce((prev,curr) => {
        return  (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    })
    console.log(closes)
    return closes
}


const star2 = ()=> {
    let [x,y]= [31,20]
    let matrix = new Set()
    let angles = {}
    let m = -1
    for(const line of input){
        m++
        for(let i = 0 ; i < line.length ; i++){
            if(line.charAt(i) === '#' && `${[i,m]}` !== '31,20'){ 
                matrix.add(`${[i,m]}`)
            }
        }  
    }
    for(const point of matrix.values()){
        let [x1,y1] = point.split(',').map((s) => parseInt(s))
        let angle = calcAng([x,y], [x1,y1])
        if(angles[angle] === undefined){
            angles[angle] = [point]
        }else{
            angles[angle].push(point)
        }
    }

    let sortedAngles = Object.keys(angles).map((s) => parseFloat(s)).sort((a,b) => {return a-b})
    let vaporized = 0
    let startAngle =  degreeClosesTo(sortedAngles,90)
    let start = sortedAngles.indexOf(startAngle)
    while(vaporized !== 200){
        for(let i = start; i< sortedAngles.length; i++){
            let pointToBeVaporized = ''
            let angle = sortedAngles[i]
            if(angles[angle].length === 1){
                pointToBeVaporized =  angles[angle].pop()
                vaporized++
            }else{
                let points = angles[angle]
                let pointToBeVaporized = angles[angle].shift()
                angles[angle].splice(points.indexOf(pointToBeVaporized),1)
                vaporized++
            }
            if(vaporized === 200){
                console.log(pointToBeVaporized)
                break;
            }
        }
        start = 0
    }
}

star1()
star2()