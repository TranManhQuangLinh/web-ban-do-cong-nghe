import React, { useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../services/category";
import { useGetAllProductsQuery } from "../../../services/product";
import { IGetAllProductsResult } from "../../../services/product/types";
import ButtonComponent from "../../ButtonComponent";
import TableComponent from "../../TableComponent";
import { IState } from "../types";
import CreateUpdateModal from "./Modals/CreateUpdateModal";
import DeleteManyModal from "./Modals/DeleteManyModal";
import DeleteModal from "./Modals/DeleteModal";
import { WrapperHeader } from "./style";

const AdminProduct = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });
  // console.log(stateProduct.category);

  // lấy tất cả product từ db
  const { data: products, isLoading: isPending } = useGetAllProductsQuery({});
  // console.log("products:", products);

  // lấy tất cả category từ db
  const { data: categories, isLoading: isPendingCategories } =
    useGetAllCategoriesQuery();

  // console.log(categories);

  // table
  const dataTable = useMemo(() => {
    let result: IGetAllProductsResult["data"] = [];
    if (products && products?.data?.length > 0) {
      result = products.data.map((product) => ({
        ...product,
        key: product._id,
      }));
    }
    return result;
  }, [products]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a: any, b: any) => a.category - b.category,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      sorter: (a: any, b: any) => a.discount - b.discount,
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "quantityInStock",
      sorter: (a: any, b: any) => a.quantityInStock - b.quantityInStock,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      sorter: (a: any, b: any) => a.sold - b.sold,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: any, record: any) => {
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
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

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

        {!!state.rowSelectedKeys.length && (
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
            onChange: (record: any) => {
              setState({ ...state, rowSelectedKeys: record });
            },
          }}
        />
      </div>

      <CreateUpdateModal state={state} setState={setState} />

      <DeleteModal state={state} setState={setState} />

      <DeleteManyModal state={state} setState={setState} />
    </div>
  );
};

export default AdminProduct;
