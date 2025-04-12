'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ResumeUploadProps {
  serviceType: 'resume-parsing' | 'job-match-analysis' | 'spell-grammar-check';
  title: string;
  description: string;
}

export default function ResumeUpload({ serviceType, title, description }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'application/msword' && 
          selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setError('Please upload a PDF or Word document');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      // Add job description for job match analysis
      if (serviceType === 'job-match-analysis' && jobDescription) {
        formData.append('jobDescription', jobDescription);
      }

      const response = await fetch(`/api/${serviceType}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      router.push(`/results/${serviceType}/${data.id}`);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-background p-8 rounded-lg border-4 border-primary shadow-retro">
      <h2 className="text-3xl font-display font-bold text-heading mb-4">{title}</h2>
      <p className="text-body mb-8">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-heading font-bold mb-2">
            Upload Resume
          </label>
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-body">
                {file ? file.name : 'Click to upload your resume'}
              </span>
              <span className="text-sm text-body/60 mt-2">
                PDF or Word document (max 5MB)
              </span>
            </label>
          </div>
        </div>

        {serviceType === 'job-match-analysis' && (
          <div>
            <label className="block text-heading font-bold mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-32 p-4 border-2 border-primary/30 rounded-lg bg-background text-body"
              placeholder="Paste the job description here..."
            />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:rotate-1
            ${isUploading 
              ? 'bg-primary/50 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary-dark'}`}
        >
          {isUploading ? 'Uploading...' : 'Start Analysis'}
        </button>
      </form>
    </div>
  );
} 
