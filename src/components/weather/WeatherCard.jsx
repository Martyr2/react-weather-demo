import { weatherConditionData } from '../../assets/weatherData';
import styles from './WeatherCard.module.css';


function WeatherCard({cardWeather, tempUnit}) {
    const tempConvert = (cardTemp) => {
        if (tempUnit === "F") {
            return ((cardTemp * (9/5)) + 32).toFixed(1);
        }

        return cardTemp.toFixed(1);
    }

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
    }

    return(
        <div className={styles.weatherCard}>
            <div className={styles.weatherCard__day}>{convertDate(cardWeather.date)}</div>
            <img src={weatherConditionData[cardWeather.weather_code].icon} className={styles.weatherCard__icon} alt={weatherConditionData[cardWeather.weather_code].condition}/>
            <div className={styles.weatherCard__body}>
                <p className={styles.weatherCard__title}>{weatherConditionData[cardWeather.weather_code].condition}</p>
                <p>High: {tempConvert(cardWeather.temp_max)}&deg; {tempUnit}</p>
                <p>Low: {tempConvert(cardWeather.temp_min)}&deg; {tempUnit}</p>
            </div>
        </div>
    )
}

export default WeatherCard;