"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Bell,
  Calendar,
  Home,
  User,
  Settings,
  Trophy,
  ChevronRight,
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<{
    name?: string;
    email?: string;
    course?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudentProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!token) {
          router.replace("/student-login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.user) {
          setStudent(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else if (savedUser) {
          setStudent(JSON.parse(savedUser));
        } else {
          throw new Error("No user data returned");
        }
      } catch (error) {
        console.error("Failed to load student profile", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/student-login");
      } finally {
        setLoading(false);
      }
    };

    loadStudentProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff] text-slate-700">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur-xl text-center">
          <p className="text-lg font-semibold">Checking your session...</p>
          <p className="text-sm text-slate-500 mt-2">You will be redirected if you are not logged in.</p>
        </div>
      </div>
    );
  }

  const firstName = student?.name?.split(" ")[0] || "Student";
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Good evening";

  const courseList = [
    {
      name: student?.course || "Full Stack Development",
      progress: 68,
      nextLesson: "React components",
    },
    {
      name: "Data Analytics",
      progress: 42,
      nextLesson: "SQL reporting",
    },
    {
      name: "Python Programming",
      progress: 84,
      nextLesson: "APIs & automation",
    },
  ];

  const averageProgress = Math.round(
    courseList.reduce((sum, item) => sum + item.progress, 0) / courseList.length
  );

  const stats = [
    {
      title: "Active Courses",
      value: String(courseList.length),
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      change: "+1 this month",
    },
    {
      title: "Progress",
      value: `${averageProgress}%`,
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500",
      change: "+5% this week",
    },
    {
      title: "Attendance",
      value: "92%",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      change: "On track",
    },
    {
      title: "Placement Status",
      value: student?.course ? "Active" : "Ready",
      icon: Briefcase,
      color: "from-orange-500 to-red-500",
      change: "3 interviews this month",
    },
  ];

  const assignments = [
    { title: "Java Assignment", status: "Due tomorrow" },
    { title: "React Project", status: "In review" },
    { title: "Python Quiz", status: "Completed" },
    { title: "DBMS Case Study", status: "Upcoming" },
  ];

  const upcomingClasses = [
    { title: "React.js", time: "Tomorrow 10 AM" },
    { title: "Python Advanced", time: "Tomorrow 2 PM" },
    { title: "DSA Session", time: "Friday 11 AM" },
  ];

  const certificates = [
    { name: "Full Stack Development", badge: "Verified" },
    { name: "Internship Completion", badge: "Issued" },
  ];

  const announcements = [
    { text: "New React Module Added", tone: "bg-blue-50" },
    { text: "Placement Drive on 10 June", tone: "bg-purple-50" },
    { text: "Assignment Deadline Extended", tone: "bg-cyan-50" },
  ];

  const timeline = [
    { text: "Completed React Module", color: "bg-green-500" },
    { text: "Submitted Python Assignment", color: "bg-blue-500" },
    { text: "Applied for Internship", color: "bg-purple-500" },
    { text: "Updated Resume", color: "bg-orange-500" },
  ];

  return (
<div className="min-h-screen bg-gradient-to-br from-[#eef4ff] via-[#e7f0ff] to-[#f3e8ff]">

  <div className="fixed inset-0 overflow-hidden pointer-events-none">

    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />

    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />

  </div>

  <div className="relative flex">

    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-white/60">

      <div className="p-8">

        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          InCrafto
        </h1>

      </div>

      <nav className="flex-1 px-5 space-y-2">

        {[
          {
            icon: Home,
            label: "Dashboard",
            path: "/student-dashboard",
          },
          {
            icon: BookOpen,
            label: "Courses",
            path: "/courses",
          },
          {
            icon: GraduationCap,
            label: "Assignments",
            path: "/assignments",
          },
          {
            icon: Trophy,
            label: "Placements",
            path: "/placements",
          },
          {
            icon: Award,
            label: "Certificates",
            path: "/certificates",
          },
          {
            icon: User,
            label: "Profile",
            path: "/profile",
          },
          {
            icon: Settings,
            label: "Settings",
            path: "/settings",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.path}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all cursor-pointer"
          >
            <item.icon size={20} />
            <span className="font-medium">
              {item.label}
            </span>
          </Link>
        ))}

      </nav>

      <div className="p-6">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-5 text-white">

          <h3 className="font-bold">
            Placement Ready
          </h3>

          <p className="text-sm mt-2 text-blue-100">
            Resume score increased by 12%
          </p>

        </div>

      </div>

    </aside>

    <main className="flex-1 p-8">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8"
      >

        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">

          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            🚀 Student Dashboard
          </span>

          <h1 className="text-6xl font-black mt-6 leading-tight">
            {greeting}, {firstName}!
          </h1>

          <p className="text-xl text-blue-100 mt-4 max-w-2xl">
            {student?.email
              ? `Welcome back, ${student.name || firstName}. Your profile is synced from your latest login and your learning progress is ready to review.`
              : "Continue your learning journey and track your career growth with InCrafto."}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              href="/courses"
              className="bg-white text-blue-600 px-7 py-4 rounded-2xl font-bold"
            >
              Continue Learning
            </Link>

            <Link
              href="/placements"
              className="border border-white/30 px-7 py-4 rounded-2xl"
            >
              View Placements
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.replace("/student-login");
              }}
              className="rounded-2xl bg-red-500 px-7 py-4 font-semibold text-white hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4`}
            >
              <item.icon size={24} />
            </div>

            <h3 className="text-gray-500 text-sm">
              {item.title}
            </h3>

            <p className="text-4xl font-black text-gray-900 mt-2">
              {item.value}
            </p>

            <p className="text-green-500 text-sm mt-2">
              {item.change}
            </p>
          </motion.div>
        ))}

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              My Courses
            </h2>

            <Link
              href="/courses"
              className="text-blue-600 flex items-center gap-2"
            >
              View All
              <ChevronRight size={18} />
            </Link>

          </div>

          <div className="space-y-6">

            {courseList.map((course) => (
              <motion.div
                key={course.name}
                whileHover={{
                  scale: 1.02,
                }}
                className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50"
              >
                <div className="flex justify-between mb-3">

                  <h4 className="font-semibold text-lg">
                    {course.name}
                  </h4>

                  <span className="font-bold text-blue-600">
                    {course.progress}%
                  </span>
                </div>

                <p className="text-sm text-slate-500 mb-3">
                  Next lesson: {course.nextLesson}
                </p>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${course.progress}%`,
                    }}
                    transition={{
                      duration: 1.2,
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />

                </div>

              </motion.div>
            ))}

          </div>

        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >

          <h2 className="text-3xl font-bold mb-10">
            Learning Progress
          </h2>

          <div className="flex justify-center">

            <div className="relative w-64 h-64">

              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >

                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 0.68,
                  }}
                  transition={{
                    duration: 2,
                  }}
                  style={{
                    pathLength: 0.68,
                  }}
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                    />
                    <stop
                      offset="100%"
                      stopColor="#9333ea"
                    />
                  </linearGradient>
                </defs>

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <h3 className="text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {averageProgress}%
                </h3>

                <p className="text-gray-500">
                  Completed
                </p>localllocal

              </div>

            </div>

          </div>

        </motion.div>

      </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Assignments
          </h2>

          <div className="space-y-4">

            {assignments.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <span className="text-xs rounded-full bg-white/80 px-3 py-1 text-blue-700">{item.status}</span>
                </div>
              </div>
            ))}

          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Upcoming Classes
          </h2>

          <div className="space-y-4">

            {upcomingClasses.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <span className="text-xs rounded-full bg-white/80 px-3 py-1 text-cyan-700">{item.time}</span>
                </div>
              </div>
            ))}

          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl mb-8"
      >

        <h2 className="text-3xl font-bold mb-8">
          Placement Tracker
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              title: "Resume Score",
              value: "84%",
            },
            {
              title: "Applications",
              value: "12",
            },
            {
              title: "Interviews",
              value: "4",
            },
            {
              title: "Offers",
              value: "1",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white"
            >
              <h4 className="text-blue-100">
                {item.title}
              </h4>

              <p className="text-4xl font-black mt-3">
                {item.value}
              </p>
            </motion.div>
          ))}

        </div>

      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >
          <Award
            className="text-purple-600 mb-5"
            size={40}
          />

          <h2 className="text-2xl font-bold mb-5">
            Certificates
          </h2>

          <div className="space-y-4">

            {certificates.map((item) => (
              <div key={item.name} className="p-4 rounded-2xl bg-purple-50 flex items-center justify-between gap-3">
                <span>✔ {item.name}</span>
                <span className="text-xs rounded-full bg-white px-3 py-1 text-purple-700">{item.badge}</span>
              </div>
            ))}

          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >
          <Bell
            className="text-blue-600 mb-5"
            size={40}
          />

          <h2 className="text-2xl font-bold mb-5">
            Announcements
          </h2>

          <div className="space-y-4">

            {announcements.map((item) => (
              <div key={item.text} className={`p-4 rounded-2xl ${item.tone}`}>
                📢 {item.text}
              </div>
            ))}

          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-5">
            Activity Timeline
          </h2>

          <div className="space-y-5">

            {timeline.map((item) => (
              <div key={item.text} className="flex gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color} mt-2`} />
                <p>{item.text}</p>
              </div>
            ))}

          </div>
        </motion.div>

      </div>

    </main>

  </div>

</div>
  );
}