/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                 trendData.js                               *
 *                                                                            *
 ******************************************************************************/

/** @fileoverview Responsible for loading the trend data and toggling
 * its plot. 
 */


// GLOBAL VARIABLES/LOGIC -----------------------------------------------------

var trendData = [];
d3.csv('/bitcoin/data/bitcoin.csv', 
       function(error, data) {
           if (error) return console.warn(error);
           data.forEach(function(d) {
               var temp = Object();
               temp.date = new Date(Date.parse(d.Date));
               temp.search = +d.Searches;
               trendData.push(temp);
           });
       });


// HELPERS --------------------------------------------------------------------

/** Toggles the trend data on/off depending on the value of a checkbox. */
function toggleTrendData() {

    // Depending on the value of the trend data checkbox, change
    // colors and add/remove the trend line.
    if (document.getElementById("trends").checked) {
        // Transition "Bitcoin Search Trends" font
        d3.select("#trendtext")
            .transition().duration(800)
            .style("color", "rgb(240,69,7)")
            .style("font-weight", "bold");

        // Redraw bitcoin chart lines, this time including the trend line
        charts[currStockData.length - 1].drawChartLines();
        
        // Transition chart colors
        d3.selectAll(".chart").style("opacity", 1)
            .transition().duration(800)
            .style("opacity", 0.5);
    }
    else { 
        // Transition "Bitcoin Search Trends" font
        d3.select("#trendtext")
            .transition().duration(800)
            .style("color", "#444")
            .style("font-weight", "normal");

        // Transition chart colors
        d3.selectAll(".chart")
            .style("opacity", 0.5)
            .transition().duration(800)
            .style("opacity", 1);
        
        // Remove trend data plot and axis
        d3.select("#trend0")
            .style("opacity", 1)
            .transition().duration(800)
            .style("opacity", 0)
            .remove();
        d3.select("#trendAxis")
            .style("opacity", 1)
            .transition().duration(800)
            .style("opacity", 0)
            .remove();
    }
}
