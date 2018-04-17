// Require the `Port` function into the unit test.
const { Port } =
require('../src/port');
/* globals describe it expect jest */
// Tells VS Code and the linter that these variables don't exist in the scope.

describe('Port', () => {
  const port = new Port('Dover');
  const ship = jest.fn();
  const planet = new Port('LV-426');
  const Nostromo = jest.fn();
  const Sulaco = jest.fn();
  
  // Testing Port constructor returns as an object.
  it('can be instantiated', () => {
    expect(new Port()).toBeInstanceOf(Object);
  });
  // Testing the name property on the object being created by the Port constructor.
  it('sets the name property', () => {
    expect(port.name).toEqual('Dover');
  });
  // Testing the addShip method on the object Port constructor.
  it('track additional ship in port', () => {
    port.addShip(ship);

    expect(port.ships).toContain(ship);
  });
  // Testing the removeShip method on the object Port constructor.
  it('track removal of ship in port', () => {
    planet.addShip(Nostromo);
    planet.addShip(Sulaco);
    planet.removeShip(Nostromo);

    expect(planet.ships).toEqual([Sulaco]);
  });
});
