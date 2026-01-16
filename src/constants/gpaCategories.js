// GPA Categories based on Nepali grading system
export const GPA_CATEGORIES = {
  DISTINCTION: {
    key: 'Distinction',
    label: 'Distinction',
    minGPA: 3.6,
    maxGPA: 4.0,
    color: '#10B981', // green
    bgColor: '#D1FAE5',
    description: 'Outstanding academic performance',
  },
  FIRST_DIVISION: {
    key: 'First_Division',
    label: 'First Division',
    minGPA: 3.2,
    maxGPA: 3.59,
    color: '#3B82F6', // blue
    bgColor: '#DBEAFE',
    description: 'Excellent academic performance',
  },
  SECOND_DIVISION: {
    key: 'Second_Division',
    label: 'Second Division',
    minGPA: 2.8,
    maxGPA: 3.19,
    color: '#8B5CF6', // purple
    bgColor: '#EDE9FE',
    description: 'Good academic performance',
  },
  THIRD_DIVISION: {
    key: 'Third_Division',
    label: 'Third Division',
    minGPA: 2.4,
    maxGPA: 2.79,
    color: '#F59E0B', // amber
    bgColor: '#FEF3C7',
    description: 'Satisfactory academic performance',
  },
  PASS: {
    key: 'Pass',
    label: 'Pass',
    minGPA: 2.0,
    maxGPA: 2.39,
    color: '#EF4444', // red
    bgColor: '#FEE2E2',
    description: 'Minimum passing grade',
  },
  FAIL: {
    key: 'Fail',
    label: 'Fail',
    minGPA: 0,
    maxGPA: 1.99,
    color: '#991B1B', // dark red
    bgColor: '#FEE2E2',
    description: 'Below passing grade - needs improvement',
  },
};

// Get category by GPA value
export const getGPACategoryByValue = (gpa) => {
  if (gpa >= 3.6) return GPA_CATEGORIES.DISTINCTION;
  if (gpa >= 3.2) return GPA_CATEGORIES.FIRST_DIVISION;
  if (gpa >= 2.8) return GPA_CATEGORIES.SECOND_DIVISION;
  if (gpa >= 2.4) return GPA_CATEGORIES.THIRD_DIVISION;
  if (gpa >= 2.0) return GPA_CATEGORIES.PASS;
  return GPA_CATEGORIES.FAIL;
};

// Get category by key
export const getGPACategoryByKey = (key) => {
  return Object.values(GPA_CATEGORIES).find((cat) => cat.key === key) || null;
};
