import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface relative font-mono overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-primary via-secondary to-accent opacity-70"></div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block group mb-4">
              <div className="relative">
                <span className="text-3xl font-display font-bold text-heading">
                Rezoom<span className="text-primary">4Zoom</span>
                </span>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary/10 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
              </div>
            </Link>
            <p className="text-body mb-6 max-w-md">
              Leverage the power of AI to parse, optimize, and analyze your resume. 
              Get ahead in your job search with our suite of resume enhancement tools.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <Link 
                  key={social} 
                  href={`https://${social}.com`} 
                  className="w-10 h-10 rounded-lg border-2 border-border bg-background flex items-center justify-center text-heading hover:text-primary hover:border-primary transition-colors duration-300 transform hover:rotate-3 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'twitter' ? (
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  ) : social === 'facebook' ? (
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                  ) : social === 'instagram' ? (
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-heading mb-4 pb-2 border-b-2 border-primary/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About'].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-body hover:text-primary flex items-center group"
                  >
                    <svg className="w-3 h-3 mr-2 text-primary transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-heading mb-4 pb-2 border-b-2 border-secondary/30 inline-block">
              Services
            </h3>
            <ul className="space-y-2">
              {['Resume Parsing', 'Job Match Analysis', 'Spell & Grammar Check'].map((service) => (
                <li key={service}>
                  <Link 
                    href={`/services/${service.toLowerCase().replace(/[&\s]+/g, '-')}`}
                    className="text-body hover:text-secondary flex items-center group"
                  >
                    <svg className="w-3 h-3 mr-2 text-secondary transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t-4 border-t-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-body font-medium relative inline-block">
                &copy; {currentYear} Rezoom<span className="text-primary">4Zoom</span>. All rights reserved.
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/10"></span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-sm text-body hover:text-primary font-medium transition-colors group"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center text-xs text-body/70 mt-8 border-t-2 border-t-border/20 pt-4">
            <p className="max-w-4xl mx-auto">
            Rezoom4Zoom uses advanced AI technology to help job seekers optimize their resumes for Applicant Tracking Systems and stand out to recruiters. 
              We are not affiliated with any job board or recruiting agency.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-4 h-4 bg-primary absolute bottom-0 left-0"></div>
      <div className="w-4 h-4 bg-secondary absolute bottom-0 left-4"></div>
      <div className="w-4 h-4 bg-accent absolute bottom-0 left-8"></div>
      <div className="w-4 h-4 bg-primary absolute bottom-0 right-0"></div>
      <div className="w-4 h-4 bg-secondary absolute bottom-0 right-4"></div>
      <div className="w-4 h-4 bg-accent absolute bottom-0 right-8"></div>
    </footer>
  );
}