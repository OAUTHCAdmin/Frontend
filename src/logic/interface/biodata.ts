export interface FormData {
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