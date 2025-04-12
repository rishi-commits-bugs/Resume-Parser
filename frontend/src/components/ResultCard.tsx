type ResumeData = {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    graduation: string;
  }[];
};

export default function ResultCard({ data }: { data: ResumeData }) {
  return (
    <div className="card w-full max-w-3xl mx-auto mt-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{data.name}</h2>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.email}
            </span>
            {data.phone && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {data.phone}
              </span>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Experience</h3>
          <div className="mt-3 space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-white">{exp.position}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {exp.duration}</p>
                {exp.description && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Education</h3>
          <div className="mt-3 space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-secondary/30 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {edu.institution} {edu.fieldOfStudy && `• ${edu.fieldOfStudy}`} • {edu.graduation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 