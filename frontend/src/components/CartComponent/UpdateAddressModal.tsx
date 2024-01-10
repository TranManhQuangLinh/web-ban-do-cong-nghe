import React, { useEffect } from "react";
import { Form } from "antd";
import ModalComponent from "../ModalComponent";
import InputComponent from "../InputComponent";
import { updateShippingAddress } from "../../redux/slices/OrderSlice";
import { useDispatch } from "react-redux";
import { IState } from ".";

interface IProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
}

const UpdateAddressModal = (props: IProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
    
  useEffect(() => {
    if (props.state.isOpenModalUpdateAddress) {
      form.setFieldsValue(props.state.shippingAddress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.isOpenModalUpdateAddress]);
 

  const handleCancelUpdate = () => {
    props.setState({
      ...props.state,
      isOpenModalUpdateAddress: false,
    });
    // form.resetFields();
  };

  const handleUpdateShippingAddress = () => {
    const { recipientName, address, phone } = form.getFieldsValue();
    if (recipientName && address && phone) {
      dispatch(
        updateShippingAddress({
          recipientName,
          address,
          phone,
          userId: props.state.userId,
        })
      );
    }
    props.setState({ ...props.state, isOpenModalUpdateAddress: false });
  };
  return (
    <ModalComponent
      title="Cập nhật thông tin giao hàng"
      open={props.state.isOpenModalUpdateAddress}
      onCancel={handleCancelUpdate}
      onOk={() => form.submit()}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleUpdateShippingAddress}
        autoComplete="on"
        form={form}
        // preserve={false}
      >
        <Form.Item
          label="Tên người nhận"
          name="recipientName"
          rules={[{ required: true, message: "Mời nhập tên người nhận!" }]}
        >
          <InputComponent />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Mời nhập số điện thoại!" }]}
        >
          <InputComponent />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Mời nhập địa chỉ!" }]}
        >
          <InputComponent />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default UpdateAddressModal;
