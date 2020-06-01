const fetch = require('node-fetch')

const fs = require('fs')

const file = "scripts/symbols.txt"
const file2 = "scripts/types.txt"
fs.writeFileSync(file, '')
const getAllPairs = () => {
  return fetch('https://api.binance.com/api/v3/exchangeInfo')
    .then(res => res.json())
    .then(data => {
      data.symbols.forEach((symbol) => {
        fs.appendFileSync(file, `${symbol.symbol} = '${symbol.symbol}',\n`)
        fs.appendFileSync(file2, `[Pair.${symbol.symbol}]:'${symbol.symbol.toLowerCase()}',\n`)
        // console.log(symbol.symbol);
      });
    });
};

getAllPairs().then(() => {
  console.log('done')
  process.exit();
});
