import { useState } from 'react';
import { Button, Input, Select, Card, CardHeader, CardTitle, CardContent, CardFooter, Alert } from '../ui';
import { useForm, usePrediction } from '../../hooks';
import {
  GENDER_OPTIONS,
  INSTITUTION_TYPE_OPTIONS,
  PROGRAM_OPTIONS,
  ATTENDANCE_CATEGORY_OPTIONS,
  STRESS_LEVEL_OPTIONS,
  MOTIVATION_LEVEL_OPTIONS,
  CLASS_PARTICIPATION_OPTIONS,
  ASSIGNMENT_SUBMISSION_OPTIONS,
  FIELD_RANGES,
} from '../../constants';

const initialValues = {
  current_age: '',
  gender: '',
  institution_type: '',
  program: '',
  plus_two_gpa: '',
  attendance_percentage: '',
  daily_study_hours: '',
  internal_marks: '',
  external_marks: '',
  attendance_category: '',
  stress_level: '',
  motivation_level: '',
  class_participation: '',
  assignment_submission: '',
  family_monthly_income_npr: '',
};

const validationRules = {
  current_age: { required: true, min: 18, max: 25 },
  attendance_percentage: { required: true, min: 0, max: 100 },
  daily_study_hours: { required: true, min: 0, max: 24 },
};

export const PredictionForm = ({ onPredictionComplete }) => {
  const { values, errors, handleChange, handleBlur, validate, reset } = useForm(
    initialValues,
    validationRules
  );
  const { predictWithSummary, loading, error: predictionError } = usePrediction();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    try {
      // Clean up empty values and convert numeric strings to numbers
      const cleanedData = Object.fromEntries(
        Object.entries(values)
          .filter(([_, v]) => v !== '' && v !== null)
          .map(([k, v]) => {
            // Convert numeric fields
            const numericFields = ['current_age', 'plus_two_gpa', 'attendance_percentage',
              'daily_study_hours', 'internal_marks', 'external_marks', 'family_monthly_income_npr'];
            if (numericFields.includes(k) && v !== '') {
              return [k, parseFloat(v)];
            }
            return [k, v];
          })
      );

      const result = await predictWithSummary(cleanedData);
      if (onPredictionComplete) {
        onPredictionComplete(result, cleanedData);
      }
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-white border-b border-gray-100">
        <CardTitle>Enter Academic Details</CardTitle>
        <p className="text-sm text-gray-500 mt-1">Provide your information to generate a personalized prediction.</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {(submitError || predictionError) && (
            <Alert variant="error" title="Prediction Error">
              {submitError || predictionError}
            </Alert>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Personal & Academic Profile</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input
                 label="Current Age"
                 name="current_age"
                 type="number"
                 placeholder="18-25"
                 value={values.current_age}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={errors.current_age}
                 min={FIELD_RANGES.current_age.min}
                 max={FIELD_RANGES.current_age.max}
                 required
               />
               <Select
                 label="Gender"
                 name="gender"
                 options={GENDER_OPTIONS}
                 value={values.gender}
                 onChange={handleChange}
                 placeholder="Select gender"
               />
               <Select
                 label="Proram"
                 name="program"
                 options={PROGRAM_OPTIONS}
                 value={values.program}
                 onChange={handleChange}
                 placeholder="Select program"
               />
              <Select
                label="Institution Type"
                name="institution_type"
                options={INSTITUTION_TYPE_OPTIONS}
                value={values.institution_type}
                onChange={handleChange}
                placeholder="Select type"
              />
            </div>
          </div>

          {/* Academic Performance */}
          <div className="space-y-4">
             <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Academic History & Performance</h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Input
                 label="+2 GPA"
                 name="plus_two_gpa"
                 type="number"
                 step="0.01"
                 placeholder="0.00 - 4.00"
                 value={values.plus_two_gpa}
                 onChange={handleChange}
                 min={0}
                 max={4}
               />
               <Input
                 label="Internal Marks"
                 name="internal_marks"
                 type="number"
                 placeholder="0 - 100"
                 value={values.internal_marks}
                 onChange={handleChange}
                 min={0}
                 max={100}
               />
               <Input
                 label="External Marks"
                 name="external_marks"
                 type="number"
                 placeholder="0 - 100"
                 value={values.external_marks}
                 onChange={handleChange}
                 min={0}
                 max={100}
               />
             </div>
          </div>

          {/* Study Habits */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Study Habits & Engagement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Attendance Percentage"
                name="attendance_percentage"
                type="number"
                placeholder="0 - 100"
                value={values.attendance_percentage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.attendance_percentage}
                min={0}
                max={100}
                required
              />
              <Input
                label="Daily Study Hours"
                name="daily_study_hours"
                type="number"
                step="0.5"
                placeholder="Hours per day"
                value={values.daily_study_hours}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.daily_study_hours}
                min={0}
                max={24}
                required
              />
              <Select
                label="Class Participation"
                name="class_participation"
                options={CLASS_PARTICIPATION_OPTIONS}
                value={values.class_participation}
                onChange={handleChange}
                placeholder="Select level"
              />
              <Select
                label="Assignment Submission"
                name="assignment_submission"
                options={ASSIGNMENT_SUBMISSION_OPTIONS}
                value={values.assignment_submission}
                onChange={handleChange}
                placeholder="Select frequency"
              />
            </div>
          </div>

          {/* Behavioral Factors */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Well-being & Motivation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Motivation Level"
                name="motivation_level"
                options={MOTIVATION_LEVEL_OPTIONS}
                value={values.motivation_level}
                onChange={handleChange}
                placeholder="Select level"
              />
              <Select
                label="Stress Level"
                name="stress_level"
                options={STRESS_LEVEL_OPTIONS}
                value={values.stress_level}
                onChange={handleChange}
                placeholder="Select level"
              />
            </div>
          </div>

          {/* Optional Background */}
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Family Monthly Income (NPR) - Optional"
                name="family_monthly_income_npr"
                type="number"
                value={values.family_monthly_income_npr}
                onChange={handleChange}
                min={0}
                max={1000000}
                placeholder="Used for scholarship estimation"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-white p-4 border-t border-gray-100 -mx-6 -mb-6 mt-4 z-10">
            <Button 
              variant="outline" 
              onClick={reset} 
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Reset Form
            </Button>
            <Button 
              onClick={handleSubmit} 
              loading={loading}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
            >
              Generate Prediction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
