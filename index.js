
const convertToJson = (curl_request) => {

  const argvs = require('yargs-parser')(curl_request)

  const json = {
    header: {},
    method: 'GET'
  };
  
  const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  const removeQuotes = (str) =>  str.replace(/['"]+/g, '')
  
  const stringIsUrl = (url) => {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  }
  
  const parseField = (string) => {
    return string.split(/: (.+)/)
  }
  
  const parseHeader = (header) => {
    let parsedHeader = {};
    if(Array.isArray(header)){
  
      header.forEach((item, index) => {
        const field = parseField(item)
        parsedHeader[field[0]] = field[1]
      })
  
    }else{
      const field = parseField(header)
      parsedHeader[field[0]] = field[1]
    }
  
    return parsedHeader;
  }
  
  const parseData = (data) => {
    let jsonObj = {}
    json.header['Content-Type'] = 'application/json'

    if(Array.isArray(data)){
      
      if(isJson(data[0])){
        data.forEach((item) => {
          const parsedItem = JSON.parse(item);
          jsonObj = {
            ...jsonObj,
            ...parsedItem
          }
        }) 
  
        return jsonObj;
      }

      if(data[0].includes('=')){
        return parseDataUrlEncode(data);
      }
    }else{
      if(isJson(data)){
        return JSON.parse(data)
      }
      if(data.includes('=')){
        return parseDataUrlEncode(data);
      }
      return data;
    }
  }
  
  const parseDataUrlEncode = (data) => {
    let jsonUrlEncoded = ''
    json.header['Content-Type'] = 'application/x-www-form-urlencoded'

    if(Array.isArray(data)){
        data.forEach((item, index) => {
            if(index === 0){
              jsonUrlEncoded = encodeURI(item);
            }else{
              jsonUrlEncoded = jsonUrlEncoded + '&' + encodeURI(item); 
            }
        }) 
        return jsonUrlEncoded;
    }else{
      return data;
    }
  }

  for(const argv in argvs){
    switch (argv) {
      case '_':
        {
          const _ = argvs[argv];
          _.forEach(item => {
              item = removeQuotes(item)
              
              if(stringIsUrl(item)){
                json.url = item ;
              }
          })
        }
        break;

      case 'X':
      case 'request': 
          json.method = argvs[argv]
        break;

      case 'H':
      case 'header': 
          {
            const parsedHeader = parseHeader(argvs[argv]);
            json.header = {
              ...json.header,
              ...parsedHeader
            }
          }
        break;

      case 'u':
      case 'user': 
          json.header['Authorization'] = argvs[argv]
        break;

      case 'A': 
      case 'user-agent': 
          json.header['user-agent'] = argvs[argv]
        break;

      case 'I': 
      case 'head': 
        json.method = 'HEAD'
        break;

      case 'b': 
      case 'cookie': 
        json.header['Set-Cookie'] = argvs[argv]
        break;

      case 'd': 
      case 'data': 
      case 'data-raw':
      case 'data-ascii': 
        json.data = parseData(argvs[argv])
        break;

      case 'data-urlencode': 
        json.data = parseDataUrlEncode(argvs[argv])
        break;

      case 'compressed': 
        if(!json.header['Accept-Encoding']){
          json.header['Accept-Encoding'] = argvs[argv] || 'deflate, gzip'
        }
        break;
      
      default:
        break;
    }
  }

  return json;

}

module.exports = exports.default = convertToJson;