/* globals window */
// tell ESLint there might be a global window variable so don't show undefined errors
// IIFE - Wrapping our code inside an Immediately-Invoked Function Expression
(function exportPort() {
// CONSTRUCTOR FUNCTION
  function Port(name) {
    this.name = name;
    this.ships = [];
  }

  // OBJECTS PROTOTYPE
  Port.prototype.addShip = function addShip(ship) {
    this.ships.splice(1, 0, ship);
  };

  Port.prototype.removeShip = function removeShip(ship) {
    this.ships.splice(this.ships.indexOf(ship), 1);
  };

  // EXPORTS FUNCTION
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Port };
  } else {
    window.Port = Port;
  }
}());
