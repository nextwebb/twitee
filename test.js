
class Chameleon {
     colorChange(newColor) {
        this.newColor = newColor
        return this.newColor
    }
    // es6 default parameters 
    constructor(newColor = "green"){
        this.newColor =  newColor
    }
}

const freddie = new Chameleon('purple');
// console.log(freddie.colorChange('orange'))
console.log(freddie.colorChange('orange'))