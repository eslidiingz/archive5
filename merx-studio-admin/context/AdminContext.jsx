import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import Login from "../pages/login";

const AdminContext = createContext();

export const useAdminContext = () => {
  return useContext(AdminContext);
};

function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  const store = (_adminObject) => {
    setAdmin(_adminObject);
    localStorage.setItem("auth", JSON.stringify(_adminObject));
  };

  const destroy = () => {
    setAdmin();
  };

  const adminInit = {
    admin,
    adminAction: {
      store,
      destroy,
    },
  };

  // console.log("state admin: ", admin);
  // console.log(router);

  if (router.pathname !== "/login") {
    if (!admin)
      return (
        <AdminContext.Provider value={adminInit}>
          <Login />
        </AdminContext.Provider>
      );
  }

  return (
    <AdminContext.Provider value={adminInit}>{children}</AdminContext.Provider>
  );
}

export default AdminProvider;
