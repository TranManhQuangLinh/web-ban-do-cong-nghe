import * as React from "react"
import { useEffect } from "react";
import { useDeleteUserMutation } from "../../../services/user";
import Loading from "../../LoadingComponent";
import ModalComponent from "../../ModalComponent";
import * as message from "../../Message";
import { IModalProps } from "../types";

const DeleteModal = (props: IModalProps) => {
  const [deleteUser, result] = useDeleteUserMutation();

  const handleCloseModal = () => {
    props.setState({...props.state, isOpenModalDelete: false})
  };

  const handleDeleteUser = () => {
    deleteUser({id: props.state.rowSelected});
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
      title="Xóa người dùng"
      open={props.state.isOpenModalDelete}
      onCancel={handleCloseModal}
      onOk={handleDeleteUser}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa người dùng này không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteModal;
