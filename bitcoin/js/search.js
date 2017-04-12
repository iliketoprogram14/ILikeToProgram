/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                  search.js                                 *
 *                                                                            *
 ******************************************************************************/


/** @fileoverview This file is responsible for the search and
 * autocomplete features.
 */


// GLOBAL VARIABLES -----------------------------------------------------------

allStocks = []; // all NYSE, NASDAQ, and AMEX stocks
allStockNames = []; // company names of allStocks
nameToIdx = null; // maps company names to indices into allStocks
links = ["http://ichart.finance.yahoo.com/table.csv?s=",
         "&a=06&b=16&c=2010&d=04&e=02&f=2013&g=d&ignore=.csv"]; // for hackery
d3.json("/bitcoin/data/all_stocks.json", gotSymbols);
var symbolToAdd = null; // for adding newly found stocks
var titleToAdd = null;  // for adding newly found stocks


// DATA HANDLER FUNCTION ------------------------------------------------------

/** Called once the page has received the stock symbol list. Adds
 * autocomplete and an event listener for searches.
 *
 * @param rawData The raw [json] data to be parsed.
 */
function gotSymbols(error, rawData) {
    if (error) return console.warn(error);
    allStocks = rawData.data;
    nameToIdx = new Object();
    for (var i = 0; i < allStocks.length; i++) {
        allStockNames.push(allStocks[i].Name);
        nameToIdx[allStocks[i].Name] = i;
    }
    $("#stock_search_box").autocomplete({ source: allStockNames });
    console.log("loaded sybmols");    
    document.forms.search_form.addEventListener("submit", submitStock, true);
}


// NEW STOCKS FUNCTIONS -------------------------------------------------------

/** Called when a user has searched for a stock. Updates the charts if
 * it's a new stock.
 *
 * @param e The submission event; not used.
 */
function submitStock(e) {
    event.preventDefault();
    var name = this.search_box.value;
    var idx = nameToIdx[name];
    var symbol = allStocks[idx].Symbol;
    var safeSymbol = symbol.replace("^", "");
    var url = links[0] + symbol + links[1]
    
    symbolToAdd = symbol;
    titleToAdd = name;

    // Don't add anything if we already have 5 stocks
    if (stocks.length >= 5)
        return;

    // Check if the symbol is already charted
    for (var i = 0; i < stocks.length; i++)
        if (safeSymbol === stocks[i].replace("^", ""))
            return;

    // Check if we have cached data; if we do, update currStocks
    for (var i = 0; i < allData.data.length; i++) {
        if (safeSymbol === allData.data[i].name.replace("^", "")) {
            stocks.splice(0, 0, symbol);
            d3.select("#chart-container").select("svg").remove();
            prepareForCharts();
            return;
        }
    }

    // Otherwise, download it from Yahoo! Finance...
    // UGH: use yql to convert csv result to a jsonp friendly format: 
    // http://stackoverflow.com/questions/12250065/receive-csv-file-as-data-in-ajax-success-function
    var killme = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" +
        encodeURIComponent(url) + "%22&amp;format=json";
    $.ajax({
        type: "GET",
        url: killme,
        dataType: "jsonp",
        success: addStockToCharts
    });
}

/** Called when the page has received data on a recently search stock.
 *
 * @param rawData The raw string to be parsed into CSV and then into JSON.
 */
function addStockToCharts(rawData) {
    // Convert csv to JSON
    var title = titleToAdd;
    var symbol = symbolToAdd;
    titleToAdd = null;
    symbolToAdd = null;

    // Clean up the csv string and convert to an array
    var dataArray = rawData.results[0].replace("<body>","")
        .replace("</body>", "")
        .replace("<p>", "")
        .replace("</p>", "")
        .replace(/^\s+|\s+$/g, '')
        .replace("Date,Open,High,Low,Close,Volume,Adj Close ") // ew
        .split(" ");

    // indices of the fields (ew, I wish I didn't have to hard code this.
    var date = 0;
    var open = 1;
    var high = 2;
    var low = 3;
    var close = 4;
    var volume = 5;

    // Clean up the new data
    var newData = [];
    for (var i = 0; i < dataArray.length; i++) {
        var currArray = dataArray[i].split(",");
        newData.push(new Object());
        newData[i].Close = parseFloat(currArray[close].replace(",",""));
        newData[i].Open = parseFloat(currArray[open].replace(",",""));
        newData[i].High = parseFloat(currArray[high].replace(",",""));
        newData[i].Low = parseFloat(currArray[low].replace(",",""));
        
        // We need to convert volume to the same units as the bitcoin market
        var vol = parseInt(currArray[volume].replace(/,/g, "")) / 100000;
        newData[i].Volume = vol * newData[i].Close;
        
        var currDate = currArray[date].replace("undefined", "");
        newData[i].Date = new Date(Date.parse(currDate));
    }

    // Wrap the object
    var obj = new Object();
    obj.name = symbol;
    obj.title = title;
    obj.data = newData;

    flushCache();
    
    // Add the object to allData (the cache)
    allData.data.splice(0, 0, obj);
    stocks.splice(0,0,symbol.replace("^", ""));
    d3.select("#chart-container").select("svg").remove();
    prepareForCharts();
}
