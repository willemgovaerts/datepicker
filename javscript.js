
console.log();




var unavailable = [
	[29,10,2018],
	[1,11,2018],
	[2,11,2018],
	[3,11,2018],
	[4,11,2018],
	[5,11,2018],
	[6,11,2018],
	[2,11,2018],
	[3,11,2018],
	[6,12,2018],
	[7,12,2018]
];
//console.log(unavailable);
//console.log(unavailable.indexOf([1,11,2018]));
var unavailable_index = [];
var month=11;
var departure_date;
var arrival_date;
var day=12;
var year=2018;
var today = Date();
var first_date_index = 0;
var last_available = 0;
var second_date_selected_index = 0;
var left_selected_date;
var hovering_unavailable=false;
var right_selected_date;
var months = ["January", "February","March","April","May","June","July","August","September","Oktober","November","December"];
var second_date_index = 0;
var hover = false;
function selected(element) {
	var index = get_index(element);
	document.getElementById("data_td"+last_el_index).classList.remove("hover");
	//console.log(unavailable_index, index, unavailable_index.indexOf(index));
	if (unavailable_index.indexOf(index) >= 0) {
		return;
	} 
	if (!hover || index<first_date_index) {

		remove_selection();
		element.classList.add("left_select");
		left_selected_date = get_date(index,month,year);
		document.getElementById("date_number_month_from").innerHTML = left_selected_date.day + " " + months[left_selected_date.month-1];
		arrival_date = new Date(left_selected_date.year,left_selected_date.month-1,left_selected_date.day);
		document.getElementById("arrival").value = arrival_date.toISOString().slice(0,10);
		document.getElementById("date_number_month_to").innerHTML = "Kies een dag";

		first_date_index = index;
		second_date_index = 0;
		hover = true;
	}
	else if (hover && index>first_date_index) {
		if (hovering_unavailable) {
			index=last_available;
			element = document.getElementById("data_td"+index);

			//console.log(element);
		}
		element.classList.remove("selected");
		second_date_index = index;
		element.classList.add("right_select");
		second_date_selected_index = index;
		right_selected_date = get_date(index,month,year);
		document.getElementById("date_number_month_to").innerHTML = right_selected_date.day + " " + months[right_selected_date.month-1];
		departure_date = new Date(right_selected_date.year,right_selected_date.month,right_selected_date.day);

		document.getElementById("departure").value = departure_date.toISOString().slice(0,10);
		hover=false;
	}
	
}
function remove_selection(){
	//destroy the entire selection and the begin and start date
	if(first_date_index!=0){
		document.getElementById("data_td"+first_date_index).classList.remove("left_select");
	}
	if (second_date_index!=0) {
		//console.log(second_date_index);
		document.getElementById("data_td"+second_date_index).classList.remove("right_select");
	}
		var e = 1;
		while (e<43) {
			document.getElementById("data_td"+e).classList.remove("selected");
			e++;
		}
	}


