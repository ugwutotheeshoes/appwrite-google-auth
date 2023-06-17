import React from "react";
import Link from "next/link";
import "@appwrite.io/pink";
import { account } from "./component/ApiHelper";

export default function Login() {
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
  return (
    <main>
      <nav className="u-flex u-cross-center u-main-space-between u-padding-32">
        <h2 className="logo u-padding-16 eyebrow-heading-1 u-color-text-pink">
          <Link href="/">MEDIC CARE</Link>
        </h2>
        <button className="button" onClick={() => Login()}>
          LOG IN
        </button>
      </nav>
      <div className="container u-padding-64">
        <p
          style={{ fontSize: 20 + "px" }}
          className="u-text-center u-padding-64 text u-normal"
        >
          Log in to get user details.
        </p>
      </div>
    </main>
  );
}
