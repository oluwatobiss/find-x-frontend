import { useState } from "react";

export default function EditUserForm() {
  const loggedInUserDataJson = localStorage.getItem("findXUserData");
  const loggedInUserData =
    loggedInUserDataJson && JSON.parse(loggedInUserDataJson);
  const userDataJson = localStorage.getItem("findXUserToEdit");
  const userData = userDataJson && JSON.parse(userDataJson);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [admin, setAdmin] = useState(userData.status === "ADMIN");
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState([]);

  async function updateUser(e) {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem("findXToken");
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/users/${userData.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            admin,
            adminCode,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const userDataResponse = await response.json();
      userDataResponse.errors?.length
        ? setErrors(userDataResponse.errors)
        : (window.location.href = "/dashboard/");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  function updateAdminCode(e) {
    errors.length && setErrors([]);
    setAdminCode(e.target.value);
  }

  function showErrorFor(field) {
    return errors.find((error) => error.path === field) ? (
      <div className="mb-2 text-sm text-red-500">
        {errors.find((error) => error.path === field).msg}
      </div>
    ) : (
      ""
    );
  }

  return (
    <form
      className="[&_.text-input]:w-full [&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm [&_.text-input-label]:mt-3"
      onSubmit={updateUser}
    >
      <div>
        <label className="text-input-label" htmlFor="firstName">
          First name
        </label>
        <input
          className="text-input"
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {showErrorFor("firstName")}
      </div>
      <div>
        <label className="text-input-label" htmlFor="lastName">
          Last name
        </label>
        <input
          className="text-input"
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {showErrorFor("lastName")}
      </div>
      <div>
        <label className="text-input-label" htmlFor="username">
          Username
        </label>
        <input
          className="text-input"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {showErrorFor("username")}
      </div>
      <div>
        <label className="text-input-label" htmlFor="email">
          Email
        </label>
        <input
          className="text-input"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {showErrorFor("email")}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="adminCheckbox">Admin?</label>
        <input
          className="w-[initial]"
          type="checkbox"
          id="adminCheckbox"
          checked={admin}
          onChange={() =>
            userData.username === loggedInUserData.username
              ? null
              : setAdmin(!admin)
          }
        />
      </div>
      {admin ? (
        <div>
          <label className="text-input-label" htmlFor="adminCode">
            Enter your passcode:
          </label>
          <input
            className="text-input"
            type="password"
            name="adminCode"
            id="adminCode"
            value={adminCode}
            onChange={updateAdminCode}
            required
          />
          {showErrorFor("adminCode")}
        </div>
      ) : (
        ""
      )}
      <button
        type="submit"
        className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
      >
        Update User
      </button>
    </form>
  );
}
