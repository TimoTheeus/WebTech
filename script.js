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
$(document).ready(function(){

    //When clicking anywhere on the page that is not the contextmenu, hide the custom contextmenu
    $(document).click(function(){
            $(document.getElementsByClassName("customContextMenu")).addClass("hidden").removeClass("show");
    });
    //when right clicking on a piece of text in an article
    $("article p, article h1, article h2").on('contextmenu', e => {
        //prevent the default context menu
        e.preventDefault();
        //show the contextmenu
        $(document.getElementsByClassName("customContextMenu")).addClass("show").removeClass("hidden");
        //Change position relative to mouse position
        $(document.getElementsByClassName("customContextMenu")).css('top',e.pageY);
        $(document.getElementsByClassName("customContextMenu")).css('left',e.pageX);
        //When clicking an option change the weight/style/color of the font accordingly
        $("#bold").click(function(){
            $(e.target).css("font-weight","bold");
        });
        $("#unBold").click(function(){
            $(e.target).css("font-weight","normal");
        });
        $("#italic").click(function(){
            $(e.target).css("font-style","italic");
        });
        $("#unItalic").click(function(){
            $(e.target).css("font-style","normal");
        });
        $("#changeBlack").click(function(){
            $(e.target).css("color",'black');
        });
        $("#changeGrey").click(function(){
            $(e.target).css("color",'#696969');
        });
        $("#changeBrown").click(function(){
            $(e.target).css("color",'brown');
        });
    });
});


