import React from "react";
import Category from "../../components/Category/Category";
import { WrapperCategory, WrapperProducts } from "./style";
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
  const category = ["Dien thoai", "May tinh", "Laptop"];
  const products = {
    data: [
      {
        _id: "1",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "2",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "3",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "4",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "5",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "6",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      {
        _id: "7",
        quantityInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: 2590000,
        category: "Dien thoai",
        sold: 1,
        discount: 10,
      },
      
    ],
  };
  return (
    <div>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperCategory>
          {category.map((item) => {
            return <Category name={item} key={item} />;
          })}
        </WrapperCategory>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  quantityInStock={product.quantityInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  sold={product.sold}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
