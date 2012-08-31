/**
* convertDate is a helper function for converting Wordpress datetimes to a friendlier format. 
*
* @param String A datetime with form: 2012-12-31 16:26:43
* 
* @return String A date with form: December 31, 2012
*
*/
jQuery.fn.convertDate = function(timeString) {

	var pieces = new RegExp("(\\d{4})[-](\\d{2})[-](\\d{2})", "ig").exec(timeString);

	var months = [ "", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	var monthNumber = parseInt(pieces[2], 10); // Must indicate base (10) when parsing '0n'
	var dayNumber = parseInt(pieces[3], 10);

	return months[monthNumber] + ' ' + dayNumber + ', ' + pieces[1];
}
