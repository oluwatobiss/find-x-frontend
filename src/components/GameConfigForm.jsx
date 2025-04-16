import { useState, useEffect } from "react";

export default function GameConfigForm() {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState("0");
  const userToken = localStorage.getItem("findXToken");
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

  async function startGame() {
    const gameImg = images[imageIndex];
    localStorage.setItem(
      "findXGameImage",
      JSON.stringify({
        id: gameImg.id,
        name: gameImg.imageName,
        url: gameImg.imageUrl,
      })
    );
    window.location.href = "/game/";
  }

  const imageElements = images.map((image, index) => (
    <label
      key={image.id}
      className="inline-block cursor-pointer aspect-square p-3 rounded-sm bg-(image:--image-url) bg-cover bg-no-repeat bg-center grayscale brightness-120 opacity-85 hover:grayscale-50 hover:brightness-110 hover:opacity-90 has-checked:filter-none has-checked:opacity-100 has-checked:outline-4 transition-all duration-100 ease-in"
      title={image.imageName}
      style={{ "--image-url": `url(${image.imageUrl}?q=80&w=640)` }}
    >
      <input
        type="radio"
        name="gameImage"
        value={index}
        onChange={(e) => setImageIndex(e.target.value)}
        defaultChecked={index === 0}
      />
    </label>
  ));

  useEffect(() => {
    async function getImages() {
      try {
        const response = await fetch(`${backendUri}/images`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const images = await response.json();
        console.log("=== ImageCards ===");
        console.log(images);

        setImages(images);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    getImages();
  }, []);

  return (
    <>
      <fieldset className="my-15 border border-gray-500 rounded-sm px-10 py-7 text-center">
        <legend className="px-2 uppercase text-gray-500 font-semibold">
          Select an Image
        </legend>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-3.5">
          {imageElements}
        </div>
        <button
          type="button"
          onClick={() => startGame()}
          className="cursor-pointer bg-gray-200 mt-10 px-7 py-2 border border-gray-400 border-solid rounded-sm"
        >
          Play Game
        </button>
      </fieldset>
    </>
  );
}
