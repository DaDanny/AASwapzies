var swapView = function (adapter, template, listItemTemplate) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.findByName = function() {
        adapter.findByName($('.search-key').val()).done(function(resturants) {
            $('.resturant-list').html(listItemTemplate(resturants));
        });
    };

    this.initialize();

}