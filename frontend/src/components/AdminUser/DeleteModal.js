import { useEffect } from "react";
import { useDeleteUserMutation } from "../../services/userApi";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as message from "../../components/Message/Message";

const DeleteModal = ({
  rowSelected,
  isOpenModalDelete,
  setIsOpenModalDelete,
}) => {
  const [deleteUser, result] = useDeleteUserMutation();

  const handleCloseModalDelete = () => {
    setIsOpenModalDelete(false);
  };

  const handleDeleteUser = () => {
    deleteUser(rowSelected);
  };

  useEffect(() => {
    if (result.isSuccess && result.data?.status === "OK") {
      message.success();
      handleCloseModalDelete();
    } else {
      if (result.data?.message) {
        message.error(result.data?.message);
      }
    }
  }, [result.isSuccess]);

  return (
    <ModalComponent
      title="Xóa người dùng"
      open={isOpenModalDelete}
      onCancel={handleCloseModalDelete}
      onOk={handleDeleteUser}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa người dùng này không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteModal;
