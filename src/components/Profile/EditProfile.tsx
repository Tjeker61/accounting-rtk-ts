import {useState} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/api/accountingApi.ts";

interface Props {
    close: () => void
}

const EditProfile = ({close}: Props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [updateUser] = useUpdateUserMutation()
    const token = useAppSelector(state => state.token)
    const {data} = useFetchUserQuery(token)


    const handleClickSave = async () => {
        try {
            const {error} = await updateUser({user: {firstName, lastName}, login: data!.login})
            if (error) {
                console.log('update user error: ', error)
            }
        } catch (e) {
            console.log('unknown error:')
        }
        close()
    }

    const handleClickClose = () => {
        close()
    }

    const handleClickClear = () => {
        setFirstName("")
        setLastName("")
    }

    return (
        <>
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
            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={handleClickClose}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default EditProfile;