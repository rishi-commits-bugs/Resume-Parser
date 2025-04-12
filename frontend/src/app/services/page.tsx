"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Services() {
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
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto transform translate-y-4 opacity-0 animate-slide-up">
              <div className="px-4 py-1 bg-primary/20 text-primary inline-block rounded-full mb-3 border-2 border-primary transform -rotate-2">
                <span className="text-sm font-bold tracking-widest">
                  OUR SERVICES
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 leading-tight tracking-tight">
                AI-Powered{" "}
                <span className="text-primary relative inline-block">
                  Resume Tools
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xl text-body mb-8 max-w-3xl leading-relaxed">
                Discover our suite of AI-powered tools designed to help you
                create, optimize, and perfect your resume. Choose the service
                that best fits your needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-primary via-secondary to-accent opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link href="/services/resume-parsing" className="group">
                  <div className="bg-background p-8 rounded-lg border-4 border-primary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-heading mb-2">
                          Resume Parsing
                        </h3>
                        <p className="text-body">
                          Extract structured information from your resume using
                          advanced AI technology.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-bold">Learn More</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

                <Link href="/services/job-match-analysis" className="group">
                  <div className="bg-background p-8 rounded-lg border-4 border-secondary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-heading mb-2">
                          Job Match Analysis
                        </h3>
                        <p className="text-body">
                          Compare your resume against job descriptions to
                          identify matching skills and experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-secondary group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-bold">Learn More</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

                <Link href="/services/spell-grammar-check" className="group">
                  <div className="bg-background p-8 rounded-lg border-4 border-accent shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-heading mb-2">
                          Spell & Grammar Check
                        </h3>
                        <p className="text-body">
                          Ensure your resume is free of errors with our advanced
                          proofreading tools.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-accent group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-bold">Learn More</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
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

        .animate-slide-up {
          animation: slide-up 0.8s forwards;
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
      `}</style>
    </div>
  );
}
