import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Appointmentmode from './Appointmentmode'

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

function Assistant() {
    var session = useSession()
    var [response, setResponse] = useState('')
    var [messageData, setMessageData] = useState([])
    var [userData, setUserData] = useState(null)
    var [bookApp, setBookApp] = useState(false)
    var [appointmentMode, setAppointmentMode] = useState(false)
    var [appointLoading, setAppointLoading] = useState(false)
    var [specialist, setSpecialist] = useState('')
    var router = useRouter()

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            router.push('/login')
        } else if (session.status === 'authenticated') {
            setUserData(session.data.user)
        }
    }, [session])

    function sendResponse() {
        if (!!response) {
            if ((response == ("hi") || response == ("hello") || response == "hey")) {
                var messagejson = {
                    'message': response,
                    'type': 'human'
                }
                var AIjson = {
                    'message': 'Hello, I am Dr. Cap, your AI assistant. How can I help you?',
                    'type': 'ai'
                }
                setMessageData([...messageData, messagejson, AIjson])
                setResponse('')
                return
            }

            if ((response == ("bye") || response == ("tata") || response == ("see you"))) {
                var messagejson = {
                    'message': response,
                    'type': 'human'
                }
                var AIjson = {
                    'message': 'Bye, I hope I was able to help you. Have a nice day!',
                    'type': 'ai'
                }
                setMessageData([...messageData, messagejson, AIjson])
                setResponse('')
                return
            }

            if ((response == ("good night"))) {
                var messagejson = {
                    'message': response,
                    'type': 'human'
                }
                var AIjson = {
                    'message': 'Good night, I hope I was able to help you. Have a warm night!',
                    'type': 'ai'
                }
                setMessageData([...messageData, messagejson, AIjson])
                setResponse('')
                return
            }
            if (bookApp && response.toLowerCase() === 'yes') {

                var messagejson = {
                    'message': response,
                    'type': 'human'
                }
                var AIjson = {
                    'message': 'To Book the appointment, please click the second option on left. Thank you',
                    'type': 'ai'
                }
                setMessageData([...messageData, messagejson, AIjson])
                setAppointLoading(true)
                setTimeout(() => {
                    setAppointLoading(false)
                }, 3000);
                setBookApp(false)
                router.push('/')
                setResponse(messageData[messageData.length - 2].message)
                setTimeout(() => {
                    setResponse('')
                }, 15000);
                return
            }

            if (bookApp && response.toLowerCase() === 'no') {
                var messagejson = {
                    'message': response,
                    'type': 'human'
                }
                var AIjson = {
                    'message': 'Okay, I hope I was able to help you. Have a nice day, You have any other queries?',
                    'type': 'ai'
                }
                setMessageData([...messageData, messagejson, AIjson])
                setResponse('')
                setBookApp(false)

                return
            }



            var messagejson = {
                'message': response,
                'type': 'human'
            }



            getResponse(response, messagejson)
            setResponse('')
        }
    }

    function getResponse(e, m) {
        fetch('/api/ai/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: e }),
        })
            .then(response => response.json())
            .then(data => {
                var result = data.data
                if (data.status) {
                    setSpecialist(data.data)
                    result = 'You should Visit a ' + result + ' for your problem. You should book an appointment. Do you want to book an appointment?'
                    setBookApp(true)
                    var AIjson = {
                        'message': result,
                        'type': 'ai'
                    }
                    var messagejson = m
                    setMessageData([...messageData, messagejson, AIjson])
                } else {
                    var AIjson = {
                        'message': result,
                        'type': 'ai'
                    }
                    var messagejson = m
                    setMessageData([...messageData, messagejson, AIjson])
                }
                setResponse('')
            }
            )
    }

    return (
        <div className='h-screen flex justify-center items-center flex-col w-full '>
            <h2 className='text p-5 sm:text-xl text-3xl text-warning font-bold'>Ask Dr. Cap, our GPT-3 Powered AI Doctor, assisting you with your problem</h2>
            {(!appointmentMode) && <div id='assisMenu' className="chatBox flex h-5/6 w-3/4 antialiased text-gray-600 ">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div
                            className="flex flex-col flex-auto flex-shrink-0 overflow-x-auto rounded-2xl bg-slate-800 h-full p-4"
                        >
                            <div className="flex flex-col  h-full overflow-x-auto mb-4">
                                <div className="flex flex-col justify-end items-end h-full ">
                                    {(messageData.length > 0) && <div className="grid grid-cols-12 w-full gap-y-2">
                                        {messageData.map((message) => {
                                            if (message.type == 'human') {
                                                return (
                                                    <Humanresponse
                                                        key={message.message}
                                                        response={
                                                            message.message
                                                        }
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <AIresponse
                                                        key={message.message}
                                                        response={
                                                            message.message
                                                        }
                                                    />
                                                )
                                            }
                                        })}
                                    </div>}
                                    {(messageData.length == 0) && <div className="flex h-full w-full items-center justify-center ">
                                        <h2 className='text text-primary'>
                                            Ask Dr. Cap, our GPT-3 Powered AI Doctor, assisting you with your problem
                                        </h2>
                                    </div>}

                                </div>
                            </div>
                            <div
                                className="flex flex-row items-center h-16 rounded-xl bg-gray-800 w-full px-4"
                            >

                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <input
                                            onChange={(e) => setResponse(e.target.value)}
                                            value={response}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    sendResponse()
                                                }
                                            }
                                            }
                                            placeholder='Chat with Dr. Cap'
                                            type="text"
                                            className="flex w-full border p-3 rounded-xl focus:outline-none focus:border-indigo-300 "
                                        />

                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        className="btn btn-primary"
                                        onClick={sendResponse}
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
                    </div>
                </div>
            </div>}
            {(appointmentMode) && <div className='chatBox apmode rounded-2xl flex h-4/6 xs:w-1/4 w-2/4 antialiased text-gray-800 '>
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col flex-auto h-full">
                        {(!appointLoading) && <div className="flex flex-col flex-auto flex-shrink-0 overflow-x-auto rounded-2xl  h-full p-2">
                            <Appointmentmode response={response} user={userData} specialist={specialist} />
                        </div>}
                        {(appointLoading) && <div className="flex flex-col flex-auto flex-shrink-0 overflow-x-auto rounded-2xl  h-full p-2">
                            <div className="flex flex-col  h-full overflow-x-auto mb-4">
                                <div className="flex flex-col justify-end items-end h-full ">
                                    <div className="flex flex-col h-full w-full items-center justify-center ">
                                        <h2 className='text text-white'>
                                            Switching to Appointment mode...
                                        </h2>
                                        <p className='text text-white'>
                                            Only post genuene problems and details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Assistant