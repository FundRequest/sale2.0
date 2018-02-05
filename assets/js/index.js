(function() {
    jQuery(document).ready(function() {
        $('.clock').countdown({
            date: new Date(2018, 1, 12, 10, 0, 0),
            offset: 1
        }, function() {

        });
    });
})();