import ProfileData from "./ProfileData.tsx";
import UpdateUser from "./UpdateUser.tsx";

const Index = () => {
    const handleClickLogout = () => {
        // todo: send request to backend
        alert("Logout clicked")
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Index;