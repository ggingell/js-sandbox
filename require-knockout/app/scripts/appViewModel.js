// This line defines the ViewModel as a dependency of KnockoutJS
define(['knockout'], function(ko) {
    
    //-----------------------------------------------------------------------------
    // appViewModel ---------------------------------------------
    //-----------------------------------------------------------------------------
    
    /** 
    * The main appViewModel. Loaded after DOM and jQuery ready Require.js
    * Getting KnockoutJS to play nice with Require takes wrapping the viewmodel,
    *   as shown above on line 2
    *
    */
    return function appViewModel() {

        var self = this;
        
        self.theTitle = "Demo App for Archon Development Corp.";
        self.description = ko.observable("This is a JavaScript demo. Unfortunately I cannot share code from DL2SL (My current employment project.), however this will show you some of my JavaScript talent.");
        self.filter = ko.observable("");
        self.items = ko.observableArray([]);

        // Data that could be loaded with a $.getJSON or other ajax request method:
        data = [
        
        	{"name": "One"}, 
        	{"name": "Two"}, 
        	{"name": "Three"}, 
        	{"name": "Four"}, 
        	{"name": "Five"}, 
        	{"name": "Six"}, 
        	{"name": "Seven"}
        	
        ];
                
        //-----------------------------------------------------------------------------
        // Data Model -----------------------------------------------------------------
        //-----------------------------------------------------------------------------
         
        //single Section
        self.item = function (name) {
            var self = this;
            self.name = name;
        }
               
        //-----------------------------------------------------------------------------
        // Behaviors ------------------------------------------------------------------
        //-----------------------------------------------------------------------------
            
		self.mapData = function () {
			
		    var mappedItems = ko.utils.arrayMap(data, function(singleItem) {
		        return new self.item(singleItem.name); 
		    });
			
			self.items(mappedItems);
			
			
		}
		
		self.mapData()
        
        //filter the items using the filter text
        self.filteredItems = ko.computed(function() {
        	
        	console.log(self.filter());
        
            var filter = self.filter().toLowerCase();
            if (self.filter() == '') {
                return self.items();
            } else {
                return ko.utils.arrayFilter(self.items(), function(item) {

                    regExFilter = new RegExp(filter);
                    haystack = item.name.toLowerCase();

                    // Check your console (This is debug only, not for production of course.)
                    console.log("Filter " + haystack + " with: " + filter + ' gives ' + haystack.search(regExFilter));

                    // Ternary operators:
                    return (haystack.search(regExFilter) === -1) ? false : item;
                });
            }
        });
    }
});