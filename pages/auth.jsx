import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function auth() {
    var session = useSession()
    var [auth, setAuth] = React.useState(false)
    var router = useRouter()
    useEffect(() => {
        if (session.status === 'authenticated') {
            var email = session.data.user.email
            var name = session.data.user.name
            var image = session.data.user.image
            updateData(email, name, image)

        }
    }, [session])

    function updateData(e, n, i) {
        fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: n, email: e, image: i }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Success') {
                    router.push('/')
                }
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );


    }
    return (
        <div>auth</div>
    )
}

export default auth