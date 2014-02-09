var loginView = function (adapter, template,resturant) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.login-btn', this.login);
    };

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.login = function(event){
        event.preventDefault();
        var location = navigator.geolocation.getCurrentPosition(
            function(position) {
                alert(position.coords.latitude + ',' + position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
        adapter.addUser($('#resturant'),$('#email'),location);
        alert('here');
        window.open('swapView.js','_self');
    };

    
    this.initialize();

}