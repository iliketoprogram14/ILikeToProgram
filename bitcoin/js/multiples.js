/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                 multiples.js                               *
 *                                                                            *
 ******************************************************************************/


/** @fileoverview This file is responsible for parsing the raw data,
 * preparing the html for the charts, and creating the chart objects
 * to be drawn on the svg.  The basis for some of this code (most
 * notabley createAreaCharts) is taken from <a
 * href="http://tympanus.net/codrops/2012/08/29/multiple-area-charts-with-d3-js/">this
 * website</a> by Tyler Craft.  Significant changes and additions have
 * been made from the original code.
 */


// GLOBAL VARIABLES -----------------------------------------------------------

var svg = null;
var margin = {top: 20, right: 60, bottom: 175, left: 50},
width = 1000 - margin.left - margin.right,
height = 550 - margin.top - margin.bottom,
contextHeight = 50;
contextWidth = width * .5;

d3.json('/bitcoin/data/all_data.json', gotData);
var currStockData = [];  // cache of stocks on the viz currently
var charts = [];         // all charts on the viz currently
var currField = "close"; // current field displayed on the viz
var stocks = ["^IXIC", "^GSPC", "GOOG", "AAPL", "mtgoxUSD"];
var allData = null;      // cache of raw data
var carets = ["IXIC", "GSPC"]; // symbols that have carets at their front


// HELPER FUNCTIONS -----------------------------------------------------------

/** Returns size of a given data object. */
Object.size = function(obj) { return Object.keys(obj).length; }; 

/** Grabs the given field from the given record and fixes it, if necessary. 
 *
 * @param record The object/record from which to grab the @a field.
 * @param {String} field The field to grab from @a record.
 * @returns The value at key @a field in @a record.
 */
function getField(record, field) {	
    var data = -1;
    var size = Object.size(record); // determine if price plot or trend plot
    
    if (size == 6) { // price area charts
        switch(field) {
            case "date":   data = new Date(Date.parse(record.Date));   break;
            case "close":  data = parseFloat(record.Close.toFixed(2)); break;
            case "open":   data = parseFloat(record.Open.toFixed(2));  break;
            case "high":   data = parseFloat(record.High.toFixed(2));  break;
            case "low":    data = parseFloat(record.Low.toFixed(2));   break;
            case "volume": data = parseInt(record.Volume);             break;
        }
    }
    else if (size == 2) // trends area chart
        data = (!document.getElementById("trends").checked) ? -1 : parseInt(record.search);
    return data;
}


// DATA SETUP -----------------------------------------------------------------

/** Called once the page has gotten the data; sets up the select box.
 *
 * @param rawData The raw [json] data to be parsed.
 */
function gotData(error, rawData) {
    if (error) return console.warn(error);
    allData = rawData; // cache the raw data

    // Create a form to hold the select boxes
    d3.select("body").select(".main").select("#links").append("form")
        .attr("id", "control-form");

    // Clean up the the raw data
    for (var j in allData.data) {
        var stock = allData.data[j];
        
        for (var i in stock.data) {
            stock.data[i].Close = parseFloat(stock.data[i].Close.replace(",",""));
            stock.data[i].Open = parseFloat(stock.data[i].Open.replace(",",""));
            stock.data[i].High = parseFloat(stock.data[i].High.replace(",",""));
            stock.data[i].Low = parseFloat(stock.data[i].Low.replace(",",""));
            
            // We need to convert volume to the same units as the bitcoin market
            if (stock.name != "mtgoxUSD") {
                var vol = parseInt(stock.data[i].Volume.replace(/,/g, "")) / 100000;
                stock.data[i].Volume = vol * stock.data[i].Close;
            }
            else
                stock.data[i].Volume = parseInt(stock.data[i].Volume.replace(/,/g, "")) / 100000;
            
            stock.data[i].Date = new Date(Date.parse(stock.data[i].Date));
        }
    }

    currField = "close";
    prepareForCharts();
}

/** Adds the chart svg, filters out unnecssary raw data, and updates
 * the select box. Also used when switching types of data or
 * adding/removing a stock.
 */
function prepareForCharts() {
    // Add the svg
    svg = d3.select("#chart-container").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", (height + margin.top + margin.bottom));

    // Filter out the data that is not needed
    var stockData = []
    for (var i in allData.data) {
        var name = allData.data[i].name;
        if (stocks.indexOf(name) != -1)
            stockData.push(allData.data[i]);
    }
    
    // Update the select buttons
    var shouldDisable = stocks.length >= 5;
    d3.select("body").select("#control-form").selectAll("button").remove();
    for (var i = 0; i < stockData.length; i++) {
        var name = stockData[i].name;
        if (name != "mtgoxUSD") {
            var checked = (stocks.indexOf(name) != -1);
            var safeName = name.replace("^", "");
            d3.select("body").select("#control-form")
                .append("button")
                .attr("type", "submit")
                .attr("name", safeName + "box")
                .attr("id", safeName + "_checkbox")
                .attr("class", "stockbutton")
                .attr("onclick", "changeStockByButton('"+safeName+"');")
                .html(stockData[i].title + " ")
                .append("img")
                .attr("src", "./img/remove.png");
        }
    }

    d3.select("body").select("#search-button")
        .property("disabled", shouldDisable);

    // Set the current stock data to be displayed, and create the charts
    currStockData = stockData;

    d3.select("body").select("#links").selectAll("span")
	.attr("class", "");   
    d3.select("body").select("#"+currField)
	.attr("class", "selected_link");

    createAreaCharts(stockData);
    createAllBarCharts([0,0,0,0,0]);
    document.getElementById('articles-panel').style.visibility = "visible";

    if (articleData == null)
        d3.json('/bitcoin/data/articles.json', gotArticlesData);
    else
        plotArticleTicks();
}


