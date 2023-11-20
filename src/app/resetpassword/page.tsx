"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>("");

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    token: tokenParams,
    email: data.email,
    username: data.username,
  });

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data.email);
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user.confirmPassword.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onResetPassword = async () => {
    try {
      setLoading(true);
      if (user.password === user.confirmPassword) {
        setButtonDisabled(false);
        setUser({ ...user });

        const response = await axios.put("/api/users/resetpassword", user);
        console.log("Reset success", response.data);

        toast.success("Password updated successfully");
        // router.push("/login");
      } else {
        toast.error("Password does not match!");
        window.alert("Password does not match!");
      }
    } catch (error: any) {
      console.log("Reset failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Reset password"}</h1>
      <hr />

      <h1>email: {data?.email}</h1>
      <label htmlFor="password">password</label>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <label htmlFor="password">confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        type="password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder="confirm password"
      />
      {buttonDisabled ? (
        <button
          disabled={true}
          className="p-2 bg-red-500 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => {
            onResetPassword();
          }}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ResetPasswordPage;
