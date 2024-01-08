import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index.ts";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
// import { useGetDetailsUserQuery } from "./services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slices/UserSlice";
import Loading from "./components/LoadingComponent";
import { useGetDetailsUserQuery } from "./services/user";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const user = useSelector((state) => state.user);
  // const [userId, setUserId] = useState("");

  // console.log(user);
  useEffect(() => {
    setIsPending(true);
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsPending(false);
  }, []);

  const {
    data: userDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDetailsUserQuery(user?.id, { skip: !user?.id });

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storageRefreshToken);

    dispatch(
      updateUser({
        ...userDetails?.data,
        access_token: token,
        refresh_token: refresh_token,
      })
    );
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
                    <Layout>{checkAuth ? <Page /> : <ErrorPage />}</Layout>
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
