import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {registerUser} from "../../features/api/accountingApi.ts";

const SignUp = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const dispatch = useAppDispatch()

    const handleClickSignUp = () => {
        dispatch(registerUser({
            firstName, lastName, login, password
        }))
    }

    const handleClickClear = () => {
        setLogin("")
        setPassword("")
        setFirstName("")
        setLastName("")
    }

    return (
        <>
            <label>Login:
                <input value={login}
                       onChange={(e) => setLogin(e.target.value)} type={"text"}/>
            </label>
            <label>Password:
                <input type={"password"}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>First Name:
            <input type={"text"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}/>
            </label>
            <label>Last Name:
            <input type={"text"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}/>
            </label>
            <button onClick={handleClickSignUp}>Sign Up</button>
            <button onClick={handleClickClear}>Clear</button>

        </>
    );
};

export default SignUp;