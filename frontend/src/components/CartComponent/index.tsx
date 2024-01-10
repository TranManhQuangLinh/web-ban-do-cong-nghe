import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperInfoBody,
  WrapperItemOrder,
  WrapperItemPrice,
  WrapperLeft,
  WrapperLimitOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";

import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeAmount,
  decreaseAmount,
  increaseAmount,
  ordersSelector,
  removeAllOrderItem,
  removeOrderItem,
  selectedOrderItem,
  updateOrder,
} from "../../redux/slices/OrderSlice";
import { RootState } from "../../redux/store";
import { useGetAllShippingPricesQuery } from "../../services/shippingPrice";
import { IOrderItem, IShippingPrice } from "../../types";
import { convertPrice } from "../../utils";
import ButtonComponent from "../ButtonComponent";
import Loading from "../LoadingComponent";
import * as message from "../Message";
import { WrapperInputNumber } from "../ProductDetailsComponent/style";
import UpdateAddressModal from "./UpdateAddressModal";

export interface IState {
  listChecked?: Array<string>;
  isOpenModalUpdateAddress: boolean;
  shippingAddress: {
    recipientName: string;
    phone: string;
    address: string;
  };
  userId: string;
}

const CartComponent = () => {
  const user = useSelector((state: RootState) => state.user);
  const orders = useSelector(ordersSelector);
  const order = orders.find((item) => item.user === user._id);
  // console.log(order);

  const [state, setState] = useState<IState>({
    listChecked: order?.orderItems.map((item) => item.product),
    isOpenModalUpdateAddress: false,
    shippingAddress: {
      recipientName: "",
      address: "",
      phone: "",
    },
    userId: user._id,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onChange = (e: CheckboxChangeEvent) => {
    if (
      state.listChecked &&
      e.target &&
      state.listChecked.includes(e.target.value)
    ) {
      const newListChecked = state.listChecked.filter(
        (item) => item !== e.target.value
      );
      setState({ ...state, listChecked: newListChecked });
    } else if (state.listChecked) {
      setState({
        ...state,
        listChecked: [...state.listChecked, e.target.value],
      });
    }
  };

  const handleChangeCount = (
    type: string,
    orderItem: IOrderItem,
    value?: number
  ) => {
    const idProduct = orderItem.product;
    switch (type) {
      case "increase":
        if (orderItem?.quantity >= orderItem.quantityInStock) {
          message.error(`Chỉ còn ${orderItem.quantityInStock} sản phẩm`);
        } else {
          dispatch(increaseAmount({ idProduct, userId: user._id }));
        }
        break;
      case "decrease":
        if (orderItem?.quantity <= 1) {
          message.error("Số lượng phải lớn hơn 1");
        } else {
          dispatch(decreaseAmount({ idProduct, userId: user._id }));
        }
        break;
      default:
        if (!value || Number.isNaN(value)) {
          message.error("Mời điền số");
        } else if (value < 1) {
          message.error("Số lượng phải lớn hơn 1");
        } else if (value > orderItem.quantityInStock) {
          message.error(`Chỉ còn ${orderItem.quantityInStock} sản phẩm`);
          value = orderItem.quantityInStock;
          dispatch(changeAmount({ idProduct, value, userId: user._id }));
        } else {
          dispatch(changeAmount({ idProduct, value, userId: user._id }));
        }
        break;
    }
  };

  const handleDeleteOrder = (idProduct: string) => {
    dispatch(removeOrderItem({ idProduct, userId: user._id }));
  };

  const handleOnchangeCheckAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const newListChecked: Array<string> = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setState({ ...state, listChecked: newListChecked });
    } else {
      setState({ ...state, listChecked: [] });
    }
  };

  useEffect(() => {
    if (state.listChecked) {
      dispatch(
        selectedOrderItem({ listChecked: state.listChecked, userId: user._id })
      );
    }
  }, [state.listChecked]);

  const handleChangeAddress = () => {
    if (order) {
      setState({
        ...state,
        isOpenModalUpdateAddress: true,
        shippingAddress: {
          recipientName: order?.shippingAddress?.recipientName,
          address: order?.shippingAddress?.address,
          phone: order.shippingAddress.phone || "",
        },
      });
    }
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected.reduce((total, cur) => {
      return (
        total + (cur.price - (cur.price * cur.discount) / 100) * cur.quantity
      );
    }, 0);
    return result ?? 0;
  }, [order]);
  // console.log("priceMemo:", priceMemo);

  // lấy tất cả shipping price từ db
  const { data: allShippingPrices, isLoading } = useGetAllShippingPricesQuery();

  const defaultShippingPrice = {
    maxOrderAmount: undefined, // Or replace with the default value you want
    shippingFee: 0,
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };

  const calculateShippingFee = (
    price: number,
    shippingPrices: IShippingPrice[]
  ): IShippingPrice => {
    const sortedShippingPrices = shippingPrices.slice().sort((a, b) => {
      // Sort the shipping prices based on maxOrderAmount in descending order
      if (a.maxOrderAmount === null || !a.maxOrderAmount) return 1;
      if (b.maxOrderAmount === null || !b.maxOrderAmount) return -1;
      return a.maxOrderAmount - b.maxOrderAmount;
    });

    // console.log("sortedShippingPrices", sortedShippingPrices);

    for (const shippingPrice of sortedShippingPrices) {
      // console.log("shippingPrice", shippingPrice);
      // console.log("price", price);

      if (
        shippingPrice.maxOrderAmount === null ||
        !shippingPrice.maxOrderAmount ||
        price < shippingPrice.maxOrderAmount
      ) {
        // console.log(shippingPrice.maxOrderAmount === null);
        // console.log(!shippingPrice.maxOrderAmount);
        // console.log(price < shippingPrice.maxOrderAmount);

        return shippingPrice;
      }
    }

    // If no matching condition found, return default shipping price
    return defaultShippingPrice;
  };

  const shippingPriceMemo = useMemo(() => {
    if (priceMemo && priceMemo > 0 && allShippingPrices) {
      // Khi priceMemo thay đổi, xử lý logic để lấy shipping price
      // console.log("allShippingPrices", allShippingPrices);
      // console.log(
      //   "calculateShippingPrice",
      //   calculateShippingFee(priceMemo, allShippingPrices.data)
      // );

      return calculateShippingFee(priceMemo, allShippingPrices.data);
    }

    return defaultShippingPrice;
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    if (priceMemo) return Number(priceMemo) + shippingPriceMemo.shippingFee;
    else return 0;
  }, [priceMemo, shippingPriceMemo.shippingFee]);

  const handleRemoveAllOrder = () => {
    if (state.listChecked && state.listChecked?.length > 1) {
      dispatch(
        removeAllOrderItem({ listChecked: state.listChecked, userId: user._id })
      );
    }
  };

  const handleAddCard = () => {
    if (!order || !order?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (
      !order?.shippingAddress?.phone ||
      !order?.shippingAddress.address ||
      !order?.shippingAddress.recipientName
    ) {
      setState({ ...state, isOpenModalUpdateAddress: true });
    } else {
      dispatch(
        updateOrder({
          ...order,
          user: user?._id,
          itemsPrice: priceMemo,
          shippingFee: shippingPriceMemo?.shippingFee,
          shippingPrice: shippingPriceMemo?._id,
          totalPrice: totalPriceMemo,
        })
      );
      navigate("/payment");
    }
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h2 style={{ padding: "10px 0" }}>Giỏ hàng</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={
                    state.listChecked?.length === order?.orderItems?.length
                  }
                ></CustomCheckbox>
                <span style={{ marginLeft: "15px" }}>
                  {" "}
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
              </span>
              <WrapperItemPrice>
                <span>Đơn giá</span>
                <span>Giảm giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </WrapperItemPrice>
            </WrapperStyleHeader>
            <div>
              {order?.orderItems?.map((orderItem) => {
                return (
                  <WrapperItemOrder key={orderItem?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={orderItem?.product}
                        checked={state.listChecked?.includes(
                          orderItem?.product
                        )}
                      ></CustomCheckbox>
                      <img
                        src={orderItem?.image}
                        alt=""
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textWrap: "wrap",
                        }}
                      >
                        {orderItem?.name}
                      </div>
                    </div>
                    <WrapperItemPrice>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(orderItem?.price)}
                      </span>
                      <span style={{ fontSize: "13px", color: "#242424" }}>
                        {convertPrice(
                          ((orderItem?.price * orderItem?.discount) / 100) *
                            orderItem?.quantity
                        )}
                        &nbsp;&#40;
                        <span style={{ color: "rgb(0, 171, 86)" }}>
                          {orderItem?.discount}%
                        </span>
                        &#41;
                      </span>
                      <div>
                        <WrapperCountOrder>
                          <button
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleChangeCount("decrease", orderItem)
                            }
                          >
                            <MinusOutlined
                              style={{ color: "#000", fontSize: "10px" }}
                            />
                          </button>
                          <WrapperInputNumber
                            type="number"
                            defaultValue={orderItem?.quantity}
                            value={orderItem?.quantity}
                            size="small"
                            min={1}
                            max={orderItem?.quantityInStock}
                            onPressEnter={(e: any) => {
                              handleChangeCount(
                                "value",
                                orderItem,
                                Number(e.target.value)
                              );
                            }}
                          />
                          <button
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleChangeCount("increase", orderItem)
                            }
                          >
                            <PlusOutlined
                              style={{ color: "#000", fontSize: "10px" }}
                            />
                          </button>
                        </WrapperCountOrder>
                        {orderItem?.quantityInStock <= 5 && (
                          <WrapperLimitOrder>
                            Còn: {orderItem?.quantityInStock} sản phẩm
                          </WrapperLimitOrder>
                        )}
                      </div>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(
                          (orderItem?.price -
                            (orderItem?.price * orderItem.discount) / 100) *
                            orderItem?.quantity
                        )}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(orderItem?.product)}
                      />
                    </WrapperItemPrice>
                  </WrapperItemOrder>
                );
              })}
            </div>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <Loading isPending={isLoading}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {order?.shippingAddress.address ?? user?.address}{" "}
                    </span>
                    <span
                      onClick={handleChangeAddress}
                      style={{
                        color: "var(--primary-color)",
                        cursor: "pointer",
                      }}
                    >
                      Thay đổi
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfoBody>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {priceMemo
                        ? convertPrice(shippingPriceMemo?.shippingFee)
                        : "0đ"}
                    </span>
                  </div>
                </WrapperInfoBody>
                <WrapperTotal>
                  <span>Tổng giá</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {totalPriceMemo ? (
                        convertPrice(totalPriceMemo)
                      ) : (
                        <div style={{ fontSize: "16px" }}>
                          Vui lòng chọn sản phẩm
                        </div>
                      )}
                    </span>
                  </span>
                </WrapperTotal>
              </Loading>
            </div>

            <ButtonComponent
              onClick={() => handleAddCard()}
              size={"small"}
              buttonStyle={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              buttonText={"Mua hàng"}
              buttonTextStyle={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              disabled={
                user?.role !== "Khách hàng" || isLoading || !totalPriceMemo
              }
            />
          </WrapperRight>
        </div>
      </div>
      <UpdateAddressModal state={state} setState={setState} />
    </div>
  );
};

export default CartComponent;
