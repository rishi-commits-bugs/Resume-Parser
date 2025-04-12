export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: File): ValidationResult {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "File size must be less than 5MB",
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Only PDF and Word documents are allowed",
    };
  }

  return { isValid: true };
}

export function validateJobDescription(description: string): ValidationResult {
  if (!description || description.trim().length === 0) {
    return {
      isValid: false,
      error: "Job description is required",
    };
  }

  if (description.length < 50) {
    return {
      isValid: false,
      error: "Job description must be at least 50 characters long",
    };
  }

  return { isValid: true };
}
