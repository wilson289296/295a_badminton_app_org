import { axios } from "./request";

const { get, put, post } = axios;

export const register = (data) => post("/badminton/users/register/", data);
export const login = (data) => post("/badminton/users/login/", data);
export const getUserInfo = (data) =>
  get(`/badminton/users/email/${data.email}`);
export const updateUserOnlineStatus = (data) =>
  put("/badminton/users/updateUserOnlineStaus/", data);
export const updateUserMatchStatus = (data) =>
  put("/badminton/users/updateUserMatchStaus/", data);
export const updateUserInfo = (data) =>
  put("/badminton/users/updateUserInfo/", data);
export const getRandomUsers = () => get(`/badminton/users/randomUsers`);
export const addAImodelData = (data) =>
  post("/badminton/users/addAImodelData/", data);
export const addMatchHistory = (data) =>
  put("/badminton/users/addMatchHistory/", data);
export const getMatchHistory = (data) =>
  get(`/badminton/users/getMatchHistory/${data.email}`);
export const inviteSinglePlayer = (data) =>
  post("/badminton/gaming/inviteSinglePlayer/", data);
export const inviteDoublePlayer = (data) =>
  post("/badminton/gaming/inviteDoublePlayer/", data);
export const getSinglePlayerRecommendations = (data) => get(`/badminton/users/getSinglePlayerRecommendations/${data.email}`);
export const getFirstDoublePlayerRecommendations = (data) => get(`/badminton/users/getFirstDoublePlayerRecommendations/${data.email1}/${data.email2}`);
export const getSecondDoublePlayerRecommendations = (data) => get(`/badminton/users/getSecondDoublePlayerRecommendations/${data.email1}/${data.email2}/${data.email3}`);
export const findInvitationRecord = (data) => get(`/badminton/users/findInvitationRecord/${data.email}`);
export const getNotification = (data) => get(`/badminton/gaming/getNotification/${data.email}`);
