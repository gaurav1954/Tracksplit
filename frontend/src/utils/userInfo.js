import axios from "axios";
import { setUser, setFriends, setGroups } from "../features/userSlice";

export const fetchUserData = async (dispatch) => {
    try {
        const response = await axios.get(`/user/userInfo`);
        const { user, groups } = response.data;

        // Dispatch actions to update the Redux store
        dispatch(setUser(user));
        dispatch(setFriends(user.friends));
        dispatch(setGroups(groups));
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Allow the calling function to handle errors
    }
};
