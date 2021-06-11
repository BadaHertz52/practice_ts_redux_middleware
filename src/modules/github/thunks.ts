import { getUserProfile } from "../../api/github";
import createAsyncThunk from "../../lib/createAsyncThunk";
import { getUserProfileAsync } from "./actions";

export const getUserProfileThunk = createAsyncThunk(getUserProfileAsync, getUserProfile) ;