//-----------------------------------------------------------------------------
// Data Model -----------------------------------------------------------------
//-----------------------------------------------------------------------------
 
// Single Section
self.ddSection = function(type, code, description) {

    var self = this;
    
    self.type = type;
    self.code = code;
    self.description = description;
}

// Single Division containing an Observable Array of Sections 
self.ddDivision = function(type, code, description, children) {

    var self = this;
    
    self.type = type;
    self.code = code;
    self.description = description;
    self.children = ko.observableArray(
	    ko.utils.arrayMap(
		    children,
		    function(child) {
	    
	            return new ddSection(
	                child.type,
	                child.code,
	                child.description
	            ); 
		    }
	    )
    );
            
}

// Single Class containing an Observable Array of Divisions 
// which then contain Observable Arrays of Sections
self.ddClass = function(type, code, description, children) {

    var self = this;
    
    self.type = type;
    self.code = code;
    self.description = description;
    self.children = ko.observableArray(
        
        ko.utils.arrayMap(
            children, 
            function(child) {
                 
                 return new ddDivision(
                     child.type, 
                     child.code, 
                     child.description, 
                     child.children
                 );
            }
        )
    );
}

self.getQueryURL = function() {
    return "json/index.php";
}

//-----------------------------------------------------------------------------
// Dewey Decimal Search ViewModel ---------------------------------------------
//-----------------------------------------------------------------------------

/** 
* ddcSearchViewModel() 
* Defines the model-view for the Dewey Decimal Classification search tool.
* 
*
*/

function ddSearchViewModel() {

    var self = this;
    
    self.ddcClass = ko.observableArray([]); // 10 Divisions w/ 10 Sections ea
    
    self.ddcCurrentClass = ko.observable();
    self.ddcCurrentDivision = ko.observable();
    self.ddcSections = ko.observable("");
    // @TODO This could be loaded via Ajax, but it is also faster to include the inital choices
    self.ddcClasses = [
        {"code":  "000", "description": "Computer science, information & general works"},
        {"code":  "100", "description": "Philosophy and psychology"},
        {"code":  "200", "description": "Religion"},
        {"code":  "300", "description": "Social sciences"},
        {"code":  "400", "description": "Language"},
        {"code":  "500", "description": "Science"},
        {"code":  "600", "description": "Technology"},
        {"code":  "700", "description": "Arts and recreation"},
        {"code":  "800", "description": "Literature"},
        {"code":  "900", "description": "History, geography, and biography"}
    ];
    
    //-------------------------------------------------------------------------
    // Methods ----------------------------------------------------------------
    //-------------------------------------------------------------------------
    
    // Retrieves the dewey class that matches 'ddcCurrentClass()':
    self.getDDC = function () {

        var classCode = self.ddcCurrentClass().code;
        $("#load-notice").fadeIn('fast');
    
        $.getJSON(

            getQueryURL(),
            {class: classCode},
            
            function(payload) {

                console.log(payload);

                var mappedDDClass = ko.utils.arrayMap(
                    [payload.data],
                    function(theClass) {
	                    return new ddClass(
	                        theClass.type,
	                        theClass.code,
	                        theClass.description,
	                        theClass.children
	                    ); 
                    }
                );
                
                $("#ddc_browser ul.classes").slideUp('fast');
                self.ddcClass(mappedDDClass);
                $("#ddc_browser ul.divisions").slideDown('fast');
                 $("#load-notice").fadeOut('slow');
                
            }
        )
    }
    
    //-------------------------------------------------------------------------
    //- UI Traversing ---------------------------------------------------------
    
    // Handles the user choosing a class from the list:
    self.showClassChildren = function(class_code) {

        $("#ddc_browser ul.sections").hide();
        $("#ddc_browser ul.divisions").hide();
        self.ddcCurrentClass(class_code); 
        self.getDDC();
    }
    
    // Handles the user clicking the back button while looking at sections:
    self.backToClass = function() {
        
        $("#ddc_browser ul.sections").hide();
        $("#ddc_browser ul.divisions").slideDown('fast');
    
    }
    
    // Handles the user choosing a division from the list:
    self.showDivisionChildren = function(division) {
    
        $("#ddc_browser ul.divisions").slideUp('fast');
        self.ddcCurrentDivision(division.code);
        
        $("#ddc_browser ul.sections").slideDown('fast');
    }
    
    // Shows the user all classes:
    self.showClasses = function() {
    
        self.ddcClass([]);
        $("#ddc_browser ul.classes").slideDown('fast');
    
    }
    
    // Places the dewey code into the input box for the user:
    self.selectSection = function(section) {
    
        $("#chosen-dewey").val(section.code);
        
    }
    
    //-------------------------------------------------------------------------
    //- Filtering -------------------------------------------------------------
    
    // Uses the ddcCurrentDivision observable to filter out the selected 
    // division from the entire class.
    self.filteredSingleDivision = ko.computed(
        
        function() {
	        
	        if (self.ddcCurrentDivision() == '') {
	        
	            return self.ddcClass();
	        } 
	        
	        else {
	            return ko.utils.arrayFilter(
	            
		            self.ddcClass(), 
		            
		            function(item) {

		                //console.log(item.children());
		                return ko.utils.arrayFilter(
		                    item.children(), 
		                    function(childDivision) {
		                    
			                    if (childDivision.code == self.ddcCurrentDivision()) {
			                        
			                        // Hold on to the childDivision for display;
			                        self.ddcSections(childDivision);
			                        
			                    }
		                    }
		                );
		            }
	            );
	        }
    	}
    );
}
