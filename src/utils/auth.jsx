// Save user info
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Remove user (for logout)
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLogin");
};
