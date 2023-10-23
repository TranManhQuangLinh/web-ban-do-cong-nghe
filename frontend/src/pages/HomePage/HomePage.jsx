import React from "react";
import Category from "../../components/Category/Category";
import { WrapperButtonMore, WrapperCategory, WrapperProducts } from "./style";
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
  const category = ["Dien thoai", "May tinh", "Laptop"];
  const products = {
    data: [
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
      },
      {
        _id: "1",
        countInStock: "1",
        description: "",
        image:
          "https://salt.tikicdn.com/cache/280x280/ts/product/5e/8e/5a/ffd57c334ad997d311d311be41ef6aa8.png.webp",
        name: "iPhone15",
        price: "2590000",
        category: "Dien thoai",
        selled: "1",
        discount: "10",
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
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  selled={product.selled}
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
