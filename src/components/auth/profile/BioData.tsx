import React, { useState } from 'react';
import { ChevronDownIcon } from '@/icons';
import Button from '@/components/ui/button/Button';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';

interface FormData {
  surname: string;
  otherNames: string;
  sex: string;
  placeOfBirth: string;
  dateOfBirth: string;
  decorations: string;
  currentAppointment: string;
  hometownAddress: string;
  presentResidentialAddress: string;
  languages: string[];
  languageFluency: {
    [key: string]: {
      spoken: 'Beginner' | 'Intermediate' | 'Advanced';
      written: 'Beginner' | 'Intermediate' | 'Advanced';
      examQualified: 'Beginner' | 'Intermediate' | 'Advanced';
    };
  };
}

const StaffRecordsForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    surname: 'Oba',
    otherNames: 'Emmanuel',
    sex: '',
    placeOfBirth: '',
    dateOfBirth: '',
    decorations: '',
    currentAppointment: '',
    hometownAddress: '',
    presentResidentialAddress: '',
    languages: [],
    languageFluency: {},
  });

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSexDropdown, setShowSexDropdown] = useState(false);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);

  const sexOptions = ['Male', 'Female', 'Other'];
  const languageOptions = ['English', 'French', 'Spanish', 'German', 'Mandarin', 'Arabic', 'Portuguese'];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLanguageSelection = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleFluencyChange = (language: string, type: 'spoken' | 'written' | 'examQualified', level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setFormData(prev => ({
      ...prev,
      languageFluency: {
        ...prev.languageFluency,
        [language]: {
          ...prev.languageFluency[language],
          [type]: level
        }
      }
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            step === currentStep 
              ? 'bg-blue-600 text-white' 
              : step < currentStep 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-0.5 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepLabels = () => (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-16 text-sm">
        <span className={currentStep === 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Personal Details
        </span>
        <span className={currentStep === 2 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Educational Details
        </span>
        <span className={currentStep === 3 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Family Particulars
        </span>
      </div>
    </div>
  );

  const CustomDropdown: React.FC<{
    placeholder: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }> = ({ placeholder, value, options, onChange, isOpen, setIsOpen }) => (
    <div className="relative">
      <Button
        // type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </Button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <Button
              key={option}
            //   type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Surname
          </Label>
          <Input
            type="text"
            value={formData.surname}
            onChange={(e) => handleInputChange('surname', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Other Names
          </Label>
          <Input
            // type="text"
            value={formData.otherNames}
            onChange={(e) => handleInputChange('otherNames', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Sex
          </Label>
          <CustomDropdown
            placeholder="Select sex"
            value={formData.sex}
            options={sexOptions}
            onChange={(value) => handleInputChange('sex', value)}
            isOpen={showSexDropdown}
            setIsOpen={setShowSexDropdown}
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Other Names
          </Label>
          <Input
            type="text"
            value={formData.otherNames}
            onChange={(e) => handleInputChange('otherNames', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place of Birth
          </label>
          <CustomDropdown
            placeholder="Select Place of Birth"
            value={formData.placeOfBirth}
            options={['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City']}
            onChange={(value) => handleInputChange('placeOfBirth', value)}
            isOpen={showPlaceDropdown}
            setIsOpen={setShowPlaceDropdown}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="Calendar"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decorations
          </label>
          <input
            type="text"
            value={formData.decorations}
            onChange={(e) => handleInputChange('decorations', e.target.value)}
            placeholder="Decorations"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Current Appointment
          </Label>
          <Input
            type="text"
            value={formData.currentAppointment}
            onChange={(e) => handleInputChange('currentAppointment', e.target.value)}
            placeholder="Current Appointment"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hometown Address
        </label>
        <Input 
        //   type="text"
          value={formData.hometownAddress}
          onChange={(e) => handleInputChange('hometownAddress', e.target.value)}
          placeholder="Residential home address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Present Residential Address
        </Label>
        <input
          type="text"
          value={formData.presentResidentialAddress}
          onChange={(e) => handleInputChange('presentResidentialAddress', e.target.value)}
          placeholder="Residential home address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Languages
        </Label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
          >
            <span className="text-gray-400">Select Multiple Languages</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </button>
          {showLanguageDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {languageOptions.map((language) => (
                <label key={language} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(language)}
                    onChange={() => handleLanguageSelection(language)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-3"
                  />
                  {language}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {formData.languages.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Degree of Fluency</h3>
          {formData.languages.map((language) => (
            <div key={language} className="mb-6 last:mb-0">
              <h4 className="text-md font-medium text-gray-800 mb-3">{language}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['spoken', 'written', 'examQualified'].map((type) => (
                  <div key={type}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {type === 'examQualified' ? 'Exam. Qualified' : type}
                    </label>
                    <div className="space-y-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="radio"
                            name={`${language}-${type}`}
                            value={level}
                            checked={formData.languageFluency[language]?.[type as keyof typeof formData.languageFluency[string]] === level}
                            onChange={() => handleFluencyChange(language, type as 'spoken' | 'written' | 'examQualified', level as 'Beginner' | 'Intermediate' | 'Advanced')}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEducationalDetails = () => (
    <div className="text-center py-20">
      <h3 className="text-xl font-medium text-gray-600">Educational Details</h3>
      <p className="text-gray-500 mt-2">This section is under construction</p>
    </div>
  );

  const renderFamilyParticulars = () => (
    <div className="text-center py-20">
      <h3 className="text-xl font-medium text-gray-600">Family Particulars</h3>
      <p className="text-gray-500 mt-2">This section is under construction</p>
    </div>
  );

  const handleSaveAndContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">STAFF RECORDS FORM</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">File.No</span>
              <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">23498632</span>
            </div>
          </div>

          {renderStepIndicator()}
          {renderStepLabels()}

          <div className="mt-8">
            {currentStep === 1 && renderPersonalDetails()}
            {currentStep === 2 && renderEducationalDetails()}
            {currentStep === 3 && renderFamilyParticulars()}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveAndContinue}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffRecordsForm;