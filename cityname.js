const fs =  require('fs');

const randArr = arr => arr[Math.floor(Math.random() * arr.length)];

const words = fs.readFileSync('./cities.txt', {encoding: 'UTF-8'}).trim().split('\n');

const firsts = [];
const middles = [];
const ends = [];

for (let word of words) {
  let sylls = word.trim().split('-');
  ends.push(sylls.pop());
  firsts.push(sylls.shift());
  sylls.forEach(x => middles.push(x));
}

const makeCity = () => {
  return `${randArr(firsts)}${randArr(middles)}${randArr(ends)}`
}

module.exports = makeCity;
