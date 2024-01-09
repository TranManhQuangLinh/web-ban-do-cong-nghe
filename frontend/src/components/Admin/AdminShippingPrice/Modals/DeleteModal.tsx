import * as React from "react";
import { useEffect } from "react";
import { useDeleteShippingPriceMutation } from "../../../../services/shippingPrice";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteModal = (props: IModalProps) => {
  const [deleteShippingPrice, result] = useDeleteShippingPriceMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDelete: false,
      rowSelected: "",
    });
  };

  const handleDeleteShippingPrice = () => {
    deleteShippingPrice(props.state.rowSelected);
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
      title="Xóa phí giao hàng"
      open={props.state.isOpenModalDelete}
      onCancel={handleCloseModal}
      onOk={handleDeleteShippingPrice}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa phí giao hàng này không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteModal;
