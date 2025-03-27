"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import DashboardPreview from "@/app/components/DashboardPreview";
import {
  ArrowRight,
  Brain,
  BookOpen,
  BarChart3,
  BarChart4,
  Users,
  CheckCircle,
  MoveRight,
  Lightbulb,
  Play,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="lg" />

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Adaptive Features
              </a>
              <a
                href="#accessibility"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Adaptation Modes
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Adaptation Stories
              </a>
            </nav>
            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex mr-2"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 pt-16 pb-24">
          <div className="absolute inset-0 bg-grid-indigo/[0.03] bg-[size:20px_20px]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>

          {/* Add decorative elements */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-teal-300 to-teal-400 rounded-full opacity-20 animate-blob animation-delay-4000"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-6">
                  <span className="flex items-center">
                    <Brain className="w-3.5 h-3.5 mr-1.5" />
                    <span>Adaptive learning</span>
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Education That Adapts to Every Mind
                </h1>

                <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Unlock personalized learning experiences that dynamically
                  adapt to each student's needs, making education accessible and
                  engaging for all learners.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
                    asChild
                  >
                    <Link href="/login" className="gap-2">
                      Start Adapting Today <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    asChild
                  >
                    <Link href="#demo" className="gap-2">
                      <Play className="w-4 h-4" /> See Adaptation in Action
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="Educator"
                      className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/54.jpg"
                      alt="Educator"
                      className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/67.jpg"
                      alt="Educator"
                      className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/41.jpg"
                      alt="Educator"
                      className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
                    />
                  </div>
                  <div className="ml-3 text-sm text-gray-500 font-medium">
                    Trusted by{" "}
                    <span className="text-indigo-600 font-semibold">
                      1,000+
                    </span>{" "}
                    educators
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <DashboardPreview />
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Adaptive Intelligence
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform continuously adapts to each learner, creating a
                personalized experience that evolves with every interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-indigo-100 feature-card-hover">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Brain className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">
                  Personalized Learning
                </h3>
                <p className="text-gray-600 mb-4">
                  Content adapts in real-time to each student's unique learning
                  pace, preferences, and cognitive style.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Adaptive learning pathways
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Real-time adaptation engine
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-purple-100 feature-card-hover">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors">
                  Adaptive Content
                </h3>
                <p className="text-gray-600 mb-4">
                  Materials that transform to match learning preferences with
                  adaptive resources.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Self-adjusting difficulty
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Personalized content selection
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-green-100 feature-card-hover">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors">
                  Adaptive Analytics
                </h3>
                <p className="text-gray-600 mb-4">
                  Insights that evolve with the learner, continuously refining
                  the learning experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Adaptation tracking dashboard
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Learning adaptation metrics
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section
          id="accessibility"
          className="py-20 bg-gradient-to-b from-indigo-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-4">
                <span>Adapts to Every Learner</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Adaptive Support for Different Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform dynamically adjusts to various learning differences
                with specialized adaptive modes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-amber-200 group relative">
                <div className="h-2 bg-amber-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-amber-800 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Dyslexia Mode
                    </h3>
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-amber-50 p-1 rounded-lg shadow-sm border border-amber-200 logo-float">
                        <Logo mode="dyslexia" size="sm" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Adaptively adjusts text presentation to improve readability
                    and comprehension.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Adaptive font optimization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Responsive reading aids
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Self-adjusting layout
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200 group relative">
                <div className="h-2 bg-blue-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-800 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      ADHD Mode
                    </h3>
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-blue-50 p-1 rounded-lg shadow-sm border border-blue-200 logo-float">
                        <Logo mode="adhd" size="sm" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Adaptively manages focus and reduces distractions based on
                    attention patterns.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Attention-adaptive interface
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Dynamic focus management
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Personalized pacing tools
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-200 group relative">
                <div className="h-2 bg-teal-500"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-teal-800 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Executive Function Support
                    </h3>
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-teal-50 p-1 rounded-lg shadow-sm border border-teal-200 logo-float">
                        <Logo mode="executive" size="sm" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Adaptive scaffolding that adjusts to individual planning and
                    organization needs.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Adaptive task framework
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Responsive scaffolding system
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">
                        Intelligent time adaptation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Link href="/course/1" className="gap-2">
                  Experience Adaptive Learning <MoveRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-4">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  <span>Adaptation Success Stories</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  How Adaptation Changes Learning
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  LexiLearn has helped thousands of students unlock their
                  potential through personalized adaptation.
                </p>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                        JD
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Jamie D.</h4>
                      <p className="text-sm text-gray-500">
                        10th Grade Student
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "As someone with dyslexia, reading textbooks was always a
                    struggle. LexiLearn's adaptive dyslexia mode has completely
                    changed how I study. The system adjusts to my specific
                    needs, making it easier to focus on learning without
                    struggling with the text."
                  </p>
                </div>

                <Button
                  asChild
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
                >
                  <a href="#" className="gap-2">
                    Read More Stories <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <p className="text-indigo-100">
                    of students report improved outcomes with adaptive learning
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">
                    68%
                  </div>
                  <p className="text-gray-600 text-sm">
                    faster adaptation to new concepts
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    4.2x
                  </div>
                  <p className="text-gray-600 text-sm">
                    greater material adaptability
                  </p>
                </div>
                <div className="col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Trusted by schools adapting their education:
                  </h4>
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                        WA
                      </div>
                      <span className="font-medium text-gray-600">
                        Westview Academy
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                        LH
                      </div>
                      <span className="font-medium text-gray-600">
                        Lincoln High
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                        ES
                      </div>
                      <span className="font-medium text-gray-600">
                        Edgewater School
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Education That Adapts to You?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have unlocked their full potential
              with LexiLearn's continuously adapting platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                asChild
              >
                <Link href="/login" className="gap-2">
                  Start Adapting <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-300 text-white hover:bg-indigo-700"
                asChild
              >
                <Link href="/login" className="gap-2">
                  Explore Adaptation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo mode="normal" size="md" />
              <p className="mt-4">
                Making education accessible through adaptive technology that
                responds to every student's learning needs.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">
                Adaptive Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Adaptive Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Learning Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Adaptation Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 LexiLearn AI. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