// CHART CREATION FUNCTIONS ---------------------------------------------------

/** Draws the bar charts. */
function createAllBarCharts(stockData) {
    if (barcharts.length == 0 || currStockData.length != barcharts[0].getNumBars()) {
        barcharts = []
        d3.select("body").select("#price-charts").selectAll("svg").remove();
        d3.select("body").select("#volume-chart").selectAll("svg").remove();
        createSmallBarChart(currStockData, stockData, "open");
        createSmallBarChart(currStockData, stockData, "close");
        createSmallBarChart(currStockData, stockData, "high");
        createSmallBarChart(currStockData, stockData, "low");
        createLargeBarChart(currStockData, stockData, "volume");
    } else {
        for (var i = 0; i < barcharts.length; i++)
            barcharts[i].updateValues(currStockData, stockData);
    }
}

/** Creates and draws the line area charts. */
function createAreaCharts(stockData) {
    var stockCount = stockData.length;
    var chartHeight = height/5;
    var maxDataPoint = [0, 0, 0, 0, 0];
    charts = []; // reset all charts
    resetDeltaLine();

    // Get the  max data point, for scaling
    for (var i in stockData) {
        var stock = stockData[i];
        for (var j in stock.data) {
            var d = getField(stock.data[j], currField);
            if (d > maxDataPoint[i])
                maxDataPoint[i] = d;
        }
    }
    
    // Create the chart objects, and cache in the charts global var
    for(var i = 0; i < stockCount; i++) {
        var title = (stockData[i].title == null) ? stockData[i].name : stockData[i].title;
        charts.push(new Chart({
            data: stockData[i].data,
            trenddata: (i == stockCount -1 ? trendData : null), // trend data is only for bitcoin
            id: i,
            name: title,
            width: width,
            height: height / stockCount,
            maxDataPoint: maxDataPoint[i],
            svg: svg,
            margin: margin,
            showBottomAxis: (i == stockData.length - 1)
        }));
    }
    
    // Create context brush to pan and zoom
    var contextXScale = d3.time.scale()
        .range([0, contextWidth])
        .domain(charts[0].xScale.domain());
    
    var contextAxis = d3.svg.axis()
        .scale(contextXScale)
        .tickSize(contextHeight)
        .tickPadding(-10)
        .orient("bottom");
    
    var contextArea = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return contextXScale(d.date); })
        .y0(contextHeight)
        .y1(0);
    
    var brush = d3.svg.brush()
        .x(contextXScale)
        .on("brush", onBrush);
    
    var context = svg.append("g")
        .attr("class","context")
        .attr("transform", "translate(" + (margin.left + width * .25) + "," +
	      (height + margin.top + chartHeight + 25) + ")");

    context.append("g")
        .attr("class", "x axis top")
        .attr("transform", "translate(0,0)")
        .call(contextAxis);
    
    context.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", 0)
        .attr("height", contextHeight);
    
    context.append("text")
        .attr("class","instructions")
        .attr("transform", "translate(163," + (contextHeight + 25) + ")")
        .text('Select Timeframe');
    
    // plot ticks for articles
    plotArticleTicks();
    
    // Called when the time scale has been mainpulated.
    function onBrush() {
        resetDeltaLine();
        clearTicks();
        removePoints();
        // return a date range to pass into the chart object
        var b = brush.empty() ? contextXScale.domain() : brush.extent();
        for(var i = 0; i < stockCount; i++)
            charts[i].showOnly(b);
        plotArticleTicks();
    }
}

function tempAddStockToCharts(rawData) {
    // convert csv to JSON
    var newData = rawData;
    var title = titleToAdd;
    var symbol = symbolToAdd;
    titleToAdd = null;
    symbolToAdd = null;

    /*d3.select("body").select("header").append("p").text("hello there!!!");
    d3.select("body").select("header").append("p").text(newData.length);
    d3.select("body").select("header").append("p").text("sup!!!");*/
    console.log("hello");
    console.log(newData);

    // Clean up the new data
    for (var i = 0; i < newData.length; i++) {
        newData[i].Close = parseFloat(newData[i].Close.replace(",",""));
        newData[i].Open = parseFloat(newData[i].Open.replace(",",""));
        newData[i].High = parseFloat(newData[i].High.replace(",",""));
        newData[i].Low = parseFloat(newData[i].Low.replace(",",""));
        
        // We need to convert volume to the same units as the bitcoin market
        var vol = parseInt(newData[i].Volume.replace(/,/g, "")) / 100000;
        newData[i].Volume = vol * newData[i].Close;
        
        newData[i].Date = new Date(Date.parse(newData[i].Date));
        delete newData[i]["Adj Close"];
    }

    d3.select("body").select("header").append("p").text("derping hard!!!");
    d3.select("body").select("header").append("p").text(newData);
    
    // Wrap the object
    var obj = new Object();
    obj.name = symbol;
    obj.title = tite;
    obj.data = newData;
    
    // Add the object to allData
    allData.data.push(obj);
    stocks.splice(0,0,symbol);
    prepareForCharts();
}
