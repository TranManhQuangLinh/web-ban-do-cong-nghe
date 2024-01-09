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
import { IProduct } from "../../../types";

const AdminProduct = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });
  // console.log(stateProduct.category);

  // lấy tất cả category từ db
  const { data: categories, isLoading: isPendingCategories } =
    useGetAllCategoriesQuery();

  // lấy tất cả product từ db
  const { data: products, isLoading: isPending } = useGetAllProductsQuery({});
  // console.log("products:", products);

  // console.log(categories);

  // table
  const dataTable = useMemo(() => {
    let result: IGetAllProductsResult["data"] = [];
    if (products?.data && products?.data?.length > 0) {
      result = products?.data.map((product) => {
        
        return {
          ...product,
          key: product._id,
          category: categories?.data?.filter(category => category._id === product.category)[0].name ?? "Danh mục không tồn tại"
        };
      });
      // console.log("result", result);
    }
    return result;
  }, [products]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a: IProduct, b: IProduct) => a.price - b.price,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      sorter: (a: IProduct, b: IProduct) => b.discount - a.discount,
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "quantityInStock",
      sorter: (a: IProduct, b: IProduct) => b.quantityInStock - a.quantityInStock,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      sorter: (a: IProduct, b: IProduct) => b.sold - a.sold,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: string, record: IProduct) => {
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
          isPending={isPending || isPendingCategories}
          dataSource={dataTable}
          rowSelection={{
            type: "checkbox",
            onChange: (record: Array<string>) => {
              setState({ ...state, rowSelectedKeys: record });
            },
          }}
        />
      </div>

      <CreateUpdateModal
        state={state}
        setState={setState}
        categories={categories}
      />

      <DeleteModal state={state} setState={setState} />

      <DeleteManyModal state={state} setState={setState} />
    </div>
  );
};

export default AdminProduct;
