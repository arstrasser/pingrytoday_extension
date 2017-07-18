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
			["A", 17423, 17434, 17444, 17456, 17465, 17478, 17487, 17498, 17512, 17521, 17546, 17556, 17567, 17576, 17589, 17598, 17623, 17633, 17644, 17654, 17665, 17674, 17683], 
			["B", 17424, 17435, 17445, 17457, 17469, 17479, 17490, 17504, 17513, 17522, 17547, 17557, 17568, 17577, 17590, 17599, 17624, 17634, 17645, 17655, 17666, 17675, 17687], 
			["C", 17427, 17436, 17448, 17458, 17470, 17480, 17491, 17505, 17514, 17525, 17548, 17560, 17569, 17578, 17591, 17602, 17625, 17637, 17646, 17658, 17667, 17676, 17688], 
			["D", 17428, 17438, 17449, 17459, 17471, 17483, 17492, 17506, 17515, 17526, 17549, 17561, 17570, 17581, 17592, 17603, 17626, 17638, 17647, 17659, 17668, 17679, 17689], 
			["E", 17429, 17441, 17450, 17462, 17472, 17484, 17493, 17507, 17518, 17527, 17550, 17562, 17571, 17582, 17595, 17604, 17630, 17639, 17651, 17660, 17669, 17680], 
			["F", 17430, 17442, 17451, 17463, 17476, 17485, 17494, 17508, 17519, 17528, 17554, 17563, 17574, 17583, 17596, 17605, 17631, 17640, 17652, 17661, 17672, 17681], 
			["G", 17431, 17443, 17452, 17464, 17477, 17486, 17497, 17511, 17520, 17529, 17555, 17564, 17575, 17584, 17597, 17606, 17632, 17641, 17653, 17662, 17673, 17682]];
	
		var d = new Date();
	
		var currentTime = d.getTime();
		currentTime = currentTime/86400000;
		currentTime = currentTime - .16667;
		//alert(currentTime);
		//currentTime = 17360;
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