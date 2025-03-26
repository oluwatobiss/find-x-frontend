import { useState } from "react";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState([]);

  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/users`,
        {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
            admin,
            adminCode,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const userData = await response.json();
      console.log("=== registerUser in SignUpForm component ===");
      console.log(userData);

      userData.errors?.length
        ? setErrors(userData.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
      onSubmit={registerUser}
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
      <div>
        <label className="text-input-label" htmlFor="password">
          Password
        </label>
        <input
          className="text-input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {showErrorFor("password")}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="adminCheckbox">Admin?</label>
        <input
          className="w-[initial]"
          type="checkbox"
          id="adminCheckbox"
          checked={admin}
          onChange={() => setAdmin(!admin)}
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
        Sign up
      </button>
    </form>
  );
}
