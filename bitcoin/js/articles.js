/******************************************************************************
 *                                                                            *
 *                                 Randy Miller                               *
 *                               Chandan G Lodha                              *
 *                                    CS 171                                  *
 *                                 Project III                                *
 *                             Bitcoin Multiples JS                           *
 *                                 articles.js                                *
 *                                                                            *
 ******************************************************************************/


/** @fileoverview This file is responsible for plotting the article
 * data and displaying the articles in the pane.
 */


// GLOBAL VARIABLES -----------------------------------------------------------

articleData = null;   // holds all article data
articleDates = [];    // dates of the articles
var currTickX = null; // the current tick that corresponds to the article panel


// DATA HANDLER FUNCTION ------------------------------------------------------

function gotArticlesData(error, rawData) {
    if (error) return console.warn(error);
    articleData = rawData.data;
    for (var i = 0; i < articleData.length; i++)
        articleDates.push(new Date(Date.parse(articleData[i].date)));
    plotArticleTicks();
}


// ARTICLE TICKS FUNCTIONS ----------------------------------------------------

/** Clears all ticks from the chart. */
function clearTicks() {
    d3.select("body").selectAll(".articleTick").remove();
}

/** Plots all ticks on the chart. */
function plotArticleTicks() {
    var bitcoinChart = charts[charts.length-1];
    var bitcoinData = currStockData[currStockData.length - 1].data;
    
    var yOffset = 0;
    for (var i = 0; i < currStockData.length - 1; i++)
        yOffset += 20 + (parseFloat(charts[i].getHeight()));
    yOffset += (5 - currStockData.length) * 10 - 20; // adjust for # of charts

    var xOffset = 70; // chart margin
    for (var i = 0; i < articleDates.length; i++) {
        var currDate = articleDates[i];
        var x = bitcoinChart.getX(currDate) + xOffset;
        if (x < xOffset || x > (width + xOffset))
            continue;
        var y = bitcoinChart.getHeight() + yOffset;
        d3.select("body").select("svg")
          .append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("height", 6)
          .attr("width", 2)
          .attr("fill", "rgb(240,69,7)")
          .attr("class", "articleTick")
          .attr("opacity", 0)
          .transition().duration(400)
          .attr("opacity", 1);
    }
}


// ARTICLE PANEL FUNCTIONS ----------------------------------------------------

/** Finds the nearest tick to update the article panel. 
 *
 * @param x The mouse's x-coordinate
 */
function updateArticles(x) {
    var svgLeft = svg[0][0].getBoundingClientRect().left;
    var ticks = d3.select("body").select("svg").selectAll(".articleTick")[0];

    var lastX = 0;
    var inRange = false;
    for (var i = 0; i < ticks.length; i++) {
        var tickX = ticks[i].getBoundingClientRect().left - svgLeft - 70;
        if (tickX > x) {
            // figure out which tick you are nearest
            var closerX = Math.abs(x - lastX) <= Math.abs(tickX - x) ? lastX : tickX;
            if (closerX == 0) closerX = tickX;
            if (currTickX != closerX)
                findAndAddArticles(closerX);
            currTickX = closerX;
            break;
        }
        lastX = tickX;
    }
}

/** Clears the article panel. */
function clearArticles() {
    d3.select("body").select("#articles-panel").select("div").remove();
}

/** Finds the date that corresponds to the current tick, and updates
 * the article panel accordingly.
 *
 * @param tickX The x-coordinate of the current tick.
 */
function findAndAddArticles(tickX) {
    clearArticles();
    var table = d3.select("body").select("#articles-panel")
        .append("div")
        .attr("class", "articles-table");
    var articles = null; // articles to be added

    // Find the correct article for the given x-coordinate
    var bitcoinChart = charts[charts.length - 1];
    var finalDate = null;
    for (var i = 0; i < articleDates.length; i++) {
        var currDate = articleDates[i];
        var x = bitcoinChart.getX(currDate);
        if (Math.abs(x - tickX) < 0.01) { // we found our date
            articles = articleData[i].data;
            finalDate = currDate;
            break;
        }
    }
    
    // Add articles date to header
    d3.select("#article-header")
      .text(" Bitcoin Articles [" + (finalDate.getMonth() + 1) + "/" + finalDate.getDate() + "/" + finalDate.getFullYear() + "]");

    // Add article names and links to the panel
    table.selectAll("div").data(articles).enter()
        .append("div")
        .text(function(d, i) { return d.source; })
        .attr("class", "article-source")
        .append("div")
        .attr("class", "article-title")
        .append("a")
        .attr("href", function(d, i) { return articles[i].url; })
        .attr("target", "_blank")
        .attr("title", function(d, i) { return articles[i].url; })
        .text(function(d, i) { return articles[i].title; });
}

