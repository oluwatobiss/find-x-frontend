import { useState, useEffect } from "react";
import Loader from "./Loader";

type LeaderParameter = {
  id: number;
  playerId: string;
  time: string;
  timeSort: number;
  date: string;
};

export default function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [top10leaders, setTop10leaders] = useState<[] | { message: "" }>([]);
  const userToken = localStorage.getItem("findXToken");
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;
  const nodeToShow = Array.isArray(top10leaders) ? (
    <table className="w-full">
      <thead className="border-b">
        <tr className="text-left">
          <th>Rank</th>
          <th>Username</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {top10leaders.map((leader: LeaderParameter, index: number) => {
          let medal = "";
          switch (index) {
            case 0:
              medal = " 🥇🏆";
              break;
            case 1:
              medal = " 🥈";
              break;
            case 2:
              medal = " 🥉";
              break;
            default:
              break;
          }
          return (
            <tr key={leader.id}>
              <td className="p-1.5">
                #{index + 1}
                {medal}
              </td>
              <td>@{leader.playerId}</td>
              <td>{leader.time}</td>
              <td>{new Date(leader.date).toLocaleDateString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p className="py-27 text-center text-xl">
      Login or Sign up to see the leaderboard
    </p>
  );

  useEffect(() => {
    let ignore = false;
    async function top10leaders() {
      try {
        setLoading(true);
        const response = await fetch(`${backendUri}/leaders`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const top10leaders = await response.json();
        setTop10leaders(top10leaders);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
    top10leaders();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      {nodeToShow}
    </>
  );
}
