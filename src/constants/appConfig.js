// Application configuration constants
export const APP_CONFIG = {
  APP_NAME: 'Academic Performance Predictor',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'AI-powered academic performance prediction for CS students in Nepal',
};

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
  TIMEOUT: 60000,
};

// Model types for training
export const MODEL_TYPES = [
  { value: 'xgboost_gpu', label: 'XGBoost (GPU)', recommended: true },
  { value: 'xgboost_cpu', label: 'XGBoost (CPU)' },
  { value: 'lightgbm_gpu', label: 'LightGBM (GPU)' },
  { value: 'lightgbm_cpu', label: 'LightGBM (CPU)' },
  { value: 'random_forest', label: 'Random Forest' },
  { value: 'gradient_boosting', label: 'Gradient Boosting' },
  { value: 'neural_network', label: 'Neural Network' },
  { value: 'ridge', label: 'Ridge Regression' },
];

// Numerical field ranges for validation
export const FIELD_RANGES = {
  current_age: { min: 18, max: 25, default: 20 },
  plus_two_gpa: { min: 0, max: 4.0, default: 3.0 },
  attendance_percentage: { min: 0, max: 100, default: 75 },
  daily_study_hours: { min: 0, max: 24, default: 3 },
  internal_marks: { min: 0, max: 100, default: 50 },
  external_marks: { min: 0, max: 100, default: 50 },
  family_monthly_income_npr: { min: 0, max: 1000000, default: 50000 },
};

// Routes
export const ROUTES = {
  HOME: '/',
  PREDICT: '/predict',
  BATCH_PREDICT: '/batch-predict',
  RESULTS: '/results',
  MODEL_STATUS: '/model-status',
  ABOUT: '/about',
};
