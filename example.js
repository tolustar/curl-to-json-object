const example = require('./index')

const a = `curl -X POST -d 'name=tolustar' -d 'email=info@tolustar.com' https://tolustar.com/contact`

const b = `curl -X POST -H "Content-Type: application/json" \
-H 'Accept-Encoding: gzip, deflate' \
-H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \
-d '{"name": "tolustar", "email": "info@tolustar.com", "message": "Hello I am Tolu"}' \
https://tolustar/contact`

console.log('a ==> ', example(a))
console.log('b ==> ', example(b))