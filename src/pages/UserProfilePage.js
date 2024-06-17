import UserProfile from "../features/user/components/UserProfile";
import NavBar from "../features/navbar/Navbar";
function UserProfilePage() {
    return (
        <div>
            <NavBar>
                <h1 className='mx-auto text-2'>My Profile</h1>
                <UserProfile></UserProfile>
            </NavBar>
        </div>
      );
}

export default UserProfilePage;