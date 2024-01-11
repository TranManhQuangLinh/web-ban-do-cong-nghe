import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent.jsx";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
// import { useGetDetailsUserQuery } from "./services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slices/UserSlice";
import Loading from "./components/LoadingComponent";
import { useGetDetailsUserQuery } from "./services/user";
import { RootState } from "redux/store.js";
import { IDecode } from "types/index.js";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  // const [userId, setUserId] = useState("");

  // console.log(user);
  useEffect(() => {
    setIsPending(true);
    const { storageData, decoded } = handleDecoded();

    if (decoded.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsPending(false);
  }, []);

  const { data: userDetails } = useGetDetailsUserQuery(user._id, {
    skip: !user._id,
  });

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token") || "";
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      const decoded = jwtDecode(JSON.parse(storageData)) as IDecode;
      return { decoded, storageData };
    }
    return { decoded: { id: "", role: "" }, storageData };
  };

  const handleGetDetailsUser = async (id: string, token: string) => {
    const refresh_token = JSON.parse(
      localStorage.getItem("refresh_token") ?? ""
    );
    if (userDetails && userDetails.data) {
      dispatch(
        updateUser({
          ...userDetails.data,
          access_token: token,
          refresh_token: refresh_token,
        })
      );
    }
  };

  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const ErrorPage = route.errorPage;
              const checkAuth =
                !route.isPrivate ||
                user?.role === "Admin" ||
                user?.role === "Nhân viên";
              // console.log("checkAuth", route.path, checkAuth);
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      {checkAuth ? <Page /> : ErrorPage ? <ErrorPage /> : <></>}
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
