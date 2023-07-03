import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '../components/Appointments/Form'

function appointment() {
    var session = useSession()
    var router = useRouter()
    var [data, setData] = React.useState(null)
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            router.push('/login')
        } else if (session.status === 'authenticated') {
            setData(session.data.user)
            console.log(session.data.user)
        }
    }, [session])

    return (
        <div className='min-h-full w-full'>
            <div className='flex justify-center'>
                {(!!data) && <Form data={data} />}
            </div>


        </div>
    )
}

export default appointment