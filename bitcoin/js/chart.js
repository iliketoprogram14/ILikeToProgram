/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                   chart.js                                 *
 *                                                                            *
 ******************************************************************************/

/** @fileoverview Responsible for creating and drawing the bar charts.
 *  The static plotting of the bar charts was based on <a
 *  href="http://mbostock.github.io/d3/tutorial/bar-1.html">this
 *  tutorial</a> by Mike Bostock.
 */


// CONSTRUCTOR ----------------------------------------------------------------

/** Creates and draws a chart object. 
 *
 * @param options Options for setting the instance variables of a chart object.
 * @constructor
 */
function Chart(options) {
    this.chartData = options.data;
    this.trendData = options.trenddata;
    this.width = options.width;
    this.height = options.height;
    this.maxDataPoint = options.maxDataPoint;
    this.svg = options.svg;
    this.id = options.id;
    this.name = options.name;
    this.margin = options.margin;
    this.showBottomAxis = options.showBottomAxis;

    // Set up the axis scales
    this.xScale = d3.time.scale() // time based
        .range([0, this.width])
        .domain(d3.extent(this.chartData.map(function(d) { return d.Date; })));
    var xS = this.xScale;
    
    this.yScale = d3.scale.linear() // based on max data value
        .range([this.height,0])
        .domain([0,this.maxDataPoint]);
    var yS = this.yScale;

    this.yTrendScale = d3.scale.linear() // based on max trend value (100)
        .range([this.height,0])
        .domain([0,100]);
    var yS_trend = this.yTrendScale;
    
    // Axis label functions
    this.xAxisTop = d3.svg.axis().scale(this.xScale).orient("bottom");
    this.xAxisBottom = d3.svg.axis().scale(this.xScale).orient("top");
    this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(4);
    this.yTrendAxis = d3.svg.axis().scale(this.yTrendScale).orient("right").ticks(5);

    // Area function for the price data
    this.area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return xS(d.Date); })
        .y0(this.height)
        .y1(function(d) {
            var y_margin = yS(getField(d, currField));	    
            return y_margin == -1 ? this.height : y_margin;
        });

    // Area function for the trend data
    this.trendArea = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return xS(d.date); })
        .y0(this.height)
        .y1(function(d) { return yS_trend(getField(d, "search")); });
    
    // Chart mask
    this.svg.append("defs").append("clipPath")
        .attr("id", "clip-" + this.id)
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height);
    
    // Assign a class for this chart and translate it
    this.chartContainer = svg.append("g")
        .attr('class',this.name.toLowerCase())
        .attr("transform", "translate(" + (this.margin.left + 21) + "," +
	      (this.margin.top + (this.height * this.id) + (10 * this.id)) + ")");  
    
    this.drawChartLines();

    // Only display top axis if top area chart
    if(this.id == 0) {
        this.chartContainer.append("g")
            .attr("class", "x axis top")
            .attr("transform", "translate(0,-20)")
            .call(this.xAxisTop);
    }

    // Only display bottom axis is bottom area chart
    if(this.showBottomAxis) {
        this.chartContainer.append("g")
            .attr("class", "x axis bottom")
            .attr("transform", "translate(0," + (this.height + 25) + ")")
            .call(this.xAxisBottom);
    }    
   
    // Add primary y-axis
    this.chartContainer.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-5,0)")
        .call(this.yAxis);

    // Add investment titles
    this.chartContainer.append("text")
        .attr("class","investment-type")
        .attr("transform", "translate(16,25)")
        .text(this.name);
    
    // Add price tooltips
    this.chartContainer.append("text")
        .attr("class", "tooltip")
        .attr("transform", "translate(16,40)")
        .text("")
        
    // Add date tooltips
    this.chartContainer.append("text")
        .attr("class", "tooltip2")
        .attr("transform", "translate(16,52)")
        .text("")
}


// PUBLIC METHODS -------------------------------------------------------------

/** 
 *
 */
Chart.prototype.getHeight = function() {
    return this.height;
}

/**
 *
 */
Chart.prototype.getX = function(idx) {
    var xS = this.xScale;
    return xS(idx);
}

/**
 *
 */
Chart.prototype.getYPointFromIdx = function(idx) {
    var yS = this.yScale;
    return yS(getField(this.chartData[idx], currField));
}

/** Adjusts the dates that are shown on the x-axis.
 *
 * @param b The date range by which values will be filtered (ie, only shown).
 */
