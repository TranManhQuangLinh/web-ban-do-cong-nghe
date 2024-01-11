import * as React from "react";

import { Form, Select } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useEffect } from "react";
import {
  useCreateUserMutation,
  useGetDetailsUserQuery,
  useUpdateUserMutation,
} from "../../../../services/user";
import InputComponent from "../../../InputComponent";
import Loading from "../../../LoadingComponent";
import * as message from "../../../Message";
import ModalComponent from "../../../ModalComponent";
import UploadComponent, { getBase64 } from "../../../UploadComponent";
import { IModalProps } from "../../types";
import { IFormStateUser } from "../../../../types";

const CreateUpdateModal = (props: IModalProps) => {
  const [form] = Form.useForm();

  // console.log("form", form);
  // console.log(props);
  // console.log(!!props.state.rowSelected);

  const {
    data: details,
    isLoading,
  } = useGetDetailsUserQuery(props.state.rowSelected, {
    skip: !props.state.rowSelected,
  });

  const [create, createResult] = useCreateUserMutation();
  const [update, updateResult] = useUpdateUserMutation();

  // console.log('createResult', createResult);

  useEffect(() => {
    if (
      props.state.isOpenModalCreateUpdate &&
      props.state.rowSelected &&
      details?.data
    ) {
      form.setFieldsValue(details?.data);
    }
  }, [
    props.state.isOpenModalCreateUpdate,
    details,
    props.state.rowSelected,
    form,
  ]);

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

  const handleFinish = (values: IFormStateUser) => {
    // console.log(values);
    // return
    if (!props.state.rowSelected) {
      create(values);
    } else {
      const { email, ...rest } = values;
      update({ id: props.state.rowSelected, data: rest });
    }
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
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Mời nhập email!" }]}
          >
            <InputComponent disabled={!!props.state.rowSelected} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
          >
            <InputComponent />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Mời chọn vai trò!" }]}
          >
            <Select
              placeholder="Chọn vai trò"
              options={[
                { value: "Khách hàng", label: "Khách hàng" },
                { value: "Admin", label: "Admin" },
                { value: "Nhân viên", label: "Nhân viên" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <InputComponent />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <InputComponent />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <InputComponent />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <InputComponent />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar">
            <UploadComponent
              image={form.getFieldValue("avatar")}
              onChange={handleChangeAvatar}
              maxCount={1}
              listType="picture-circle"
              hasControlInside={true}
            />
          </Form.Item>
        </Form>
      </Loading>
    </ModalComponent>
  );
};

export default CreateUpdateModal;
