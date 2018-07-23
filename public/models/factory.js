//class definition of Factory on client side
class Factory{
    constructor(_id = null, name, numOfChildren, lowerBound, upperBound){
        this._id = _id;
        this.name = name;
        this.numOfChildren = numOfChildren;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.children = this.getRandomArbitraryNumbers(this.numOfChildren, this.lowerBound, this.upperBound);
    }

    //get random numbers between specified lower and upperbound
    getRandomArbitraryNumbers(numOfChildren, lowerBound, upperBound) {
        let result = [];
        while(numOfChildren > 0){
            let num = (Math.random() * (upperBound - lowerBound) + lowerBound).toFixed(3);
            if(!result.includes(num)){
              result.push(num);
              numOfChildren--;
            }      
        }
        return result;
      }
}