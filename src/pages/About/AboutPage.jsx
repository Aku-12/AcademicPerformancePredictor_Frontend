import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui';
import { APP_CONFIG } from '../../constants';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          About {APP_CONFIG.APP_NAME}
        </h1>
        <p className="text-gray-600">
          {APP_CONFIG.APP_DESCRIPTION}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-blue max-w-none">
          <p>
            The Academic Performance Predictor is an AI-powered system designed to help
            Computer Science students in Nepal predict their semester GPA and receive
            personalized recommendations for academic improvement.
          </p>
          <p>
            Using advanced machine learning algorithms including XGBoost, LightGBM, and
            Neural Networks, the system analyzes various academic and behavioral factors
            to provide accurate predictions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features Used for Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Academic Factors</h4>
              <ul className="space-y-1 text-gray-600">
                <li>+2 GPA and Stream</li>
                <li>Attendance Percentage</li>
                <li>Internal and External Marks</li>
                <li>Institution Type and Tier</li>
                <li>Program (BSc CSIT, BCA, etc.)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Behavioral Factors</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Daily Study Hours</li>
                <li>Class Participation</li>
                <li>Assignment Submission</li>
                <li>Motivation and Stress Levels</li>
                <li>Learning Style</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technical Readiness</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Prior Programming Experience</li>
                <li>Mathematics Aptitude</li>
                <li>English Proficiency</li>
                <li>Device Ownership</li>
                <li>Internet Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Personal Factors</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Age and Gender</li>
                <li>Family Income</li>
                <li>Parent Education</li>
                <li>Accommodation Type</li>
                <li>Part-time Work Status</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GPA Categories (Nepali Grading System)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="font-medium">Distinction</span>
              <span className="text-gray-500">GPA 3.6 - 4.0</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="font-medium">First Division</span>
              <span className="text-gray-500">GPA 3.2 - 3.59</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-purple-500"></div>
              <span className="font-medium">Second Division</span>
              <span className="text-gray-500">GPA 2.8 - 3.19</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-amber-500"></div>
              <span className="font-medium">Third Division</span>
              <span className="text-gray-500">GPA 2.4 - 2.79</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-red-400"></div>
              <span className="font-medium">Pass</span>
              <span className="text-gray-500">GPA 2.0 - 2.39</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-red-700"></div>
              <span className="font-medium">Fail</span>
              <span className="text-gray-500">GPA below 2.0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-600">
                <li>React 19</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Backend / ML</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Python / Flask</li>
                <li>XGBoost / LightGBM</li>
                <li>PyTorch (GPU Acceleration)</li>
                <li>scikit-learn</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
