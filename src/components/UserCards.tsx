import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  status: string;
};

export default function UserCards() {
  const userToken = localStorage.getItem("findXToken");
  const loggedInUserJson = localStorage.getItem("findXUserData");
  const loggedInUser = loggedInUserJson && JSON.parse(loggedInUserJson);
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;
  const [users, setUsers] = useState<User[]>([]);
  const [reload, setReload] = useState(false);

  async function deleteUser(userId: number) {
    try {
      await fetch(`${backendUri}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setReload(!reload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function editUser(user: User) {
    localStorage.setItem("findXUserToEdit", JSON.stringify(user));
    window.location.href = "/edit-user/";
  }

  function createUserCards(users: User[]) {
    const userDataJson = localStorage.getItem("findXUserData");
    const userData = userDataJson && JSON.parse(userDataJson);

    return users.map((user) => {
      return (
        <div
          key={user.id}
          className="border border-gray-400 rounded-sm p-5 mb-4 [&_button]:mr-3 [&_button]:px-6 [&_button]:py-1.5 [&_button]:border [&_button]:rounded-sm [&_button]:border-gray-400 [&_button]:bg-gray-100 [&_button]:hover:bg-gray-200 [&_button]:text-sm [&_button]:text-gray-800 [&_button]:cursor-pointer"
        >
          <div className="text-xs text-gray-500">
            <span>@{user.username}</span> <span>{user.status}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">
            {user.firstName} {user.lastName}
          </h3>
          {userData.username === user.username ? (
            ""
          ) : (
            <button type="button" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          )}
          <button type="button" onClick={() => editUser(user)}>
            Edit
          </button>
        </div>
      );
    });
  }

  useEffect(() => {
    async function getUsers() {
      console.log("=== getUsers ===");
      console.log(loggedInUser.status);

      try {
        const response = await fetch(
          `${backendUri}/users/?status=${loggedInUser.status}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        const users: [] | { message: "" } = await response.json();
        Array.isArray(users)
          ? setUsers(users)
          : (() => {
              throw new Error(users.message);
            })();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getUsers();
  }, [reload]);

  return (
    <article>
      {users.length ? (
        createUserCards(users)
      ) : (
        <div className="w-full text-center text-sm text-gray-600 pt-30">
          Admin pass required to manage users
        </div>
      )}
    </article>
  );
}
