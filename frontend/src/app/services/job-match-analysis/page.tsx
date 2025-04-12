'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AIService, JobMatchResult } from '@/services/ai';

export default function JobMatchAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFileUpload = async (file: File) => {
    setFile(file);
  };

  const handleCheckJobMatch = async () => {
    if (!file || !jobDescription) return;
    
    try {
      setLoading(true);
      setError(null);
      const aiService = AIService.getInstance();
      const result = await aiService.analyzeJobMatch(file, jobDescription);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze job match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background font-mono ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Header />
      
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-r from-background to-background/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto transform translate-y-4 opacity-0 animate-slide-up">
              <div className="px-4 py-1 bg-secondary/20 text-secondary inline-block rounded-full mb-3 border-2 border-secondary transform -rotate-2">
                <span className="text-sm font-bold tracking-widest">JOB MATCH ANALYSIS</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 leading-tight tracking-tight">
                Match Your <span className="text-primary relative inline-block">
                  Resume
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xl text-body mb-8 max-w-3xl leading-relaxed">
                Upload your resume and job description to see how well they match.
                Get insights on matching skills, experience gaps, and recommendations for improvement.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-secondary to-secondary-dark relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Ready to Check Job Match?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Upload your resume and paste the job description to get started.
                </p>
              </div>

              <div className="bg-surface/10 backdrop-blur-sm p-8 rounded-lg border-4 border-white/20 shadow-retro-xl">
                <div className="space-y-8">
                  <div>
                    <label htmlFor="job-description" className="block text-xl font-display font-bold text-white mb-4">
                      Job Description
                    </label>
                    <textarea
                      id="job-description"
                      className="w-full px-6 py-4 bg-white/10 text-white border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder-white/50 min-h-[100px] resize-none overflow-hidden"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => {
                        setJobDescription(e.target.value);
                        // Auto-resize textarea
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onFocus={(e) => {
                        // Set initial height on focus
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    />
                  </div>

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
                          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className="text-white/90 text-lg font-medium mb-2">
                          {file ? 'Change Resume File' : 'Upload Your Resume'}
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
                            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <div className="text-white/90 font-medium">{file.name}</div>
                              <div className="text-white/40 text-sm">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setFile(null)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 text-white/60 hover:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleCheckJobMatch}
                      disabled={!file || !jobDescription || loading}
                      className={`mt-8 px-8 py-4 text-secondary font-bold rounded-lg border-4 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-retro-xl transform hover:-translate-y-2 hover:rotate-1 group disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            Check Job Match
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                <p className="text-xl text-body">Analyzing job match...</p>
              </div>
            </div>
          </section>
        )}

        {error && (
          <section className="py-12 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-error/10 border-3 border-error/20 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-display font-bold text-error mb-3">Error</h2>
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
                    Match Analysis Results
                  </h2>
                  <p className="text-base text-body max-w-2xl mx-auto">
                    Here's how your resume matches the job requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
                  <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro h-auto lg:col-span-1">
                    <h3 className="text-xl font-display font-bold text-heading mb-3">Overall Match</h3>
                    <div className="relative">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full text-center">
                          <span className="text-5xl font-display font-bold text-primary">
                            {result.match_score}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-4 mb-1 text-xs flex rounded bg-primary/10">
                        <div 
                          style={{ width: `${parseInt(result.match_score)}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        ></div>
                      </div>
                    </div>
                  </div>

                  {result.matches.technical.length > 0 && (
                    <div className={`bg-background p-4 rounded-lg border-3 border-secondary shadow-retro h-auto ${result.matches.technical.length > 6 ? 'lg:col-span-2' : 'sm:col-span-1'}`}>
                      <h3 className="text-xl font-display font-bold text-heading mb-3">
                        Matching Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {result.matches.technical.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.matches.soft.length > 0 && (
                    <div className="bg-background p-4 rounded-lg border-3 border-secondary shadow-retro h-auto sm:col-span-1">
                      <h3 className="text-xl font-display font-bold text-heading mb-3">
                        Matching Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {result.matches.soft.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.gaps.technical.length > 0 && (
                    <div className={`bg-background p-4 rounded-lg border-3 border-error shadow-retro h-auto ${result.gaps.technical.length > 6 ? 'lg:col-span-2' : 'sm:col-span-1'}`}>
                      <h3 className="text-xl font-display font-bold text-heading mb-3">
                        Missing Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {result.gaps.technical.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-error/10 text-error px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.gaps.soft.length > 0 && (
                    <div className="bg-background p-4 rounded-lg border-3 border-error shadow-retro h-auto sm:col-span-1">
                      <h3 className="text-xl font-display font-bold text-heading mb-3">
                        Missing Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {result.gaps.soft.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-error/10 text-error px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.gaps.experience.length > 0 && (
                    <div className="bg-background p-4 rounded-lg border-3 border-error shadow-retro h-auto sm:col-span-2 lg:col-span-3">
                      <h3 className="text-xl font-display font-bold text-heading mb-3">
                        Experience Gaps
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {result.gaps.experience.map((gap, index) => (
                          <li key={index} className="text-error">{gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro h-auto sm:col-span-2 lg:col-span-3">
                    <h3 className="text-xl font-display font-bold text-heading mb-3">
                      Recommendations
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-body">{recommendation}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background/30 backdrop-blur-sm p-4 rounded-lg border-2 border-border/30 shadow-retro h-auto sm:col-span-2 lg:col-span-3 flex gap-4 justify-center">
                    <button 
                      onClick={() => window.print()}
                      className="px-6 py-3 bg-primary text-white font-bold rounded-lg border-3 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 shadow-retro transform hover:-translate-y-1 hover:rotate-1 text-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        Download Report
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                    </button>
                    <button 
                      onClick={() => {
                        setResult(null);
                        setError(null);
                        setFile(null);
                        setJobDescription('');
                      }}
                      className="px-6 py-3 bg-surface text-secondary font-bold rounded-lg border-3 border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 shadow-retro transform hover:-translate-y-1 hover:rotate-1 text-sm"
                    >
                      <span className="relative z-10 flex items-center">
                        Check Another Job
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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