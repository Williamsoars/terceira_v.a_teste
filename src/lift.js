class Lift {
  constructor(highestFloor, maxRiders = 10) {
    this.topFloor = highestFloor;
    this.currentFloor = 0;
    this.capacity = maxRiders;
    this.numRiders = 0;
  }

  addRiders(numEntering) {
    if (this.numRiders + numEntering <= this.capacity) {
      this.numRiders += numEntering;
    } else {
      this.numRiders = this.capacity;
    }
  }

  goUp() {
    if (this.currentFloor < this.topFloor) this.currentFloor++;
  }

  goDown() {
    if (this.currentFloor > 0) this.currentFloor--;
  }

  call(floor) {
    if (floor >= 0 && floor <= this.topFloor) {
      while (floor !== this.currentFloor) {
        if (floor > this.currentFloor) this.goUp();
        else this.goDown();
      }
    }
  }
}

window.lift = new Lift(5, 3); // Instância global para testes
