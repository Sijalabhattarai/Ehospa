import React from 'react'

function Landing() {
    return (
        <div className="hero " style={{ backgroundImage: "url('https://i.ibb.co/CP3zw1N/image-3.png')" }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md animateUp">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Welcome to E-hospa, where you can book and track your appointment, chat with virtual assistant that will assist you and many more.</p>
                    <button className="bg-blue-800 p-2 px-5 hover:bg-blue-600 rounded-full text-green">Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default Landing