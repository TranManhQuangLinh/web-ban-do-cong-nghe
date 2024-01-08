import * as React from "react";

import { Form, Select, UploadFile, UploadProps } from "antd";
import { useEffect } from "react";
import {
  useCreateProductMutation,
  useGetDetailsProductQuery,
  useUpdateProductMutation,
} from "../../../../services/product";
import InputComponent from "../../../InputComponent";
import Loading from "../../../LoadingComponent";
import * as message from "../../../Message";
import ModalComponent from "../../../ModalComponent";
import { IModalProps } from "../../types";
import { validateNumber } from "../../../../utils";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import UploadComponent, { getBase64 } from "../../../UploadComponent";

const CreateUpdateModal = (props: IModalProps) => {
  const [form] = Form.useForm();

  // console.log("form", form);
  // console.log(props);
  // console.log(!!props.state.rowSelected);

  // khi gọi useGetDetailsProductQuery thì rtk query lưu kết quả vào state.
  // Khi gọi lại api mà vẫn còn trong redux thì không gọi lại mà trả về luôn data lưu trong redux
  // mỗi khi param truyền vào thay đổi thì useGetDetailsProductQuery sẽ được gọi lại
  const {
    data: details,
    isFetching,
    isLoading,
  } = useGetDetailsProductQuery(props.state.rowSelected, {
    skip: !props.state.rowSelected,
  });

  const [create, createResult] = useCreateProductMutation();
  const [update, updateResult] = useUpdateProductMutation();

  // console.log("props.state", props.state);

  useEffect(() => {
    if (props.state.isOpenModalCreateUpdate && props.state.rowSelected) {
      form.setFieldsValue(details?.data);
    }
  }, [props.state.isOpenModalCreateUpdate, details]);

  useEffect(() => {
    if (createResult.isSuccess && createResult.data?.status === "OK") {
      message.success();
      props.setState({
        rowSelected: "",
        rowSelectedKeys: [],
        isOpenModalCreateUpdate: false,
        isOpenModalDelete: false,
        isOpenModalDeleteMany: false,
      });
      handleCloseModal();
    } else {
      if (createResult.data?.message) {
        message.error(createResult.data?.message);
      }
    }
  }, [createResult]);

  useEffect(() => {
    // console.log('updateResult', updateResult);
    if (updateResult.isSuccess && updateResult.data?.status === "OK") {
      message.success();
      props.setState({
        rowSelected: "",
        rowSelectedKeys: [],
        isOpenModalCreateUpdate: false,
        isOpenModalDelete: false,
        isOpenModalDeleteMany: false,
      });
      handleCloseModal();
    } else {
      if (updateResult.data?.message) {
        message.error(updateResult.data?.message);
      }
    }
  }, [updateResult]);

  const handleFinish = (values: any) => {
    // console.log(values);
    // return
    if (!props.state.rowSelected) {
      create(values);
    } else {
      const { email, ...rest } = values;
      update({ id: props.state.rowSelected, data: rest });
    }
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    // console.log("e.target", e.target);
    const value = e.target?.value;

    form.setFieldsValue({ [name]: value });
  };

  const handleRoleChange = (value: string) => {
    form.setFieldsValue({ role: value });
  };

  const handleChangeAvatar: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log("info", info);

    if (info.file.status === "uploading") {
    }
    if (info.file.status === "done") {
    }
    if (info.file.status === "error") {
    }

    const preview = await getBase64(info.file.originFileObj as RcFile);
    form.setFieldValue("avatar", preview);
    // console.log('form.getFieldValue("avatar")', form.getFieldValue("avatar"));
  };

  const handleCloseModal = () => {
    // console.log("close create update modal");

    props.setState({
      ...props.state,
      isOpenModalCreateUpdate: false,
      rowSelected: "",
    });
    form.resetFields();
  };

  return (
    <ModalComponent
      title={!props.state.rowSelected ? "Tạo mới danh mục" : "Sửa danh mục"}
      isOpen={props.state.isOpenModalCreateUpdate}
      onCancel={handleCloseModal}
      onOk={() => form.submit()}
    >
      <Loading
        isPending={
          isLoading ||
          isFetching ||
          createResult?.isLoading ||
          updateResult?.isLoading
        }
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="on"
          form={form}
          onFinish={handleFinish}
          preserve={false}
        >
          {!props.state.rowSelected || details?.data?.sold! <= 0 ? (
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Mời nhập tên!" }]}
            >
              <InputComponent onChange={(e) => handleValueChange(e, "name")} />
            </Form.Item>
          ) : (
            <Form.Item label="Tên">{details?.data.name}</Form.Item>
          )}

          {/* {details?.data?.sold! <= 0 ? ( */}
          <Form.Item
            label="Giá (đ)"
            name="price"
            rules={[
              { required: true, message: "Mời nhập giá!" },
              {
                validator: validateNumber,
              },
            ]}
          >
            <InputComponent onChange={(e) => handleValueChange(e, "price")} />
          </Form.Item>
          {/* ) : (
              <Form.Item label="Giá">{details?.data?.price}</Form.Item>
            )} */}

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Mời chọn danh mục!" }]}
          >
            <Select
              defaultValue={details?.data?.category}
              onChange={handleRoleChange}
              placeholder="Chọn danh mục"
              options={props?.categories!.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
            />
          </Form.Item>

          {details?.data?.sold! <= 0 ? (
            <Form.Item
              label="Số lượng trong kho"
              name="quantityInStock"
              rules={[
                { required: true, message: "Mời nhập số lượng trong kho!" },
                {
                  validator: validateNumber,
                },
              ]}
            >
              <InputComponent
                onChange={(e) => handleValueChange(e, "quantityInStock")}
              />
            </Form.Item>
          ) : (
            <Form.Item label="Số lượng trong kho">
              {details?.data.quantityInStock}
            </Form.Item>
          )}

          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[
              { required: true, message: "Mời nhập % giảm giá!" },
              {
                validator: validateNumber,
              },
            ]}
          >
            <InputComponent
              onChange={(e) => handleValueChange(e, "discount")}
            />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <InputComponent
              onChange={(e) => handleValueChange(e, "description")}
            />
          </Form.Item>

          {details?.data.sold! <= 0 ? (
            <Form.Item
              label="Ảnh"
              name="image"
              rules={[{ required: true, message: "Mời chọn ảnh!" }]}
            >
              <UploadComponent
              image={form.getFieldValue("avatar")}
              onChange={handleChangeAvatar}
              maxCount={1}
              listType="picture-circle"
              hasControlInside={true}
            />
            </Form.Item>
          ) : (
            <Form.Item label="Ảnh">
              <img
                src={details?.data.image}
                style={{
                  height: "60px",
                  width: "60px",
                  objectFit: "cover",
                  marginLeft: "10px",
                }}
                alt="ảnh"
              />
            </Form.Item>
          )}
        </Form>
      </Loading>
    </ModalComponent>
  );
};

export default CreateUpdateModal;
