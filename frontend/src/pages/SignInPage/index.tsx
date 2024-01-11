import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Form, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import { JwtPayload, jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetDetailsUserQuery, useLoginMutation } from "services/user";
import logoSrc from "assets/images/logo-login.png";
import ButtonComponent from "../../components/ButtonComponent";
import InputForm from "../../components/InputForm";
import Loading from "../../components/LoadingComponent";
import * as message from "../../components/Message";
import { updateUser } from "../../redux/slices/UserSlice";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { IDecode } from "types";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const [login, { data, isLoading, isSuccess }] = useLoginMutation();
  // console.log('data', data);

  const [trigger, { data: details }] =
    useLazyGetDetailsUserQuery();

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
        // console.log(data);
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );
        if (data.access_token) {
          const decoded = jwtDecode(data.access_token) as IDecode;
          // console.log("decoded", decoded);
          // vì trigger return Promise
          // nên phải đợi trigger hoàn thành rồi mới navigate
          if (decoded.id) {
            trigger(decoded.id).then(() => {
              message.success("Đăng nhập thành công");
              if (decoded.role === "Admin" || decoded.role === "Nhân viên") {
                navigate("/admin");
              } else if (location?.state) {
                navigate(location?.state);
              } else {
                navigate("/");
              }
            });
          }
        }
      } else {
        message.error(data.message);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    // console.log("getDetailsUser", details);
    if (details?.data) {
      const refresh_token = JSON.parse(
        localStorage.getItem("refresh_token") ?? ""
      );

      const access_token = JSON.parse(
        localStorage.getItem("access_token") ?? ""
      );

      if (refresh_token && access_token) {
        // console.log("update user in redux");
        dispatch(updateUser({ ...details.data, access_token, refresh_token }));
      }
    }
  }, [details]);

  // console.log("details", details);

  const handleBackToHomePage = () => {
    navigate("/");
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleFinish = () => {
    // console.log("signing in");
    login(form.getFieldsValue());
  };

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
          <h1>Đăng nhập</h1>
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
              onClick={() => form.submit()}
              buttonStyle={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "10px 0 10px",
              }}
              buttonText={"Đăng nhập"}
              buttonTextStyle={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </Loading>
          {/* <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p> */}
          <p>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {" "}
              Tạo tài khoản
            </WrapperTextLight>
          </p>
          <ButtonComponent
            disabled={false}
            onClick={handleBackToHomePage}
            buttonStyle={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "26px 0 10px",
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

export default SignInPage;
