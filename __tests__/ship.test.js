// Require the `Ship` function into the unit test.
// Require the `Itinerary` function into the unit test.
const { Ship } = require('../src/ship');
const { Itinerary } = require('../src/itinerary');
/* globals describe it expect beforeEach jest */
// Tells VS Code and the linter that these variables don't exist in the scope.

describe('Ship', () => {
  describe('with a port and itinerary', () => {
    let ship;
    let port;

    beforeEach(() => {
      port = {
        name: 'Dover',
        removeShip: jest.fn(),
        addShip: jest.fn(),
      };
      const itinerary = {
        ports: [port],
      };
      ship = new Ship(itinerary);
    });

    // Testing Ship constructor returns as an object.
    it('can be instantiated', () => {
      expect(ship).toBeInstanceOf(Object);
    });
    // Testing ship.currentPort from constructor.
    it('has a current port', () => {
      expect(ship.currentPort).toBe(port);
    });
    // Testing Ship gets add (addShip in `port.js`) to port on instantiation.
    it('gets added to port on instantiation', () => {
      expect(port.addShip).toHaveBeenCalledWith(ship);
    });
  });
});

describe('setSail', () => {
  let dover;
  let calais;

  beforeEach(() => {
    dover = {
      name: 'Dover',
      removeShip: jest.fn(),
      addShip: jest.fn(),
    };
    calais = {
      name: 'Calais',
      removeShip: jest.fn(),
      addShip: jest.fn(),
    };
  });

  // override the return value of Math.random().
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  // Testing ship.setSail returns True/False value.
  it('able to set sail from a port', () => {
    const itinerary = new Itinerary([dover]);
    const ship = new Ship(itinerary);

    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
    expect(dover.removeShip).toHaveBeenCalledWith(ship);
  });
  // Testing ship.dock returns correct value.
  it('can dock at a different port', () => {
    const itinerary = new Itinerary([dover, calais]);
    const ship = new Ship(itinerary);

    ship.dock();

    expect(ship.currentPort).toBe(calais);
    expect(calais.addShip).toHaveBeenCalledWith(ship);
  });
  // Testing ship.isStormy returns valid value.
  it('cant set sail in stormy weather', () => {
    const itinerary = new Itinerary([dover]);
    const ship = new Ship(itinerary);

    expect(ship.setSail).toBeTruthy();
  });
  it('dont sail if the weather is stormy', () => {
    const itinerary = new Itinerary([dover]);
    const ship = new Ship(itinerary);

    mockMath.random = () => 0.3;

    expect(ship.setSail).toThrow('cannot sail in stormy weather');
  });
});
