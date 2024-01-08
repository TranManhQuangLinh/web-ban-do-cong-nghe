import React, { useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../services/category";
import { IGetAllCategoriesResult } from "../../../services/category/types";
import ButtonComponent from "../../ButtonComponent";
import TableComponent from "../../TableComponent";
import { IState } from "../types";
import { WrapperHeader } from "./style";
import CreateUpdateModal from "./Modals/CreateUpdateModal";
import DeleteModal from "./Modals/DeleteModal";
import DeleteManyModal from "./Modals/DeleteManyModal";

const AdminCategory = () => {
  const [state, setState] = useState<IState>({
    rowSelected: "",
    rowSelectedKeys: [],
    isOpenModalCreateUpdate: false,
    isOpenModalDelete: false,
    isOpenModalDeleteMany: false,
  });

  // lấy tất cả category từ db
  const { data: categories, isLoading: isPending } = useGetAllCategoriesQuery();

  const dataTable = useMemo(() => {
    let result: IGetAllCategoriesResult["data"] = [];
    if (categories && categories?.data?.length > 0) {
      result = categories.data.map((category) => ({
        ...category,
        key: category._id,
      }));
    }
    return result;
  }, [categories]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name - b.name,
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
      <WrapperHeader>Quản lý danh mục</WrapperHeader>

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

export default AdminCategory;
