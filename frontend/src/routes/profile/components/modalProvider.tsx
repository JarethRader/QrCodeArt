import React from "react";

interface IModalProviderProps {
  modalSelection: "upload" | "view";
  selectionId?: number;
}

const ModalProvider = (props: IModalProviderProps) => {
  return (
    <>
      <div className="absolute w-full min-h-screen bg-gray-900 opacity-75 z-0"></div>
      <div
        className="z-10 flex justify-center"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <UploadModal modalSelection={props.modalSelection} />
      </div>
    </>
  );
};

interface IUploadModalProps extends IModalProviderProps {}

const UploadModal = (props: IUploadModalProps) => {
  const [image, setImage] = React.useState<string | undefined>(undefined);
  const handleOnLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget?.files?.length) {
      console.log("No files found");
      return;
    }

    const file = event.currentTarget.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleOnUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="rounded-sm bg-gray-100 shadow-lg lg:w-1/2 w-3/4 my-20">
      <h1 className="text-center font-bold text-white text-2xl bg-black w-full py-2 rounded-t-sm">
        {props.modalSelection === "upload" ? "Upload a new photo" : "Photo name"}
      </h1>
      <div
        className="p-2 flex flex-col items-center overscroll-y-scroll"
        style={{
          height: "calc(100% - 3rem)",
        }}
      >
        {/* TODO: Image is not scaled properly on mobile device; will fix later */}
        {!image ? (
          <div className="h-full w-full flex items-center">
            <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
              <div className="grid xl:col-start-2 col-start-1 xl:col-span-4 col-span-6 row-start-1 row-span-4 md:pt-2">
                {/* <div className="grid col-start-1 col-span-6 row-start-1 row-span-4 md:pt-2"> */}
                <div className="place-content-center">
                  <img className="w-full " src="https://via.placeholder.com/150" />
                  {/* <img className="" src={image} /> */}
                </div>
              </div>
              <div className="grid md:col-start-3 col-start-1 md:col-span-2 col-span-6 md:row-start-6 row-start-5 md:pt-0 pt-4">
                <div className="flex md:justify-center">
                  <div className="flex md:items-baseline flex-wrap place-content-center">
                    <div className="file-input">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className="file"
                        onChange={handleOnLoad}
                      />
                      <label htmlFor="image">
                        Reselect image
                        <p className="file-name"></p>
                      </label>
                    </div>
                    <button
                      className="mx-4 bg-gray-200 hover:bg-gray-500 font-semibold shadow-lg py-2 px-8 md:mt-0 mt-2"
                      onClick={(e) => handleOnUpload(e)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center">
            <div className="file-input">
              <input type="file" id="image" name="image" className="file" onChange={handleOnLoad} />
              <label htmlFor="image">
                Select an image
                <p className="file-name"></p>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalProvider;
