/*
*	Brendan Raimann and Billy Fallon
*	Controls:
*		Time
*		Date
*		Letter Day
*/

$(document).ready(function(){

	
	/*
	*	Helper function for the time. Adds a zero in front of the number if necessary.
	*/
	function addZero(x) {
		if (x < 10)
			return "0" + x;
		return x;
	}
	
	//helper arrays for the date
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	
	/*
	*	Recursive method to keep time.
	*/
	function startTime() {
		var half = true;
		var today = new Date();
		if (today.getHours() <= 12)
			h = today.getHours();
		else
			h = today.getHours() - 12;
		if (h == 0)
			h = 12;
        m = addZero(today.getMinutes());
		document.getElementById('time').innerHTML = h + ":" + m;
		var d = new Date();
		document.getElementById("date").innerHTML = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
		setTimeout(function(){ startTime(); }, 1000);
	}
	
	startTime();
	
	/*
	*	Gets the letter day using the unique int for each calendar day
	*/
	function letterDay(){

		var times = [
			["A", 17052, 17063, 17072, 17084, 17094, 17107, 17116, 17127, 17141, 17150, 17176, 17186, 17197, 17206, 17219, 17228, 17253, 17262, 17274, 17284, 17295, 17304, 17316], 
			["B", 17053, 17064, 17073, 17085, 17095, 17108, 17119, 17133, 17142, 17151, 17177, 17189, 17198, 17207, 17220, 17231, 17254, 17263, 17275, 17287, 17296, 17305, 17317], 
			["C", 17056, 17065, 17074, 17087, 17099, 17109, 17120, 17134, 17143, 17169, 17178, 17190, 17199, 17210, 17221, 17232, 17255, 17266, 17276, 17288, 17297, 17308, 17318], 
			["D", 17057, 17066, 17078, 17088, 17100, 17112, 17121, 17135, 17144, 17170, 17179, 17191, 17200, 17211, 17224, 17233, 17256, 17267, 17280, 17289, 17298, 17309, 17319], 
			["E", 17058, 17067, 17079, 17091, 17101, 17113, 17122, 17136, 17147, 17171, 17183, 17192, 17203, 17212, 17225, 17234, 17259, 17268, 17281, 17290, 17301, 17310], 
			["F", 17059, 17070, 17080, 17092, 17105, 17114, 17123, 17137, 17148, 17172, 17184, 17193, 17204, 17213, 17226, 17235, 17260, 17269, 17282, 17291, 17302, 17311], 
			["G", 17060, 17071, 17081, 17093, 17106, 17115, 17126, 17140, 17149, 17175, 17185, 17196, 17205, 17218, 17227, 17252, 17261, 17273, 17283, 17294, 17303, 17312]];
	
		var d = new Date();
	
		var currentTime = d.getTime();
		currentTime = currentTime/86400000;
		currentTime = currentTime - .16667;
		//alert(currentTime);
		//currentTime = 17186;
		currentTime = parseInt(currentTime, 10);

		var day = ""

		for(i = 0; i < times.length; i++)
		{
			for(v = 0; v < times[i].length - 1; v++)
			{
				if(times[i][v+1] == currentTime)
				{
					document.getElementById('letterDay').innerHTML = times[i][0];
					day = times[i][0];
					break;
				}
			}
		}

		if(day == "A") {
			document.getElementById('classes').innerHTML = "1-2-3-4";
		}
		if(day == "B") {
			document.getElementById('classes').innerHTML = "5-6-7-1";
		}
		if(day == "C") {
			document.getElementById('classes').innerHTML = "2-3-4-5";
		}
		if(day == "D") {
			document.getElementById('classes').innerHTML = "6-7-1-2";
		}
		if(day == "E") {
			document.getElementById('classes').innerHTML = "3-4-5-6";
		}
		if(day == "F") {
			document.getElementById('classes').innerHTML = "7-1-2-3";
		}
		if(day == "G") {
			document.getElementById('classes').innerHTML = "4-5-6-7";
		}
		
		setTimeout(function(){ letterDay(); }, 60000);
	}
	
	letterDay();
	
});