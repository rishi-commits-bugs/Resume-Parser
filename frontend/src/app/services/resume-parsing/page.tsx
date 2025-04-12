"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AIService, ResumeParsingResult } from "@/services/ai";

export default function ResumeParsing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeParsingResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFileUpload = async (file: File) => {
    setFile(file);
  };

  const handleParseResume = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      const aiService = AIService.getInstance();
      const result = await aiService.parseResume(file);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse resume");
    } finally {
      setLoading(false);
    }
  };

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
                  RESUME PARSING
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 leading-tight tracking-tight">
                Extract{" "}
                <span className="text-primary relative inline-block">
                  Information
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xl text-body mb-8 max-w-3xl leading-relaxed">
                Upload your resume and let our AI extract all the important
                information automatically. Get a structured view of your
                resume&rsquo;s content and identify areas for improvement.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Ready to Parse Your Resume?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Upload your resume and get a detailed analysis of its content.
                </p>
              </div>

              <div className="bg-surface/10 backdrop-blur-sm p-8 rounded-lg border-4 border-white/20 shadow-retro-xl">
                <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer group relative"
                  >
                    <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-lg transition-all duration-300">
                      <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white/80"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div className="text-white/90 text-lg font-medium mb-2">
                        {file ? "Change Resume File" : "Upload Your Resume"}
                      </div>
                      <div className="text-white/60 text-sm mb-4">
                        Drag and drop your resume here, or click to browse
                      </div>
                      <div className="text-white/40 text-xs space-y-1">
                        <div>Supported formats: PDF, DOC, DOCX, TXT</div>
                        <div>Maximum file size: 5MB</div>
                      </div>
                    </div>
                  </label>

                  {file && (
                    <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <svg
                            className="w-6 h-6 text-white/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div>
                            <div className="text-white/90 font-medium">
                              {file.name}
                            </div>
                            <div className="text-white/40 text-sm">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 text-white/60 hover:text-white/90"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleParseResume}
                    disabled={!file || loading}
                    className={`mt-8 px-8 py-4 text-primary font-bold rounded-lg border-4 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-retro-xl transform hover:-translate-y-2 hover:rotate-1 group disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Parsing...
                        </>
                      ) : (
                        <>
                          Parse Resume
                          <svg
                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="block w-full h-full absolute top-2 left-2 bg-white/20 -z-10 rounded-lg transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <section className="py-12 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="relative h-16 w-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-6 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
                </div>
                <p className="text-xl text-body">Analyzing your resume...</p>
              </div>
            </div>
          </section>
        )}

        {error && (
          <section className="py-12 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-error/10 border-3 border-error/20 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-display font-bold text-error mb-3">
                    Error
                  </h2>
                  <p className="text-body">{error}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {result && (
          <section className="py-12 bg-surface relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-heading mb-2">
                    Analysis Results
                  </h2>
                  <p className="text-base text-body max-w-2xl mx-auto">
                    Here&rsquo;s what we found in your resume
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
                  <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro h-auto sm:col-span-1">
                    <h3 className="text-xl font-display font-bold text-heading mb-3">
                      Contact Info
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="text-body/70 w-20">Name:</span>
                        <span className="font-medium">{result.contact_info.name}</span>
                      </div>
                      <div className="flex">
                        <span className="text-body/70 w-20">Email:</span>
                        <span className="font-medium">{result.contact_info.email}</span>
                      </div>
                      <div className="flex">
                        <span className="text-body/70 w-20">Phone:</span>
                        <span className="font-medium">{result.contact_info.phone}</span>
                      </div>
                      <div className="flex">
                        <span className="text-body/70 w-20">Location:</span>
                        <span className="font-medium">{result.contact_info.location}</span>
                      </div>
                      {result.contact_info.linkedin && (
                        <div className="flex">
                          <span className="text-body/70 w-20">LinkedIn:</span>
                          <span className="font-medium truncate">{result.contact_info.linkedin}</span>
                        </div>
                      )}
                      {result.contact_info.github && (
                        <div className="flex">
                          <span className="text-body/70 w-20">GitHub:</span>
                          <span className="font-medium truncate">{result.contact_info.github}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-background p-4 rounded-lg border-3 border-secondary shadow-retro h-auto sm:col-span-1">
                    <h3 className="text-xl font-display font-bold text-heading mb-3">
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {result.skills.technical.slice(0, 12).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {result.skills.technical.length > 12 && (
                        <span className="bg-primary/5 text-primary/80 px-2 py-1 rounded-full text-xs font-medium">
                          +{result.skills.technical.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-background p-4 rounded-lg border-3 border-accent shadow-retro h-auto sm:col-span-1">
                    <h3 className="text-xl font-display font-bold text-heading mb-3">
                      Soft Skills & Tools
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-base font-display font-bold text-heading mb-2">
                          Soft Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {result.skills.soft.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {result.skills.soft.length > 6 && (
                            <span className="bg-secondary/5 text-secondary/80 px-2 py-1 rounded-full text-xs font-medium">
                              +{result.skills.soft.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-display font-bold text-heading mb-2">
                          Tools
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {result.skills.tools.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {result.skills.tools.length > 6 && (
                            <span className="bg-primary/5 text-primary/80 px-2 py-1 rounded-full text-xs font-medium">
                              +{result.skills.tools.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {result.summary && (
                    <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro h-auto sm:col-span-2 lg:col-span-3">
                      <h3 className="text-xl font-display font-bold text-heading mb-2">
                        Professional Summary
                      </h3>
                      <p className="text-sm text-body leading-relaxed">{result.summary}</p>
                    </div>
                  )}

                  <div className={`bg-background p-4 rounded-lg border-3 border-accent shadow-retro h-auto ${result.work_experience.length > 1 ? 'sm:col-span-2' : 'sm:col-span-1'}`}>
                    <h3 className="text-xl font-display font-bold text-heading mb-3 flex justify-between">
                      <span>Work Experience</span>
                      {result.work_experience.length > 2 && (
                        <span className="text-xs text-body/60 self-end">
                          Showing 2 of {result.work_experience.length}
                        </span>
                      )}
                    </h3>
                    <div className="space-y-3">
                      {result.work_experience.slice(0, 2).map((exp, index) => (
                        <div
                          key={index}
                          className="p-3 bg-surface rounded-lg border-2 border-border text-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h4 className="font-display font-bold text-heading">
                              {exp.job_title}
                            </h4>
                            <p className="text-body/70 text-xs">{exp.dates}</p>
                          </div>
                          <p className="text-body font-medium mb-1">{exp.company}</p>
                          <ul className="list-disc list-inside text-xs space-y-1">
                            {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                              <li key={idx} className="text-body">{resp}</li>
                            ))}
                            {exp.responsibilities.length > 3 && (
                              <li className="text-body/60">+{exp.responsibilities.length - 3} more duties</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`bg-background p-4 rounded-lg border-3 border-primary shadow-retro h-auto ${result.education.length > 1 ? 'sm:col-span-1 lg:col-span-1' : 'sm:col-span-1'}`}>
                    <h3 className="text-xl font-display font-bold text-heading mb-3 flex justify-between">
                      <span>Education</span>
                      {result.education.length > 2 && (
                        <span className="text-xs text-body/60 self-end">
                          Showing 2 of {result.education.length}
                        </span>
                      )}
                    </h3>
                    <div className="space-y-3">
                      {result.education.slice(0, 2).map((edu, index) => (
                        <div
                          key={index}
                          className="p-3 bg-surface rounded-lg border-2 border-border text-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h4 className="font-display font-bold text-heading">
                              {edu.institution}
                            </h4>
                            <p className="text-body/70 text-xs">{edu.dates}</p>
                          </div>
                          <p className="text-body font-medium">{edu.degree}</p>
                          {edu.gpa && <p className="text-body/70 text-xs">GPA: {edu.gpa}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.projects.length > 0 && (
                    <div className={`bg-background p-4 rounded-lg border-3 border-secondary shadow-retro h-auto ${result.projects.length > 1 ? 'sm:col-span-2 lg:col-span-2' : 'sm:col-span-1'}`}>
                      <h3 className="text-xl font-display font-bold text-heading mb-3 flex justify-between">
                        <span>Projects</span>
                        {result.projects.length > 2 && (
                          <span className="text-xs text-body/60 self-end">
                            Showing 2 of {result.projects.length}
                          </span>
                        )}
                      </h3>
                      <div className="space-y-3">
                        {result.projects.slice(0, 2).map((project, index) => (
                          <div
                            key={index}
                            className="p-3 bg-surface rounded-lg border-2 border-border text-sm"
                          >
                            <h4 className="font-display font-bold text-heading mb-1">
                              {project.name}
                            </h4>
                            <p className="text-body text-xs mb-2 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 4).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 4 && (
                                <span className="bg-secondary/5 text-secondary/80 px-2 py-0.5 rounded-full text-xs">
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.certifications.length > 0 && (
                    <div className="bg-background p-4 rounded-lg border-3 border-accent shadow-retro h-auto sm:col-span-1">
                      <h3 className="text-xl font-display font-bold text-heading mb-3 flex justify-between">
                        <span>Certifications</span>
                        {result.certifications.length > 3 && (
                          <span className="text-xs text-body/60 self-end">
                            Showing 3 of {result.certifications.length}
                          </span>
                        )}
                      </h3>
                      <div className="space-y-2">
                        {result.certifications.slice(0, 3).map((cert, index) => (
                          <div
                            key={index}
                            className="p-2 bg-surface rounded-lg border-2 border-border text-sm"
                          >
                            <p className="font-medium">{cert.name}</p>
                            <div className="flex justify-between text-xs">
                              <p className="text-body">{cert.issuer}</p>
                              {cert.date && <p className="text-body/70">{cert.date}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-background/30 backdrop-blur-sm p-4 rounded-lg border-2 border-border/30 shadow-retro h-auto sm:col-span-2 lg:col-span-3 flex gap-4 justify-center">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 bg-primary text-white font-bold rounded-lg border-3 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 shadow-retro transform hover:-translate-y-1 hover:rotate-1 text-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        Download Report
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setResult(null);
                        setError(null);
                        setFile(null);
                      }}
                      className="px-6 py-3 bg-surface text-secondary font-bold rounded-lg border-3 border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 shadow-retro transform hover:-translate-y-1 hover:rotate-1 text-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        Parse Another Resume
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
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
