/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                 barcharts.js                               *
 *                                                                            *
 ******************************************************************************/

/** @fileoverview Responsible for creating and drawing the bar charts.
 *  The static plotting of the bar charts was based on <a
 *  href="http://mbostock.github.io/d3/tutorial/bar-1.html">this
 *  tutorial</a> by Mike Bostock. We updated barcharts to be treated
 *  as objects for easy updating.
 */


// GLOBAL VARIABLES -----------------------------------------------------------

var barcharts = []; // contains all current bar charts.


// HELPERS --------------------------------------------------------------------

/** Returns the formatted label for the given field.
 *
 * @param {String} field Grab the label that corresponds to this field.
 * @returns {String} The label that corresponds to @a field.
 */
function getLabel(field) {
    var l = "";
    switch(field) {
    case "open":   l = "Open Price ($)";  break;
    case "close":  l = "Low Price ($)";   break;
    case "high":   l = "High Price ($)";  break;
    case "low":    l = "Close Price ($)"; break;
    case "volume": l = "Volume (1000 $)"; break;
    }
    return l;
}


// BAR CHART WRAPPERS ---------------------------------------------------------

/** Creates a large bar chart object; wrapper for the BarChart constructor.
 * 
 * @param jsonData A superset of the data to be plotted on the bar chart.
 * @param indices Represents the subset of @a jsonData to be plotted.
 * @param {String} field The particular field that we want to plot.
 * @see BarChart
 */
function createLargeBarChart(jsonData, indices, field) {
    var chart = d3.select("#volume-chart").append("svg")
	.attr("class", "chart")
	.attr("width", 530)
	.attr("height", 220)
	.append("g")
	.attr("transform", "translate(10,15)");
    barcharts.push(new BarChart(jsonData, indices, field, chart, 530, 220));
}

/** Creates a small bar chart object; wrapper for the BarChart contructor.
 * 
 * @param jsonData A superset of the data to be plotted on the bar chart.
 * @param indices Represents the subset of @a jsonData to be plotted.
 * @param {String} field The particular field that we want to plot.
 * @see BarChart
 */
function createSmallBarChart(jsonData, indices, field) {
    var chart = d3.select("#price-charts").append("svg")
	.attr("class", "chart")
	.attr("width", 275)
	.attr("height", 120)
	.append("g")
	.attr("transform", "translate(10,15)");
    barcharts.push(new BarChart(jsonData, indices, field, chart, 275, 115));
}


// BAR CHART OBJECT -----------------------------------------------------------

/** Creates a bar chart object.
 * 
 * @param jsonData A superset of the data to be plotted on the bar chart.
 * @param indices Represents the subset of @a jsonData to be plotted.
 * @param {String} field The particular field that we want to plot.
 * @param container The container to hold the bar chart.
 * @param width The width of the bar chart.
 * @param height The height of the bar chart.
 */
function BarChart(jsonData, indices, field, container, width, height) {
    this.currData = null;
    this.field = field;
    this.container = container;
    this.width = width;
    this.height = height;
    this.max = 0;
    this.indices = indices;


    // Accumulate the "field" data from this particular field
    this.currData = [];
    if (jsonData != null) {	
	for (var i = 0; i < jsonData.length; i++) {
	    var idx = this.indices[i];
	    this.currData.push(getField(jsonData[i].data[idx], this.field));
	}
    }

    // Get max data point
    for (var i = 0; i < jsonData.length; i++) {
	for (var j = 0; j < jsonData[i].data.length; j++) {
	    var tmp = getField(jsonData[i].data[j], this.field);
	    this.max = (this.max <= tmp) ? tmp : this.max;
	}
    }

    // Create x-scale
    var x = d3.scale.linear()
	.domain([0, this.max])
	.range([0, (this.width - 55)]);
    this.xS = x;
    
    // Add axis ticks
    this.container.selectAll("line")
	.data(x.ticks(4))
	.enter().append("line")
	.attr("x1", x)
	.attr("x2", x)
	.attr("y1", 0)
	.attr("y2", height+5)
	.style("stroke", "#CCCCCC");
    
    // Set y-coordinate height
    var numBars = jsonData.length;
    this.numBars = numBars;
    var barHeight = (this.height - 15) / numBars;    
    this.container.selectAll("rect")
	.data(this.currData)
	.enter().append("rect")
        .attr("y", function(d, i) { return i * barHeight; })
        .attr("width", x)
	.attr("height", barHeight)
	.attr("class", function(d,i) { return "bar" + i; });
    
    // Set chart height
    var y = d3.scale.ordinal()
	.domain(this.currData)
	.rangeBands([0, this.height]);
    this.yS = y;
    
    // Scale y-coordinates
    this.container.selectAll("rect")
	.data(this.currData)
	.enter().append("rect")
	.attr("y", y)
        .attr("width", x)
	.attr("height", y.rangeBand());
    
    // Label bars
    this.container.selectAll("text")
	.data(this.currData)
	.enter().append("text")
	.attr("x", x)
	.attr("y", function(d) { return y(d)/1.13 + y.rangeBand() / 2.5; })
	.attr("dx", 3)        // padding-left
	.attr("dy", "0.35em") // vertical-align: middle
	.text(String);
    
    // Add axis labels
    this.container.selectAll(".rule")
	.data(x.ticks(4))
	.enter().append("text")
	.attr("class", "rule")
	.attr("x", x)
	.attr("y", 0)
	.attr("dy", -3)
	.attr("text-anchor", "middle")
	.text(String);
    
    // Add y-axis
    this.container.append("line")
	.attr("y1", 0)
	.attr("y2", this.height+5)
	.style("stroke", "#000");
    
    // Add graph label
    var label = getLabel(field);
    this.container.selectAll("label")
	.data(label)
	.enter().append("text")
	.attr("class", "label")
	.attr("x", width/2.25)
	.attr("y", this.height-15)
	.attr("text-anchor", "middle")
	.text(label);
}

/** Returns the number of bars on the bar chart. */
BarChart.prototype.getNumBars = function() {
    return this.numBars;
}

/** Updates the bars and labels on the bar chart.
 * 
 * @param jsonData A superset of the data to be plotted on the bar chart.
 * @param indices Represents the subset of @a jsonData to be plotted.
 * @see BarChart
 */
BarChart.prototype.updateValues = function(jsonData, indices) {
    this.indices = indices;
    // Accumulate the "field" data from this particular field
    this.currData = [];
    if (jsonData != null) {	
	for (var i = 0; i < jsonData.length; i++) {
	    var idx = this.indices[i];
	    this.currData.push(getField(jsonData[i].data[idx], this.field));
	}
    }

    // Set y-coordinate height
    var numBars = jsonData.length;
    var barHeight = (this.height - 15) / numBars;    
    this.container.selectAll("rect")
	.data(this.currData)
        .attr("y", function(d, i) { return i * barHeight; })
        .transition().duration(400)
        .attr("width", this.xS)
	.attr("height", barHeight)
	.attr("class", function(d,i) { return "bar" + i; });

    // Label bars
    var y = d3.scale.ordinal()
	.domain(this.currData)
	.rangeBands([0, this.height]);
    this.container.selectAll("text")
	.data(this.currData)
        .transition().duration(400)
	.attr("x", this.xS)
	.attr("y", function(d) { return y(d)/1.13 + y.rangeBand() / 2.5; })
	.attr("dx", 3)        // padding-left
	.attr("dy", "0.35em") // vertical-align: middle
	.text(String);
    
}
