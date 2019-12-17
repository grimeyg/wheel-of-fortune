
class Wheel {
  constructor() {
        this.sections = ["BANKRUPT", "LOSE YOUR TURN", 100, 200, 300, 400, 500, 600, 700, 800];
  }
  chooseValue(){
    let spin = Math.floor(Math.random() * Math.floor(10));
    console.log(this.sections[spin]);
  }
}



  export default Wheel;
