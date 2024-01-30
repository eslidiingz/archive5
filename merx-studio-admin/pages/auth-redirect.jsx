import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function IndexPage() {
  const { data: session, status } = useSession();

  const init = async () => {
    if (status == "authenticated") {
      window.location.href = "/";
    } else if (status == "unauthenticated") {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    if (status) {
      init();
    }
  }, [status]);

  return <></>;
}
