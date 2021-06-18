export const authHeader = () => {
  // lets read the "userAuth" object from local storage.
  // it contains basic information about the user, such as id, displayName, and accessToken
  const userAuth = JSON.parse(<string>localStorage.getItem("userAuth"));

  if (userAuth && userAuth.accessToken) {
    return {'authorization': userAuth.accessToken};
  } else {
    return {}
  }
}

