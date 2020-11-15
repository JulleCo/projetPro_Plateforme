module.exports = {
  reducer: (state, action) => {
    switch (action.type) {
      case "SIGNIN":
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", action.payload.data.user.id);

        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.data.token,
          user: action.payload.data.user,
        };
      case "LOAD_USER":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };

      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
        };

      default:
        return state;
    }
  },
};