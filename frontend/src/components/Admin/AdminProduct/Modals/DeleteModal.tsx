import * as React from "react";
import { useEffect } from "react";
import { useDeleteCategoryMutation } from "../../../../services/category";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteModal = (props: IModalProps) => {
  const [deleteCategory, result] = useDeleteCategoryMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDelete: false,
      rowSelected: "",
    });
  };

  const handleDeleteCategory = () => {
    deleteCategory(props.state.rowSelected);
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
      title="Xóa danh mục"
      open={props.state.isOpenModalDelete}
      onCancel={handleCloseModal}
      onOk={handleDeleteCategory}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa danh mục này không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteModal;
