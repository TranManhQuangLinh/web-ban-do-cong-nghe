import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrderItem, IShippingAddress, IUpdateHistory } from "../../types";

interface IOrderState {
  orderItems: Array<IOrderItem>;
  orderItemsSelected: Array<IOrderItem>;
  shippingAddress: IShippingAddress;
  user: string;
  paymentMethod: string;
  itemsPrice: number;
  shippingFee: number;
  shippingPrice: string;
  totalPrice: number;
  currentStatus: string;
  updateHistory: Array<IUpdateHistory>;
}

interface IAddOrderItemPayload {
  orderItem: {
    name: string;
    quantity: number;
    image: string;
    price: number;
    discount: number;
    product: string;
    quantityInStock: number;
  };
  userId: string;
}
const initialState: Array<IOrderState> = [
  {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: { recipientName: "", address: "", phone: undefined },
    user: "",
    paymentMethod: "",
    itemsPrice: 0,
    shippingFee: 0,
    shippingPrice: "",
    totalPrice: 0,
    currentStatus: "",
    updateHistory: [],
  },
];

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    initOrder: (state, action) => {
      const { userId } = action.payload;

      const order = state.find((order) => order.user === "");
      if (order) order.user = userId;
      else state.push(initialState[0]);
    },
    addOrderItem: (state, action: PayloadAction<IAddOrderItemPayload>) => {
      const { orderItem, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);
      if (userOrder) {
        const itemOrder = userOrder.orderItems.find(
          (item) => item.product === orderItem.product
        );
        if (itemOrder) {
          if (itemOrder.quantity <= itemOrder.quantityInStock) {
            itemOrder.quantity += orderItem.quantity;
          }
        } else {
          userOrder.orderItems.push(orderItem);
        }
      }
    },
    changeAmount: (state, action) => {
      const { idProduct, value, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);
      if (userOrder) {
        const itemOrder = userOrder.orderItems?.find(
          (item) => item?.product === idProduct
        );
        const itemOrderSelected = userOrder.orderItemsSelected?.find(
          (item) => item?.product === idProduct
        );

        if (itemOrder) {
          itemOrder.quantity = value;
        }

        if (itemOrderSelected) {
          itemOrderSelected.quantity = value;
        }
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);
      if (userOrder) {
        const itemOrder = userOrder.orderItems?.find(
          (item) => item?.product === idProduct
        );

        const itemOrderSelected = userOrder.orderItemsSelected?.find(
          (item) => item?.product === idProduct
        );

        if (itemOrder) {
          itemOrder.quantity++;
        }

        if (itemOrderSelected) {
          itemOrderSelected.quantity++;
        }
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        const itemOrder = userOrder.orderItems?.find(
          (item) => item?.product === idProduct
        );
        const itemOrderSelected = userOrder.orderItemsSelected?.find(
          (item) => item?.product === idProduct
        );

        if (itemOrder) {
          itemOrder.quantity--;
        }

        if (itemOrderSelected) {
          itemOrderSelected.quantity--;
        }
      }
    },
    removeOrderItem: (state, action) => {
      const { idProduct, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        const itemOrder = userOrder.orderItems?.filter(
          (item) => item?.product !== idProduct
        );
        const itemOrderSelected = userOrder.orderItemsSelected?.filter(
          (item) => item?.product !== idProduct
        );

        userOrder.orderItems = itemOrder;
        userOrder.orderItemsSelected = itemOrderSelected;
      }
    },
    removeAllOrderItem: (state, action) => {
      const { listChecked, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        const itemOrders = userOrder.orderItems?.filter(
          (item) => !listChecked.includes(item.product)
        );
        const itemOrdersSelected = userOrder.orderItems?.filter(
          (item) => !listChecked.includes(item.product)
        );
        userOrder.orderItems = itemOrders;
        userOrder.orderItemsSelected = itemOrdersSelected;
      }
    },
    selectedOrderItem: (state, action) => {
      const { listChecked, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        const orderItemsSelected: Array<IOrderItem> = [];
        userOrder.orderItems.forEach((order) => {
          if (listChecked.includes(order.product)) {
            orderItemsSelected.push(order);
          }
        });
        userOrder.orderItemsSelected = orderItemsSelected;
      }
    },
    updateShippingAddress: (state, action) => {
      const { recipientName, address, phone, userId } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        userOrder.shippingAddress = {
          recipientName: recipientName,
          address: address,
          phone: phone,
        };
      }
    },
    updateOrder: (state, action) => {
      const {
        userId,
        itemsPrice,
        shippingFee,
        shippingPrice,
        totalPrice,
        paymentMethod,
      } = action.payload;
      const userOrder = state.find((order) => order.user === userId);

      if (userOrder) {
        userOrder.itemsPrice = itemsPrice;
        userOrder.shippingFee = shippingFee;
        userOrder.shippingPrice = shippingPrice;
        userOrder.totalPrice = totalPrice;
        userOrder.paymentMethod = paymentMethod;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initOrder,
  addOrderItem,
  changeAmount,
  increaseAmount,
  decreaseAmount,
  removeOrderItem,
  removeAllOrderItem,
  selectedOrderItem,
  updateShippingAddress,
  updateOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
