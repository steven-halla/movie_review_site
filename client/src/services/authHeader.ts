export const authHeader = () => {

  const userAuth = JSON.parse(<string>localStorage.getItem("userAuth"));

  if (userAuth && userAuth.accessToken) {
    return {'authorization': userAuth.accessToken};
  } else {
    return {}
  }
}

