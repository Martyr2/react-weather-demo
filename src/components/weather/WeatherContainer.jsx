import { useState, useEffect, useRef } from "react";
import WeatherCard from "./WeatherCard";
import styles from "./WeatherContainer.module.css";

function WeatherContainer() {
    const animTime = 800;
    const weatherFiveDayRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [tempUnit, setTempUnit] = useState("C");
    const [city, setCity] = useState("new%2520westminster");

    const displayWeatherCards = () => {
        let currentCard = 1;

        for (const card of weatherFiveDayRef.current.children) {
            setTimeout(() => {
                card.classList.add("active");
            }, animTime * currentCard);
            currentCard++;
        }        
    }

    const hideWeatherCards = () => {
        for (const card of weatherFiveDayRef.current.children) {
            card.classList.remove("active");
        } 
    }

    const toggleTempUnit = () => {
        setTempUnit(tempUnit === "C" ? "F" : "C");
    }

    const fetchWeatherData = async (cityName) => {
        const response = await fetch(`https://api.timhurd.com/weather/fiveDay/${cityName}`, { headers: { "X-Api-Key": "Hegues%6ejfes!857rhe" } });
        const weather_info = await response.json();
        return weather_info.data;
    }

    const parseWeatherData = (weather_data) => {
        const weatherCards = [];

        for (const weather_day of weather_data) {
            weatherCards.push(weather_day);
        }

        return weatherCards;
    }

    useEffect(() => {
        async function setupWeatherData() {
            try {
                const data = await fetchWeatherData(city);
                const parsedWeatherData = parseWeatherData(data);
    
                if (!ignore && parsedWeatherData) {
                    setCards(parsedWeatherData);
                }
            } catch(error) {
                console.log("Error getting weather data: ", error);
            }
        }

        hideWeatherCards();

        let ignore = false;
        setupWeatherData();
        return () => {
            ignore = true;
        }
    }, [city]);

    useEffect(() => {
        displayWeatherCards();
    }, [cards]);

    return(
        <div className={styles.weatherContainer}>
            <div className={styles.weatherContainer__controls}>
                <select className={styles.weatherContainer__city_select} onChange={event => setCity(event.target.value)} value={city}>
                    <option value="halifax">Halifax</option>
                    <option value="new%2520westminster">New Westminster</option>
                    <option value="toronto">Toronto</option>
                    <option value="vancouver">Vancouver</option>
                    <option value="victoria">Victoria</option>
                </select>
                <button className={styles.weatherContainer__temp_change} onClick={toggleTempUnit} title="Temperature Unit">{tempUnit}</button>
            </div>
            {cards.length !== 0 && <h1 className={`title--align-left ${styles.weatherContainer__heading}`}>{cards[0].city}</h1>}
            <div className={styles.weatherFiveDay} ref={weatherFiveDayRef}>
                { cards.map((card, index) => (
                    <WeatherCard key={index} cardWeather={card} tempUnit={tempUnit}/>
                )) }
            </div>
        </div>
    )
}

export default WeatherContainer;