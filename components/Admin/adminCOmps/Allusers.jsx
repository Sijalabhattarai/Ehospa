import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import EditUserModal from './EditUser'

function Allusers() {
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})


    function editUser(e) {
        setEdit(true)
        setUser(e)
        console.log(e)
    }

    function cancelView() {
        setEdit(false)
    }


    function getAllUsers() {
        fetch('/api/user/getall')
            .then(response => response.json())
            .then(data => {
                // reverse data to show latest users first
                let revData = data.data.reverse()
                setUsers(revData)
            })
    }

    function deleteData(e) {
        fetch('/api/user/delete?id=' + e)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    alert('User Deleted')
                    getAllUsers()
                } else {
                    alert('Something went wrong, ' + data.message)
                }
                getAllUsers()
            })
    }

    function editUserData(e) {
        fetch('/api/user/editUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    alert('User Updated')
                    getAllUsers()
                    setEdit(false)
                    setUser({})
                } else {
                    alert('Something went wrong, ' + data.message)
                }
                getAllUsers()
            })
    }

    useEffect(() => {
        getAllUsers()
    }
        , [])
    return (
        <div className='flex-1 px-2 pt-8 py-3 sm:px-0'>
            <Head>
                <title>All Users | Admin</title>

            </Head>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extralight text-white/50">All Users</h3>
            </div>

            <div className="relative pt-10 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Joined
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            let date = new Date(user.createdAt)
                            let today = new Date()
                            let diff = today - date
                            let days = Math.floor(diff / (1000 * 60 * 60 * 24))
                            let hours = Math.floor(diff / (1000 * 60 * 60))
                            let minutes = Math.floor(diff / (1000 * 60))
                            let seconds = Math.floor(diff / (1000))
                            let time = ''
                            if (days > 0) {
                                time = days + ' days ago'
                            }
                            else if (hours > 0) {
                                time = hours + ' hours ago'
                            }
                            else if (minutes > 0) {
                                time = minutes + ' minutes ago'
                            }
                            else {
                                time = seconds + ' seconds ago'
                            }

                            return (
                                <tr className=" bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-800" key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                        <img className="h-10 w-10 rounded-full" src={user.image} referrerPolicy='no-referrer' alt="" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {time}
                                    </td>
                                    <td className="px-6 flex gap-2 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <button onClick={() => editUser(user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteData(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )}


                    </tbody>
                </table>
            </div>
            {(edit) && <EditUserModal user={user} onClose={editUserData} cancel={cancelView} />}

        </div>
    )
}

export default Allusers