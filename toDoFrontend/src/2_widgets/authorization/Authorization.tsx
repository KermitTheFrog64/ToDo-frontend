import { useState } from "react"
import { LogIn, SignUp } from "."


const Authorization: React.FC = () => {

    const [form, setForm] = useState<string>("login")

    const onLoginClick = () => setForm("login")

    const onSignupClick = () => setForm("signup")

    return (

        <div className="form">
            <div>
                <div
                    onClick={onLoginClick}
                    className="current-choise"
                >
                    Log in
                </div>
                <div
                    onClick={onSignupClick}
                    className="current-choise"
                >
                    Sign up
                </div>
            </div>
            <div>
                {form === 'login' ? <LogIn /> : <SignUp />}
            </div>
        </div>
    )
}

export default Authorization