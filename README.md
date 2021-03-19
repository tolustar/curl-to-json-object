## Curl to Json

**curl-to-json** converts _curl_ commands to _JSON_ objects

### Example

##### Curl

    curl -X POST -H "Content-Type: application/json" \
    -H 'Accept-Encoding: gzip, deflate' \
    -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \
    -d '{"name": "tolustar", "email": "info@tolustar.com", "message": "Hello I am Tolu"}' \
    https://tolustar/contact

##### Json

    {
      header: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8,da;q=0.6'
      },
      method: 'POST',
      url: 'https://tolustar/contact',
      data: {
        name: 'tolustar',
        email: 'info@tolustar.com',
        message: 'Hello I am Tolu'
      }
    }

### Usage

```
npm install curl-to-json-object
```

    const curl_to_json = require('curl-to-json-object')

    const curl_request = 'curl -X POST -H "Content-Type: application/json" \ -H 'Accept-Encoding: gzip, deflate' \ -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \ -d '{"name": "tolustar", "email": "info@tolustar.com", "message": "Hello I am Tolu"}' \ https://tolustar/contact'

    console.log(curl_request)

<hr>

**Author**
https://tolustar.com
