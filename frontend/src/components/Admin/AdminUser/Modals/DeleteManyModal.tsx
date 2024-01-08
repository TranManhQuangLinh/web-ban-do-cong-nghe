import * as React from "react";
import { useEffect } from "react";
import { useDeleteManyUsersMutation } from "../../../../services/user";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteManyModal = (props: IModalProps) => {
  const [deleteManyUsers, result] = useDeleteManyUsersMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDeleteMany: false,
      rowSelectedKeys: [],
    });
  };

  const handleDeleteManyUsers = () => {
    deleteManyUsers(props.state.rowSelectedKeys);
  };

  useEffect(() => {
    if (result.isSuccess && result.data?.status === "OK") {
      message.success();
      handleCloseModal();
    } else {
      if (result.data?.message) {
        message.error(result.data?.message);
      }
    }
  }, [result.isSuccess]);

  return (
    <ModalComponent
      title="Xóa tất cả người dùng đã chọn"
      open={props.state.isOpenModalDeleteMany}
      onCancel={handleCloseModal}
      onOk={handleDeleteManyUsers}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa tất cả người dùng đã chọn không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteManyModal;
