 const star1 = () => {
    let  amountOfPass = 0
    for(let i = 372037; i<=905157; i++){
         let password = `${i}`
         let isDecreasing = true
         let adjacentDigits = 0;
         for(let j = 0 ; j < password.length -1; j++){
             if(password.charAt(j) > password.charAt(j+1)){
                 isDecreasing = false
             }
             if(password.charAt(j) === password.charAt(j+1)){
                 adjacentDigits++
             }
         }
         if(isDecreasing && adjacentDigits >=1 ){
             amountOfPass++
         }
    }
    console.log(amountOfPass)
 }

const star2 = () => {
    let  amountOfPass = 0
    for(let i = 372037; i<=905157; i++){
         let password = `${i}`
         let isDecreasing = true
         let isValid= false
         let adj = {}
         for(let j = 0 ; j < password.length -1; j++){
             if(password.charAt(j) > password.charAt(j+1)){
                 isDecreasing = false
             }
             if(password.charAt(j) === password.charAt(j+1)){
                 if(adj[password.charAt(j)]){
                    adj[password.charAt(j)] +=1
                 }else{
                     adj[password.charAt(j)] =1
                 }
             }
         }
         for(const adjacentDigits in adj){
            if(adj[adjacentDigits] === 1){
                isValid= true
            }
         }
         if(isDecreasing && isValid){
             amountOfPass++
         }
    }
    console.log(amountOfPass)
 }
 star1()
 star2()