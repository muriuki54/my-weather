window.addEventListener('load', () => {
var skycons = new Skycons({"color": "white"});

let locationTimezone = document.querySelector('.location-timezone'),
temperatureContent = document.querySelector('.temp'),
weatherIcon = document.querySelector('#icon1'),
details_1 = document.querySelector('.details-1'),
details_2 = document.querySelector('.details-2'),
details_3 = document.querySelector('.details-3'),
details_4 = document.querySelector('.details-4'),
icon_1 = document.querySelector('#det1'),
icon_2 = document.querySelector('#det2'),
icon_3 = document.querySelector('#det3'),
icon_4 = document.querySelector('#det4')


let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let format;
if(minutes < 10) {
    minutes = "0"+minutes
}
if(hours > 12 ) {
    hours = hours - 12;
    format = 'pm';
} else {
    format = 'am'
}

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(postion => {
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            let apiKey = '81508925d8e0bc3c3c0642d1e1cf9c64';
            let latitude = postion.coords.latitude
            let longitude = postion.coords.longitude

                axios.get(`${proxy}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`)
                .then((res) => { 
                    let { cloudCover,humidity, ozone, windSpeed, icon, temperature } = res.data.currently
                     locationTimezone.innerHTML = `
                     <h4>Current Location: ${res.data.timezone}</h4>
                     <h1 class="text-lg">${hours} : ${minutes} ${format}</h1>
                     <p>${res.data.hourly.summary}</p>
                     `;

                     temperatureContent.innerHTML = `
                     <h1 class="sm-no-show">Currently :</h1>
                     <h1 class="text-lg">${Math.floor((temperature * (5/9)))} <sup>o</sup> C</h1>
                     `
                    
                     console.log(res)

                    /////////////////
                    skycons.add(weatherIcon, Skycons[icon.toUpperCase().replace(/-/g,'_')]);
                    skycons.add(icon_1, Skycons.PARTLY_CLOUDY_DAY)
                    skycons.add(icon_2, Skycons.WIND)
                    skycons.add(icon_3, Skycons.CLEAR_DAY)
                    skycons.add(icon_4, Skycons.SLEET)
                    skycons.play();

                    const cloud_cover = document.createElement('h1');
                    const wind_speed = document.createElement('h1');
                    const ozone_layer = document.createElement('h1');
                    const humid = document.createElement('h1');

                    cloud_cover.appendChild(document.createTextNode(cloudCover +'okta'));
                    wind_speed.appendChild(document.createTextNode(windSpeed + "km/h"));
                    ozone_layer.appendChild(document.createTextNode(ozone + "DU"));
                    humid.prepend(document.createTextNode(humidity + 'g/m3'));

                    details_1.insertBefore(cloud_cover, icon_1)
                    details_2.insertBefore(wind_speed, icon_2)
                    details_3.insertBefore(ozone_layer, icon_3)
                    details_4.insertBefore(humid, icon_4)

                }
                )
                .catch( err => console.log(err))

        })

    } else {
        alert("Your browser does not support geolocation")
    }


})