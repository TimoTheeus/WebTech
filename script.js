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
        $(document.getElementsByClassName("customContextMenu")).css('top',e.pageY);
        $(document.getElementsByClassName("customContextMenu")).css('left',e.pageX);
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


