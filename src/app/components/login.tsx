"use client";
import React, { useState } from "react";
import linkedin_logo from "@/app/images/Linkedin_logo.png";
import google_logo from "@/app/images/Google_Logo.png";
import logo from '@/app/images/Group.png';
import Image from 'next/image';
import { User } from "@/app/models/input/User";
import { LoginUser } from "@/app/models/input/loginUser";
import { postUser } from "@/app/Services/login";
import { fetchUser } from "@/app/Services/signUp";
// import router from "next/navigation";
//  import { useRouter } from "next/router";





const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  // const router = useRouter();
  const userInput: User = {
    user_name: "",
    password: "",
    user_type: "User",
    is_active: true
  };

  const userInput1: LoginUser = {
    user_name: "",
    password: "",
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault()
    console.log("inside signup function");
    console.log(userInput);
    userInput.user_name = "Vijay";
    userInput.password = "Vijay12345";
    const response = await fetchUser(userInput);
    console.log(response);
  }

  const handlelogIn = async (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault()
    console.log("inside loginup function");
    userInput1.user_name = "Vijay";
    userInput1.password = "Vijay12345";
    console.log(userInput1);
    const response = await fetch(`https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev/loginUser?user_name=Vishal&password=Vishal12345`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if(data.message == "Login successful"){
      // router.push("/mainpage");
    }
    // const response = await fetch("https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev/loginUser&user_name=Vishal&password=Vishal12345");
    console.log(response);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full  h-screen mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Banner */}
        <div className="hidden md:block md:w-2/3 bg-gradient-to-br from-purple-400 to-pink-400 p-8">
          <div className="text-white text-center flex flex-col justify-center h-full">
            <Image
              src={logo} // Replace with your logo path
              alt="Logo"
              className="w-32 mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold mb-4">Documents Meet AI</h2>
            <p className="text-lg mb-6">Just Upload • chat • Discover!</p>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
          {/* Tab Toggle */}
          <div className="flex justify-center mb-8">
            <button
              className={`text-2xl font-bold px-4 py-2 focus:outline-none ${
                isLogin ? "text-purple-500 border-b-4 border-purple-500" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`text-2xl font-bold px-4 py-2 ml-4 focus:outline-none ${
                !isLogin ? "text-purple-500 border-b-4 border-purple-500" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          {isLogin ? (
            <form onClick={handlelogIn}>
              {/* Login Form */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email Id
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Login
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-600">Or other ways to log in</p>
                <div className=" justify-center gap-4 mt-4">
                  <button className="flex w-full items-center bg-white-600 text-black px-4 py-2 rounded-lg shadow-lg border border-black hover:bg-gray-100">
                  <Image
                      src={linkedin_logo} // Replace with LinkedIn icon
                      alt="LinkedIn"
                      className="w-5 h-5 mr-6 ml-6"
                    />
                    Continue with LinkedIn
                  </button>

                  <button className="flex w-full items-center bg-white-500 text-black px-4 py-2 rounded-lg shadow-lg border border-black hover:bg-gray-100 mt-5">
                    <Image
                      src={google_logo} // Replace with Google icon
                      alt="Google"
                      className="w-5 h-5 mr-6 ml-6"
                    />
                    Continue with Google
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onClick={handleSignUp}>
              {/* Signup Form */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstname" className="block text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastname" className="block text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div className="mb-4">
                <label htmlFor="workemail" className="block text-gray-700">
                  Work Email
                </label>
                <input
                  type="email"
                  id="workemail"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the terms and conditions
                </label>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none"
                
              >
                Signup
              </button>

              {/* Social Login */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">Or other ways to sign in</p>
                <div className=" justify-center gap-4 mt-4">
                  <button className="flex w-full items-center bg-white-600 text-black px-4 py-2 rounded-lg shadow-md border border-black hover:bg-gray-100">
                    <Image
                      src={linkedin_logo} // Replace with LinkedIn icon
                      alt="LinkedIn"
                      className="w-5 h-5 mr-6 ml-6"
                    />
                    Continue with LinkedIn
                  </button>

                  <button className="flex w-full items-center bg-white-500 text-black px-4 py-2 rounded-lg shadow-md border border-black hover:bg-gray-100 mt-5">
                    <Image
                      src={google_logo}  // Replace with Google icon
                      alt="Google"
                      className="w-5 h-5 mr-6 ml-6"
                    />
                    Continue with Google
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


