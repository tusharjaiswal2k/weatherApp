import React from 'react'

function TopButtons({ setQuery }) {
    const cities = [
        {
            id: 1,
            title: "Delhi"
        },
        {
            id: 2,
            title: "Faridabad"
        },
        {
            id: 3,
            title: "Noida"
        },
        {
            id: 4,
            title: "Hapur"
        },
        {
            id: 5,
            title: "Jaipur"
        },
    ]
    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => {
                return <button key={city?.id} onClick={() => { setQuery({ q: city?.title }) }} className='text-white text-lg font-medium'>{city?.title}</button>
            })}
        </div>
    )
}

export default TopButtons