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
    console.log(itemsData_);
    console.log(itemsData_[index]);
    itemsData_[index][event.target.name] = event.target.value;
    setItemsData(itemsData_);
  }

  const itemFieldsets = itemsData.map((data, index) => {
    console.log(data.id);
    return (
      <fieldset key={data.id} id={data.id}>
        <legend>Item {index + 1}'s Info</legend>
        <label>
          Name
          <input
            className="text-input"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
        </label>
        <div>Provide item {index + 1}'s position details</div>
        <label>
          Center-X
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
          Center-Y
          <input
            className="text-input"
            type="number"
            name="centerY"
            value={data.centerY}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
        </label>
        <label>
          Start-X
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
          Start-Y
          <input
            className="text-input"
            type="number"
            name="startY"
            value={data.startY}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
        </label>
        <label>
          End-X
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
          End-Y
          <input
            className="text-input"
            type="number"
            name="endY"
            value={data.endY}
            onChange={(e) => updateItemsData(e, index)}
            required
          />
        </label>
        {/* {showErrorFor("imageName")} */}
      </fieldset>
    );
  });

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
        <div>
          <label htmlFor="number">Number of items to find</label>
          <input
            type="number"
            name="number"
            id="number"
            value={itemsData.length}
            min="1"
            onChange={() => setItemsData([...itemsData, createItemData()])}
            required
          />
          {/* {showErrorFor("itemsQty")} */}
        </div>
        {itemFieldsets}
        <button
          type="submit"
          className="cursor-pointer bg-gray-200 mt-3 px-7 py-2 border border-gray-400 border-solid rounded-sm"
        >
          Log in
        </button>
      </form>
    </>
  );
}
