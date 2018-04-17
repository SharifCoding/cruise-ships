/* globals window */
// tell ESLint there might be a global window variable so don't show undefined errors
// IIFE - Wrapping our code inside an Immediately-Invoked Function Expression
(function exportItinerary() {
// CONSTRUCTOR FUNCTION
  function Itinerary(ports) {
    this.ports = ports;
  }

  // EXPORTS FUNCTION
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Itinerary };
  } else {
    window.Itinerary = Itinerary;
  }
}());
