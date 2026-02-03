import { Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { APP_CONFIG } from '../constants';

export const AboutSection = () => {
  return (
    <section id="about" className="py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          About {APP_CONFIG.APP_NAME}
        </h2>
        <p className="text-gray-500 mt-1 max-w-2xl mx-auto">
          {APP_CONFIG.APP_DESCRIPTION}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Academic Factors</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    +2 GPA and Stream
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Attendance Percentage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Internal and External Marks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Institution Type and Tier
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Program (BSc CSIT, BCA, etc.)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Behavioral Factors</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Daily Study Hours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Class Participation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Assignment Submission
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Motivation and Stress Levels
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Learning Style
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Technical Readiness</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Prior Programming Experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Mathematics Aptitude
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    English Proficiency
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Device Ownership
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Internet Access
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Personal Factors</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Age and Gender
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Family Income
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Parent Education
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Accommodation Type
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Part-time Work Status
                  </li>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="text-center p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="font-semibold text-emerald-700">Distinction</p>
                <p className="text-xs text-emerald-600 mt-1">3.6 - 4.0</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="font-semibold text-blue-700">First</p>
                <p className="text-xs text-blue-600 mt-1">3.2 - 3.59</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-violet-50 border border-violet-100">
                <p className="font-semibold text-violet-700">Second</p>
                <p className="text-xs text-violet-600 mt-1">2.8 - 3.19</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="font-semibold text-amber-700">Third</p>
                <p className="text-xs text-amber-600 mt-1">2.4 - 2.79</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-100">
                <p className="font-semibold text-orange-700">Pass</p>
                <p className="text-xs text-orange-600 mt-1">2.0 - 2.39</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-rose-50 border border-rose-100">
                <p className="font-semibold text-rose-700">Fail</p>
                <p className="text-xs text-rose-600 mt-1">&lt; 2.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">React 19</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Vite</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Tailwind CSS</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Recharts</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Backend / ML</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Python</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Flask</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">XGBoost</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">LightGBM</span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">PyTorch</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
