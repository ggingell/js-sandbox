require.config({
    paths: {
        "jquery"    :    "require-jquery",
        "knockout"  :    "knockout-2.1.0"
    },

})

require([ 'domReady', 'app' ], function(domReady, app) {

    domReady(app.initialize);

});