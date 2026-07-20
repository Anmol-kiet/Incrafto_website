"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-white"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Manage The InCrafto Platform
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Access administrative tools to manage students, teachers,
            courses, placements and platform operations.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Student Management
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Teacher Management
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Course Administration
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              Reports & Analytics
            </div>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex w-full lg:w-1/2 items-center justify-center px-6"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white text-center">
              Admin Login
            </h2>

            <p className="mt-2 text-center text-slate-400">
              Login to access your admin dashboard
            </p>

            <form className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Admin Email
                </label>

                <input
                  type="email"
                  placeholder="Enter admin email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              <div className="text-right">
                <Link
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <Link
                href="/admin-dashboard"
                className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white text-center transition hover:scale-[1.02]"
              >
                Login
              </Link>

            </form>

            <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white mb-2">
                Demo Credentials
              </p>
              <p>Email: admin@incrafto.com</p>
              <p>Password: admin123</p>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Administrator access only
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
}