function available(day,month,year) {
	//console.log([day,month,year]);
	return !(unavailable.indexOf([day,month,year]) >= 0);
}
var last_el_index = "1";
function hovering(element) {
	/*
	Function is called every time the mouse hovers over a date
	It makes sure that the correct part is selected and handles the unavailable days
	*/
	if (hover) {
		var i = first_date_index+1;
		var index = parseInt(get_index(element));
		document.getElementById("data_td"+last_el_index).classList.remove("hover"); //make sure that when the mouse leaves the datepicker, the last day stays selected
		document.getElementById("data_td"+index).classList.add("hover");
		last_el_index = index;
		hovering_unavailable = false;
		last_available = 0;
		//console.log(unavailable_index);
		while(i<index+1 && index>second_date_index) {
			//loop all the days between the start date and current date on which the mouse is hovering
			if (unavailable_index.indexOf(i) > -1) {
				hovering_unavailable=true;
				//The user has selected a range containing an unavailable date
				//console.log("unavailable");

				if (i>0) {

					last_available=i-1;
					second_date_index = last_available;
					//console.log("last ava" + last_available);
				}
				else {
					//previous month exception
				}
				return;
			}
			document.getElementById("data_td"+i).classList.add("selected");
			i = i+1;
		}

		var i = second_date_index;
		//console.log("index "+index + "second date " + second_date_index+" last unav " + last_available);
		//console.log("satart_index: "+index+" second_date_index" + second_date_index);
		if(index<second_date_index){
			while(i>index) {
				document.getElementById("data_td"+i).classList.remove("selected"); //select all elements in range
			i = i-1;
			}
		}
		element.classList.remove("selected");
		second_date_index = index;
		//console.log("second" + second_date_index);

	}
}
function days_in_month(month,year) {
	var month_31 = [1,3,5,7,8,10,12];
	if (month_31.indexOf(month) >= 0){
		return 31;
	}
	else if (month != 2){
		return 30;
	}
	else {
		if (month % 4 == 0 && month % 100 != 0){
			return 29;
		}
		else {
			return 28;
		}
	}
}
function get_date(index, month, year) {
	/*
	Opposite of what get_day_in_month does.
	Gives the day in a form of a dictionary of the given index in the given month and year.
	*/
	var first_day = get_day(1,month,year);
	var curr_day,curr_month,curr_year;
	last_day = first_day + days_in_month(month,year)-1;
	if (index < first_day) {
		//console.log("jup");
		if (month == 1) {
			curr_month=12;
			curr_year = year-1;
			curr_day = 31-(first_day-index)+1;
		}
		else {
			curr_month = month-1;
			curr_year = year;
			curr_day = days_in_month(curr_month,year)-(first_day-index)+1;
		}
	}
	else if (index <= last_day) {
		curr_day = index - first_day+1;
		curr_month = month;
		curr_year = year;
	}
	else {
		if (month == 12) {
			curr_month = 1;
			curr_year=year+1;
			curr_day = index-last_day;
		}
		else {
			curr_month = month+1;
			curr_year=year;
			curr_day = index-last_day;
		}
	}
	var e = {};
	e.day = curr_day;
	e.year = curr_year;
	e.month = curr_month;
	//console.log(e);
	return{day:curr_day, month:curr_month, year:curr_year};
		
}
function get_index_of_day_in_month(day, month){
	/*
	Get the index of a date in the given month.
	day is a dictionary like {day:20, month:4, year:2000}
	If the day is from earlier than the month, the index is 0
	If the day is not yet in this month, the index is 43
	The global var year is used as the current year
	*/
	if (day == undefined) {
		return 0;
	}
	var index;
	if (day.day > days_in_month(day.month,day.year)){
		//console.log("invalid date");
		return 0;
	}
	if (day.month == month) {
		//console.log("simple");
		index = get_day(1,month,day.year) + day.day-1;
	}
	else if (day.month == 12 && month == 1) {

		index = get_day(1,1,day.year+1)-(days_in_month(12,day.year) - day.day)-1;
	}
	else if (day.month == 1 && month == 12) {
		index = get_day(1,12,day.year-1) + 30 + day.day;
	} 
	else if (day.month == month-1) {
		index = get_day(1,month,day.year) - (days_in_month(day.month,day.year) - day.day)-1;
	}
	else if(day.month == month+1) {
		index = get_day(1,month,day.year) + days_in_month(month,day.year) + day.day-1;
	}
	else {
		return 0;
	}
	if (index > 42 || index < 1) {
		return 0;
	}
	return index;

}
function get_index(element) {
	var id = element.getAttribute('id');
	var index=id.replace("data_td","");
	return parseInt(index);
}
function select(left_index, right_index, no_hover=false){
	/*
		Select a range on the calender
		if left_index is 0, the range starts on the first date with a simple "selected" bock
		if right_index is 43 the range ends on the last date with a simple "selected" block
		if no_hover == true, there are no dates selected except for the begin and/or end date.
		
		params:
			left_index and right_index must both be integers between 0 and 43

	*/
		first_date_index = left_index;
		if (right_index<43 && right_index>0) {
			//console.log("right: " + right_index);
			second_date_index= right_index;
			document.getElementById("data_td" + right_index).classList.add("right_select");
		}
		if (left_index>0) {
			document.getElementById("data_td" + left_index).classList.add("left_select");	
		}
		
		for(e=left_index+1;e<right_index && !no_hover;e++) {
			//select all dates inbetween the given indexes
			document.getElementById("data_td" + e).classList.add("selected");
		}
	}
function next_month(){
	/*
		Move the calender to the next month
		if the user is selecting a date or has selected a date 
		this function makes sure that the selection is taken with to the next month
	*/
	remove_selection(); 
	if (month == 12) {
		//if we go to next year
		month = 0;
		year++;
	}
	month++;
	set_month(month,year); //change all the dates
	//console.log("second_date_index" + second_date_index);
	if(hover) { //if the user has already selected a start date
		previous_selected = get_index_of_day_in_month(left_selected_date,month); //get the index in the current month of the date selected by the user, 0 if not visible in this month
		if (!hovering_unavailable  || previous_selected>0) {
			//console.log("hover unav: " + hovering_unavailable);
			select(previous_selected,previous_selected);
		}
		else {
			//if the user selected a start date in the previous month which is not shown and there is an unavailable date inbetween, the entire selection 
			//precedure is cancelled
			first_date_index=0;
			hover=false;

		}
		
	}
	else if(second_date_index !=0){
		//if the selectoin was already finished
		var right_index_in_new_month = get_index_of_day_in_month(right_selected_date,month);

		//console.log("right index in new month: " + right_index_in_new_month);
		if (right_index_in_new_month > 0) {
			//if at least the right-most part of the selection is visible
			var left_index_in_new_month = get_index_of_day_in_month(left_selected_date,month);
			//console.log("left_index_in_new_month: " + left_index_in_new_month+ " left_selected_date:  " + left_selected_date);
			if (left_index_in_new_month > 0) {
				//if the entire selection is visible
				select(left_index_in_new_month, right_index_in_new_month);
			}
			else {
				//if only right part is visible, start in the very beginning of the calender with a simple "selected" block
				select(0,right_index_in_new_month);
			}
		}


	}
}

