"use client"
import React, { useState, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Download,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe
} from 'lucide-react';

// --- Components ---

const InputGroup = ({ label, children, optional = false }: { label?: any, children?: any, optional?: boolean }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {optional && <span className="text-slate-400 text-xs">(Optional)</span>}
    </label>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }: { icon?: any, title?: any, subtitle?: any }) => (
  <div className="mb-6 border-b pb-2">
    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-600" />
      {title}
    </h2>
    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

interface ExperienceItem {
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

interface QulificationItem {
  school: string;
  degree: string;
  year: string;
}

interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
  };
  Description: string;
  experience: ExperienceItem[];
  Qulification: QulificationItem[];
  skills: string;
}

export default function App() {
  const [step, setStep] = useState(1);

  // Initial State
  const [resumeData, setResumeData] = useState<any>({
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: ''
    },
    Description: '',
    experience: [],
    Qulification: [],
    skills: ''
  });

  // Handlers
  const handlePersonalChange = (e: any) => {
    const { name, value } = e.target;
    setResumeData((prev: any) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handleSimpleChange = (field: any, value: any) => {
    setResumeData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Dynamic List Handlers (Experience/Qulification)
  const addItem = (section: any, initialItem: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], initialItem]
    }));
  };

  const updateItem = (section: any, index: any, field: any, value: any) => {
    const newItems = [...resumeData[section]];
    newItems[index] = { ...newItems[index], [field]: value };
    setResumeData((prev: any) => ({ ...prev, [section]: newItems }));
  };

  const removeItem = (section: any, index: any) => {
    const newItems = resumeData[section].filter((_:any, i: any) => i !== index);
    setResumeData((prev: any) => ({ ...prev, [section]: newItems }));
  };

  // Print Functionality
  const handlePrint = () => {
    window.print();
  };

  // Step Content Configuration
  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Description", icon: FileText },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Qulification", icon: GraduationCap },
    { id: 5, title: "Skills", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* --- Top Navigation Bar (Hidden when printing) --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
              ResumeFlow
            </h1>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Save PDF
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">

        {/* --- LEFT COLUMN: INPUT FORM (Hidden when printing) --- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 print:hidden h-fit">

          {/* Progress Stepper */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            <div className="flex items-center min-w-max">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center">
                  <div
                    onClick={() => setStep(s.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all
                      ${step === s.id ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-slate-500 hover:bg-slate-50'}
                    `}
                  >
                    <s.icon className={`w-4 h-4 ${step === s.id ? 'fill-blue-200' : ''}`} />
                    <span className="text-sm font-medium">{s.title}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-8 h-px bg-slate-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">

            <div className="grow">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="animate-fadeIn">
                  <SectionTitle icon={User} title="Personal Information" subtitle="Let's start with your basics." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Full Name">
                      <input
                        type="text"
                        name="fullName"
                        value={resumeData.personal.fullName}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="John Doe"
                      />
                    </InputGroup>
                    <InputGroup label="Job Title">
                      <input
                        type="text"
                        name="jobTitle"
                        value={resumeData.personal.jobTitle}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="Software Engineer"
                      />
                    </InputGroup>
                    <InputGroup label="Email">
                      <input
                        type="email"
                        name="email"
                        value={resumeData.personal.email}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="john@example.com"
                      />
                    </InputGroup>
                    <InputGroup label="Phone">
                      <input
                        type="tel"
                        name="phone"
                        value={resumeData.personal.phone}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </InputGroup>
                    <InputGroup label="Location">
                      <input
                        type="text"
                        name="location"
                        value={resumeData.personal.location}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="New York, NY"
                      />
                    </InputGroup>
                    <InputGroup label="LinkedIn (Optional)" optional>
                      <input
                        type="text"
                        name="linkedin"
                        value={resumeData.personal.linkedin}
                        onChange={handlePersonalChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </InputGroup>
                  </div>
                </div>
              )}

              {/* Step 2: Description */}
              {step === 2 && (
                <div className="animate-fadeIn">
                  <SectionTitle icon={FileText} title="Professional Description" subtitle="2-3 sentences about your career goals." />
                  <InputGroup label="Description">
                    <textarea
                      rows={6}
                      value={resumeData.Description}
                      onChange={(e) => handleSimpleChange('Description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 resize-none"
                      placeholder="Experienced professional with a proven track record in..."
                    />
                  </InputGroup>
                </div>
              )}

              {/* Step 3: Experience */}
              {step === 3 && (
                <div className="animate-fadeIn">
                  <SectionTitle icon={Briefcase} title="Experience" subtitle="Add your relevant work history. This section is optional." />

                  {resumeData.experience.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <p className="text-slate-500 mb-4">No experience added yet.</p>
                      <button
                        onClick={() => addItem('experience', { title: '', company: '', start: '', end: '', description: '' })}
                        className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <Plus className="w-4 h-4" /> Add First Job
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.experience.map((exp: any, idx: any) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                          <button
                            onClick={() => removeItem('experience', idx)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              placeholder="Job Title"
                              className="px-3 py-2 border rounded bg-white text-sm"
                              value={exp.title}
                              onChange={(e) => updateItem('experience', idx, 'title', e.target.value)}
                            />
                            <input
                              placeholder="Company"
                              className="px-3 py-2 border rounded bg-white text-sm"
                              value={exp.company}
                              onChange={(e) => updateItem('experience', idx, 'company', e.target.value)}
                            />
                            <input
                              placeholder="Start Date"
                              className="px-3 py-2 border rounded bg-white text-sm"
                              value={exp.start}
                              onChange={(e) => updateItem('experience', idx, 'start', e.target.value)}
                            />
                            <input
                              placeholder="End Date (or Present)"
                              className="px-3 py-2 border rounded bg-white text-sm"
                              value={exp.end}
                              onChange={(e) => updateItem('experience', idx, 'end', e.target.value)}
                            />
                          </div>
                          <textarea
                            placeholder="Description of responsibilities..."
                            rows={3}
                            className="w-full px-3 py-2 border rounded bg-white text-sm resize-none"
                            value={exp.description}
                            onChange={(e) => updateItem('experience', idx, 'description', e.target.value)}
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => addItem('experience', { title: '', company: '', start: '', end: '', description: '' })}
                        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Another Job
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Qulification */}
              {step === 4 && (
                <div className="animate-fadeIn">
                  <SectionTitle icon={GraduationCap} title="Qulification" subtitle="Your academic background." />

                  {resumeData.Qulification.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <button
                        onClick={() => addItem('Qulification', { school: '', degree: '', year: '' })}
                        className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <Plus className="w-4 h-4" /> Add Qulification
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeData.Qulification.map((edu: any, idx: any) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                          <button
                            onClick={() => removeItem('Qulification', idx)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 gap-3">
                            <input
                              placeholder="School / University"
                              className="w-full px-3 py-2 border rounded bg-white text-sm"
                              value={edu.school}
                              onChange={(e) => updateItem('Qulification', idx, 'school', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                placeholder="Degree"
                                className="px-3 py-2 border rounded bg-white text-sm"
                                value={edu.degree}
                                onChange={(e) => updateItem('Qulification', idx, 'degree', e.target.value)}
                              />
                              <input
                                placeholder="Graduation Year"
                                className="px-3 py-2 border rounded bg-white text-sm"
                                value={edu.year}
                                onChange={(e) => updateItem('Qulification', idx, 'year', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => addItem('Qulification', { school: '', degree: '', year: '' })}
                        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Another School
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Skills */}
              {step === 5 && (
                <div className="animate-fadeIn">
                  <SectionTitle icon={Wrench} title="Skills" subtitle="List your key skills separated by commas." />
                  <InputGroup label="Skills">
                    <textarea
                      rows={6}
                      value={resumeData.skills}
                      onChange={(e) => handleSimpleChange('skills', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 resize-none"
                      placeholder="React, JavaScript, Project Management, Public Speaking..."
                    />
                    <p className="text-xs text-slate-500 mt-2">Tip: Separate each skill with a comma.</p>
                  </InputGroup>
                </div>
              )}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={() => setStep(s => Math.min(steps.length, s + 1))}
                disabled={step === steps.length}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md shadow-blue-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* --- RIGHT COLUMN: PREVIEW (Visible in Print) --- */}
        <div className="w-full lg:w-1/2">
          <div className="bg-slate-800 rounded-xl p-1 shadow-2xl print:shadow-none print:p-0 print:bg-white print:w-full">

            {/* Toolbar above preview */}
            <div className="h-8 flex items-center gap-2 px-3 print:hidden">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs ml-2">Live Preview (Modern Professional)</span>
            </div>

            {/* The Resume Paper */}
            <div
              id="resume-preview"
              className="bg-white min-h-[850px] w-full p-10 md:p-14 print:p-0 print:min-h-0 text-slate-900 font-serif"
            >

              {/* Header: Classic Center Layout */}
              <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">
                  {resumeData.personal.fullName || "YOUR NAME"}
                </h1>
                <p className="text-lg text-slate-600 italic font-medium mb-3">
                  {resumeData.personal.jobTitle || "Professional Title"}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 font-medium">
                  {resumeData.personal.location && (
                    <span>{resumeData.personal.location}</span>
                  )}
                  {resumeData.personal.phone && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>{resumeData.personal.phone}</span>
                    </>
                  )}
                  {resumeData.personal.email && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>{resumeData.personal.email}</span>
                    </>
                  )}
                  {resumeData.personal.linkedin && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>{resumeData.personal.linkedin}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              {resumeData.Description && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">Professional Profile</h3>
                  <p className="text-sm leading-relaxed text-slate-800">{resumeData.Description}</p>
                </div>
              )}

              {/* Experience */}
              {(resumeData.experience.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-4">Professional Experience</h3>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp: any, idx: any) => (
                      <div key={idx}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-lg text-slate-900">{exp.company}</h4>
                          <span className="text-sm font-medium text-slate-500">{exp.title}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm italic text-slate-700 font-semibold">{exp.title}</span>
                          <span className="text-sm italic text-slate-500 whitespace-nowrap">{exp.start} – {exp.end}</span>
                        </div>
                        <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line pl-1">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Qulification */}
              {(resumeData.Qulification.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-4">Qulification</h3>
                  <div className="space-y-4">
                    {resumeData.Qulification.map((edu: any, idx: any) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900">{edu.school}</h4>
                          <p className="text-sm text-slate-700 italic">{edu.degree}</p>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">Key Skills</h3>
                  <div className="text-sm leading-relaxed text-slate-800">
                    {resumeData.skills.split(',').map((s: any) => s.trim()).join(' • ')}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Styles for Printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 2.5rem !important; /* Standard print margin */
            box-shadow: none;
            min-height: 100vh;
            font-size: 11pt; /* Optimal print font size */
          }
          @page {
            margin: 0;
            size: auto;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}