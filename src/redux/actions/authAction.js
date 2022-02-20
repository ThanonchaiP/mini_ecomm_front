export const GET_PROFILE = "GET_PROFILE";

export const updateProfile = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
  return {
    type: GET_PROFILE,
    payload: {
      profile: profile,
    },
  };
};
