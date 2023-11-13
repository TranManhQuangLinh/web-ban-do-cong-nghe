import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
  shippingAddress: {},
  user: "",
  paymentMethod: "",
  itemsPrice: 0,
  shippingFee: 0,
  shippingPrice: "",
  totalPrice: 0,
  currentStatus: "",
  updateHistory: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderItem: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        if (itemOrder.quantity <= itemOrder.quantityInStock) {
          itemOrder.quantity += orderItem?.quantity;
          state.isSuccessOrder = true;
          state.isErrorOrder = false;
        }
      } else {
        state.orderItems.push(orderItem);
      }
    },
    resetOrder: (state) => {
      state.isSuccessOrder = false;
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.quantity++;
      if (itemOrderSelected) {
        itemOrderSelected.quantity++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.quantity--;
      if (itemOrderSelected) {
        itemOrderSelected.quantity--;
      }
    },
    removeOrderItem: (state, action) => {
      const { idProduct } = action.payload;

      const itemOrder = state?.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      const itemOrderSeleted = state?.orderItemsSelected?.filter(
        (item) => item?.product !== idProduct
      );

      state.orderItems = itemOrder;
      state.orderItemsSelected = itemOrderSeleted;
    },
    removeAllOrderItem: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product)
      );
      const itemOrdersSelected = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product)
      );
      state.orderItems = itemOrders;
      state.orderItemsSelected = itemOrdersSelected;
    },
    selectedOrderItem: (state, action) => {
      const { listChecked } = action.payload;
      const orderItemsSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderItemsSelected.push(order);
        }
      });
      state.orderItemsSelected = orderItemsSelected;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderItem,
  increaseAmount,
  decreaseAmount,
  removeOrderItem,
  removeAllOrderItem,
  selectedOrderItem,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
