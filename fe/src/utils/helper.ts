export const getToken = () => {
  const data = localStorage.getItem("persist:root");

  if (data) {
    const { auth } = JSON.parse(data);
    const authData = JSON.parse(auth);

    return authData?.user?.token || null;
  }

  return null;
};
