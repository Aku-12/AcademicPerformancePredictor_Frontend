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
  const { predict, predictWithSummary, loading, error: predictionError } = usePrediction();
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
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(submitError || predictionError) && (
            <Alert variant="error" title="Error">
              {submitError || predictionError}
            </Alert>
          )}

          {/* Personal Information */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Age"
                name="current_age"
                type="number"
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
                onBlur={handleBlur}
              />
              <Input
                label="+2 GPA"
                name="plus_two_gpa"
                type="number"
                step="0.01"
                value={values.plus_two_gpa}
                onChange={handleChange}
                min={0}
                max={4}
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Academic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Institution Type"
                name="institution_type"
                options={INSTITUTION_TYPE_OPTIONS}
                value={values.institution_type}
                onChange={handleChange}
              />
              <Select
                label="Program"
                name="program"
                options={PROGRAM_OPTIONS}
                value={values.program}
                onChange={handleChange}
              />
              <Input
                label="Internal Marks"
                name="internal_marks"
                type="number"
                value={values.internal_marks}
                onChange={handleChange}
                min={0}
                max={100}
              />
              <Input
                label="External Marks"
                name="external_marks"
                type="number"
                value={values.external_marks}
                onChange={handleChange}
                min={0}
                max={100}
              />
            </div>
          </div>

          {/* Study Habits */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Study Habits</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Attendance %"
                name="attendance_percentage"
                type="number"
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
                value={values.daily_study_hours}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.daily_study_hours}
                min={0}
                max={24}
                required
              />
              <Select
                label="Attendance Category"
                name="attendance_category"
                options={ATTENDANCE_CATEGORY_OPTIONS}
                value={values.attendance_category}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Behavioral Factors */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Behavioral Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Class Participation"
                name="class_participation"
                options={CLASS_PARTICIPATION_OPTIONS}
                value={values.class_participation}
                onChange={handleChange}
              />
              <Select
                label="Assignment Submission"
                name="assignment_submission"
                options={ASSIGNMENT_SUBMISSION_OPTIONS}
                value={values.assignment_submission}
                onChange={handleChange}
              />
              <Select
                label="Motivation Level"
                name="motivation_level"
                options={MOTIVATION_LEVEL_OPTIONS}
                value={values.motivation_level}
                onChange={handleChange}
              />
              <Select
                label="Stress Level"
                name="stress_level"
                options={STRESS_LEVEL_OPTIONS}
                value={values.stress_level}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Family Background (for scholarship calculation) */}
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Family Background (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Family Monthly Income (NPR)"
                name="family_monthly_income_npr"
                type="number"
                value={values.family_monthly_income_npr}
                onChange={handleChange}
                min={0}
                max={1000000}
                placeholder="e.g., 50000"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button variant="secondary" onClick={reset} disabled={loading}>
          Reset
        </Button>
        <Button onClick={handleSubmit} loading={loading}>
          Predict GPA
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PredictionForm;
