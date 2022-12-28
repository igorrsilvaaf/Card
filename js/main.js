$(document).ready(function(){
    var animating = false;

    function menuToggle(){
        $(".demo-page, .demo-menu, .demo-light").toggleClass("menu-active");
        $(".js-menuBtn").toggleClass("m--btn");
        $(document).off("click", "demo-content", closeNotFocusedMenu);
    };
    function closeNotFocusedMenu(e) {
        if (!$(e.target).closest(".demo-menu").length) {
            menuToggle();
            $(document).off("click", ".demo-content", closeNotFocusedMenu);
        }
    };

    $(document).on("click", ".js-menuBtn", function() {
        if (animating) return;
        menuToggle();
        $(document).on("click", ".demo-content", closeNotFocusedMenu);
    });

    $(document).on("click", ".demo-menu-item:not(.js-menuBtn)", function() {
        animating  = true;
        var $this = $(this);
        var page = +$this.data("page");
        $(".js-menuBtn").removeClass("js-menuBtn");
        $(".demo-page.active").removeClass("active");
        $this.addClass("js-menuBtn m--btn");
        $(".demo-page-"+page).addClass("active");
        $(".demo-page, .demo-menu, .demo-light").removeClass("menu-active");
        $(document).off("click", ".demo-content", closeNotFocusedMenu);
        setTimeout(function() {
            $(".demo-menu")[0].className = $(".demo-menu")[0].className.replace(/\bpage-active-.*\b/gi, "");
            $(".demo-menu").addClass("page-active-"+page);
            animating = false;
        }, 1000);
    });
});