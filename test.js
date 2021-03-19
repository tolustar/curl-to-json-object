const curl_to_json = require('./index')
const assert = require('assert').strict;

describe('Curl to json', function() {
  it('should equal sample encoded string', function() {
    const sampleEncodedString = 'name=tolustar&email=info@tolustar.com';

    const curl = `curl -X POST -d 'name=tolustar' -d 'email=info@tolustar.com' https://tolustar.com/contact`

    assert.equal(curl_to_json(curl).data, sampleEncodedString);
  });

  it('should return sample object', function() {
    const sampleObject = {
      header: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8,da;q=0.6'
      },
      method: 'POST',
      url: 'https://tolustar/contact',
      data: { name: 'tolustar', email: 'info@tolustar.com' }
    }
    
    const curl = `curl -X POST -H "Content-Type: application/json" \
    -H 'Accept-Encoding: gzip, deflate' \
    -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \
    -d '{"name": "tolustar", "email": "info@tolustar.com"}' \
    https://tolustar/contact`

    assert.deepEqual(curl_to_json(curl), sampleObject)

  });

});