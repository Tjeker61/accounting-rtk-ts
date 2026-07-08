import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery} from "../../features/api/accountingApi.ts";

const ProfileData = () => {
    const token = useAppSelector((state) => state.token)
    const {data, isLoading} = useFetchUserQuery(token, {skip: !token})

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>User not found</p>
    }

    const {firstName, lastName, login, roles} = data

    return (
        <>
            <p>First name: {firstName}</p>
            <p>Last name: {lastName}</p>
            <p>Login: {login}</p>
            <ul>
                { roles.map((role) => <li key={role}>{role}</li>)}
            </ul>

        </>
    );
};

export default ProfileData;