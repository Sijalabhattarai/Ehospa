import React, { useEffect } from 'react'

function admin() {
    var [isAdmin, setIsAdmin] = React.useState(false)
    var [loadin, setLoadin] = React.useState(true)
    function getUser() {
        fetch('/api/user/getLogged')
            .then(response => response.json())
            .then(data => {
                setLoadin(false)

                if (data.data.role == 'admin') {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            })
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='min-h-screen flex items-center justify-center flex-col'>
            {loadin ? <div className='text-2xl'>Loading...</div> : isAdmin ? <div className='text-2xl'>Admin</div> : <div className='text-2xl'>Not Admin</div>}
        </div>
    )
}

export default admin