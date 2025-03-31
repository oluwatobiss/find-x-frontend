import { useState } from "react";

export default function AddImage() {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itemsData, setItemsData] = useState([createItemData()]);
  const [errors, setErrors] = useState([]);

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

    console.log({ imageName, imageUrl, itemsData });

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/images`,
        {
          method: "POST",
          body: JSON.stringify({ imageName, imageUrl, itemsData }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const imageData = await response.json();
      console.log("=== submitImageData in AddImage component ===");
      console.log(imageData);

      imageData.errors?.length
        ? setErrors(imageData.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
        <label className="w-full">
          Name
          <input
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
        <label className="w-full">
          Item image's URL
          <input
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
          <label>
            Center-X (px)
            <input
              className="text-input"
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
          <label>
            Center-Y (px)
            <input
              className="text-input"
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
          <label>
            Start-X (px)
            <input
              className="text-input"
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
          <label>
            Start-Y (px)
            <input
              className="text-input"
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
          <label>
            End-X (px)
            <input
              className="text-input"
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
          <label>
            End-Y (px)
            <input
              className="text-input"
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
      <form
        className="[&_input]:w-full [&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm [&_label]:mt-3"
        onSubmit={submitImageData}
      >
        <div>
          <label htmlFor="imageName">Name</label>
          <input
            className="text-input"
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
          <label htmlFor="imageUrl">URL</label>
          <input
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
        <h2>Specify items to find</h2>
        {itemFieldsets}
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
    </>
  );
}
