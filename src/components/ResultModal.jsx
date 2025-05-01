export default function ResultModal({ text }) {
  const appraisal = {
    congrats: {
      heading: "Congratulations 🎉",
      text: "You made the top 10!",
    },
    oops: { heading: "Oops! 🙀", text: "You didn't make the top 10" },
  };

  return (
    <article
      id="oops-modal"
      className="fixed z-50 size-full bg-black/77 backdrop-blur-sm text-white text-center flex items-center justify-center"
    >
      <div
        id="oops-modal-content"
        className="bg-[#1b1a1a] pt-4 px-4 pb-5 border border-[#888] rounded-md w-[30%]"
      >
        <div className="text-right">
          <span
            title="Close"
            id="close-oops-modal"
            className="p-2 hover:cursor-pointer hover:bg-[rgba(255,255,255,0.17)] hover:rounded-full"
          >
            ❌
          </span>
        </div>
        <h1>{appraisal[`${text}`].heading}</h1>
        <p className="pt-3 pb-2 text-xl">{appraisal[`${text}`].text}</p>
        <a href="/leaderboard" className="hover:text-yellow-100">
          See the leaderboard
        </a>
      </div>
    </article>
  );
}
