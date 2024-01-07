import * as React from "react";

import { useEffect } from "react";
import * as message from "../../Message";
import { IModalProps } from "../types";
import Loading from "../../LoadingComponent";
import ModalComponent from "../../ModalComponent";
import InputComponent from "../../InputComponent";
import { Form, Select } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import UploadComponent, { getBase64 } from "../../UploadComponent";

const CreateUpdateModal = (props: IModalProps) => {
  const [form] = Form.useForm();

  // console.log("form", form);
  // console.log(props);
  // console.log(!!props.state.rowSelected);

  const {
    data: details,
    isFetching,
    isLoading,
    refetch: refetchDetails,
  } = props.useGetDetailsQuery(props.state.rowSelected, {
    skip: !props.state.rowSelected,
  });

  const [create, createResult] = props.useCreateMutation();
  const [update, updateResult] = props.useUpdateMutation();

  // console.log('createResult', createResult);

  useEffect(() => {
    if (
      props.state.isOpenModalCreateUpdate &&
      props.state.rowSelected
    ) {
      console.log("refetch");
      refetchDetails();
    }

    console.log("props.state.rowSelected:", props.state.rowSelected);
    console.log("details", details?.data);
    console.log("form values", form.getFieldsValue());

    form.setFieldsValue(details?.data);
  }, [props.state.isOpenModalCreateUpdate]);

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
    const value = e.target.value;
    form.setFieldsValue({ [name]: value });
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
    console.log("close modal");

    props.setState({
      ...props.state,
      isOpenModalCreateUpdate: false,
      rowSelected: "",
    });
    form.resetFields();
  };

  return (
    <ModalComponent
      title={!props.state.rowSelected ? "Tạo mới người dùng" : "Sửa người dùng"}
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
          {!props.state.rowSelected ? (
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Mời nhập email!" }]}
            >
              <InputComponent onChange={(e) => handleValueChange(e, "email")} />
            </Form.Item>
          ) : (
            <Form.Item label="Email">{details?.data?.email}</Form.Item>
          )}

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
          >
            <InputComponent
              onChange={(e) => handleValueChange(e, "password")}
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Mời chọn vai trò!" }]}
          >
            <Select
              placeholder="Chọn vai trò"
              onChange={(e) => handleValueChange(e, "role")}
            >
              <Select.Option value="Khách hàng">Khách hàng</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Nhân viên">Nhân viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <InputComponent onChange={(e) => handleValueChange(e, "name")} />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <InputComponent
              onChange={(e) => handleValueChange(e, "dateOfBirth")}
            />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <InputComponent onChange={(e) => handleValueChange(e, "phone")} />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <InputComponent onChange={(e) => handleValueChange(e, "address")} />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar">
            <UploadComponent
              avatar={form.getFieldValue("avatar")}
              onChange={handleChangeAvatar}
              maxCount={1}
              listType="picture-circle"
            />
          </Form.Item>
        </Form>
      </Loading>
    </ModalComponent>
  );
};

export default CreateUpdateModal;
