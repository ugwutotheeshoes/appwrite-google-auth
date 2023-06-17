import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { account } from "./component/ApiHelper";
import Link from "next/link";
import "@appwrite.io/pink";

export default function Home() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();
  const fetchUser = async () => {
    try {
      const data = await account.get();
      setUserDetails(data);
    } catch (error) {
      console.log("the error that happened:", error);
      return Login();
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const Login = () => {
    try {
      const response = account.createOAuth2Session(
        "google",
        "http://localhost:3000/",
        "http://localhost:3000/login"
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to create OAuth session:", error);
    }
  };
  const Logout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.log("the error that happened:", error);
    }
  };
  return (
    <main>
      {userDetails ? (
        <div>
          <nav className="u-flex u-cross-center u-main-space-between u-padding-32">
            <h2 className="logo u-padding-16 eyebrow-heading-1 u-color-text-pink">
              <Link href="/">MEDIC CARE</Link>
            </h2>
            <div>
              <button className="button" onClick={() => Logout()}>
                LOG OUT
              </button>
            </div>
          </nav>
          <div className="container u-padding-64 u-text-center">
            <p
              style={{ fontSize: 20 + "px" }}
              className="text u-padding-16 u-normal"
            >
              <b>Patient Name</b>: {userDetails.name}
            </p>
            <p style={{ fontSize: 20 + "px" }} className="text u-normal">
              <b>Email</b>: {userDetails.email}
            </p>
          </div>
        </div>
      ) : (
        <div div className="container u-padding-64 u-text-center">
          <h1>Redirecting to authentication page...</h1>
        </div>
      )}
    </main>
  );
}
