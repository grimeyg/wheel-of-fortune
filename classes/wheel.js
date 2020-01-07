
class Wheel {
  constructor() {
        this.sections = [
          {value: 35,
           iterationPosition: 3.005},
          {value: 5,
           iterationPosition: 3.057}, //good
          {value: 25,
           iterationPosition: 3.089}, //good
          {value: "BANKRUPT",
           iterationPosition: 3.11},
          {value: 40,
           iterationPosition: 3.14},
          {value: 150,
           iterationPosition: 3.1665},
          {value: 30,
           iterationPosition: 3.2}, //good
          {value: 25,
           iterationPosition: 3.25},
          {value: 20,
           iterationPosition: 3.3}, //good
          {value: "BANKRUPT",
           iterationPosition: 3.5},
          {value: 15,
           iterationPosition: 3.56}, //good
          {value: 50,
           iterationPosition: 3.59},
          {value: 45,
           iterationPosition: 3.62},
          {value: 20,
           iterationPosition: 3.64},
          //lose turn case on 34 swapped out 
          {value: "LOSE TURN",
           iterationPosition: 3.666}, //good
          {value: 15,
           iterationPosition: 3.7}, //good
          {value: 30,
           iterationPosition: 3.75},
          {value: 10,
           iterationPosition: 3.82}
        ];
  }
  chooseValue(){
    return  Math.floor(Math.random() * Math.floor(18));
  }
  getPosition(index){
    return this.sections[index].iterationPosition
  }
}



  export default Wheel;
