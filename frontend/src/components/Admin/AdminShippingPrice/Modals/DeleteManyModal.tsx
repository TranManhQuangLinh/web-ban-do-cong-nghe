import * as React from "react";
import { useEffect } from "react";
import { useDeleteManyShippingPricesMutation } from "../../../../services/shippingPrice";
import Loading from "../../../LoadingComponent";
import ModalComponent from "../../../ModalComponent";
import * as message from "../../../Message";
import { IModalProps } from "../../types";

const DeleteManyModal = (props: IModalProps) => {
  const [deleteManyShippingPrices, result] =
    useDeleteManyShippingPricesMutation();

  const handleCloseModal = () => {
    props.setState({
      ...props.state,
      isOpenModalDeleteMany: false,
      rowSelectedKeys: [],
    });
  };

  const handleDeleteManyShippingPrices = () => {
    if (props.state.rowSelectedKeys)
      deleteManyShippingPrices(props.state.rowSelectedKeys);
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
      title="Xóa tất cả phí giao hàng đã chọn"
      open={props.state.isOpenModalDeleteMany}
      onCancel={handleCloseModal}
      onOk={handleDeleteManyShippingPrices}
    >
      <Loading isPending={result.isLoading}>
        <div>Bạn có chắc muốn xóa tất cả phí giao hàng đã chọn không?</div>
      </Loading>
    </ModalComponent>
  );
};

export default DeleteManyModal;
