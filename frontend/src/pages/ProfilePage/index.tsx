import { Form, UploadProps } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import InputComponent from "components/InputComponent";
import UploadComponent, { getBase64 } from "components/UploadComponent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "services/user";
import ButtonComponent from "../../components/ButtonComponent";
import Loading from "../../components/LoadingComponent";
import * as message from "../../components/Message";
import { RootState } from "../../redux/store";
import { WrapperContentProfile, WrapperHeader } from "./style";
import { updateUser } from "redux/slices/UserSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();

  const [updateUserMutation, { data, isLoading, isSuccess }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Cập nhật thông tin thành công");
      dispatch(updateUser({...user, ...form.getFieldsValue()}))
    } else {
      if (data?.message) {
        message.error(data?.message);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const handleChangeAvatar: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log("info", info);

    if (info.file.status === "uploading") {
    }
    if (info.file.status === "done") {
    }
    if (info.file.status === "error") {
    }

    const preview = await getBase64(info.file.originFileObj as RcFile);
    form.setFieldValue("avatar", preview);
    // console.log('form.getFieldValue("avatar")', form.getFieldValue("avatar"));
  };

  const handleFinish = () => {
    updateUserMutation({
      id: user._id,
      data: form.getFieldsValue(),
    });
  };

  const handleCancel = () => {
    if (location?.state) {
      navigate(location?.state);
    }
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isLoading}>
        <WrapperContentProfile>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="on"
            form={form}
            onFinish={handleFinish}
            preserve={false}
          >
            <Form.Item label="Email">
              <div style={{ width: "100%", padding: "4px 11px" }}>
                {user.email}
              </div>
            </Form.Item>

            <Form.Item label="Tên" name="name">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Ngày sinh" name="dateOfBirth">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <InputComponent />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <UploadComponent
                image={form.getFieldValue("avatar")}
                onChange={handleChangeAvatar}
                maxCount={1}
                listType="picture-circle"
                hasControlInside={true}
              />
            </Form.Item>
          </Form>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ButtonComponent
              onClick={() => {
                form.submit();
              }}
              size={"small"}
              buttonStyle={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              buttonText={"Cập nhật"}
              buttonTextStyle={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
            <ButtonComponent
              onClick={handleCancel}
              buttonStyle={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              buttonText={"Hủy"}
              buttonTextStyle={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </div>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
