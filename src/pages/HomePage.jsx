import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

const Home = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateF, setDateF] = useState('');
  const [dateT, setDateT] = useState('');
  const [dateHours, setDateHours] = useState('');
  const [dateHoursWeek, setDateHoursWeek] = useState('');
  const [dataSemana, setDataSemana] = useState(null);
  const [datesForecast, setDatesForecast] = useState('');
  const [datesHoursRain, setDatesHoursRain] = useState('');
  const [datesHoursRainTomorrow, setDatesHoursRainTomorrow] = useState('');
  const [view, setView] = useState('7days');
  const [datesTenDays, setDatesTenDays] = useState('');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = (obj) => {
    let fechaHora = obj;
    let [fecha, hora] = fechaHora.split(' ');
    let [year, month, day] = fecha.split('-');
    const date = new Date(year, month - 1, day);

    const meses = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let fechaFormateada = `${meses[date.getMonth()]} ${date.getDate()}`;
    setDateF(fechaFormateada);
    setDateT(hora);
  };

  const fetchData = async (location) => {
    try {
      const [result, result1] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=4c9a9aef03624a3f9b7133549242110&q=${location}&days=1`).then(res => res.json()),
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=4c9a9aef03624a3f9b7133549242110&q=${location}&days=7`).then(res => res.json())
      ]);

      setData(result);
      setDataSemana(result1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('Bucaramanga');
  }, []);

  useEffect(() => {
    if (data) {
      filteredData(data.location.localtime);
    }
  }, [data]);

  useEffect(() => {
    if (dataSemana) {
      const formatedArray = dataSemana.forecast.forecastday.map((item) => {
        const date = new Date(item.date);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
        const dayName = daysOfWeek[date.getUTCDay()];

        return {
          date: dayName,
          temp: item.day.avgtemp_c
        };
      });
      setDatesForecast(formatedArray);
    }
  }, [dataSemana]);

  useEffect(() => {
    if (dataSemana) {
      const meses = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];


      const formatedArray = dataSemana.forecast.forecastday.map((item) => {
        
        const [fecha, hora] = item.date.split(' ');
        const [year, month, day] = fecha.split('-');
        const date1 = new Date(year, month - 1, day);
        const fechaFormateada = `${meses[date1.getMonth()]} ${date1.getDate()}`;
        const date = new Date(item.date);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = daysOfWeek[date.getUTCDay()];

        return {
          date: dayName,
          fecha: fechaFormateada,
          maxtemp: item.day.maxtemp_c,
          mintemp: item.day.mintemp_c,
          img: item.day.condition.icon,
          text: item.day.condition.text
        };
      });
      
      setDatesTenDays(formatedArray);
    }
  }, [dataSemana]);



  useEffect(() => {
    if (data) {
      const fData = data.forecast.forecastday[0].hour.map((item) => {
        let [fecha, hora] = item.time.split(' ');
        return {
          temp: item.temp_c,
          hora: hora,
          img: item.condition.icon
        };
      });
      setDateHours(fData);
    }
  }, [data]);

  useEffect(() => {
    if (dataSemana) {
      const fData = dataSemana.forecast.forecastday[1].hour.map((item) => {
        let [fecha, hora] = item.time.split(' ');
        return {
          temp: item.temp_c,
          hora: hora,
          img: item.condition.icon
        };
      });
      setDateHoursWeek(fData);
    }
  }, [dataSemana]);

  useEffect(() => {
    if (data) {
      const auxData = data.forecast.forecastday[0].hour.map((item) => {
        let [fecha, hora] = item.time.split(' ');
        return {
          chance: item.chance_of_rain,
          hora: hora,
        };
      });
      setDatesHoursRain(auxData);
    }
  }, [data]);

  useEffect(() => {
    if (dataSemana) {
      const auxData = dataSemana.forecast.forecastday[1].hour.map((item) => {
        let [fecha, hora] = item.time.split(' ');
        return {
          chance: item.chance_of_rain,
          hora: hora,
        };
      });
      setDatesHoursRainTomorrow(auxData);
    }
  }, [dataSemana]);

  const handleButtonClick = () => {
    if(searchTerm){
      fetchData(searchTerm);
    }
  };

  const TodayRender = () => {
    return (
      <div>
        <section className='mx-4 mt-4 flex flex-col gap-y-4'>
          <div className='flex flex-wrap justify-between gap-y-4'>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/air.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Wind speed</p>
                <p>{data.current.wind_kph}km/h</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/rainy.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Rain chance</p>
                <p>{data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/waves.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Pressure</p>
                <p>{data.current.pressure_mb} hpa</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/light_mode.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>UV index</p>
                <p>{data.current.uv}</p>
              </div>
            </div>
          </div>
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/rainy.svg" alt="" className='w-[70%]' />
            </div>
            <p>Hourly forecast</p>
          </div>
          <div className='flex overflow-x-scroll gap-x-4'>
            {dateHours ? (
              dateHours.map((val) => {
                return (
                  <div className='flex flex-col items-center justify-center text-sm gap-y-1'>
                    <p>{val.hora}</p>
                    <img src={val.img} alt="" />
                    <p>{val.temp}°</p>
                  </div>
                )
              })
            ) : "Loading ..."}

          </div>
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/calendar_month.svg" alt="" className='w-[70%]' />
            </div>
            <p>Day forecast</p>
          </div>
          {datesForecast && <LineChart data={datesForecast} />}
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/rainy.svg" alt="" className='w-[70%]' />
            </div>
            <p>Chance of rain</p>
          </div>
          <div className='h-[150px] overflow-y-scroll'>
            {datesHoursRain && <BarChart data={datesHoursRain} />}
          </div>
        </section>
        <section className='mx-4 mt-4 flex flex-col rounded-xl'>
          <div className='flex flex-wrap justify-between gap-y-4 mb-4'>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/nights_stay.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Sunrise</p>
                <p>{data.forecast.forecastday[0].astro.sunrise}</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/history_toggle_off.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Sunset</p>
                <p>{data.forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const TomorrowRender = () => {
    return (
      <div>
        <section className='mx-4 mt-4 flex flex-col gap-y-4'>
          <div className='flex flex-wrap justify-between gap-y-4'>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/air.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Wind speed</p>
                <p>{dataSemana.forecast.forecastday[1].day.maxwind_kph}km/h</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/rainy.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Rain chance</p>
                <p>{dataSemana.forecast.forecastday[1].day.daily_chance_of_rain}%</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/waves.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Pressure</p>
                <p>{dataSemana.forecast.forecastday[1].hour[0].pressure_mb} hpa</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/light_mode.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>UV index</p>
                <p>{dataSemana.forecast.forecastday[1].day.uv}</p>
              </div>
            </div>
          </div>
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/rainy.svg" alt="" className='w-[70%]' />
            </div>
            <p>Hourly forecast</p>
          </div>
          <div className='flex overflow-x-scroll gap-x-4'>
            {dateHoursWeek ? (
              dateHoursWeek.map((val) => {
                return (
                  <div className='flex flex-col items-center justify-center text-sm gap-y-1'>
                    <p>{val.hora}</p>
                    <img src={val.img} alt="" />
                    <p>{val.temp}°</p>
                  </div>
                )
              })
            ) : "Loading ..."}

          </div>
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/calendar_month.svg" alt="" className='w-[70%]' />
            </div>
            <p>Day forecast</p>
          </div>
          {datesForecast && <LineChart data={datesForecast} />}
        </section>
        <section className='mx-4 mt-4 bg-searchC bg-opacity-30 flex flex-col rounded-xl gap-y-2 py-4 px-4'>
          <div className='flex gap-x-2 flex items-center'>
            <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
              <img src="/rainy.svg" alt="" className='w-[70%]' />
            </div>
            <p>Chance of rain</p>
          </div>
          <div className='h-[150px] overflow-y-scroll'>
            {datesHoursRainTomorrow && <BarChart data={datesHoursRainTomorrow} />}
          </div>
        </section>
        <section className='mx-4 mt-4 flex flex-col rounded-xl'>
          <div className='flex flex-wrap justify-between gap-y-4 mb-4'>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/nights_stay.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Sunrise</p>
                <p>{dataSemana.forecast.forecastday[1].astro.sunrise}</p>
              </div>
            </div>
            <div className='bg-searchC flex justify-center gap-x-4 items-center w-[48%] rounded-xl bg-opacity-30 py-1'>
              <div className='bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center '>
                <img src="/history_toggle_off.svg" alt="" className='w-[70%]' />
              </div>
              <div className='text-sm'>
                <p>Sunset</p>
                <p>{dataSemana.forecast.forecastday[1].astro.sunset}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const TenDaysRender = () => {
    return (
      <div className='m-4 flex flex-col gap-y-4'>
        {datesTenDays && datesTenDays.map((item) => {
          return (
            <div className='flex justify-between bg-searchC bg-opacity-30 px-4 py-3 items-center rounded-xl'>
              <div>
                <p className='font-bold'>{item.date}, {item.fecha}</p>
                <p>{item.text}</p>
              </div>
              <div className='flex gap-x-4 items-center'>
                <div className='text-sm font-bold text-right border-r border-black pr-3'>
                  <p>{item.maxtemp}</p>
                  <p>{item.mintemp}</p>
                </div>
                <div className='w-10'>
                  <img src={item.img} alt="" className='w-full' />
                </div>
                <div className='self-start'>
                  <img src="/read.svg" alt="" />
                </div>
              </div>
            </div>
          )
        })}

      </div>
    )
  }

  return (
    <div className="">
      {data ? (
        <div className='bg-bgHome'>
          <section className="bg-[url('/background.svg')] bg-cover bg-bottom h-[50%]  rounded-b-[30px] px-4 py-4 text-white flex flex-col gap-y-10">
            <div className='flex justify-between text-lg'>
              <p>{data.location.name}, {data.location.country}</p>
              <div className='flex bg-searchC rounded-lg px-2 bg-opacity-50'>
                <input type="text" className='bg-transparent w-[120px]' value={searchTerm} onChange={handleInputChange} />
                <img src="/search.svg" alt="" onClick={handleButtonClick} />
              </div>
            </div>
            <div className='flex justify-between items-end'>
              <div className='flex items-end leading-none'>
                <p className='text-[70px]'>{data.current.temp_c}°</p>
                <p className='text-xs text'>Feels like {data.current.feelslike_c}°</p>
              </div>
              <div className='flex flex-col items-center'>
                <img src={data.current.condition.icon} alt="" className='w-[100px]' />
                <p className='text-sm text-center'>{data.current.condition.text}</p>
              </div>
            </div>
            <div className='flex justify-between mt-8'>
              <p>{dateF}, {dateT}</p>
              <p>{data.current.is_day ? 'Day' : 'Nigth'}</p>
            </div>
          </section>
          <section className='mx-4 mt-4'>
            <div className='flex justify-between text-md'>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center' onClick={() => handleViewChange('today')}>
                <p>Today</p>
              </div>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center' onClick={() => handleViewChange('tomorrow')}>
                <p>Tomorrow</p>
              </div>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center' onClick={() => handleViewChange('7days')}>
                <p>7 days</p>
              </div>
            </div>
          </section>
          {view === 'today' && (
            <TodayRender />
          )}
          {view === 'tomorrow' && (
            <TomorrowRender />
          )}
          {view === '7days' && (
            <TenDaysRender />
          )}

        </div>
      ) : (
        <p>Loading ...</p>
      )}

    </div>
  )


}

export default Home