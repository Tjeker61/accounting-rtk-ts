import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountingApi.ts";
import {createToken} from "../../utils/constans.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

interface Props {
    close: () => void
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useAppDispatch()
    const  [changePassword] = useChangePasswordMutation()
    const token = useAppSelector((state) => state.token)
    const {data} = useFetchUserQuery(token, {skip: !token})

    const handleClickClear = () => {
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const handleClickSave = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        const token = createToken(data!.login, oldPassword)
        try {
            const {error} = await changePassword({newPassword, token})
            if (error) {
                console.log('change password error: ', error)
            }
        } catch (e) {
            console.log('unknown error:')
        }
        dispatch(setToken(createToken(data!.login, newPassword)))
        close()
    }

    const handleClickClose = () => {
        close()
    }

    return (
        <>
            <label>Old password:
                <input type={"password"}
                       value={oldPassword}
                       onChange={(e) => setOldPassword(e.target.value)}/>
            </label>
            <label>New password:
                <input type={"password"}
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}/>
            </label>
            <label>Confirm password:
                <input type={"password"}
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={handleClickClose}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;