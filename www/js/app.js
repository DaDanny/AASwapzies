// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var swapTpl = Handlebars.compile($("#swap-tpl").html());
    var loginTpl = Handlebars.compile($("#login-tpl").html());
    var resturantLiTpl = Handlebars.compile($("#resturant-li-tpl").html());
    var detailsURL = /^#resturants\/(\d{1,})/;

    var slider = new PageSlider($('body'));

    var adapter = new LocalStorageAdapter();
    adapter.initialize().done(function () {
        route();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $(window).on('hashchange', route);

    document.addEventListener('deviceready', function () {

        FastClick.attach(document.body);

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Swapzies", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    function route() {
        var hash = window.location.hash;
        if (!hash) {
            slider.slidePage(new swapView(adapter, swapTpl, resturantLiTpl).render().el);
            return;
        }
        var match = hash.match(detailsURL);
        if (match) {
            adapter.findById(Number(match[1])).done(function(employee) {
                slider.slidePage(new EmployeeView(adapter, employeeTpl, employee).render().el);
            });
        }
    }

}());