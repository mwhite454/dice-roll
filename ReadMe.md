# dice-roll

A simple API that accepts POST or GET requests to roll n-sided dice x number of times.

[Sample Deployed](https://dice-roll-dehmcdhbop.now.sh/) using [now](https://github.com/zeit/now) and [micro](https://github.com/zeit/micro)

The response is a simple JSON object:
```JSON
{
    "msg": "Roll Complete",
    "theDate": "2017-08-15T19:19:34.363Z",
    "method": "POST",
    "rollResults": [
        {
            "diceSides": 6,
            "rolls": 3,
            "result": 13
        },
        {
            "diceSides": 20,
            "rolls": 3,
            "result": 48
        }
    ]
}
```
---
## POST method
To request a roll of the dice, send a JSON object with one array, keyed as "rolls". You can include as many pairs of values as you wish, the array should be a simple list of numeric values. The first value in each pair is the number of rolls (*n*) to be performed and the second value is the sides of the dice to be rolled.
```
{
"rolls":[3,6,3, 20]
\\-> Three rolls of a six sided die, followed by three rolls of a twenty sided die
}
```
---
## GET method
Any sequence of rolls of n-sided die can be requested with a get request to URL/rollcount/n-sides/rollcount/n-sides...
---
## Error handling
dice-roll will substitute a six sided die in for mismatched requests, the assumption being that six sided dice are most commonly rolled.
*Example:*
```
\\unbalanced request where the last request does not have number of sides specified
{
"rolls":[3,6,3,20,12]
}
\\result
{
    "msg": "Roll Complete",
    "theDate": "2017-08-15T20:05:34.441Z",
    "rollResults": [
        {
            "diceSides": 6,
            "rolls": 3,
            "result": 12
        },
        {
            "diceSides": 20,
            "rolls": 3,
            "result": 26
        },
        {
            "diceSides": 6,
            "rolls": 12,
            "result": 43
        }
    ]
}
```
