import { useEffect } from "react";
import { useDeleteManyUsersMutation } from "../../services/userApi";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as message from "../../components/Message/Message";

const DeleteManyModal = ({
  rowSelectedKeys,
  isOpenModalDeleteMany,
  setIsOpenModalDeleteMany,
}) => {
  const [deleteManyUsers, result] = useDeleteManyUsersMutation();

  const handleCloseModalDeleteMany = () => {
    setIsOpenModalDeleteMany(false);
  };

  const handleDeleteManyUsers = () => {
    deleteManyUsers(rowSelectedKeys);
  };

  useEffect(() => {
    if (result.isSuccess && result.data?.status === "OK") {
      message.success();
      handleCloseModalDeleteMany();
    } else {
      if (result.data?.message) {
        message.error(result.data?.message);
      }
    }
  }, [result.isSuccess]);

  return (
    <ModalComponent
        title="Xóa tất cả người dùng đã chọn"
        open={isOpenModalDeleteMany}
        onCancel={handleCloseModalDeleteMany}
        onOk={handleDeleteManyUsers}
      >
        <Loading isPending={result.isLoading}>
          <div>Bạn có chắc muốn xóa tất cả người dùng đã chọn không?</div>
        </Loading>
      </ModalComponent>
  );
};

export default DeleteManyModal;
