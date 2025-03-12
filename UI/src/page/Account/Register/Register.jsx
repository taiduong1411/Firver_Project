import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { axiosCli } from "../../../interceptor/axios";
import { message } from "antd";

function Register() {
  localStorage.removeItem("accessToken");
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const key = "updatable";
  const onSubmit = async (data) => {
    if (
      !data["email"] ||
      !data["password"] ||
      !data["phone"] ||
      !data["fullname"] ||
      !data["address"]
    ) {
      return messageApi.open({
        type: "error",
        content: "Vui Lòng Điền Đầy Đủ Thông Tin",
      });
    }
    await axiosCli()
      .post("account/register", data)
      .then((res) => {
        if (res.status == 200) {
          messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
          });
          setTimeout(() => {
            messageApi.open({
              key,
              type: "success",
              content: res.data.msg,
              duration: 2,
            });
          }, 1000);
          setTimeout(() => {
            return nav("/login");
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: res.data.msg,
          });
        }
      });
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng Ký Tài Khoản
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Họ và tên
                </label>
                <input
                  type="fullname"
                  {...register("fullname")}
                  placeholder="Nhập họ và tên..."
                  name="fullname"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Nhập email..."
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Nhập address..."
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Nhập số điện thoại..."
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  {...register("password")}
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

export default Register;
