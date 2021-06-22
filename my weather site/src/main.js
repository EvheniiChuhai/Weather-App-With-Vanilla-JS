'use strict'
const card = document.querySelector('.main-forecast')
const root = document.getElementById('root')
let tableContainer = document.createElement('div')
tableContainer = tableContainer.setAttribute('class', 'container-weather')
const container = document.createElement('div')
container.setAttribute('class', 'container-weather')
const submit = document.querySelector('.submit')
const input = document.querySelector('.text')
const flexContainer = document.querySelector('.forecast-table')

function flexCon () {
	let cards = document.querySelectorAll('.main-forecast');
	
	if (cards.length +1 === 4 ){
		flexContainer.style.flexWrap = 'wrap'
		flexContainer.style.alignContent = 'normal'
	}
	
}

function getCityname () {
	submit.addEventListener('click', ()=>{
		
		let city = input.value.toLowerCase();
		input.value = '';
		getweather(city);
		flexCon ();
	})}

function getweather(cityname){	
	fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=e5f2f2e0ee164b659030b767214e0ba1`)
  	.then((response) => response.json())
  	.then((data) => {
	const date = new Date(data.list[0].dt*1000);
	const day = date.getDay();
	const month = date.getMonth();
	const hour = date.getHours()
	const dayNubmerTXT = data.list[0].dt_txt;
	const dayNumberArr = dayNubmerTXT.split(' ');
	const dayNumber = dayNumberArr[0].split('-');
	const number = dayNumber[2]	;
	const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
	const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const dayDate = {
		day: week[day],
		date: [number,monthArr[month]]
		
	};
	const arrForecast = [];

	data.list.forEach((e, i)=>{
		
		let dayForecast = new Date(e.dt*1000).getHours();
		if (i!== 0 && dayForecast === 3){
			arrForecast.push(e)

		}
	});

	const dataObj = {
		city: data.city.name,
		 temperature: Math.round(data.list[0].main.temp), 
		 wetherIcon: data.list[0].weather[0].main,
		humidity: data.list[0].main.humidity,
		wind: data.list[0].wind.speed
		}
	renderCards(dataObj, dayDate, arrForecast);
  });
}



function renderCards (obj, dayDate, arr) {
	window.location.hash = '';
	const html = `
			   <div class="forecast-header">
				  <div class="day">${dayDate.day}</div>
				  
				  <div class="date">${dayDate.date[0]} ${dayDate.date[1]}</div>
			   </div> 
			   <div class="forecast-content">
				  <div class="location">${obj.city}</div>
				  <div class="degree">
					 <div class="num">${obj.temperature}<sup>o</sup>C</div>
					 <div class="forecast-icon">
						<img src="/icons/${obj.wetherIcon}.svg" alt="" width=90>
					 </div>	
				  </div>
				  <span><img src="/icons/umberella.png" alt="">${obj.humidity}%</span>
				  <span><img src="/icons/wind.png" alt="">${obj.wind}km/h</span>
				  <span><img src="/icons/compass.png" alt="">East</span>
			   </div>

			   `

	
    const mainForecast = document.createElement('div');
    mainForecast.setAttribute('class', 'main-forecast forecast-container');
	mainForecast.innerHTML = html;
	root.appendChild(mainForecast);
    const card = mainForecast.addEventListener('click', ()=>{
        window.location.hash = obj.city;
		renderWeekForecast (obj, dayDate, arr);
    })

}

function renderWeekForecast (obj, dayDate, arr) {
	
	root.innerHTML = renderForecast (obj, dayDate, arr);
	const backwards = document.querySelector('.arrow');
	backwards.addEventListener('click', (e)=>{
		window.location.hash = '';
		window.location.reload();
	})
}



function renderForecast (obj, dayDate, arr) {
	const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	console.log(parseInt(arr[1].main.temp_min))
	return `<div class="arrow"><img src="icons/arrow.png" alt=""></div>
	<div class="table-container">
	<div class="today-forecast">
		<div class="forecast-header">
			<div class="day">${dayDate.day}</div>
			<div class="date">${dayDate.date[0]} ${dayDate.date[1]}</div>
		</div> 
		<div class="forecast-content">
			<div class="location">${obj.city}</div>
			<div class="degree">
				<div class="num">${parseInt(obj.temperature)}<sup>o</sup>C</div>
				<div class="forecast-icon">
					<img src="/icons/${obj.wetherIcon}.svg" alt="" width=90>
				</div>	
			</div>
			<span><img src="/icons/umberella.png" alt="">${obj.humidity}%</span>
			<span><img src="/icons/wind.png" alt="">${obj.wind}km/h</span>
			<span><img src="/icons/compass.png" alt="">East</span>
		</div>
	</div>
	<div class="forecast">
		<div class="daily-forecast-header">
			<div class="day">${week[new Date(arr[0].dt*1000).getDay()]}</div>
		</div> 
		<div class="daily-forecast-content">
			<div class="daily-forecast-icon">
				<img src="/icons/${arr[0].weather[0].main}.svg" alt="" width=48>
			</div>
			<div class="daily-degree">${parseInt(arr[0].main.temp)}<sup>o</sup>C</div>
			<small>min: ${parseInt(arr[0].main.temp_min)}<sup>o</sup></small>
		</div>
	</div>
<div class="forecast">
		<div class="daily-forecast-header">
			<div class="day">${week[new Date(arr[1].dt*1000).getDay()]}</div>
		</div> 
		<div class="daily-forecast-content">
			<div class="daily-forecast-icon">
				<img src="/icons/${arr[1].weather[0].main}.svg" alt="" width=48>
			</div>
			<div class="daily-degree">${parseInt(arr[1].main.temp)}<sup>o</sup>C</div>
			<small>min: ${parseInt(arr[1].main.temp_min)}<sup>o</sup></small>
		</div>
	</div>
<div class="forecast">
		<div class="daily-forecast-header">
			<div class="day">${week[new Date(arr[2].dt*1000).getDay()]}</div>
		</div> 
		<div class="daily-forecast-content">
			<div class="daily-forecast-icon">
				<img src="/icons/${arr[2].weather[0].main}.svg" alt="" width=48>
			</div>
			<div class="daily-degree">${parseInt(arr[2].main.temp)}<sup>o</sup>C</div>
			<small>min: ${parseInt(arr[2].main.temp_min)}<sup>o</sup></small>
		</div>
	</div>
<div class="forecast">
		<div class="daily-forecast-header">
			<div class="day">${week[new Date(arr[3].dt*1000).getDay()]}</div>
		</div> 
		<div class="daily-forecast-content">
			<div class="daily-forecast-icon">
				<img src="/icons/${arr[3].weather[0].main}.svg" alt="" width=48>
			</div>
			<div class="daily-degree">${parseInt(arr[3].main.temp)}<sup>o</sup>C</div>
			<small>min: ${parseInt(arr[3].main.temp_min)}<sup>o</sup></small>
		</div>
	</div>
<div class="forecast">
		<div class="daily-forecast-header">
			<div class="day">${week[new Date(arr[4].dt*1000).getDay()]}</div>
		</div> 
		<div class="daily-forecast-content">
			<div class="daily-forecast-icon">
				<img src="/icons/${arr[4].weather[0].main}.svg" alt="" width=48>
			</div>
			<div class="daily-degree">${parseInt(arr[4].main.temp)}<sup>o</sup>C</div>
			<small>min: ${parseInt(arr[4].main.temp_min)}<sup>o</sup></small>
		</div>
	</div>

	
</div>`
   
}


getCityname ();



