"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Reset email sent successfully", response.data);
      toast.success("Reset email sent");
      router.push("/login");
    } catch (error: any) {
      console.log("Reset failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot password"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
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
          onClick={onResetPassword}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      )}
      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default ForgotPasswordPage;
