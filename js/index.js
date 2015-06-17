jQuery(document).ready(function ($) {
    $(document).foundation();
    
    // cookies manger for whether raffled
    CookiesManager.init();

    alert(CookiesManager.isRaffled);

    // page navigation
    function pageNavigation() {
        //

    }
});