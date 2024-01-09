import * as React from "react";
import { useEffect } from "react";
import { useDeleteProductMutation } from "../../../../services/product";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteModal = (props: IModalProps) => {
  const [deleteProduct, result] = useDeleteProductMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDelete: false,
      rowSelected: "",
    });
  };

  const handleDeleteProduct = () => {
    deleteProduct(props.state.rowSelected);
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
      title="Xóa sản phẩm"
      open={props.state.isOpenModalDelete}
      onCancel={handleCloseModal}
      onOk={handleDeleteProduct}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteModal;