function previous_month() {
/*
	Move the calender to the previous month
	if the user is selecting a date or has selected a date 
	this function makes sure that the selection is taken with to the previous month
*/
	if (month == 1) {
		//if we go to the previous year
		month = 13;
		year--;
	}
	month--;
	set_month(month,year); //change all the dates

	var index_in_new_month = get_index_of_day_in_month(left_selected_date,month);
	
		remove_selection();
		var right_index_in_new_month = get_index_of_day_in_month(right_selected_date,month);

		if (index_in_new_month>0) {
			
			//console.log("right index selectee date" + right_selected_date);
			if (right_index_in_new_month > 0) {
				select(index_in_new_month,right_index_in_new_month);
			}
			else {
				select(index_in_new_month,43, hover);
			}
		}
		else if (right_index_in_new_month < 43 || right_index_in_new_month > 0) {
			select(0, right_index_in_new_month);
		}
		else {
			first_date_index = 0;
			hover=false; //if you move to previous month while selection in next month, the selection is cancelled
		}
	
}
function get_unavailable_indexes(month) {
	/*
	Get all the indexes of the unavailable dates that are visible in the given month
	This function uses the list unavailable specified in the beginning of this file to know which dates are unavailable

	params:
		month must be an integer between 1 and 12
	*/
	unavailable_index = [];
	for (var i = 0; i<unavailable.length;i++) {
		var index = get_index_of_day_in_month({day:unavailable[i][0], month:unavailable[i][1], year:unavailable[i][2]}, month);
		if (index>0) {//make sure that no zeroes get in the array
			unavailable_index.push(index);
		}
		
	}

	
}
function set_month(month, year){
	/*
	This function changes the calender to a specified month and year.
	It changes all the dates and checks if they are available.

	params:
		month must be an integer between 1 and 12
		year must be a positive integer
	*/
	for (var i = 0; i<unavailable_index.length;i++) {
		document.getElementById("data_td"+unavailable_index[i]).classList.remove("onbeschikbaar");
	}
	get_unavailable_indexes(month)
	if (month == 1){
		days_previous_month = days_in_month(12, year-1);
	}
	else {
		days_previous_month = days_in_month(month-1, year);
	}
	month;

	days_in_new_month = days_in_month(month,year);
	document.getElementById("month_year").innerHTML = months[month-1] + " " + year;
	var d = get_day(1,month,year);
	var e = 1;
	while (e < d) {
		set_date(e,days_previous_month-d+e+1,true)
		e++;
	}
	index_of_day_to_set = 1;
	while (index_of_day_to_set <= days_in_new_month) {
		set_date(d,index_of_day_to_set);
		index_of_day_to_set++;
		d++;
	}
	e=1;
	while(d<=42) {
		set_date(d,e,true);
		d++;
		e++;
	}
	for (var i=0;i<unavailable_index.length;i++) {
		document.getElementById("data_td"+unavailable_index[i]).classList.add("onbeschikbaar");
	}


}
function set_date(index, number,not_curr=false) {
	/*
	This function changes the date on a specific td (with id="data_td[index]" to the specified number
	If not_curr is true the date is set as a date that doesn't belong to the current month

	params:
		index must be an integer between 1 and 42
		number must be an integer between 1 and 31
		not_curr is a boolean
	*/
	var el = document.getElementById("data_td"+index);
	el.innerHTML="<div class='content'>"+number+"</div>";
	if (not_curr) {
		document.getElementById("data_td"+index).classList.add("not_curr_month");
	}
	else {
		document.getElementById("data_td"+index).classList.remove("not_curr_month");
	}
	if (!available(number,month,year)) {
		document.getElementById("data_td"+index).classList.remove("onbeschikbaar");
		unavailable_index.add(index);
		//console.log(unavailable_index);
	}
}
function get_day(day, month, year){
	/*
	This function returns the number of the day in teh week of the given date
	monday : 1
	tuesday : 2
	wednesday : 3
	thursday : 4
	friday : 5
	saturday : 6
	sunday : 7

	params:
		day must be an integer between 1 and 31
		month must be an integer between 1 and 12
		day must be a positive integer

	note: if the given date is not existent in the given month this function does not take care of this
	*/
	var d = new Date(year,month-1,day);

    if (d.getDay() == 0){
    	//change sunday because weird Americans start their week on sunday :)
    	return 7;
    }
    else {
    	return d.getDay();
    }
    
}
