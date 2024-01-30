import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import AdminLayout from "/components/Layouts/Admin/AdminLayout";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout pageTitle="Dashboard">
        <div className="py-4">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
      </AdminLayout>
    </>
  );
}
