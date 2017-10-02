require('dotenv').config();
let expect = require('chai').expect;
let geoCoder = require('../src/geoCoder');

describe('Geocoding axios module', function() {

  it('get correct coordinates for address', function * () {
    let address = 'Mason & California Streets (Nob Hill)'
    let result = yield geoCoder.getCoordinates(address);

    expect(result).to.eql({ lat: 37.791549, lng: -122.4107938 });
  })

  it('should handle non-UTF8 character and get correct coordinates', function* () {
    let address = "Buena Vista Café (2765 Hyde Street)";
    let result = yield geoCoder.getCoordinates(address);

    expect(result).to.eql({ lat: 37.8065278, lng: -122.4207822 });
  })
})
