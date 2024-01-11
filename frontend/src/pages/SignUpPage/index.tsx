import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Form, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "services/user";
import ButtonComponent from "../../components/ButtonComponent";
import InputForm from "../../components/InputForm";
import Loading from "../../components/LoadingComponent";
import * as message from "../../components/Message";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import logoSrc from "assets/images/logo-login.png";
const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [form] = useForm();

  const [signUp, { data, isLoading, isSuccess }] = useSignUpMutation();

  const validateMessages = {
    required: "Mời nhập ${label}!",
    types: {
      email: "${label} không hợp lệ!",
      password: "${label} không hợp lệ!",
      confirmPassword: "${label} không hợp lệ!",
    },
  };

  useEffect(() => {
    if (data) {
      if (isSuccess && data.status === "OK") {
        message.success("Đăng ký thành công");
        handleNavigateSignIn();
      } else {
        message.error(data.message);
      }
    }
  }, [isSuccess]);

  const handleBackToHomePage = () => {
    navigate("/");
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleFinish = () => {
    // mutation.mutate({ email, password, confirmPassword });
    signUp(form.getFieldsValue());
    console.log("signing up");
  };

  console.log("email", form.getFieldValue("email"));
  console.log("password", form.getFieldValue("password"));
  console.log("confirmPassword", form.getFieldValue("confirmPassword"));
  console.log(
    !form.getFieldValue("email") ||
      !form.getFieldValue("password") ||
      !form.getFieldValue("confirmPassword")
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Tạo tài khoản</h1>
          <Form
            name="nest-messages"
            // labelCol={{ span: 6 }}
            // wrapperCol={{ span: 18 }}
            autoComplete="on"
            form={form}
            onFinish={handleFinish}
            // preserve={false}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  // validator: validateForm,
                  required: true,
                },
              ]}
            >
              <InputForm
                style={{ marginBottom: "10px" }}
                placeholder="abc@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  // validator: validateForm,
                  required: true,
                },
              ]}
            >
              <div style={{ position: "relative" }}>
                <span
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  style={{
                    zIndex: 10,
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                  }}
                >
                  {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                </span>
                <InputForm
                  placeholder="mật khẩu"
                  style={{ marginBottom: "10px" }}
                  type={isShowPassword ? "text" : "password"}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  // validator: validateForm,
                  required: true,
                },
              ]}
            >
              <div style={{ position: "relative" }}>
                <span
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  style={{
                    zIndex: 10,
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                  }}
                >
                  {isShowConfirmPassword ? (
                    <EyeFilled />
                  ) : (
                    <EyeInvisibleFilled />
                  )}
                </span>
                <InputForm
                  placeholder="xác nhận mật khẩu"
                  type={isShowConfirmPassword ? "text" : "password"}
                  onPressEnter={() => {
                    form.submit();
                  }}
                />
              </div>
            </Form.Item>
            {data?.status === "ERR" && (
              <span style={{ color: "red" }}>{data?.message}</span>
            )}
          </Form>
          <Loading isPending={isLoading}>
            <ButtonComponent
              onClick={() => {
                form.submit();
              }}
              size={"small"}
              buttonStyle={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "10px 0 10px",
              }}
              buttonText={"Đăng ký"}
              buttonTextStyle={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              {" "}
              Đăng nhập
            </WrapperTextLight>
          </p>
          <ButtonComponent
            disabled={false}
            onClick={handleBackToHomePage}
            size={"small"}
            buttonStyle={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "7px 0 10px",
            }}
            buttonText={"Quay lại trang chủ"}
            buttonTextStyle={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={logoSrc}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại QL Tech</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
