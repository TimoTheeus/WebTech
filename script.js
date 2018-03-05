$(function() {
    $('a[href="' + location.pathname.split('/').pop() + '"]').addClass('active');
    var $h2s = $('article h2');
    if ($h2s.length > 0) {
        var $toc = $('<section>').attr('id', 'toc').html('<h3>Contents</h3>');
        var $tocList = $('<ol>');
        $toc.append($tocList);
        $h2s.each(function() {
            this.id = this.innerHTML.replace(/ /g, '_');
            $tocList.append(`<li><a href="#${this.id}">${this.innerHTML}</a></li>`);
        });
        $('article').before($toc);
    }
    if (typeof Dygraph == 'function')
        new Dygraph(document.getElementById('graph'), 'Fennec_vs_Red.csv', {
            colors: ['chocolate', 'red'],
            clickCallback: function(_, x) {
                var curRange = this.xAxisRange();
                var newRange = (curRange[1] - curRange[0]) / ((Math.abs($('#zoom').val()) || 2) * 2);
                this.updateOptions({dateWindow: [x - newRange, x + newRange]});
            }
    });
});
