import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function logout() {
    var session = useSession()
    var router = useRouter()
    useEffect(() => {
        if (session.status === 'authenticated') {
            signOut()
            router.push('/')
        } else if (session.status === 'unauthenticated') {
            router.push('/')
        }
    }, [session])


    return (
        <div>Redirecting...</div>
    )
}

export default logout