import React from 'react'
import dayjs from 'dayjs'
// import edtednDate



function Form({ data }) {
    var [newData, setNewData] = React.useState({
        email: data.email,
        name: "",
        number: "",
        specialist: "",
    })
    let [formno, setFormno] = React.useState(1)
    function getData(e) {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'appointedDate') {
            setAppointedDate(e.target.value)
        }
    }

    function onNext(e) {
        var input = document.querySelectorAll('input')
        var select = document.querySelector('select')
        e.preventDefault()

        for (var i = 0; i < input.length; i++) {
            input[i].style.border = '1px solid #e5e7eb'
            if (input[i].value === '') {
                input[i].style.border = '1px solid red'
                return
            }
        }
        if (select.value === '') {
            select.style.border = '1px solid red'
            return
        } else {
            select.style.border = '1px solid transparent'
        }

        setFormno(2)
    }
    let [dayLeft, setDayLeft] = React.useState("")

    function getDate(e) {
        var date = new Date(e.target.value)
        var today = new Date()

        if ((date == today) || (date > today)) {
            setNewData({
                ...newData,
                [e.target.name]: e.target.value
            })
            // generate like 2 days left
            var getLeft = dayjs(e.target.value).diff(dayjs(), 'day')

            setDayLeft(`${getLeft + 1} days left for your Appointment`)

        } else {
            alert('Please select a valid date')
            e.target.value = ""
            return
        }


    }

    return (
        <section className="relative w-4/6 flex flex-wrap lg:h-screen lg:items-center ">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Book Your Appointment!</h1>

                    <p className="mt-4 text-gray-500">
                        Please fill all the form fields with genuene data to book your appointment.
                    </p>
                </div>

                {(formno == 1) && <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input name="email" onChange={(e) => getData(e)}
                                type="email"
                                defaultValue={data.email}
                                readOnly
                                className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <div className="relative">
                            <input name="name" onChange={(e) => getData(e)}
                                type="text"
                                className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Full Name"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="name" className="sr-only">Contact Number</label>
                        <div className="relative">
                            <input name="number" onChange={(e) => getData(e)}
                                type="number"
                                className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter your contact number"
                            />
                        </div>
                    </div>
                    <h2 classNameName='text-xl '>Appointment For</h2>

                    <div>
                        <label htmlFor="name" className="sr-only"></label>
                        <select onChange={(e) => getData(e)} name="specialist" id="" className='select p-2 bg-black border-gray-600'>
                            <option value="">Select</option>
                            <option value="general">General/ सामान्य</option>
                            <option value="dental">Dental/ दन्त</option>
                            <option value="eye">Eye/ आँखा</option>
                            <option value="skin">Skin/ छाला</option>
                            <option value="heart">Heart/ मुटु</option>
                            <option value="kidney">Kidney/ कलेजो</option>
                            <option value="neurology">Neurology/ नशां</option>
                            <option value="orthepedic">Orthopedic/ हड्डी</option>
                            <option value="gynecology">Gynecology/ प्रसूति</option>
                            <option value="ent">ENT/ कान</option>
                            <option value="psychiatry">Psychiatry/ मानसिक</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={(e)=>onNext(e)}
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Next
                        </button>
                    </div>
                </div>


                }
                {(formno == 2) && <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative ">
                            <input name='appointmentDate' onChange={(e) => getDate(e)}
                                type="date"
                                className="w-full rounded-lg border-gray-200 text-black p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                        </div>
                        <h2 classNameName='py-5'>{dayLeft}</h2>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            // onClick={onNext2}
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Next
                        </button>
                    </div>
                </div>}

            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt="Welcome"
                    src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    )
}

export default Form