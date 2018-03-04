$(function() {
    $('a[href="' + location.pathname.split('/').pop() + '"]').addClass('active');
    var $h2s = $('article h2');
    if ($h2s.length > 0) {
        var $toc = $('<section>').attr('id', 'toc').html('<h3>Contents</h3>');
        var $tocList = $('<ol>');
        $toc.append($tocList);
        $h2s.each(function() {
            var txt = this.innerHTML;
            var id = txt.replace(/ /g, '_');
            this.id = id;
            $tocList.append($('<li>').html(`<a href="#${id}">${txt}</a>`));
        });
        $('article').before($toc);
    }
});
