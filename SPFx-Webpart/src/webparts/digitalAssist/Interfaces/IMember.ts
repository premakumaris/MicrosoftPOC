export interface IMember {
    '@odata.type': string;
    id: string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation?: any;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
  }