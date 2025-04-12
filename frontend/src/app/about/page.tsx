'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-background font-mono ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Header />
      
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-r from-background to-background/80 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto transform translate-y-4 opacity-0 animate-slide-up">
              <div className="px-4 py-1 bg-secondary/20 text-secondary inline-block rounded-full mb-3 border-2 border-secondary transform -rotate-2">
                <span className="text-sm font-bold tracking-widest">OUR STORY</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 leading-tight tracking-tight">
                About <span className="text-primary relative inline-block">
                Rezoom4Zoom
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 -rotate-1"></span>
                </span>
              </h1>
              <p className="text-xl text-body mb-8 max-w-3xl leading-relaxed">
                We're on a mission to empower job seekers with AI tools that make the application process 
                more efficient and effective. Our platform is designed to help you present your best self to potential employers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-primary via-secondary to-accent opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 transform -rotate-1">
                <div className="inline-block bg-primary/10 px-6 py-2 rounded-lg border-2 border-primary mb-4">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-heading">Our Mission</h2>
                </div>
              </div>
              
              <div className="bg-background p-8 rounded-lg border-4 border-primary shadow-retro-lg transform rotate-1 mb-12">
                <p className="text-xl text-body leading-relaxed">
                  We believe that everyone deserves access to technology that can help them stand out in today's competitive job market. 
                  By leveraging cutting-edge AI, we're making professional resume optimization accessible to all job seekers.
                </p>
              </div>

              {/* Team Section */}
              <div className="text-center mb-16 transform -rotate-1">
                <div className="inline-block bg-secondary/10 px-6 py-2 rounded-lg border-2 border-secondary mb-4">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-heading">Our Team</h2>
                </div>
                <p className="text-lg text-body max-w-2xl mx-auto mt-4">
                  Meet the talented developers behind Rezoom4Zoom
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {/* Team Member 1 */}
                <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-primary">AR</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-heading mb-1">Ankit A Rao</h3>
                    <p className="text-sm text-body/80">Full Stack Developer</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span className="text-xs text-body/60">Core Developer</span>
                    </div>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className="bg-background p-4 rounded-lg border-3 border-secondary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-secondary">RK</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-heading mb-1">Rishab Kumar R</h3>
                    <p className="text-sm text-body/80">Full Stack Developer</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                      <span className="text-xs text-body/60">Core Developer</span>
                    </div>
                  </div>
                </div>

                {/* Team Member 3 */}
                <div className="bg-background p-4 rounded-lg border-3 border-accent shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-accent">SN</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-heading mb-1">Shreesha N G</h3>
                    <p className="text-sm text-body/80">Full Stack Developer</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      <span className="text-xs text-body/60">Core Developer</span>
                    </div>
                  </div>
                </div>

                {/* Team Member 4 */}
                <div className="bg-background p-4 rounded-lg border-3 border-primary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-primary">SC</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-heading mb-1">Srujan C D</h3>
                    <p className="text-sm text-body/80">Full Stack Developer</p>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span className="text-xs text-body/60">Core Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-accent via-primary to-secondary opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 transform -rotate-1">
                <div className="inline-block bg-accent/10 px-6 py-2 rounded-lg border-2 border-accent mb-4">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-heading">How It Works</h2>
                </div>
                <p className="text-lg text-body max-w-2xl mx-auto mt-4">
                  Our platform offers three core services to optimize your resume
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-background p-8 rounded-lg border-4 border-primary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-heading mb-3">Resume Parsing</h3>
                      <p className="text-body">
                        Extract structured information from your resume to understand how recruiters and ATS systems view your document. 
                        Our system breaks down your resume into key components to identify strengths and areas for improvement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-8 rounded-lg border-4 border-secondary shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-heading mb-3">Job Match Analysis</h3>
                      <p className="text-body">
                        Compare your resume to specific job descriptions to identify matching skills and experience, 
                        as well as gaps you might want to address. Our algorithms highlight keywords and phrases 
                        that can improve your match rate with automated screening systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-8 rounded-lg border-4 border-accent shadow-retro hover:shadow-retro-lg transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-heading mb-3">Spell & Grammar Check</h3>
                      <p className="text-body">
                        Ensure your resume is free of errors that could create a negative impression with potential employers. 
                        Our advanced linguistic tools catch not just spelling mistakes, but also grammar issues, 
                        awkward phrasing, and inconsistent tense or voice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-white/10 px-8 py-4 rounded-lg border-2 border-white/30 mb-6 transform -rotate-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Ready to Optimize Your Resume?
              </h2>
            </div>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Start using our AI-powered tools today and increase your chances of landing your dream job.
            </p>
            <Link 
              href="/services" 
              className="inline-block px-10 py-5 font-bold rounded-lg border-4 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-retro-xl transform hover:-translate-y-2 hover:rotate-1 group"
            >
              <span className="relative z-10 flex items-center">
                Explore Our Services
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
      `}</style>
    </div>
  );
}