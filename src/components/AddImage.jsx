import { useState } from "react";

export default function LoginForm() {
  const [imageName, setImageName] = useState("");
  const [url, setUrl] = useState("");
  const [itemsData, setItemsData] = useState([createItemData()]);
  const [errors, setErrors] = useState([]);

  function createItemData() {
    return {
      id: crypto.randomUUID(),
      name: "",
      centerX: "",
      centerY: "",
      startX: "",
      startY: "",
      endX: "",
      endY: "",
    };
  }

  // async function authenticateUser(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.PUBLIC_BACKEND_URI}/auths`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ email, password }),
  //         headers: { "Content-type": "application/json; charset=UTF-8" },
  //       }
  //     );
  //     const userData = await response.json();
  //     localStorage.setItem("apiPoweredBlogToken", userData.token);
  //     localStorage.setItem(
  //       "apiPoweredBlogUserData",
  //       JSON.stringify(userData.payload)
  //     );
  //     if (iframeUseRef.current) {
  //       const targetOrigin = fansEndUri;
  //       const iframeWindow = iframeUseRef.current.contentWindow;
  //       iframeWindow.postMessage(userData, targetOrigin);
  //     }
  //     userData.errors?.length
  //       ? setErrors(userData.errors)
  //       : (window.location.href = "/");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     }
  //   }
  // }

  // function showErrorFor(field) {
  //   return errors.find((c) => c.path === field) ? (
  //     <div className="error">{errors.find((c) => c.path === field).msg}</div>
  //   ) : (
  //     ""
  //   );
  // }

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
            name="name"
            value={data.name}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
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
      {/* <form onSubmit={authenticateUser}> */}
      <form className="[&_input]:w-full [&_input]:border [&_input]:border-gray-500 [&_input]:rounded-sm [&_input]:my-1 [&_input]:px-5 [&_input]:py-2 [&_input]:text-lg [&_label]:inline-block [&_label]:text-sm [&_label]:mt-3">
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="text-input"
            type="text"
            name="name"
            id="name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            required
          />
          {/* {showErrorFor("imageName")} */}
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {/* {showErrorFor("url")} */}
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
