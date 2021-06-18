export const getCurrentUserAuth = () => {
  const userAuth = JSON.parse(<string>localStorage.getItem("userAuth"));
  return userAuth;
}
