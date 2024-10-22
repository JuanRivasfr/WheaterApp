import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateF, setDateF] = useState('');
  const [dateT, setDateT] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredData = (obj) => {
    let fechaHora = obj

    let [fecha, hora] = fechaHora.split(' ');

    let [year, month, day] = fecha.split('-');
    const date = new Date(year, month - 1, day);

    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    let fechaFormateada = `${meses[date.getMonth()]} ${date.getDate()}`;
    setDateF(fechaFormateada)
    setDateT(hora)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=4c9a9aef03624a3f9b7133549242110&q=Bucaramanga&lang=es&days=1');
        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (data) {
      filteredData(data.location.localtime);
    }
  }, [data]);



  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4c9a9aef03624a3f9b7133549242110&q=${searchTerm}&lang=es&days=1`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }
  };

  return (
    <div className="h-screen bg-bgHome">
      {data ? (
        <div>
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
          <section className='mx-4 my-4'>
            <div className=' flex justify-between text-md'>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center'>
                <p>Today</p>
              </div>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center'>
                <p>Tomorrow</p>
              </div>
              <div className='bg-white w-[110px] py-2 rounded-lg flex justify-center'>
                <p>10 days</p>
              </div>
            </div>
            <div>
              <div className='bg-searchC'>
                <div>
                  <img src="/air.svg" alt="" />
                </div>
                <div>
                  <p>Wind speed</p>
                  <p>{data.current.wind_kph}km/h</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Loading ...</p>
      )}

    </div>
  )


}

export default Home