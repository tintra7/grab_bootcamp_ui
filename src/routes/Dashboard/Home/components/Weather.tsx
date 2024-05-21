import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal, { SweetAlertOptions } from 'sweetalert2'

import { Typography } from '@mui/material/'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  AcUnitOutlined,
  CloudRounded,
  ThunderstormRounded,
  WbSunnyRounded
} from '@mui/icons-material'

import CloudsWeather from '@/assets/images/Clouds.svg'
import RainWeather from '@/assets/images/Rain.svg'
import SnowWeather from '@/assets/images/Snow.svg'
import SunnyWeather from '@/assets/images/sunny.svg'
import theme from '@/libs/ui/theme'
import { errorAlert, loading } from '@/utils/sweetAlert'

async function getWeather(lat: number, lon: number) {
  try {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    const data = await response.data
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

const date = new Date()
const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
}).format(date)

export default function Weather() {
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))

  const [weatherData, setWeatherData] = useState<any>({})

  useEffect(() => {
    Swal.fire(loading)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        getWeather(lat, lon)
          .then((data) => {
            setWeatherData(data)
            Swal.close()
          })
          .catch(() =>
            Swal.fire(
              errorAlert('Failed to get weather data !') as SweetAlertOptions
            )
          )
      },
      function (error) {
        console.error('Error Code = ' + error.code + ' - ' + error.message)
      }
    )
  }, [])

  return (
    <>
      {hidden ? (
        <div className='weather-status'>
          {weatherData && weatherData.weather && weatherData.weather[0] ? (
            weatherData.weather[0].main === 'Clear' ? (
              <WbSunnyRounded />
            ) : weatherData.weather[0].main === 'Clouds' ? (
              <CloudRounded />
            ) : weatherData.weather[0].main === 'Rain' ? (
              <ThunderstormRounded />
            ) : (
              <AcUnitOutlined />
            )
          ) : (
            <AcUnitOutlined />
          )}
          <Typography
            variant='subtitle2'
            fontWeight={600}
            color='textSecondary'
          >
            {formattedDate}
          </Typography>
        </div>
      ) : (
        <div className='home-section weather'>
          <div>
            <Typography
              variant='subtitle2'
              fontWeight={600}
              color='textSecondary'
            >
              {formattedDate}
            </Typography>
            <Typography variant='h6' fontWeight={700}>
              {weatherData.name}
            </Typography>
          </div>
          <div className='weather-info'>
            <div>
              <Typography variant='h4' fontWeight={600}>
                {weatherData ? Math.round(weatherData.main?.temp) : 28}°C
              </Typography>
              <div className='weather-status'>
                {weatherData &&
                weatherData.weather &&
                weatherData.weather[0] ? (
                  weatherData.weather[0].main === 'Clear' ? (
                    <WbSunnyRounded />
                  ) : weatherData.weather[0].main === 'Clouds' ? (
                    <CloudRounded />
                  ) : weatherData.weather[0].main === 'Rain' ? (
                    <ThunderstormRounded />
                  ) : (
                    <AcUnitOutlined />
                  )
                ) : (
                  <AcUnitOutlined />
                )}
                <Typography
                  variant='subtitle1'
                  fontWeight={600}
                  color='textSecondary'
                >
                  {weatherData &&
                    weatherData.weather &&
                    weatherData.weather[0] &&
                    weatherData.weather[0].main}
                </Typography>
              </div>
            </div>
            <img
              src={
                weatherData && weatherData.weather && weatherData.weather[0]
                  ? weatherData.weather[0].main === 'Clear'
                    ? SunnyWeather
                    : weatherData.weather[0].main === 'Clouds'
                    ? CloudsWeather
                    : weatherData.weather[0].main === 'Rain'
                    ? RainWeather
                    : SnowWeather
                  : undefined
              }
              alt={
                weatherData &&
                weatherData.weather &&
                weatherData.weather[0] &&
                weatherData.weather[0].main
              }
            />
          </div>
        </div>
      )}
    </>
  )
}
