import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // async function authenticateUser(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.PUBLIC_BACKEND_URI}/auths`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ email, password }),
  //         headers: { "Content-type": "application/json; charset=UTF-8" },
  //       }
  //     );
  //     const userData = await response.json();
  //     localStorage.setItem("apiPoweredBlogToken", userData.token);
  //     localStorage.setItem(
  //       "apiPoweredBlogUserData",
  //       JSON.stringify(userData.payload)
  //     );
  //     if (iframeUseRef.current) {
  //       const targetOrigin = fansEndUri;
  //       const iframeWindow = iframeUseRef.current.contentWindow;
  //       iframeWindow.postMessage(userData, targetOrigin);
  //     }
  //     userData.errors?.length
  //       ? setErrors(userData.errors)
  //       : (window.location.href = "/");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     }
  //   }
  // }

  // function showErrorFor(field) {
  //   return errors.find((c) => c.path === field) ? (
  //     <div className="error">{errors.find((c) => c.path === field).msg}</div>
  //   ) : (
  //     ""
  //   );
  // }

  return (
    <>
      {/* <form onSubmit={authenticateUser}> */}
      <form className="[&_input]:w-full [&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm [&_label]:mt-3">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* {showErrorFor("email")} */}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {showErrorFor("password")} */}
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
        >
          Log in
        </button>
      </form>
    </>
  );
}
