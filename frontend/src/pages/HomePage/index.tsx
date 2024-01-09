import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../../components/CardComponent/CardComponent";
import Category from "../../components/Category/Category";
import Loading from "../../components/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllCategoriesQuery } from "../../services/category";
import { useGetAllProductsQuery } from "../../services/product";
import { WrapperButtonMore, WrapperCategory, WrapperProducts } from "./style";
import { RootState } from "../../redux/store";

const HomePage = () => {
  const searchProduct = useSelector((state: RootState) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  // console.log('searchDebounce:', searchDebounce);
  const [limit, setLimit] = useState(6);

  const { data: products, isLoading: isPendingProducts } =
    useGetAllProductsQuery({ search: searchDebounce, limit });

  const { data: categories, isLoading: isPendingCategories } =
    useGetAllCategoriesQuery();

  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <Loading isPending={isPendingCategories}>
          <WrapperCategory>
            <h3 style={{ marginLeft: "10px" }}>Danh mục:</h3>
            {categories?.data?.map((item) => {
              return <Category category={item} key={item._id} />;
            })}
          </WrapperCategory>
        </Loading>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          <Loading isPending={isPendingProducts}>
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
          </Loading>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              // isPreviousDataProducts
              buttonText={"Xem thêm"}
              type="text"
              buttonStyle={{
                border: `1px solid ${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "var(--primary-color)"
                }`,
                color: `${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "var(--primary-color)"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              buttonTextStyle={{
                fontWeight: 500,
                color: products?.total === products?.data?.length ? "#fff" : "",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
