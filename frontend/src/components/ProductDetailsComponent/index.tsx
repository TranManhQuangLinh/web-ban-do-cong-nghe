import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderItem, ordersSelector } from "../../redux/slices/OrderSlice";
import { useGetDetailsProductQuery } from "../../services/product";
import { convertPrice } from "../../utils";
import ButtonComponent from "../ButtonComponent";
import Loading from "../LoadingComponent";
import * as message from "../Message";
import {
  WrapperDiscountText,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { RootState } from "../../redux/store";

interface IProps {
  idProduct: string;
}

const ProductDetailsComponent: React.FC<IProps> = ({ idProduct }) => {
  const user = useSelector((state: RootState) => state.user);
  const orders = useSelector(ordersSelector);
  const order = orders.find((item) => item.user === user._id)

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [numProduct, setNumProduct] = useState(1);

  const onChange = (value: string) => {
    setNumProduct(Number(value));
  };

  const handleChangeCount = (type: string, limited: boolean) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const {
    data: details,
    isFetching,
    isLoading,
  } = useGetDetailsProductQuery(idProduct, {
    skip: !idProduct,
  });

  // console.log(details);

  const handleAddToCart = () => {
    if (!user?._id) {
      navigate("/sign-in", { state: location?.pathname });
    } else if(details?.data) {
      const orderItem = order?.orderItems?.find(
        (item) => item.product === details?.data?._id
      );
      if (
        (orderItem &&
          orderItem?.quantity + numProduct <= orderItem?.quantityInStock) ||
        (!orderItem && details?.data.quantityInStock > 0)
      ) {
        dispatch(
          addOrderItem({
            orderItem: {
              name: details?.data.name,
              quantity: numProduct,
              image: details?.data.image,
              price: details?.data.price,
              discount: details?.data.discount,
              product: details?.data._id,
              quantityInStock: details?.data.quantityInStock,
            },
            userId: user._id,
          })
        );
        message.success("Đã thêm vào giỏ hàng");
      } else {
        message.error(
          `Số lượng hàng trong kho không đủ. Còn ${details?.data.quantityInStock} sản phẩm`
        );
      }
    }
  };

  return (
    <Loading isPending={isLoading}>
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
        }}
      >
        <Col
          span={10}
          style={{
            borderRight: "1px solid #e5e5e5",
            paddingRight: "8px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={details?.data?.image ?? ""}
            alt="image product"
            preview={true}
          />
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {details?.data?.name ?? ""}
          </WrapperStyleNameProduct>
          <div>
            <WrapperStyleTextSell>
              Đã bán: {details?.data?.sold ?? ""}
            </WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(details?.data?.price ?? 0)}
              <WrapperDiscountText>
                {details?.data?.discount ? (
                  `-${details?.data?.discount}%`
                ) : (
                  <></>
                )}
              </WrapperDiscountText>
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease", numProduct === 1)}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={details?.data?.quantityInStock ?? 0}
                min={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChangeCount(
                    "increase",
                    numProduct === details?.data?.quantityInStock
                  )
                }
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <ButtonComponent
                // size={40}
                disabled={user?.role === "Admin" || user?.role === "Nhân viên"}
                buttonStyle={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={handleAddToCart}
                buttonText={"Thêm vào giỏ hàng"}
                buttonTextStyle={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
