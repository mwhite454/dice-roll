const moment = require('moment');
const {send, sendError, json} = require('micro');

function getRandom(max, min=1){
  try{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  catch (error){
    throw error
  }
}

function chunk(arr, n=2) {
  const returnArr = [];
  let i,j,temparray,chunk = n;
  for (i=0,j=arr.length; i<j; i+=chunk) {
      temparray = arr.slice(i,i+chunk);
      returnArr.push(temparray)
  }
  return returnArr
}

function rollDice(arr){
  const result = chunk(arr, 2)
                  .map(x => {
                    const returnObj = {diceSides: x[1] || 6, rolls: x[0], result: 0}
                    for (let i=0; i<x[0]; i++){
                      returnObj.result+= getRandom(x[1] || 6)
                    }
                    return returnObj;
                  })
  return result
}

async function parseGetRollRequest(list){
  const arr = list.substring(1, list.length)
              .split('/')
              .map(x=>parseInt(x, 10))
  const result = rollDice(arr)
  return result
}

module.exports = async(request, response) => {
  let returnJSON = {
    msg: 'Roll Complete',
    theDate: moment(),
    rollResults: null
  }
  try {
    switch (request.method) {
    case 'POST':
      {
        const js = await json(request)
        const rolls = rollDice(js.rolls)
        returnJSON.rollResults = rolls
        return returnJSON;
      }
    case 'GET':
    {
      returnJSON.rollResults = await parseGetRollRequest(request.url)
      return returnJSON;
    }
    default:
      send(response, 405, 'Invalid method');
      break;
    }
  } catch (error) {
    throw error;
  }
}
