import React, { useEffect } from 'react';
import Timeline from '../components/Home/Timeline';
import Doctors from '../components/Home/Doctors';
import { useSession } from 'next-auth/react';
import Dashboard from '../components/LoggedIn/Dashboard';
import { useRouter } from 'next/router';
import Slider from '../components/Home/Slider';


const Home = () => {
  let session = useSession()
  const [auth, setAuth] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)
  const [isDoctor, setIsDoctor] = React.useState(false)
  let Router = useRouter()

  function isDoc() {
    fetch('/api/doctor/isDoctor')
      .then(res => res.json())
      .then(data => {
        let status = data.status
        if (status) {
          setIsDoctor(true)
        } else {
          setIsDoctor(false)
        }
        setLoading(false)
      })
  }


  useEffect(() => {
    if (session.status === 'authenticated') {
      setAuth(true)
      setUser(session.data.user)
      isDoc()
    } else if (session.status === 'unauthenticated') {
      setAuth(false)
      setLoading(false)
    }
  }, [session.status])

  if (auth && isDoctor) {
    Router.push('/admin/doctor')
    return
  }

  return (
    <div className="">
      {(!loading) && <div>
        {(!auth) && <div className="flex flex-col gap-2">
          <div class="h-screen max-w-screen overflow-hidden">
            <Slider />
          </div>
          <Timeline />
          <Doctors />
        </div>}
        {(auth && !isDoctor) && <div className="flex flex-col gap-2">
          <Dashboard user={user} />
        </div>}
      </div>}
    </div>
  );
}

export default Home;
