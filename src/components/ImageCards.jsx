import { useEffect, useState } from "react";

export default function ImageCards() {
  const [images, setImages] = useState([]);
  const [reload, setReload] = useState(false);
  const userToken = localStorage.getItem("findXToken");
  const loggedInUserJson = localStorage.getItem("findXUserData");
  const loggedInUser = loggedInUserJson && JSON.parse(loggedInUserJson);
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

  async function deleteImage(imageId) {
    try {
      if (confirm("Delete the image permanently?")) {
        await fetch(`${backendUri}/images/${imageId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setReload(!reload);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function editImage(image) {
    localStorage.setItem("findXImageToEdit", JSON.stringify(image));
    window.location.href = "/update-image";
  }

  function createImageCards(images) {
    const userDataJson = localStorage.getItem("findXUserData");
    const userData = userDataJson && JSON.parse(userDataJson);

    console.log("=== createImageCards ===");
    console.log(images);
    console.log(userData);

    return images.map((image) => {
      return (
        <div
          key={image.id}
          className="flex items-center border border-gray-400 rounded-sm p-5 mb-4"
        >
          <img
            src={`${image.imageUrl}?q=80&w=640`}
            alt={image.imageName}
            className="pr-7 w-3xs"
          />
          <span className="[&_button]:px-6 [&_button]:py-1.5 [&_button]:border [&_button]:rounded-sm [&_button]:border-gray-400 [&_button]:bg-gray-100 [&_button]:hover:bg-gray-200 [&_button]:text-sm [&_button]:text-gray-800 [&_button]:cursor-pointer">
            <span className="inline-block mb-2 px-4 py-1 border rounded-sm border-gray-600 text-xs text-gray-600">
              {image.published ? "published" : "draft"}
            </span>
            <h3 className="text-2xl font-bold mb-3">{image.imageName}</h3>
            <button
              className="mr-3"
              type="button"
              onClick={() => deleteImage(image.id)}
            >
              Delete
            </button>
            <button type="button" onClick={() => editImage(image)}>
              Edit
            </button>
          </span>
        </div>
      );
    });
  }

  useEffect(() => {
    async function getImages() {
      try {
        const response = await fetch(
          `${backendUri}/images?auth=${Boolean(loggedInUser)}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
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
  }, [reload]);

  return (
    <article>
      {images.length && loggedInUser.status === "ADMIN" ? (
        createImageCards(images)
      ) : (
        <div className="w-full text-center text-sm text-gray-600 pt-30">
          No images available
        </div>
      )}
    </article>
  );
}
