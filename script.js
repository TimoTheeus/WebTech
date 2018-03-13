$(function() {
    //Add active class to link to current page
    $('a[href="' + location.pathname.split('/').pop() + '"]').addClass('active');
    //Create a table of contents if there are sub-headers, except on the KB page.
    var $h2s = $('article:not(.knowledgebase) h2');
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
    //Custom context menu
    var $menu = $('.customContextMenu');
    function hideMenu() {
        $menu.addClass('hidden');
    }
    //When clicking anywhere on the page that is not the contextmenu, hide the custom contextmenu
    //Right clicking should hide it as well, but in the capturing phase in case it opens up again in bubbling
    ['click', 'contextmenu'].forEach(x => document.addEventListener(x, hideMenu, true));
    var target, range;
    var copied = '';
    //Show menu on bottom elements (meaning without children) with text
    $('body :not(:has(*))').on('contextmenu', function(e) {
        if (/\S/.test($(this).text()))
        {
            //Prevent the default context menu
            e.preventDefault();
            target = this; //save element to be changed
            //Get selected range, or range at the clicked point.
            if (getSelection().isCollapsed)
            {
                if (document.caretRangeFromPoint)
                    range = document.caretRangeFromPoint(e.clientX, e.clientY); //doesn't work in Firefox :(
                else if (document.caretPositionFromPoint) {
                    var pos = document.caretPositionFromPoint(e.clientX, e.clientY);
                    range = new Range();
                    range.setStart(pos.offsetNode, pos.offset);
                    range.setEnd(pos.offsetNode, pos.offset);
                }
            }
            else
                range = getSelection().getRangeAt(0);
            //Show the contextmenu at mouse position
            $menu.css({top: e.pageY, left: e.pageX}).removeClass('hidden');
        }
    });
    //When clicking on copy/cut/paste:
    $('#editRange li').click(function() {
        var txt = range.toString();
        switch (this.innerHTML.toLowerCase()) {
            case 'cut':
                range.deleteContents();
            case 'copy':
                copied = txt;
                break;
            case 'paste':
                range.deleteContents();
                range.insertNode(new Text(copied));
                break;
        }
    });
    //When clicking a css option change the weight/style/color of the font accordingly
    $('#changeStyle li').click(function() {
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
