import React, { useMemo, useState } from "react";
import { useGetAllShippingPricesQuery } from "../../../services/shippingPrice";
import { IShippingPriceDataTable } from "../../../types";
import { convertPrice } from "../../../utils";
import ButtonComponent from "../../ButtonComponent";
import TableComponent from "../../TableComponent";
import { IState } from "../types";
import CreateUpdateModal from "./Modals/CreateUpdateModal";
import DeleteManyModal from "./Modals/DeleteManyModal";
import DeleteModal from "./Modals/DeleteModal";
import { WrapperHeader } from "./style";

const AdminShippingPrice = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });

  // lấy tất cả shipping price từ db
  const { data: shippingPrices, isLoading: isPending } =
    useGetAllShippingPricesQuery();

  // table
  const dataTable = useMemo(() => {
    let result: Array<IShippingPriceDataTable> = [];
    if (shippingPrices?.data && shippingPrices?.data?.length > 0) {
      result = shippingPrices.data.map((shippingPrice) => ({
        ...shippingPrice,
        maxOrderAmount: shippingPrice.maxOrderAmount
          ? convertPrice(shippingPrice.maxOrderAmount)
          : "MAX",
        shippingFee: convertPrice(shippingPrice.shippingFee),
        key: shippingPrice._id,
      })) as IShippingPriceDataTable[];
    }
    return result;
  }, [shippingPrices]);

  const columns = [
    {
      title: "Mức giá tối đa",
      dataIndex: "maxOrderAmount",
      sorter: (a: IShippingPriceDataTable, b: IShippingPriceDataTable) => {
        if (a.maxOrderAmount && b.maxOrderAmount) {
          return (
            Number.parseInt(b.maxOrderAmount.slice(0, -1)) -
            Number.parseInt(a.maxOrderAmount.slice(0, -1))
          );
        }
        return 1;
      },
    },
    {
      title: "Phí giao hàng",
      dataIndex: "shippingFee",
      sorter: (a: IShippingPriceDataTable, b: IShippingPriceDataTable) =>
        Number.parseInt(b.shippingFee.slice(0, -1)) -
        Number.parseInt(a.shippingFee.slice(0, -1)),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: string, record: IShippingPriceDataTable) => {
        return (
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
                setState({
                  ...state,
                  rowSelected: record._id,
                  isOpenModalCreateUpdate: true,
                });
              }}
              buttonText="Sửa"
            />
            <ButtonComponent
              buttonStyle={{
                background: "red",
                cursor: "pointer",
                width: "fit-content",
                border: "none",
                marginLeft: "10px",
              }}
              buttonTextStyle={{
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() =>
                setState({
                  ...state,
                  rowSelected: record._id,
                  isOpenModalDelete: true,
                })
              }
              buttonText="Xóa"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <WrapperHeader>Quản lý phí giao hàng</WrapperHeader>

      <div style={{ marginTop: "20px" }}>
        <ButtonComponent
          type="primary"
          buttonStyle={{
            marginBottom: "10px",
            cursor: "pointer",
            width: "fit-content",
            border: "none",
          }}
          buttonTextStyle={{
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => {
            setState({ ...state, isOpenModalCreateUpdate: true });
          }}
          buttonText="Tạo"
        />

        {state.rowSelectedKeys && !!state.rowSelectedKeys.length && (
          <ButtonComponent
            type="primary"
            buttonStyle={{
              background: "red",
              marginLeft: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              width: "fit-content",
              border: "none",
            }}
            buttonTextStyle={{
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              setState({ ...state, isOpenModalDeleteMany: true });
            }}
            buttonText="Xóa tất cả"
          />
        )}

        <TableComponent
          columns={columns}
          isPending={isPending}
          dataSource={dataTable}
          rowSelection={{
            type: "checkbox",
            onChange: (record: Array<string>) => {
              setState({ ...state, rowSelectedKeys: record });
            },
          }}
        />

        <div>
          Lưu ý: Phí giao hàng áp dụng cho khoảng từ mức giá nhỏ hơn gần nhất
          đến mức giá hiện tại.
          <br />
          Ví dụ có 3 phí giao hàng:
          <br />
          MAX-0đ
          <br />
          1.000.000đ-30.000đ
          <br />
          500.000đ-20.000đ
          <br />
          Nghĩa là:
          <br />
          Hóa đơn từ 0--{">"} nhỏ hơn 500.000đ có phí giao hàng là 20.000đ
          <br />
          Hóa đơn từ 500.000đ--{">"} nhỏ hơn 1.000.000đ có phí giao hàng là
          30.000đ
          <br />
          Hóa đơn từ 1.000.000đ trở lên có phí giao hàng là 0đ
          <br />
          Mức giá tối đa để trống tương đương với MAX
        </div>
      </div>

      <CreateUpdateModal state={state} setState={setState} />

      <DeleteModal state={state} setState={setState} />

      <DeleteManyModal state={state} setState={setState} />
    </div>
  );
};

export default AdminShippingPrice;
