import { useSelector } from "react-redux";
import { RootState } from '../../store';
// GetAccess to profile name or id from redux state
// display in the profile component


const Profile = () => {
  const {user} = useSelector((state: RootState) => state.user);
  console.log('Profile');
  return (
    <div>
      {user.username && `Welcome ${user.username}!`}
    </div>
  );
};
export default Profile;
