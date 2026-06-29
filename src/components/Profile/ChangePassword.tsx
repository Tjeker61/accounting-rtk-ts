import {useState} from "react";

interface Props {
    close: () => void
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleClickClear = () => {
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const handleClickSave = () => {
        // TODO: send request to backend
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        alert("Save and close clicked")
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