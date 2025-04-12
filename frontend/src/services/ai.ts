import { logger } from "../utils/logger";
import { validateFile } from "../utils/validation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export interface ResumeParsingResult {
  contact_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
  };
  education: {
    institution: string;
    degree: string;
    dates: string;
    gpa: string;
  }[];
  work_experience: {
    company: string;
    job_title: string;
    dates: string;
    responsibilities: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
    tools: string[];
  };
  projects: {
    name: string;
    technologies: string[];
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string | null;
  }[];
  publications: any[];
  summary: string | null;
}

export interface JobMatchResult {
  match_score: string;
  matches: {
    technical: string[];
    soft: string[];
    education: string[];
    experience: string[];
  };
  gaps: {
    technical: string[];
    soft: string[];
    education: string[];
    experience: string[];
  };
  recommendations: string[];
}

export interface SpellGrammarResult {
  errors: Array<{
    error_text: string;
    suggestion: string;
    explanation: string;
  }>;
  summary: {
    total_errors: number;
    severity: string;
    improvement_recommendation: string;
  };
}

export class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async parseResume(file: File): Promise<ResumeParsingResult> {
    try {
      logger.info("Starting resume parsing", { filename: file.name });

      const validationResult = validateFile(file);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      const formData = new FormData();
      formData.append("resume_file", file);
      formData.append("include_summary", "true");

      const response = await fetch(`${API_BASE_URL}/parse-resume`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const data = await response.json();
      return {
        id: `resume-${Date.now()}`,
        ...data,
      };
    } catch (error) {
      logger.error("Error parsing resume", error);
      throw error;
    }
  }

  async analyzeJobMatch(
    resume: File,
    jobDescription: string,
  ): Promise<JobMatchResult> {
    try {
      logger.info("Starting job match analysis", {
        filename: resume.name,
        jobDescriptionLength: jobDescription.length,
      });

      const fileValidation = validateFile(resume);
      if (!fileValidation.isValid) {
        throw new Error(fileValidation.error);
      }

      const formData = new FormData();
      formData.append("resume_file", resume);
      formData.append("job_description", jobDescription);

      const response = await fetch(`${API_BASE_URL}/compare-resume-to-job`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze job match");
      }

      const data = await response.json();
      return {
        id: `match-${Date.now()}`,
        ...data,
      };
    } catch (error) {
      logger.error("Error analyzing job match", error);
      throw error;
    }
  }

  async checkSpellGrammar(file: File): Promise<SpellGrammarResult> {
    try {
      logger.info("Starting spell and grammar check", { filename: file.name });

      const validationResult = validateFile(file);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      const formData = new FormData();
      formData.append("resume_file", file);

      const response = await fetch(`${API_BASE_URL}/spell-check-resume`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to check spell and grammar");
      }

      const data = await response.json();
      return {
        id: `check-${Date.now()}`,
        ...data,
      };
    } catch (error) {
      logger.error("Error checking spell and grammar", error);
      throw error;
    }
  }
}
