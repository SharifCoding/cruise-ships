// Require the `Itinerary` function into the unit test.
const { Itinerary } = require('../src/itinerary');
/* globals describe it expect jest */
// Tells VS Code and the linter that these variables don't exist in the scope.

describe('Itinerary', () => {
  const ports = [jest.fn(), jest.fn()];
  const itinerary = new Itinerary(ports);

  // Testing Itinerary constructor returns as an object.
  it('can be instantiated', () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });
  // Testing the ports property on the object being created by the Port constructor.
  it('sets the ports property', () => {
    expect(itinerary.ports).toEqual(ports);
  });
});
