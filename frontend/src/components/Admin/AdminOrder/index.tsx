import React, { useEffect, useMemo, useState } from "react";
import { convertDateToString, convertPrice } from "../../../utils";
import TableComponent from "../../TableComponent";
import { WrapperCurrentStatus, WrapperHeader } from "./style";

import { useLocation, useNavigate } from "react-router-dom";
import { orderConstant } from "../../../constant";
import { useGetAllOrdersQuery } from "../../../services/order";
import { useGetAllUsersQuery } from "../../../services/user";
import { IOrder, IOrderDataTable } from "../../../types";
import ButtonComponent from "../../ButtonComponent";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [navigateOrderDetails, setNavigateOrderDetails] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // lấy tất cả user từ db
  const { data: users, isLoading: isPendingUsers } = useGetAllUsersQuery();

  // lấy tất cả order từ db
  const { data: orders, isLoading: isPendingOrders } = useGetAllOrdersQuery();

  // const dataTable =
  //   orders?.length &&
  //   orders?.map((order) => {
  //     // console.log("order", order);
  //     return {
  //       ...order,
  //       key: order?._id,
  //       currentStatus: (
  //         <WrapperCurrentStatus>{order?.currentStatus}</WrapperCurrentStatus>
  //       ),
  //       userName: order?.user?.name || order?.user?.email, // first truthy value or the last falsy value
  //       paymentMethod: orderConstant.payment[order?.paymentMethod],
  //       totalPrice: convertPrice(order?.totalPrice),
  //     };
  //   });
  const dataTable = useMemo(() => {
    let result: Array<IOrderDataTable> = [];
    if (orders?.data && orders?.data?.length > 0) {
      result = orders?.data.map((order) => {
        return {
          ...order,
          key: order._id,
          user:
            users?.data?.filter((user) => user._id === order.user)[0].name ??
            "Người dùng không tồn tại",
          currentStatus: (
            <WrapperCurrentStatus>{order?.currentStatus}</WrapperCurrentStatus>
          ),
          // chỉ đúng khi order.paymentMethod có giá trị là một key của orderConstant.payment
          // nếu không sẽ trả về undefined
          paymentMethod:
            orderConstant.payment[
              order.paymentMethod as keyof typeof orderConstant.payment
            ],
          totalPrice: convertPrice(order?.totalPrice),
          createdAt: convertDateToString(new Date(order?.createdAt)),
        };
      });
      // console.log("result", result);
    }
    return result;
  }, [orders]);

  const columns = [
    {
      title: "Người tạo",
      dataIndex: "user",
      sorter: (a: IOrderDataTable, b: IOrderDataTable) =>
        a.user.localeCompare(b.user),
    },
    {
      title: "Trạng thái",
      dataIndex: "currentStatus",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      sorter: (a: IOrderDataTable, b: IOrderDataTable) =>
        Number.parseInt(b.totalPrice.slice(0, -1)) -
        Number.parseInt(a.totalPrice.slice(0, -1)),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: (a: IOrderDataTable, b: IOrderDataTable) => {
        // console.log(a);
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: () => (
        <div>
          <ButtonComponent
            buttonStyle={{
              background: "orange",
              cursor: "pointer",
              width: "fit-content",
              border: "none",
            }}
            buttonTextStyle={{
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              setNavigateOrderDetails(true);
            }}
            buttonText="Sửa"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (navigateOrderDetails) {
      navigate(`/order-details/${rowSelected}`, { state: location?.pathname });
    }
  }, [rowSelected, navigateOrderDetails]);

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isPending={isPendingUsers || isPendingOrders}
          dataSource={dataTable}
        />
      </div>
    </div>
  );
};

export default AdminOrder;
