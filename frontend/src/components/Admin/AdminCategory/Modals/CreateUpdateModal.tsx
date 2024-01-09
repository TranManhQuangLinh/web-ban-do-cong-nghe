import * as React from "react";

import { Form } from "antd";
import { useEffect } from "react";
import {
  useCreateCategoryMutation,
  useGetDetailsCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../services/category";
import InputComponent from "../../../InputComponent";
import Loading from "../../../LoadingComponent";
import * as message from "../../../Message";
import ModalComponent from "../../../ModalComponent";
import { IModalProps } from "../../types";
import { IFormStateCategory } from "../../../../types";

const CreateUpdateModal = (props: IModalProps) => {
  const [form] = Form.useForm();

  // console.log("form", form);
  // console.log(props);
  // console.log(!!props.state.rowSelected);

  // khi gọi useGetDetailsCategoryQuery thì rtk query lưu kết quả vào state.
  // Khi gọi lại api mà vẫn còn trong redux thì không gọi lại mà trả về luôn data lưu trong redux
  // mỗi khi param truyền vào thay đổi thì useGetDetailsCategoryQuery sẽ được gọi lại
  const {
    data: details,
    isFetching,
    isLoading,
  } = useGetDetailsCategoryQuery(props.state.rowSelected, {
    skip: !props.state.rowSelected,
  });

  const [create, createResult] = useCreateCategoryMutation();
  const [update, updateResult] = useUpdateCategoryMutation();

  // console.log("props.state", props.state);

  useEffect(() => {
    if (props.state.isOpenModalCreateUpdate && props.state.rowSelected && details?.data) {
      form.setFieldsValue(details?.data);
    }
  }, [props.state.isOpenModalCreateUpdate, details, props.state.rowSelected, form]);

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

  const handleFinish = (values: IFormStateCategory) => {
    console.log(values);
    // return
    if (!props.state.rowSelected) {
      create(values);
    } else {
      update({ id: props.state.rowSelected, data: values });
    }
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
          <Form.Item label="Tên" name="name">
            <InputComponent />
          </Form.Item>
        </Form>
      </Loading>
    </ModalComponent>
  );
};

export default CreateUpdateModal;
