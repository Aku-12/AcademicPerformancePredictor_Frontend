import { getGPACategoryByValue, getGPACategoryByKey } from '../constants';

// Format GPA value
export const formatGPA = (gpa, decimals = 2) => {
  if (gpa === null || gpa === undefined) return '-';
  return Number(gpa).toFixed(decimals);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  return `${Number(value).toFixed(decimals)}%`;
};

// Format currency (NPR)
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format prediction result
export const formatPredictionResult = (result) => {
  if (!result) return null;

  const category = result.gpa_category
    ? getGPACategoryByKey(result.gpa_category)
    : getGPACategoryByValue(result.predicted_gpa);

  return {
    ...result,
    formattedGPA: formatGPA(result.predicted_gpa),
    category: category,
    categoryLabel: category?.label || result.gpa_category,
    categoryColor: category?.color || '#6B7280',
    categoryBgColor: category?.bgColor || '#F3F4F6',
  };
};

// Format field name for display
export const formatFieldName = (field) => {
  if (!field) return '';
  return field
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format category value for display
export const formatCategoryValue = (value) => {
  if (!value) return '-';
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format date
export const formatDate = (date) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Format number with commas
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '-';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
