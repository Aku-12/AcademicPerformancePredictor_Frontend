import { FIELD_RANGES } from '../constants';

// Required fields for prediction
const REQUIRED_NUMERICAL = ['current_age', 'attendance_percentage', 'daily_study_hours'];

const OPTIONAL_NUMERICAL = [
  'plus_two_gpa',
  'family_monthly_income_npr',
  'internal_marks',
  'external_marks',
];

const CATEGORICAL_FIELDS = [
  'gender',
  'institution_type',
  'program',
  'attendance_category',
  'stress_level',
  'motivation_level',
  'class_participation',
  'assignment_submission',
];

// Validate student data
export const validateStudentData = (data) => {
  const errors = [];

  // Check required numerical fields
  REQUIRED_NUMERICAL.forEach((field) => {
    if (data[field] === undefined || data[field] === '' || data[field] === null) {
      errors.push(`${formatFieldName(field)} is required`);
    }
  });

  // Validate numerical ranges
  Object.keys(FIELD_RANGES).forEach((field) => {
    if (data[field] !== undefined && data[field] !== '' && data[field] !== null) {
      const value = Number(data[field]);
      const { min, max } = FIELD_RANGES[field];

      if (isNaN(value)) {
        errors.push(`${formatFieldName(field)} must be a number`);
      } else if (value < min || value > max) {
        errors.push(`${formatFieldName(field)} must be between ${min} and ${max}`);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate a single field
export const validateField = (fieldName, value) => {
  if (REQUIRED_NUMERICAL.includes(fieldName)) {
    if (value === undefined || value === '' || value === null) {
      return { isValid: false, error: `${formatFieldName(fieldName)} is required` };
    }
  }

  if (FIELD_RANGES[fieldName]) {
    const { min, max } = FIELD_RANGES[fieldName];
    const numValue = Number(value);

    if (value !== '' && value !== null && value !== undefined) {
      if (isNaN(numValue)) {
        return { isValid: false, error: `${formatFieldName(fieldName)} must be a number` };
      }
      if (numValue < min || numValue > max) {
        return { isValid: false, error: `Must be between ${min} and ${max}` };
      }
    }
  }

  return { isValid: true, error: null };
};

// Format field name for display
const formatFieldName = (field) => {
  return field
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default validateStudentData;
