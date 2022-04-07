import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setVales, setLoading }) => {
  const user = useSelector((state) => state.user);
  const fileUploadAndResize = (e) => {
    console.log(e.target.files);

    let files = e.target.files;
    let allUploadedFiles = values.images;

    console.log("-----------", user.token);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            console.log(uri);
            await axios({
              method: "POST",
              url: process.env.REACT_APP_API + "uploadimages",
              data: { image: uri },
              headers: {
                authtoken: user.token,
              },
            })
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setVales({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("File Upload Images to Cloudinary", err);
              });
          },
          "base64"
        );
      }
    }
    //file
  };

  const handleImageRemove = async (id) => {
    setLoading(true);

    await await axios({
      method: "POST",
      url: process.env.REACT_APP_API + "removeimage",
      data: { public_id: id },
      headers: {
        authtoken: user.token,
      },
    })
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });
        setVales({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              className="col-1 offset-1"
              count={"X"}
              key={image.public_id}
              onClick={() => {
                handleImageRemove(image.public_id);
              }}
              offset={[35]}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                shape="square"
                size={100}
                className="ml-3 mb-2"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="col-3 btn btn-outline-success  btn-raised">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
