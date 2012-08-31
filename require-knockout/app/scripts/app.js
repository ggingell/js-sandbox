define([ 'jquery', 'knockout', 'appViewModel' ],

	function($, ko, appViewModel) {
		var initialize = function() {
		
			console.log("INIT!!");
			console.log(ko);
			
			ko.applyBindings(new appViewModel());
			
			$("#tile").attr('title', 'Somethign!');
		
	};
	
		return {
			initialize : initialize
		};
	}
);