import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  var session = useSession()
  var router = useRouter()
  var [loading, setLoading] = useState(true)
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/")
      setLoading(false)
    } else if (session.status === "loading") {
      setLoading(true)

    } else {
      setLoading(false)
    }
  }, [session])
  return (
    <div>
      {(!loading) && <div className="logincontainer">
        <div className="logincard">
          <h3 className="text5">Login and Take Appointment</h3>
          <div className="image-container">
            <img
              className="loginimg"
              src="https://t4.ftcdn.net/jpg/02/74/73/01/360_F_274730119_ht4FXz4R6RnIJgPk7WeNALxxaf524Jrb.jpg"
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="button-container">
            <button
              className="login-button google"
              onClick={() => signIn("google", { callbackUrl: '/auth' })}
            >
              Login with Google
            </button>
            <button
              className="login-button facebook"
              onClick={() => signIn("facebook")}
            >
              Login with Facebook
            </button>
          </div>
          <h5 className="p">
            By logging in, you accept our Terms and Conditions.
          </h5>
        </div>
      </div>}
    </div>
  );
};

export default LoginPage;

