$(function() {
    //File had to be written in JavaScript because Chrome refuses to load it if it isn't from a server.
    new Dygraph(document.getElementById('graph'), `Week,Fennec Fox,Red Fox
2017-03-05,25,83
2017-03-12,29,80
2017-03-19,26,87
2017-03-26,34,85
2017-04-02,48,94
2017-04-09,28,89
2017-04-16,24,83
2017-04-23,23,86
2017-04-30,27,97
2017-05-07,29,83
2017-05-14,30,94
2017-05-21,24,88
2017-05-28,21,86
2017-06-04,22,76
2017-06-11,22,80
2017-06-18,20,79
2017-06-25,18,82
2017-07-02,19,78
2017-07-09,17,75
2017-07-16,17,77
2017-07-23,19,80
2017-07-30,19,81
2017-08-06,19,79
2017-08-13,19,76
2017-08-20,17,79
2017-08-27,20,84
2017-09-03,19,80
2017-09-10,22,78
2017-09-17,20,80
2017-09-24,20,93
2017-10-01,19,92
2017-10-08,22,100
2017-10-15,21,80
2017-10-22,22,82
2017-10-29,18,85
2017-11-05,23,82
2017-11-12,43,81
2017-11-19,24,78
2017-11-26,24,87
2017-12-03,22,79
2017-12-10,22,84
2017-12-17,23,83
2017-12-24,18,82
2017-12-31,23,84
2018-01-07,28,79
2018-01-14,36,81
2018-01-21,32,79
2018-01-28,33,83
2018-02-04,25,79
2018-02-11,19,79
2018-02-18,23,81
2018-02-25,23,83
`, {
        colors: ['chocolate', 'red'], //colors that look like fennec and red foxes and are visible on a white background
        clickCallback: function(_, x) {
            //Zoom when clicked, read from #zoom how much if value is a number that's not 0, otherwise use 2
            var curRange = this.xAxisRange();
            var newRange = (curRange[1] - curRange[0]) / (Math.abs($('#zoom').val()) * 2 || 4);
            this.updateOptions({dateWindow: [x - newRange, x + newRange]});
        }
    });
});
