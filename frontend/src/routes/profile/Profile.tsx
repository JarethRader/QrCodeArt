import React from "react";
import Masonry from "react-masonry-css";
import { PlusSquare } from "@styled-icons/bootstrap";

import ModalProvider from "./components/modalProvider";

const PlaceholderImageList = [
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOXar9f8mfRH6npUWhGOvG8yrMMBf8GnLZEb00RJpltaT0j_al-Wyt1Z7XCn02GiLshS0&usqp=CAU",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOXar9f8mfRH6npUWhGOvG8yrMMBf8GnLZEb00RJpltaT0j_al-Wyt1Z7XCn02GiLshS0&usqp=CAU",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOXar9f8mfRH6npUWhGOvG8yrMMBf8GnLZEb00RJpltaT0j_al-Wyt1Z7XCn02GiLshS0&usqp=CAU",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOXar9f8mfRH6npUWhGOvG8yrMMBf8GnLZEb00RJpltaT0j_al-Wyt1Z7XCn02GiLshS0&usqp=CAU",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOXar9f8mfRH6npUWhGOvG8yrMMBf8GnLZEb00RJpltaT0j_al-Wyt1Z7XCn02GiLshS0&usqp=CAU",
];

interface IProfileProps {
  user: IUser;
}

const Profile = (props: IProfileProps) => {
  const [showUpload, setShowUpload] = React.useState<boolean>(false);
  const toggleShowUpload = () => setShowUpload(!showUpload);

  return (
    <>
      <div className="absolute w-full max-h-screen flex items-center justify-center">
        <ModalProvider modalSelection="upload" />
      </div>
      <div className="w-full flex self-start flex-col mt-5 max-h-screen">
        <h1 className="text-center text-xl font-medium">
          Hello {props.user.username}, welcome to your profile
        </h1>
        <div
          className="flex justify-center md:mx-20 mx-2 mt-4"
          style={{
            height: "calc(90vh - 16px)",
          }}
        >
          <div className="lg:px-20 px-2 py-6">
            {/* Upload photo */}

            {/* Add personal information
          <div>

          </div>
          see previous uploads
          <div>

          </div> */}
            <div
              className="flex flex-wrap overflow-y-auto"
              style={{
                height: "calc(100% - 5rem)",
              }}
            >
              <Masonry
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  500: 1,
                }}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {PlaceholderImageList.map((image, index) => (
                  <img key={index} src={image} className="w-full mt-2 cursor-pointer" />
                ))}
              </Masonry>
            </div>
            <hr className="border-gray-700 bg-gray-700 border-2 my-2" />
            <div className="pt-2 flex justify-end">
              <button onClick={toggleShowUpload}>
                <PlusSquare
                  title="Upload"
                  className="w-8 text-purple-500 hover:text-purple-700 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
