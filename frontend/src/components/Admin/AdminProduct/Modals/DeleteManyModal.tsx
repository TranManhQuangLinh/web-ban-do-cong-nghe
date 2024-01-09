import * as React from "react";
import { useEffect } from "react";
import { useDeleteManyProductsMutation } from "../../../../services/product";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteManyModal = (props: IModalProps) => {
  const [deleteManyProducts, result] = useDeleteManyProductsMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDeleteMany: false,
      rowSelectedKeys: [],
    });
  };

  const handleDeleteManyProducts = () => {
    if (props.state.rowSelectedKeys)
      deleteManyProducts(props.state.rowSelectedKeys);
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
      title="Xóa tất cả sản phẩm đã chọn"
      open={props.state.isOpenModalDeleteMany}
      onCancel={handleCloseModal}
      onOk={handleDeleteManyProducts}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa tất cả sản phẩm đã chọn không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteManyModal;