Chart.prototype.showOnly = function(b) {
    this.xScale.domain(b);
    this.chartContainer.select(".chart").data([this.chartData]).attr("d", this.area);
    if (this.trendData != null)
        this.chartContainer.select("#trend0").data([this.trendData]).attr("d", this.trendArea);
    this.chartContainer.select(".x.axis.top").call(this.xAxisTop);
    this.chartContainer.select(".x.axis.bottom").call(this.xAxisBottom);
}

/** Draws a delta line on this chart.
 *
 * @param x1 The left x-coordinate of the delta lines.
 * @param x2 The right x-coordinate of the delta lines.
 * @param y1 The upper y-coordinate of the delta line.
 * @param y2 The lower y-coordinate of the delta line.
 * @param vals1 The value of the first point of the delta line.
 * @param vals2 The value of the second point of the delta line.
 */
Chart.prototype.drawDeltaLine = function(x1, x2, y1, y2, v1, v2) {
    x1 -= 46; // account for scaling issues
    x2 -= 46;
    
    // Get percentage
    var pct = 0;   
    if (x1 < x2)
        pct = (v1 < v2) ? v2 / v1 * 100 - 100 : -1 * (100 - (v2 / v1 * 100));
    else
        pct = (v2 < v1) ? v1 / v2 * 100 - 100 : -1 * (100 - (v1 / v2 * 100));
    pct = pct.toFixed(2);	
    
    // Set color of delta line
    lineColor = "delta_line_neutral";
    if (pct > 0)
        lineColor = "delta_line_positive";
    else if (pct < 0)
        lineColor = "delta_line_negative";
    
    this.chartContainer.append("line")
        .attr("class", lineColor)
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", parseFloat(y1))
        .attr("y2", parseFloat(y2))
        .attr("stroke-width", 3)
        .attr("stroke", "gray");

    // Add a percentage tooltip to the newly drawn delta line
    var y_pos = (x1 < x2) ? y2 - 5 : y1 - 5;
    var x_pos = (x1 < x2) ? x2 : x1;
    this.chartContainer.append("text")
        .attr("class", "pct_tooltip")
        .attr("transform", "translate("+x_pos+","+y_pos+")")
        .text(pct + "%");
}

/** Returns the y-point on the area chart for the given x-point.
 *
 * @param x The x-coordinate for which we want its y-coordinate.
 * @returns The y-coordinate on the area chart that is mapped from @a x.
 */
Chart.prototype.getYPoint = function(x) {
    /* Find the y-coordinate for x by grabbing the chart's "d"
     * atribute (alternates between x-coordinates and their
     * corresponding y-coordinates), and search linearly until we have
     * gone too far (determined by the foundX predicate).
     */

    var xyArray = this.chartContainer.select(".chart").attr("d").split(/[C,]/);
    var isMkt = this.name == "mtgoxUSD";
    var lastX = isMkt ? 0 : width; // NYSE stock data is in reverse order
    var foundX = function(isMkt, x, curr, lastX) {
        return (isMkt) ? x <= curr && x >= lastX : x >= curr && x <= lastX;
    };
    for (var i = 2; i < xyArray.length; i += 2) {
        if (foundX(isMkt, x, xyArray[i], lastX))
            return xyArray[i+1];
        lastX = xyArray[i];
    }
    return 0;
}

/** Draw the price and (maybe) the trend area. */
Chart.prototype.drawChartLines = function() {
    this.chartContainer.select(".chart").remove();

    // Only draw the trend area if the checkbox is checked.
    // The trend line must be drawn before the price data line.
    if ((document.getElementById("trends").checked) && (this.trendData != null)) {
        this.chartContainer.append("path")
            .datum(this.trendData)
            .attr("class", "trend")
            .attr("id", "trend0")
            .attr("clip-path", "url(#clip-" + (this.id) + ")")
            .attr("d", this.trendArea)
            .style("opacity", 0).transition().duration(1000).style("opacity", 1);
        this.chartContainer.append("g")
            .attr("id", "trendAxis")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (this.width + 5) + ",0)")
            .call(this.yTrendAxis)
            .style("opacity", 0).transition().duration(1000).style("opacity", 1);
    }

    // Draw the price area.
    this.chartContainer.append("path")
        .datum(this.chartData)
        .attr("class", "chart")
        .attr("id", "chart" + this.id)
        .on("mousemove", updateValues)
        .on("click", deltaLineManager)
        .attr("clip-path", "url(#clip-" + this.id + ")")
        .attr("d", this.area)
    
    // adjust opacity of charts based on whether trends data is plotted or not
    if (document.getElementById("trends").checked)
        d3.selectAll(".chart").style("opacity", 0).transition().duration(800).delay(200).style("opacity", 0.5);
    else
        d3.selectAll(".chart").style("opacity", 0).transition().duration(800).style("opacity", 1);
}
