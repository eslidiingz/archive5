import React, { useEffect, useState } from "react";
import UserTableList from "/components/Users/UserTableList";
import { approveUserVerify, getUsers } from "../../models/User";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import AdminLayout from "/components/Layouts/Admin/AdminLayout";

function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const initialize = async () => {
    await fetUsers();
  };

  const fetUsers = async () => {
    setUsers((await getUsers()).data);
  };

  const onUserUpdated = async () => {
    await initialize();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <AdminLayout pageTitle="Users">
        <section>
          <UserTableList
            title={<TableTitle heading="Waiting for approve to verify" />}
            users={users.filter((u) => !u.isVerified)}
            onUserUpdated={onUserUpdated}
          />
        </section>

        <hr className="my-8" />

        <section>
          <h3></h3>
          <UserTableList
            title={<TableTitle heading="User verified listing" />}
            users={users.filter((u) => u.isVerified)}
          />
        </section>
      </AdminLayout>
    </>
  );
}

export default UserPage;

function TableTitle(props) {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {props.heading && (
            <h1 className="text-xl font-semibold text-gray-700">
              {props.heading}
            </h1>
          )}
          {props.description && (
            <p className="mt-2 text-sm text-gray-700">{props.description}</p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {props.action && props.action}
        </div>
      </div>
    </>
  );
}
