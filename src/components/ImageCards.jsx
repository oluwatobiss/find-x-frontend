import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ImageCards() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [reload, setReload] = useState(false);
  const userToken = localStorage.getItem("findXToken");
  const loggedInUserJson = localStorage.getItem("findXUserData");
  const loggedInUser = loggedInUserJson && JSON.parse(loggedInUserJson);
  const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

  async function deleteImage(imageId) {
    try {
      if (confirm("Delete the image permanently?")) {
        setLoading(true);
        await fetch(`${backendUri}/images/${imageId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setReload(!reload);
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  async function editImage(image) {
    localStorage.setItem("findXImageToEdit", JSON.stringify(image));
    window.location.href = "/edit-image";
  }

  function createImageCards(images) {
    const userDataJson = localStorage.getItem("findXUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
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
            <span className="inline-block mr-2 mb-2 px-4 py-1 border rounded-sm border-gray-600 text-xs text-gray-600">
              {image.published ? "published" : "draft"}
            </span>
            <span className="inline-block mb-2 px-4 py-1 border rounded-sm border-gray-600 text-xs text-gray-600">
              {image.sample ? "sample" : "pro"}
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
    let ignore = false;
    async function getImages() {
      try {
        setLoading(true);
        const response = await fetch(
          `${backendUri}/images/?auth=${loggedInUser.status}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        const images = await response.json();
        setImages(images);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
    getImages();
    return () => {
      ignore = true;
    };
  }, [reload]);

  return (
    <article>
      {loading && <Loader />}
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
