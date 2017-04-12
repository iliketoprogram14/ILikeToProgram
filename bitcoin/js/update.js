/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                   update.js                                *
 *                                                                            *
 ******************************************************************************/

/** @fileoverview Responsible for updating the chart after it has
 * aready been drawn once.
 */


// CHART HELPERS --------------------------------------------------------------

/** Remove all lines from the main svg. 
 *
 * @param all Boolean indicating whether or not to remove some or all lines.
 */
function removeLines(all) {
    all = (all === undefined); // optional parameter; default value is true
    if (all)
        d3.select("body").select(".line1").remove();
    d3.select("body").select(".line2").remove();
    d3.select("body").selectAll(".delta_line_neutral").remove();
    d3.select("body").selectAll(".delta_line_positive").remove();
    d3.select("body").selectAll(".delta_line_negative").remove();
    d3.select("body").selectAll(".pct_tooltip").remove();
}


/** Returns the index for the charts given an x-coordinate. 
 *
 * @param x The x-coordinate to be translated to an index.
 * @param lineWidth The total width of the chart (not scaled).
 * @param numPoints The total number of points for the chart.
 * @returns {Number} The index that corresponds to @a x.
 */
function getIndex(x, lineWidth, numPoints) {
    var extentWidth = d3.select("body").select(".extent").attr("width");
    if (extentWidth == 0)
        return Math.round((x-1) / lineWidth * numPoints);

    var extentOffset = d3.select("body").select(".extent").attr("x");
    var timeWidth = d3.select("body").select(".background").attr("width");
    var baseIdx = extentOffset / timeWidth * numPoints;
    var idxRange = extentWidth / timeWidth * numPoints;
    var idx = baseIdx + (x-1) / lineWidth * idxRange;
    return Math.round(idx);
};

// EVENT HANDLERS -------------------------------------------------------------

/** Updates the percentage tool tip and the bar charts. Called on
 * mouse move. Based on http://bl.ocks.org/mbostock/3902569.
 *
 * @param d Not used.
 * @param j Not used.
 */
function updateValues(d, j) {
    if (currStockData == [])
	return;

    // Grab the new data for the tooltip
    var currData = [];
    var currDate = [];
    var indices = []
    var x = d3.mouse(this)[0];
    for (var i = 0; i < currStockData.length; i++) {
        var idx = getIndex(x, width, currStockData[i].data.length);
        // NYSE indices are reversed, so reverse the idx if this is a stock
        if (currStockData[i].name != "mtgoxUSD")
            idx = currStockData[i].data.length - 1 - idx;
        indices.push(idx);
        currData.push(getField(currStockData[i].data[idx], currField));
        currDate.push(getField(currStockData[i].data[idx], "date"));
    }

    // Update the price tooltip
    var format = d3.format("0,000.2f");
    d3.select("body").selectAll(".tooltip")
	.data(currData)
	.text(function(s) { return "$" + format(s) });
    updateDeltaLines(d3.mouse(this)[0]);
    
    // Update the date tooltip
    d3.select("body").selectAll(".tooltip2")
	.data(currDate)
	.text(function(g) { return g.getMonth()+1 + "/" + g.getDate() + "/" + g.getFullYear() });
    
    createAllBarCharts(indices);       // create/update the bar charts
    highlightPoint(d3.mouse(this)[0]); // update the highlight points
    updateArticles(d3.mouse(this)[0]); // update the articles panel
}

/** Switch the type of data displayed (close, high, volume,
 * etc.). Called on a link click.
 *
 * @param field The type of data to display; the field to switch to.
 */
function switchData(field) {
    // Remove and re-add the svg
    d3.select("#chart-container").select("svg").remove();
    svg = d3.select("#chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", (height + margin.top + margin.bottom));
        
    // Update the field and redraw the charts
    currField = field;
    createAreaCharts(currStockData);
    d3.select("body").select("#links").selectAll("span").attr("class", "");
    d3.select("body").select("#"+currField).attr("class", "selected_link");
}

/** Flush out the cache (allData) if it has gotten too large. */
function flushCache() {
    keepers = ["^IXIC", "^GSPC", "mtgoxUSD"];
    if (allData.data.length >= 12) {
        var indicesToDelete = [];
        for (var i = 0; i < allData.data.length; i++) {
            var symbol = allData.data[i].name;
            if (stocks.indexOf(symbol) === -1 && keepers.indexOf(symbol) === -1)
                indicesToDelete.push(i);

        }
        for (var i = 0; i < indicesToDelete.length; i++)
            allData.data.splice(indicesToDelete[i]-i, 1);
    }
}

/** Remove a stock from the charts. Called on clicking one of
 * the stock buttons.
 *
 * @param name The name of the stock to remove.
 */
function changeStockByButton(name) {    
    event.preventDefault();
    // Update stocks
    var newStocks = []
    for (var i = 0; i < stocks.length; i++)
        if (stocks[i].replace("^", "") != name)
            newStocks.push(stocks[i]);
    stocks = newStocks;

    flushCache();

    // Remove the svg, and grab the new data/redraw the charts
    d3.select("#chart-container").select("svg").remove();
    prepareForCharts();
}

/** Plots a highlighter point on the area charts at the current mouse position.
 *
 * @param orig_x The x-position of the cursor on the area charts
 */
function highlightPoint(orig_x) {
    var x = orig_x + 71; // fix x-position
    var yS = []
    for (var i = 0; i < currStockData.length; i++) {
        var yPoint = parseFloat(charts[i].getYPoint(orig_x));
        var y = 20 + i*(parseFloat(charts[i].getHeight(orig_x))+10) + yPoint;
        yS.push(y);
    }

    // Update the circles
    d3.select("body").select("svg").selectAll("circle")
        .data(yS)
        .enter()
        .append("circle");
    d3.select("body").select("svg").selectAll("circle")
        .data(yS)
        .attr("cx", x)
        .attr("cy", function(d) { return d; })
        .attr("r", 3)
        .attr("fill", "gray")
        .attr("class", "circle");

}

/** Remove all highlighter points on the area charts. */
function removePoints() {
    d3.selectAll("circle").remove();
}
