var height = 1000;
var width = 3000;
var margin = { left: 50, right: 50, top: 100, bottom: 0 };

var tree = d3.tree().size([width - 400, height - 400]);

var svg = d3.select("body").append("svg")
    .attr("height", height)
    .attr("width", width);



d3.json('/data/data.json').get(function (error, data) {


    var chartGroup = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



    var root = d3.hierarchy(data, function (d) {

        return d.Entities || d.Assets;

    });
    //-------Paths come first if you want them to go behind the circle
    tree(root);
    chartGroup.selectAll("path")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("stroke", "grey")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + d.parent.x + "," + d.parent.y + "L" + d.x + "," + d.y;
        });

    var circleShell = chartGroup.append('g');

    circleShell.selectAll('g')
        //should be an array of nodes
        .data(root.descendants())
        .enter().append("g");

    circleShell.selectAll('g')
        .append('circle')
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", "70")
        .attr("stroke", "black")
        .attr("fill", "pink")


    var labels = chartGroup.selectAll('g')
        .append('text')
        .attr("text-anchor", "middle")
        .attr("dx", function(d, i){return (d && d.x)})
        .attr("dy", function(d){return (d && d.y)})
        .attr("font-size", 10)
        .text(function (d) { console.log(d); return d && d.data && d.data.Name; })

  























});