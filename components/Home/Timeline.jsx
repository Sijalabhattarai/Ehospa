import React from 'react'

function Timeline() {
    return (
        <div className='min-h-screen '>
            <h2 className='text-center text-white font-bold sm:text-4xl text-2xl p-5'>Our Features</h2>
            <div className="mx-auto w-full h-full py-10 sm:px-20 px-50">
                <div className="relative wrap overflow-hidden sm:p-10 p-2 h-full">
                    <div className="mb-8 flex justify-between items-center w-full sm:right-timeline left-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                        </div>
                        <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-3 font-bold text-gray-800 text-xl">Create Appointment</h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Create appointment with doctor, see when they are available and mark appointment. Our system will remind you your appointment and also track them.</p>
                        </div>
                    </div>

                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                        </div>
                        <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-3 font-bold text-white text-xl">Smart Suggestions</h3>
                            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">On the base of user, out system will provide smart suggestions on their dashboard, and help user to change their lifestyle to healthy.</p>
                        </div>
                    </div>

                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                        </div>
                        <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-3 font-bold text-gray-800 text-xl">Smart Assistant</h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">With smart assistant, you can get learn about diseases, create appointments, search doctor's details and many more.</p>
                        </div>
                    </div>

                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                            <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
                        </div>
                        <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-3 font-bold text-white text-xl">A Better Lifestyle</h3>
                            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">This application will help you to achieve a better and healthy lifestyle, completely different from which you are living now.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline