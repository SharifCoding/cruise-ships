/* globals window */
// tell ESLint there might be a global window variable so don't show undefined errors
// IIFE - Wrapping our code inside an Immediately-Invoked Function Expression
(function exportShip() {
// MAGIC NUMBERS
  const STORM_LEVEL = 0.4;

  // CONSTRUCTOR FUNCTION
  function Ship(itinerary) {
    this.itinerary = itinerary;
    [this.currentPort] = itinerary.ports;
    this.currentPort.addShip(this);
  }

  // OBJECTS PROTOTYPE
  Ship.prototype.setSail = function setSail() {
    if (Math.random() < STORM_LEVEL) {
      throw new Error('cannot sail in stormy weather');
    }
    this.currentPort.removeShip(this);
    this.currentPort = NaN;
  };

  Ship.prototype.dock = function dock() {
    const { itinerary } = this;
    const previousPortIndex = itinerary.ports.indexOf(this.currentPort);

    this.currentPort = itinerary.ports[previousPortIndex + 1];
    this.currentPort.addShip(this);
  };

  // EXPORTS FUNCTION
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Ship };
  } else {
    window.Ship = Ship;
  }
}());
