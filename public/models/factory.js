class Factory{
    constructor(name, numOfChildren, lowerBound, upperBound){
        this.name = name;
        this.numOfChildren = numOfChildren;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.children = this.getRandomArbitraryNumbers(this.numOfChildren, this.lowerBound, this.upperBound);
    }

    getRandomArbitraryNumbers(numOfChildren, lowerBound, upperBound) {
        let result = [];
        while(numOfChildren > 0){
            let num = Math.random() * (upperBound - lowerBound) + lowerBound
            if(!result.includes(num)){
              result.push(num);
              numOfChildren--;
            }
      
        }
        return result;
      }
}