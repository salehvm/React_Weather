import React from 'react';
import Titles from './Components/Titles.js';
import Form from './Components/Form.js';
import Weather from './Components/Weather.js'

const API_KEY = "b304b497e1f4d5aa7ce2926151d45605"

class App extends React.Component {

  state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    lat: undefined,
    lon: undefined,

    error: undefined



  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();

    if (city && country) {
      console.log(data);

      this.setState({

        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.humidity,
        description: data.weather[0].description,
        lat: data.coord.lat,
        lon: data.coord.lon,

        error: ""


      });
    }
    else {
      this.setState({

        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        lat: undefined,
        lon: undefined,
        error: "Seher ve Olke daxil edilmedi"


      });

    }

  }

  render() {
    return (

      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>

                <div className="col-xs-7 form-container">

                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    lon = {this.state.lon}
                    lat = {this.state.lat}
                    error={this.state.error}


                  />
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default App;