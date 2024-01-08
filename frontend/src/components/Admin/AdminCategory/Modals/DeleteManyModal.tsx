import * as React from "react";
import { useEffect } from "react";
import { useDeleteManyCategoriesMutation } from "../../../../services/category";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteManyModal = (props: IModalProps) => {
  const [deleteManyCategories, result] = useDeleteManyCategoriesMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDeleteMany: false,
      rowSelectedKeys: [],
    });
  };

  const handleDeleteManyCategories = () => {
    deleteManyCategories(props.state.rowSelectedKeys);
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
      title="Xóa tất cả danh mục đã chọn"
      open={props.state.isOpenModalDeleteMany}
      onCancel={handleCloseModal}
      onOk={handleDeleteManyCategories}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa tất cả danh mục đã chọn không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteManyModal;
