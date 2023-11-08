import React, { useEffect } from 'react'


function Appointmentmode({ response, user, specialist }) {
    var [messages, setMessages] = React.useState([])

    useEffect(() => {
        var aijson = {
            message: "So, you have ' " + response + " ' as your problem. And you should Visit ' " + specialist + " ' for this.",
            type: "ai"
        }
        if (response) {
            setMessages([...messages, aijson])
        }
    }, [response])

    return (
        <div className='relative h-full gap-0'>
            {
                messages.map((message, index) => {
                    if (message.type === "ai") {
                        return <AIresponse key={index} response={message.message} />
                    } else {
                        return <Humanresponse key={index} response={message.message} />
                    }
                }
                )
            }
            <AIresponse response="These are the doctors with the speciality. Wanna Appoint with one of them?" />
            {doctors.map((doctor, index) => {
                return (
                    <AIresponse key={index} response={doctor.name} />
                )
            })}
            <div
                className="flex flex-row items-center h-16 rounded-xl absolute bottom-1 w-full px-4"
            >

                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                            placeholder='Chat with Dr. Cap'
                            type="text"
                            className="flex w-full border p-3 rounded-xl focus:outline-none focus:border-indigo-300 "
                        />

                    </div>
                </div>
                <div className="ml-4">
                    <button
                        className="btn btn-primary"

                    >
                        <span>Send</span>
                        <span className="ml-2">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Appointmentmode



function AIresponse({ response }) {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                >
                    AI
                </div>
                <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                >
                    <div>
                        {response}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Humanresponse({ response }) {
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0"
                >
                    ME
                </div>
                <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                >
                    <div>{response}</div>
                </div>
            </div>
        </div>
    )
}