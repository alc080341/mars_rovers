

initalise();


// Grab initial display from API and display on screen

function initalise()
{
	setInterval(function(){ 
		getRovers()
		.then((response) => {
			let returnHTML = ''
			response.forEach(rover =>
			{
				returnHTML += `<div class='rover_info'>`;
				returnHTML += `<div class='rover_info top'>${rover.name}</div>`;
				returnHTML += `<div class='rover_info bottom'>State: ${rover.state}</div>`;
				returnHTML += `</div>`;
			})
			document.getElementById('container').innerHTML = returnHTML;
		});
	}, 1000);
}


function getRovers()
{
	let url = `http://localhost:4444/rovers`;
	return fetch(url, {})
	.then((response) => {
		if(response.ok) {
			return response.json();
		} else {
			throw new Error('Server response wasn\'t OK');
		}
	})
}



// Add a rover via popup and then submit to API

function popUp()
{
	let fg = document.getElementById("foreground");
	let bg = document.getElementById("background");
	if(fg.style.visibility == "hidden" || fg.style.visibility == "")
	{
		fg.style.visibility = "visible";
		bg.style.visibility = "visible";
	}

}


function closePopup()
{
	let fg = document.getElementById("foreground");
	let bg = document.getElementById("background");
	fg.style.visibility = "hidden";
	bg.style.visibility = "hidden";
}


function addRover()
{
	let newRover = document.getElementById('roverInput').value;
	if(newRover.trim().length > 0)
	{
		closePopup();
		return fetch(`http://localhost:4444/add-rover/${newRover}` , {
			method: "POST", 
			credentials: "same-origin",  
			CORS: 'Access-Control-Allow-Origin'
		});
	}
	else
	{
		document.getElementById('err').innerHTML = "Please enter a value";
	}
}