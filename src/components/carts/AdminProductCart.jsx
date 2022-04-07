import React from "react";
import laptop from "../../images/laptop.jpg";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCart = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      style={{ height: "150px", objectFit: "cover", width: 240 }}
      className="p-1"
      cover={
        <img
          alt="example"
          src={images && images.length ? images[0].url : laptop}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          {" "}
          <EditOutlined className="text-secondary" />
        </Link>,
        <DeleteOutlined
          onClick={() => {
            handleRemove(slug);
          }}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}....`}
      />
    </Card>
  );
};

export default AdminProductCart;
