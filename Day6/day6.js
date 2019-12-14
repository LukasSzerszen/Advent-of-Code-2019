const fs = require('fs')
const input = fs.readFileSync('../Inputs/Day6/star1.txt').toString().split('\r\n') //TODO: fix for linux

const star1 = () =>{
    const orbitalMap = makeOribtalMap(input)
    let path = ['COM']
    const orbits = {}
    let currentPlanet = orbitalMap['COM'].pop()
    while(path.length !== 0){
        if(orbitalMap[currentPlanet] === undefined){
            orbits[currentPlanet] = [...path]
            currentPlanet = path.pop()    
        }
        else if(orbitalMap[currentPlanet].length !== 0){
            path.push(currentPlanet)
            currentPlanet = orbitalMap[currentPlanet].pop()
        }else if(orbitalMap[currentPlanet].length === 0){
            orbits[currentPlanet] = [...path]
            currentPlanet =  path.pop()
        }
    }
    console.log(countOrbits(orbits))
}

const star2 = () => {
    let graph = makeGraph(input)
    let visited = new Set()
    let queue = new Array()
    let dist = {}
    for(const key of graph.keys()){
        dist[key] = Number.MAX_VALUE
    }
    let currentPlanet = '7Q8' //the planet YOU is orbiting
    let goal = 'W9H' //the planet SAN is orbiting
    visited.add(currentPlanet)
    queue.push(currentPlanet)
    dist[currentPlanet] = 0
    while(queue.length !== 0){
        currentPlanet = queue.shift()
        let planets = graph.get(currentPlanet)
        for(const planet of planets){
            if(!visited.has(planet)){
                visited.add(planet)
                dist[planet] = dist[currentPlanet] + 1
                queue.push(planet)
            }
            if(planet === goal){
                queue = []
                break;
            }
        }
    }
    console.log(dist[goal])
}

const countOrbits = (orbits) =>{
    let amount = 0
    for(const orbit in orbits){
        amount += orbits[orbit].length
    }
    return amount
}

const makeOribtalMap = (input) => {
    const map = {}
    for(const orbit of input){
        let[planet1,planet2] = orbit.split(')')

        if(map[`${planet1}`] === undefined){
            map[`${planet1}`] = [planet2]
        }
        else{
            let arr = [...map[`${planet1}`]]
            arr.push(planet2)
            map[`${planet1}`] = arr
        }
    }
    return map
}

const makeGraph = () => {
    const graph = new Map()
    for(const orbit of input){
        let [planet1, planet2] =  orbit.split(')')
        if(!graph.has(`${planet1}`)){
            graph.set(`${planet1}`, new Array())
        }
        if(!graph.has(`${planet2}`)){
            graph.set(`${planet2}`, new Array())
        }
        graph.get(`${planet1}`).push(`${planet2}`)
        graph.get(`${planet2}`).push(`${planet1}`)
    }
    return graph
}

star1()
star2()
