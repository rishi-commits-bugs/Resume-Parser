"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, ChevronRight, Check } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-background font-mono ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
    >
      <Header />

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-r from-background to-background/80 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 transform translate-y-4 opacity-0 animate-slide-up">
                <div className="px-4 py-1 bg-secondary/20 text-secondary inline-block rounded-full mb-3 border-2 border-secondary transform -rotate-2">
                  <span className="text-sm font-bold tracking-widest">
                    AI-POWERED
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 leading-tight tracking-tight">
                  Transform Your{" "}
                  <span className="text-primary relative inline-block">
                    Resume
                    <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 -rotate-1"></span>
                  </span>
                </h1>
                <p className="text-xl text-body mb-8 max-w-2xl leading-relaxed">
                  Leverage the power of AI to parse, optimize, and analyze your
                  resume. Get ahead in your job search with our suite of resume
                  enhancement tools.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/services"
                    className="px-8 py-4 bg-primary text-white font-bold rounded-md border-3 border-primary transition-all duration-300 shadow-retro-lg transform hover:-translate-y-1 hover:rotate-1 group"
                  >
                    Get Started
                    <span className="block w-full h-full absolute top-1 left-1 bg-primary/20 -z-10 rounded-md transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-background text-secondary font-bold rounded-md border-3 border-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-retro transform hover:-translate-y-1 hover:-rotate-1 group"
                  >
                    Learn More
                    <span className="block w-full h-full absolute top-1 left-1 bg-secondary/20 -z-10 rounded-md transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
                  </Link>
                </div>
              </div>
              <div className="flex-1 transform translate-y-4 opacity-0 animate-slide-up animation-delay-150">
                <div className="hidden md:block">
                  <div className="bg-surface p-8 rounded-lg border-4 border-accent shadow-retro-xl transform transition-transform duration-500 -rotate-1">
                    <div className="w-full aspect-[4/3] bg-background border-1 border-white/90 rotate-1 rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-8 bg-white/90 flex items-center px-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-3 text-black/90 text-sm font-medium">Resume Parser</div>
                      </div>
                      
                      <div className="flex items-center justify-center w-full max-w-md relative">
                        <div className="absolute left-0 transform -translate-x-16 animate-bounce-in">
                          <FileText className="w-16 h-16 text-primary" />
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ChevronRight className="w-8 h-8 text-secondary animate-pulse animation-delay-0" />
                          <ChevronRight className="w-8 h-8 text-secondary animate-pulse animation-delay-500" />
                          <ChevronRight className="w-8 h-8 text-secondary animate-pulse animation-delay-1000" />
                        </div>
                        
                        <div className="absolute right-0 transform translate-x-16 animate-fade-in">
                          <div className="bg-surface p-3 rounded-lg border border-accent shadow-retro w-40">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-primary font-bold text-sm">Parsed Data</div>
                              <Check className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="space-y-1">
                              <div className="w-full h-2 bg-white/20 rounded animate-pulse"></div>
                              <div className="w-3/4 h-2 bg-white/20 rounded animate-pulse"></div>
                              <div className="w-full h-2 bg-white/20 rounded animate-pulse"></div>
                              <div className="w-1/2 h-2 bg-white/20 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-8 text-center">
                        <div className="text-primary font-bold mb-2">AI-Powered Resume Parsing</div>
                        <div className="flex space-x-4 justify-center">
                          <div className="flex items-center space-x-1 animate-fade-slide-up animation-delay-100">
                            <FileText className="w-4 h-4 text-secondary" />
                            <span className="text-xs text-body">Contact Info</span>
                          </div>
                          <div className="flex items-center space-x-1 animate-fade-slide-up animation-delay-200">
                            <FileText className="w-4 h-4 text-secondary" />
                            <span className="text-xs text-body">Experience</span>
                          </div>
                          <div className="flex items-center space-x-1 animate-fade-slide-up animation-delay-300">
                            <FileText className="w-4 h-4 text-secondary" />
                            <span className="text-xs text-body">Skills</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-secondary rounded-full animate-ping animation-delay-500"></div>
                        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-accent rounded-full animate-ping animation-delay-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-primary via-secondary to-accent opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 transform -rotate-1">
              <div className="inline-block bg-accent/10 px-6 py-2 rounded-lg border-2 border-accent mb-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-heading">
                  Our Services
                </h2>
              </div>
              <p className="text-lg text-body max-w-2xl mx-auto">
                Comprehensive suite of AI-powered tools to optimize your resume
                and boost your job search
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg border-4 border-primary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-heading mb-3">
                  Resume Parsing
                </h3>
                <p className="text-body mb-6">
                  Extract structured information from your resume to streamline
                  job applications and talent management.
                </p>
                <Link
                  href="/services/resume-parsing"
                  className="text-primary font-bold flex items-center group-hover:underline"
                >
                  Try it now
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-background p-8 rounded-lg border-4 border-secondary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-heading mb-3">
                  Job Match Analysis
                </h3>
                <p className="text-body mb-6">
                  Compare your resume to job descriptions to identify matches
                  and gaps for targeted applications.
                </p>
                <Link
                  href="/services/job-match-analysis"
                  className="text-secondary font-bold flex items-center group-hover:underline"
                >
                  Try it now
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-background p-8 rounded-lg border-4 border-accent shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-heading mb-3">
                  Spell & Grammar Check
                </h3>
                <p className="text-body mb-6">
                  Identify and correct spelling and grammar errors to ensure
                  your resume is polished and professional.
                </p>
                <Link
                  href="/services/spell-grammar-check"
                  className="text-accent font-bold flex items-center group-hover:underline"
                >
                  Try it now
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block transform rotate-1">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-heading mb-4 px-6 py-2 bg-primary/10 border-b-4 border-primary">
                  What Our Users Say
                </h2>
              </div>
              <p className="text-lg text-body max-w-2xl mx-auto mt-4">
                Join thousands of job seekers who&rdquo;ve improved their
                resumes and job prospects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-surface p-8 rounded-lg border-4 border-border shadow-retro transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-retro-lg">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl border-2 border-primary">
                    JS
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-heading">Jessica Smith</h4>
                    <p className="text-sm text-muted">Software Engineer</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="bg-background p-4 rounded border-2 border-border relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-primary">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p className="text-body font-mono">
                    &rdquo;The resume parser and job match analysis helped me
                    tailor my applications to each position. I received more
                    callbacks and landed my dream job!&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-surface p-8 rounded-lg border-4 border-border shadow-retro transform rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-retro-lg">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-display font-bold text-xl border-2 border-secondary">
                    MJ
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-heading">Michael Johnson</h4>
                    <p className="text-sm text-muted">Marketing Manager</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="bg-background p-4 rounded border-2 border-border relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-secondary/20 border-2 border-secondary rounded-full flex items-center justify-center text-secondary">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p className="text-body font-mono">
                    &rdquo;The spell check feature caught several errors I had
                    missed. The polished resume gave me more confidence during
                    my job search.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-surface p-8 rounded-lg border-4 border-border shadow-retro transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-retro-lg">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent font-display font-bold text-xl border-2 border-accent">
                    AL
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-heading">Amanda Lee</h4>
                    <p className="text-sm text-muted">Product Manager</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="bg-background p-4 rounded border-2 border-border relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center text-accent">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p className="text-body font-mono">
                    &rdquo;The job match analysis highlighted skills I needed to
                    emphasize. After making those changes, I started getting
                    interviews for positions I previously missed out on.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-white/10 px-8 py-4 rounded-lg border-2 border-white/30 mb-6 transform -rotate-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Ready to Supercharge Your Job Search?
              </h2>
            </div>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get started today with our AI-powered resume tools and land your
              dream job faster.
            </p>
            <Link
              href="/services"
              className="inline-block px-10 py-5 font-bold rounded-lg border-4 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-retro-xl transform hover:-translate-y-2 hover:rotate-1 group"
            >
              <span className="relative z-10 flex items-center">
                Try Our Services Now
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="block w-full h-full absolute top-2 left-2 bg-white/20 -z-10 rounded-lg transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes slide-up {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        .shadow-retro {
          box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.2);
        }

        .shadow-retro-lg {
          box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 0.2);
        }

        .shadow-retro-xl {
          box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.25);
        }

        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        .typing-cursor {
          width: 12px;
          height: 24px;
          background-color: currentColor;
          display: inline-block;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
