import { useEffect, useState } from "react";

export default function Navigation() {
  const [userToken, setUserToken] = useState("");
  const [userStatus, setUserStatus] = useState("");

  function logoutUser() {
    localStorage.removeItem("findXToken");
    localStorage.removeItem("findXUserData");
    window.location.href = "/";
  }

  useEffect(() => {
    let userToken = localStorage.getItem("findXToken");
    let userDataJson = localStorage.getItem("findXUserData");
    userToken === "undefined" && (userToken = undefined);
    userDataJson === "undefined" && (userDataJson = undefined);
    const userData = userDataJson && JSON.parse(userDataJson);
    userToken && setUserToken(userToken);
    userData?.status && setUserStatus(userData.status);
  }, []);

  return (
    <>
      <div className="flex justify-between [&_a]:inline-block [&_a,&_button]:px-4 [&_a,&_button]:py-5 [&_a,&_button]:text-xl [&_a,&_button]:font-bold [&_a,&_button]:uppercase [&_a,&_button]:text-blue-700 [&_a,&_button]:hover:bg-orange-300 [&_a,&_button]:focus:bg-orange-300 [&_button]:cursor-pointer">
        <a href="/">Find-X</a>
        {userToken && userStatus === "ADMIN" && (
          <a href="/dashboard/">Dashboard</a>
        )}
        <span>
          {!userStatus && <a href="/sign-up">Sign up</a>}
          {!userToken && <a href="/log-in">Log in</a>}
          {userToken && (
            <button type="button" onClick={logoutUser}>
              Log out
            </button>
          )}
        </span>
      </div>
    </>
  );
}
