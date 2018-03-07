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
    
    var $menu = $('.customContextMenu');
    function hideMenu() {
        $menu.addClass('hidden');
    }
    //When clicking anywhere on the page that is not the contextmenu, hide the custom contextmenu
    //Right clicking should hide it as well, but in the capturing phase in case it opens up again in bubbling
    ['click', 'contextmenu'].forEach(x => document.addEventListener(x, hideMenu, true));
    var target;
    //Show menu on bottom elements (meaning without children) with text
    $('body :not(:has(*))').on('contextmenu', function(e) {
        if (/\S/.test($(this).text()))
        {
            //Prevent the default context menu
            e.preventDefault();
            //Show the contextmenu at mouse position
            $menu.css({top: e.pageY, left: e.pageX}).removeClass('hidden');
            target = e.target; //save element to be changed
        }
    });
    //When clicking an option change the weight/style/color of the font accordingly
    $menu.children().click(function() {
        var txt = this.innerHTML.toLowerCase();
        var value = txt.startsWith('un') ? 'normal' : txt;
        if (txt.endsWith('bold'))
            target.style.fontWeight = value;
        else if (txt.endsWith('italic'))
            target.style.fontStyle = value;
    });
    $('#changeColor li').click(function() {
        target.style.color = this.innerHTML.toLowerCase();
    });
});
