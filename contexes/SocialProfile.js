import React from "react";

export const SocialProfile = React.createContext({
  setUserProfile: () => {},
  logOut: () => {},
  userProfile: {
    isLoggedIn: false
  },
  setIsInitialized: () => {},
  isInitialized: false
});
