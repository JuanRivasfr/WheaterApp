import React, { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
          try {
            const response = await fetch('https://api.weatherapi.com/v1/current.json?key=4c9a9aef03624a3f9b7133549242110&q=Bucaramanga&lang=eshttps://api.weatherapi.com/v1/current.json?key=4c9a9aef03624a3f9b7133549242110&q=Bucaramanga&lang=es');
            const result = await response.json();
            setData(result);
            console.log(data);
            
          } catch (error) {
            console.error('Error fetching initial data:', error);
          }
        };
    
        fetchInitialData();
      }, []); 
    
      const handleButtonClick = async () => {
        try {
          const response = await fetch('https://api.example.com/new-data');
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching new data:', error);
        }
      };

    return (
        <div className="h-screen">
            <section className="bg-[url('/background.svg')] bg-cover bg-bottom h-[50%]  rounded-b-[30px]">
                <div>
                    <p></p>
                </div>
            </section>
        </div>
    )
}

export default Home