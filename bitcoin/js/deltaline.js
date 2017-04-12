/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                 deltaline.js                               *
 *                                                                            *
 ******************************************************************************/

/** @fileoverview Responsible for creating and drawing the delta lines
 * on the area charts. Implemented as a state machine.
 */

/* STATE MACHINE
 *
 * 0 - Clear all lines.
 * 1 - Draw 1 vertical line.
 * 2 - Draw 1 additional verticle line and all delta lines.
 */


// GLOBAL VARIABLES -----------------------------------------------------------

var firstX = 0;      // the first x-coordinate of the delta lines
var firstYs = []     // the first set of y-coordinates of the delta lines
var firstVals = [];  // the first set of values of the delta lines
var secondX = 0;     // the second x-coordinate of the delta lines
var secondYs = [];   // The second set of y-coordinates of the delta lines
var secondVals = []; // The second set of values of the delta lines
var state = 0;       // The current state of the delta line state machine
var inCrtSection = false;


// HELPERS ----------------------------------------------------------------

/** Draws a vertical line on the svg.
 *
 * @param x The x-coordinate at which to draw the vertical line.
 * @param lineClass The class for the verticle line.
 */
function drawVertLine(x, lineClass, wtf) {
    wtf = (wtf === undefined);
    x += (wtf) ? 25 : 0; // hack to adjust for scale
    y = currStockData.length * (charts[0].getHeight(x) + 10) + 10; // get y height of a chart
    d3.select("body").select("svg").append("line")
	  .attr("class", lineClass)
	  .attr("x1", x)
	  .attr("x2", x)
	  .attr("y1", 0)
	  .attr("y2", y)
      .on("click", deltaLineManager)
	  .attr("stroke-width", 0.5)
	  .attr("stroke", "gray");
}

/** Draws all of the delta lines on the svg.
 *
 * @param x1 The left x-coordinate of the delta lines.
 * @param x2 The right x-coordinate of the delta lines.
 * @param y1 The upper y-coordinates of each delta line.
 * @param y2 The lower y-coordinates of each delta line.
 * @param vals1 The values of the first points of each delta line.
 * @param vals2 The values of the second points of each delta line.
 */
function drawDeltaLines(x1, x2, ys1, ys2, vals1, vals2) {
    for (var i = 0; i < currStockData.length; i++)
        charts[i].drawDeltaLine(x1, x2, ys1[i], ys2[i], vals1[i], vals2[i]);
}


// EVENT HANDLERS ---------------------------------------------------------

/** Draws the vertical lines and the sloped "delta line" on clicks,
 * depending on the state.
 *
 * @param d Not used.
 * @param j Not used.
 */
function deltaLineManager(d, j) {
    if (currStockData == [])
        return;
    
    // Update the state (0 = no lines, 1 = 1 line, 2 = 2 lines + delta line
    state = (state + 1) % 3;

    switch(state) {
        // Erase all lines and reset the state of the lines on the chart
    case 0:
        removeLines();
        firstYs = [];
        firstVals = [];
        secondYs = [];
        secondVals = [];
        break;
	
        // Draw 1 vertical line
    case 1:
        var origX = d3.mouse(this)[0];
        var x = origX + 46;
        drawVertLine(x, "line1");
	
        // Cache the x and y-coordinates and values for drawing the delta line
        firstX = x;
        for (var i = 0; i < currStockData.length; i++) {
            firstYs.push(charts[i].getYPoint(origX));
            var idx = getIndex(origX, width, currStockData[i].data.length);
            // NYSE indices are reversed, so reverse the idx this is a stock
            if (currStockData[i].name != "mtgoxUSD")
                idx = currStockData[i].data.length - 1 - idx;
            firstVals.push(getField(currStockData[i].data[idx], currField));
        }
        break;

    // Draw the 2nd vertical line and delta line
    case 2:
        var origX = d3.mouse(this)[0];
        var x = origX;
        var scaledX = origX;

        removeLines(false);
        secondYs = [];
        secondVals = [];
        drawVertLine(origX + 71, "line2", false);
	
        // Get the 2nd set of y-coordinates and  values for the charts
        secondX = x + 46;
        for (var i = 0; i < currStockData.length; i++) {
            secondYs.push(charts[i].getYPoint(scaledX));
            var idx = getIndex(scaledX, width, currStockData[i].data.length);
            if (currStockData[i].name != "mtgoxUSD")
                idx = currStockData[i].data.length - 1 - idx;
            secondVals.push(getField(currStockData[i].data[idx], currField));
        }

        // Draw the delta lines on each chart
        drawDeltaLines(firstX, secondX, firstYs, secondYs, firstVals, secondVals);
        break;
    }
}

/** Update the delta line given the new position of the mouse. Called
 * on mousemove.
 *
 * @param origX The x-coordinate of the mouse's position.
 */
function updateDeltaLines(origX) {
    if (state != 1)
        return;

    removeLines(false);
    secondYs = [];
    secondVals = [];

    var x = origX + 46;
    drawVertLine(x, "line2");
    
    // Get the 2nd set of y-coordinates and  values for the charts
    secondX = x;
    for (var i = 0; i < currStockData.length; i++) {
        secondYs.push(charts[i].getYPoint(origX));
        var idx = getIndex(origX, width, currStockData[i].data.length);
        if (currStockData[i].name != "mtgoxUSD")
            idx = currStockData[i].data.length - 1 - idx;
        secondVals.push(getField(currStockData[i].data[idx], currField));
    }

    // Draw the delta lines on each chart
    drawDeltaLines(firstX, secondX, firstYs, secondYs, firstVals, secondVals);
}

/** Reset the delta line. */
function resetDeltaLine() {
    state = 0;
    firstYs = [];
    firstVals = [];
    secondYs = [];
    secondVals = [];
    removeLines();
}
