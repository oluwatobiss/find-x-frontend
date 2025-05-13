import { useState } from "react";

export default function AddImage() {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sample, setSample] = useState(false);
  const [itemsData, setItemsData] = useState([createItemData()]);
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState([]);
  const loggedInUserJson = localStorage.getItem("findXUserData");
  const loggedInUser = loggedInUserJson && JSON.parse(loggedInUserJson);

  function createItemData() {
    return {
      id: crypto.randomUUID(),
      itemName: "",
      itemImageUrl: "",
      centerX: "",
      centerY: "",
      startX: "",
      startY: "",
      endX: "",
      endY: "",
    };
  }

  async function submitImageData(e) {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem("findXToken");
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/images`,
        {
          method: "POST",
          body: JSON.stringify({
            imageName,
            imageUrl,
            sample,
            itemsData,
            published,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const imageData = await response.json();
      imageData.errors?.length
        ? setErrors(imageData.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) onsole.error(error.message);
    }
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

  function updateItemsData(event, index) {
    const itemsData_ = [...itemsData];
    itemsData_[index][event.target.name] = event.target.value;
    setItemsData(itemsData_);
  }

  const itemFieldsets = itemsData.map((data, index) => (
    <section key={data.id}>
      <fieldset className="my-8 border border-gray-500 rounded-sm px-10 py-7">
        <legend className="px-2 uppercase font-semibold">
          Item {index + 1}
        </legend>
        <label className="w-full mt-3">
          Name
          <input
            className="w-full"
            type="text"
            name="itemName"
            value={data.itemName}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
          {errors.find(
            (error) => error.path === `itemsData[${index}].itemName`
          ) && showErrorFor(`itemsData[${index}].itemName`)}
        </label>
        <label className="w-full mt-3">
          Item image's URL
          <input
            className="w-full"
            type="url"
            name="itemImageUrl"
            value={data.itemImageUrl}
            onChange={(e) => updateItemsData(e, index)}
          />
          {errors.find(
            (error) => error.path === `itemsData[${index}].itemImageUrl`
          ) && showErrorFor(`itemsData[${index}].itemImageUrl`)}
        </label>
        <div className="pt-5 text-sm uppercase font-semibold">
          Pixel location
        </div>
        <div className="flex gap-x-3">
          <label className="mt-3">
            Center-X (px)
            <input
              type="number"
              name="centerX"
              value={data.centerX}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].centerX`
            ) && showErrorFor(`itemsData[${index}].centerX`)}
          </label>
          <label className="mt-3">
            Center-Y (px)
            <input
              type="number"
              name="centerY"
              value={data.centerY}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].centerY`
            ) && showErrorFor(`itemsData[${index}].centerY`)}
          </label>
        </div>
        <div className="flex gap-x-3">
          <label className="mt-3">
            Start-X (px)
            <input
              type="number"
              name="startX"
              value={data.startX}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].startX`
            ) && showErrorFor(`itemsData[${index}].startX`)}
          </label>
          <label className="mt-3">
            Start-Y (px)
            <input
              type="number"
              name="startY"
              value={data.startY}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].startY`
            ) && showErrorFor(`itemsData[${index}].startY`)}
          </label>
        </div>
        <div className="flex gap-x-3">
          <label className="mt-3">
            End-X (px)
            <input
              type="number"
              name="endX"
              value={data.endX}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].endX`
            ) && showErrorFor(`itemsData[${index}].endX`)}
          </label>
          <label className="mt-3">
            End-Y (px)
            <input
              type="number"
              name="endY"
              value={data.endY}
              onChange={(e) => updateItemsData(e, index)}
              required
            />
            {errors.find(
              (error) => error.path === `itemsData[${index}].endY`
            ) && showErrorFor(`itemsData[${index}].endY`)}
          </label>
        </div>
        {itemsData.length > 1 && (
          <button
            type="button"
            onClick={() =>
              setItemsData(itemsData.filter((item) => item.id !== data.id))
            }
            className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
          >
            Delete {data.name}
          </button>
        )}
      </fieldset>
    </section>
  ));

  return (
    <>
      {loggedInUser.status === "ADMIN" ? (
        <form
          className="[&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm"
          onSubmit={submitImageData}
        >
          <div>
            <label htmlFor="imageName" className="mt-3">
              Name
            </label>
            <input
              className="w-full"
              type="text"
              name="imageName"
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              required
            />
            {errors.find((error) => error.path === "imageName") &&
              showErrorFor("imageName")}
          </div>
          <div>
            <label htmlFor="imageUrl" className="mt-3">
              URL
            </label>
            <input
              className="w-full"
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            {errors.find((error) => error.path === "imageUrl") &&
              showErrorFor("imageUrl")}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <label htmlFor="sampleCheckbox">Sample?</label>
            <input
              className="w-[initial]"
              type="checkbox"
              id="sampleCheckbox"
              checked={sample}
              onChange={() => setSample(!sample)}
            />
          </div>
          <h2>Specify items to find</h2>
          {itemFieldsets}
          <section className="flex items-center mb-4 gap-2">
            <label htmlFor="publishImage">Publish Now?</label>
            <input
              type="checkbox"
              id="publishImage"
              checked={published}
              onChange={() => setPublished(!published)}
            />
          </section>
          <section className="flex gap-x-3">
            <button
              type="button"
              onClick={() => setItemsData([...itemsData, createItemData()])}
              className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
            >
              Add new item
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
            >
              Submit image
            </button>
          </section>
        </form>
      ) : (
        <div className="w-full text-center text-sm text-gray-600 pt-30">
          Admin pass required to add images
        </div>
      )}
    </>
  );
}
