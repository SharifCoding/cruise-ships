/* eslint-env browser */ /* globals window document */
// IIFE - Wrapping our code inside an Immediately-Invoked Function Expression
(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    this.initialiseSea();
    document.querySelector('#sailbutton').addEventListener('click', () => {
      this.setSail();
    });
  }

  Controller.prototype.initialiseSea = function initialiseSea() {
    const backgrounds = [
      './img/water0.png',
      './img/water1.png',
    ];
    let backgroundIndex = 0;
    setInterval(() => {
      const viewport = document.querySelector('#viewport');
      // HTML - finds <div id="viewport"></div>
      viewport.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`;
      // HTML - <div id="viewport" style="background-image: url(...)"></div>
      // CSS - style: {backgroundImage: 'url(...)'}
      backgroundIndex += 1;
      if (backgroundIndex === backgrounds.length) {
        backgroundIndex = 0;
      }
    // increase counter by one then reset it if it equals the length of the array
    // so we can jump back to the starting background image again
    }, 1000);
  };

  Controller.prototype.renderPorts = function renderPorts(ports) {
    const portsElement = document.querySelector('#ports');
    portsElement.style.width = '0px';
    // set width 0 so JS manipulate the width of this container every time child element added
    ports.forEach((port, index) => {
    // repeat for every port
      const newPortElement = document.createElement('div');
      newPortElement.className = 'port';
      // HTML - <div class="port" data-port-index="0"></div>
      newPortElement.dataset.portIndex = index;
      // differentiating each port added to the ports array
      portsElement.appendChild(newPortElement);
      const portsElementWidth = parseInt(portsElement.style.width, 10);
      portsElement.style.width = `${portsElementWidth + 256}px`;
    });
  };

  Controller.prototype.renderShip = function renderShip() {
    const ship = this.ship;
    // object destructuring - const [ship] = this;

    const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
    const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);

    const shipElement = document.querySelector('#ship');
    shipElement.style.top = `${portElement.offsetTop - 54}px`;
    shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    // offsetTop and offsetLeft give X/Y from parent element top and left co-ordinates
  };

  Controller.prototype.setSail = function setSail() {
    const ship = this.ship;
    // object destructuring - const [ship] = this;

    const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
    const nextPortIndex = currentPortIndex + 1;
    const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
    // this.nextDisplay(`Next Port: ${ship.itinerary.ports[nextPortIndex].name}`);

    if (!nextPortElement) {
      return this.renderMessage('End of the line!') +
      this.nextDisplay('Next Port: End of the line');
    }
    this.renderMessage(`Now departing ${ship.currentPort.name}`);

    const shipElement = document.querySelector('#ship');
    const sailInterval = setInterval(() => {
      const shipLeft = parseInt(shipElement.style.left, 10);
      if (shipLeft === (nextPortElement.offsetLeft - 32)) {
        ship.dock();
        clearInterval(sailInterval);
        return this.renderMessage(`Now docking ${ship.currentPort.name}`)
        + this.currentDisplay(`Current Port: ${ship.currentPort.name}`);
      }
      shipElement.style.left = `${shipLeft + 1}px`;
    }, 10);
    this.nextDisplay(`Next Port: ${ship.itinerary.ports[nextPortIndex].name}`);
  };

  Controller.prototype.renderMessage = function renderMessage(message) {
  // new renderMessage method on the Controller.prototype that accepts a parameter of message
    const messageElement = document.createElement('div');
    messageElement.id = 'message';
    messageElement.innerHTML = message;

    const viewport = document.querySelector('#viewport');
    viewport.appendChild(messageElement);
    // append a new div element to the #viewport container

    setTimeout(() => {
      viewport.removeChild(messageElement);
    }, 2600);
    // setTimeout will remove #message div element (Element.removeChild) after 2+ seconds
  };

  Controller.prototype.currentDisplay = function currentDisplay(currentHUD) {
    // new currentHUD method on the Controller.prototype that accepts a parameter of currentHUD
    const messageElement = document.querySelector('#currentHUD');
    messageElement.innerHTML = currentHUD;
  };

  Controller.prototype.nextDisplay = function nextDisplay(nextHUD) {
    // new nextHUD method on the Controller.prototype that accepts a parameter of nextHUD
    const messageElement = document.querySelector('#nextHUD');
    messageElement.innerHTML = nextHUD;
  };

  // EXPORTS FUNCTION
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Controller };
  } else {
    window.Controller = Controller;
  }
}());
