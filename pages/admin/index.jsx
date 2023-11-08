import React, { useEffect } from 'react'
import Adminhome from '../../components/Admin/Adminhome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function admin() {
    var [isAdmin, setIsAdmin] = React.useState(false)
    var [loadin, setLoadin] = React.useState(true)
    var router = useRouter()
    var session = useSession()
    useEffect(() => {
        if (session.status === 'authenticated') {
            getUser()
        } else if (session.status === 'unauthenticated') {
            router.push('/')
        }
    }, [session])

    function getUser() {
        fetch('/api/user/getLogged')
            .then(response => response.json())
            .then(data => {
                setLoadin(false)
                if (data.data.role == 'admin') {
                    setIsAdmin(true)
                    if (!router.query.to) {
                        router.push('?to=doctors')
                    }
                } else {
                    setIsAdmin(false)
                    setTimeout(() => {
                        router.push('/')
                    }, 2000);
                }
            })
    }


    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center flex-col'>
            {loadin ? <div className='text-2xl'>Loading...</div> : isAdmin ? <Adminhome /> : <div className='text-2xl'>
                You are not the admin of this page. Redirecting to home page...
            </div>}
        </div>
    )
}

export default admin