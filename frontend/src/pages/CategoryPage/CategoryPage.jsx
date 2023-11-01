import React from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";

const CategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

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
    <Loading isLoading={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "100vh",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100vh" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
            }}
          >
            <WrapperNavbar span={4}>
              <NavBarComponent />
            </WrapperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
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
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default CategoryPage;
