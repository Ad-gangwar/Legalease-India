const Documents = {
  PanCard: [
    {
      category: "Proof of Identity",
      documents: [
        { name: "Aadhar Card" },
        { name: "Passport" },
        { name: "Voter ID" },
        { name: "Driving License" },
        { name: "Ration Card with a photograph" },
      ],
    },
    {
      category: "Proof of Address",
      documents: [
        { name: "Aadhar Card" },
        { name: "Passport" },
        { name: "Voter ID" },
        { name: "Driving License" },
        { name: "Utility bill (electricity, water, or gas bill)" },
        { name: "Bank account statement" },
      ],
    },
    {
      category: "Proof of Date of Birth",
      documents: [
        { name: "Birth certificate" },
        { name: "Passport" },
        { name: "Aadhar card with the date of birth" },
      ],
    },
    {
      category: "Additional Requirement",
      documents: [
        { name: "Recent passport-sized photograph" },
      ],
    },
  ],
  
  PanCardPoints: [
    "Photograph requirement waived for individuals below 18.",
    "Address on the application must match the proof of address.",
    "Sign within the designated space matching supporting documents.",
    "Use Form 49A for Indian citizens, Form 49AA for foreign citizens.",
    "Apply online via official NSDL or UTIITSL websites or at authorized PAN centers.",
    "Your data is secure. We prioritize the protection of your personal information.",
    "Our website ensures a smooth and easy application process.",
  ],

  DeathCertificate: [
    {
      category: "Required Documents",
      documents: [
        { name: "Death report from hospital/medical officer" },
        { name: "Aadhar Card of deceased" },
        { name: "Address proof of deceased" },
        { name: "ID proof of applicant" },
        { name: "Address proof of applicant" },
      ],
    },
    {
      category: "Additional Documents",
      documents: [
        { name: "Marriage certificate (if applicable)" },
        { name: "Birth certificate of deceased" },
        { name: "Affidavit from family member" },
      ],
    },
  ],

  DeathCertificatePoints: [
    "Death must be reported within 21 days of occurrence.",
    "Application can be made by any family member or relative.",
    "Hospital death report is mandatory for institutional deaths.",
    "For home deaths, medical officer's certificate is required.",
    "All documents must be original or attested copies.",
    "Processing time varies from 7-15 working days.",
  ],

  Passport: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Driving License" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills (not older than 2 years)" },
        { name: "Bank statement (last 1 year)" },
        { name: "Rental agreement (if applicable)" },
      ],
    },
    {
      category: "Date of Birth Proof",
      documents: [
        { name: "Birth certificate" },
        { name: "School leaving certificate" },
        { name: "Aadhar card with DOB" },
      ],
    },
    {
      category: "Additional Requirements",
      documents: [
        { name: "Recent passport-sized photographs" },
        { name: "Marriage certificate (if applicable)" },
        { name: "Divorce decree (if applicable)" },
      ],
    },
  ],

  PassportPoints: [
    "Apply online through Passport Seva website.",
    "All documents must be self-attested.",
    "Photographs must meet specific size and quality requirements.",
    "Police verification is mandatory for new passports.",
    "Processing time: 30-45 days for normal applications.",
    "Tatkal service available for urgent requirements.",
  ],

  VoterIdCard: [
    {
      category: "Identity Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Driving License" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank passbook" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Age Proof",
      documents: [
        { name: "Birth certificate" },
        { name: "School certificate" },
        { name: "Aadhar card with DOB" },
      ],
    },
    {
      category: "Additional Documents",
      documents: [
        { name: "Recent passport-sized photograph" },
        { name: "Form 6 (for new voters)" },
      ],
    },
  ],

  VoterIdCardPoints: [
    "Must be 18 years or above to apply.",
    "Apply online through NVSP website.",
    "Form 6 is for new voter registration.",
    "Form 7 is for deletion of name from electoral roll.",
    "Form 8 is for correction of entries.",
    "Processing time: 15-30 days.",
  ],

  DrivingLicense: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Passport" },
        { name: "Voter ID" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Age Proof",
      documents: [
        { name: "Birth certificate" },
        { name: "School certificate" },
        { name: "Aadhar card with DOB" },
      ],
    },
    {
      category: "Additional Requirements",
      documents: [
        { name: "Recent passport-sized photographs" },
        { name: "Medical certificate (Form 1A)" },
        { name: "Learner's license (if applicable)" },
      ],
    },
  ],

  DrivingLicensePoints: [
    "Minimum age: 18 years for private vehicles, 20 years for commercial.",
    "Apply online through Sarathi website.",
    "Medical certificate is mandatory.",
    "Learner's license required before permanent license.",
    "Written test and driving test are mandatory.",
    "Processing time: 30-45 days.",
  ],

  RationCard: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Family Details",
      documents: [
        { name: "Family photograph" },
        { name: "Income certificate" },
        { name: "Caste certificate (if applicable)" },
      ],
    },
  ],

  RationCardPoints: [
    "Apply through state government portal.",
    "Family photograph is mandatory.",
    "Income certificate may be required for some categories.",
    "Caste certificate needed for SC/ST categories.",
    "Processing time varies by state.",
    "One ration card per family.",
  ],

  BirthCertificate: [
    {
      category: "Required Documents",
      documents: [
        { name: "Hospital birth report" },
        { name: "Parent's ID proof" },
        { name: "Parent's address proof" },
        { name: "Marriage certificate of parents" },
      ],
    },
    {
      category: "Additional Documents",
      documents: [
        { name: "Affidavit (if hospital report not available)" },
        { name: "Witness statements" },
        { name: "School certificate (for delayed registration)" },
      ],
    },
  ],

  BirthCertificatePoints: [
    "Must be registered within 21 days of birth.",
    "Hospital birth report is preferred document.",
    "Delayed registration possible with additional documents.",
    "Apply online through state government portal.",
    "Processing time: 7-15 working days.",
    "Free registration within 21 days.",
  ],

  MarriageCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card of both parties" },
        { name: "PAN Card of both parties" },
        { name: "Passport of both parties" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
      ],
    },
    {
      category: "Age Proof",
      documents: [
        { name: "Birth certificate" },
        { name: "School certificate" },
        { name: "Aadhar card with DOB" },
      ],
    },
    {
      category: "Marriage Details",
      documents: [
        { name: "Marriage invitation card" },
        { name: "Marriage photographs" },
        { name: "Witness statements" },
        { name: "Affidavit of marriage" },
      ],
    },
  ],

  MarriageCertificatePoints: [
    "Both parties must be present during application.",
    "Minimum age: 18 years for bride, 21 years for groom.",
    "Apply within 30 days of marriage for best results.",
    "Witness statements are mandatory.",
    "Processing time: 15-30 days.",
    "Registration is mandatory for all marriages.",
  ],

  CasteCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Caste Proof",
      documents: [
        { name: "Parent's caste certificate" },
        { name: "Grandparent's caste certificate" },
        { name: "School certificate mentioning caste" },
        { name: "Village panchayat certificate" },
      ],
    },
  ],

  CasteCertificatePoints: [
    "Apply through state government portal.",
    "Caste certificate of parents/grandparents is preferred.",
    "Village panchayat certificate may be required.",
    "Processing time: 30-45 days.",
    "Certificate is valid for lifetime.",
    "Required for reservation benefits.",
  ],

  IncomeCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Income Proof",
      documents: [
        { name: "Salary certificate" },
        { name: "Income tax returns" },
        { name: "Bank statements (last 6 months)" },
        { name: "Property documents" },
      ],
    },
  ],

  IncomeCertificatePoints: [
    "Apply through state government portal.",
    "Income proof of last 3 years required.",
    "Certificate valid for 1 year.",
    "Processing time: 15-30 days.",
    "Required for various government schemes.",
    "All family members' income considered.",
  ],

  DomicileCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Residence Proof",
      documents: [
        { name: "School certificates" },
        { name: "Property documents" },
        { name: "Voter ID of parents" },
        { name: "Affidavit of residence" },
      ],
    },
  ],

  DomicileCertificatePoints: [
    "Apply through state government portal.",
    "Residence proof of 15 years required.",
    "Certificate valid for lifetime.",
    "Processing time: 30-45 days.",
    "Required for educational reservations.",
    "Parent's residence may be considered.",
  ],

  SeniorCitizenCard: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Age Proof",
      documents: [
        { name: "Birth certificate" },
        { name: "School certificate" },
        { name: "Aadhar card with DOB" },
      ],
    },
    {
      category: "Additional Requirements",
      documents: [
        { name: "Recent passport-sized photograph" },
        { name: "Medical certificate (if required)" },
      ],
    },
  ],

  SeniorCitizenCardPoints: [
    "Minimum age: 60 years.",
    "Apply through state government portal.",
    "Card provides various benefits and discounts.",
    "Processing time: 15-30 days.",
    "Valid for lifetime.",
    "Required for senior citizen benefits.",
  ],

  DisabilityCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Medical Documents",
      documents: [
        { name: "Medical certificate from government hospital" },
        { name: "Disability assessment report" },
        { name: "Treatment records" },
        { name: "Recent passport-sized photograph" },
      ],
    },
  ],

  DisabilityCertificatePoints: [
    "Medical certificate from government hospital mandatory.",
    "Disability assessment by authorized medical board.",
    "Processing time: 30-60 days.",
    "Certificate valid for lifetime.",
    "Required for disability benefits.",
    "Reassessment may be required in some cases.",
  ],

  CharacterCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Additional Requirements",
      documents: [
        { name: "Recent passport-sized photograph" },
        { name: "Police verification report" },
        { name: "Affidavit of good character" },
        { name: "Reference letters" },
      ],
    },
  ],

  CharacterCertificatePoints: [
    "Apply through local police station or online portal.",
    "Police verification is mandatory.",
    "Processing time: 15-30 days.",
    "Valid for 6 months to 1 year.",
    "Required for government jobs and visas.",
    "Reference letters may be required.",
  ],

  HealthInsuranceCard: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Medical Documents",
      documents: [
        { name: "Medical certificate" },
        { name: "Recent passport-sized photograph" },
        { name: "Income certificate" },
        { name: "Bank account details" },
      ],
    },
  ],

  HealthInsuranceCardPoints: [
    "Apply through government health schemes portal.",
    "Medical certificate may be required.",
    "Processing time: 15-30 days.",
    "Provides cashless treatment benefits.",
    "Annual renewal may be required.",
    "Coverage varies by scheme.",
  ],

  EducationCertificates: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Educational Documents",
      documents: [
        { name: "Previous academic records" },
        { name: "School/college certificates" },
        { name: "Recent passport-sized photograph" },
        { name: "Transfer certificate (if applicable)" },
      ],
    },
  ],

  EducationCertificatesPoints: [
    "Apply through respective education board portal.",
    "Previous academic records required.",
    "Processing time: 30-45 days.",
    "Duplicate certificates available for lost ones.",
    "Verification may be required.",
    "Fees vary by board and certificate type.",
  ],

  TransferCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Academic Documents",
      documents: [
        { name: "Previous school records" },
        { name: "Admission form" },
        { name: "Recent passport-sized photograph" },
        { name: "Parent's ID proof" },
      ],
    },
  ],

  TransferCertificatePoints: [
    "Apply through school administration.",
    "Clearance of all dues required.",
    "Processing time: 7-15 days.",
    "Required for admission to new school.",
    "Academic records must be up to date.",
    "Parent's consent required for minors.",
  ],

  BonafideCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Academic Documents",
      documents: [
        { name: "Student ID card" },
        { name: "Fee receipt" },
        { name: "Recent passport-sized photograph" },
        { name: "Parent's ID proof" },
      ],
    },
  ],

  BonafideCertificatePoints: [
    "Apply through school/college administration.",
    "Student must be currently enrolled.",
    "Processing time: 3-7 days.",
    "Required for various purposes.",
    "Fee clearance may be required.",
    "Valid for current academic year.",
  ],

  ScholarshipCertificates: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Academic Documents",
      documents: [
        { name: "Previous year mark sheets" },
        { name: "Income certificate" },
        { name: "Caste certificate (if applicable)" },
        { name: "Recent passport-sized photograph" },
      ],
    },
    {
      category: "Bank Details",
      documents: [
        { name: "Bank passbook" },
        { name: "IFSC code" },
        { name: "Account number" },
      ],
    },
  ],

  ScholarshipCertificatesPoints: [
    "Apply through government scholarship portal.",
    "Academic performance criteria apply.",
    "Income certificate mandatory.",
    "Processing time: 30-60 days.",
    "Annual renewal required.",
    "Direct benefit transfer to bank account.",
  ],

  Affidavits: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Additional Requirements",
      documents: [
        { name: "Recent passport-sized photograph" },
        { name: "Supporting documents for affidavit purpose" },
        { name: "Witness statements" },
      ],
    },
  ],

  AffidavitsPoints: [
    "Apply through notary public or court.",
    "Specific format required based on purpose.",
    "Witness signatures mandatory.",
    "Processing time: 1-3 days.",
    "Fees vary by notary and purpose.",
    "Legal consultation may be required.",
  ],

  NotarizedDocuments: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Documents to be Notarized",
      documents: [
        { name: "Original documents" },
        { name: "Recent passport-sized photograph" },
        { name: "Witness ID proof" },
      ],
    },
  ],

  NotarizedDocumentsPoints: [
    "Visit authorized notary public.",
    "Original documents required.",
    "Witness may be required.",
    "Processing time: Same day.",
    "Fees vary by document type.",
    "Notarization adds legal validity.",
  ],

  RentAgreement: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card of both parties" },
        { name: "PAN Card of both parties" },
        { name: "Voter ID of both parties" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
      ],
    },
    {
      category: "Property Documents",
      documents: [
        { name: "Property ownership documents" },
        { name: "Recent passport-sized photographs" },
        { name: "Witness statements" },
      ],
    },
  ],

  RentAgreementPoints: [
    "Both landlord and tenant must be present.",
    "Property ownership proof required.",
    "Witness signatures mandatory.",
    "Processing time: 1-3 days.",
    "Registration may be required.",
    "Legal consultation recommended.",
  ],

  PensionCard: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Employment Documents",
      documents: [
        { name: "Service certificate" },
        { name: "Retirement order" },
        { name: "Recent passport-sized photograph" },
        { name: "Bank account details" },
      ],
    },
  ],

  PensionCardPoints: [
    "Apply through government pension portal.",
    "Service certificate mandatory.",
    "Processing time: 30-60 days.",
    "Direct benefit transfer to bank account.",
    "Annual life certificate required.",
    "Pension amount varies by service.",
  ],

  PropertyDocuments: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Property Details",
      documents: [
        { name: "Existing property documents" },
        { name: "Survey records" },
        { name: "Recent passport-sized photograph" },
        { name: "Witness statements" },
      ],
    },
  ],

  PropertyDocumentsPoints: [
    "Apply through local revenue office.",
    "Existing property documents required.",
    "Survey and verification mandatory.",
    "Processing time: 30-90 days.",
    "Legal consultation recommended.",
    "Registration fees applicable.",
  ],

  VehicleRegistrationCertificate: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Vehicle Documents",
      documents: [
        { name: "Invoice from dealer" },
        { name: "Insurance certificate" },
        { name: "PUC certificate" },
        { name: "Recent passport-sized photograph" },
      ],
    },
  ],

  VehicleRegistrationCertificatePoints: [
    "Apply through RTO office or online portal.",
    "Vehicle must be purchased from authorized dealer.",
    "Insurance and PUC mandatory.",
    "Processing time: 15-30 days.",
    "Registration fees applicable.",
    "Vehicle inspection may be required.",
  ],

  IncomeTaxReturns: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Income Documents",
      documents: [
        { name: "Salary certificates" },
        { name: "Bank statements" },
        { name: "Investment proofs" },
        { name: "Previous year ITR" },
      ],
    },
  ],

  IncomeTaxReturnsPoints: [
    "File online through Income Tax portal.",
    "All income sources must be declared.",
    "Deadline: July 31st for individuals.",
    "Processing time: 15-30 days.",
    "E-verification required.",
    "Keep documents for 6 years.",
  ],

  LoanDocuments: [
    {
      category: "Identity Documents",
      documents: [
        { name: "Aadhar Card" },
        { name: "PAN Card" },
        { name: "Voter ID" },
        { name: "Passport" },
      ],
    },
    {
      category: "Address Proof",
      documents: [
        { name: "Aadhar Card" },
        { name: "Utility bills" },
        { name: "Bank statement" },
        { name: "Rental agreement" },
      ],
    },
    {
      category: "Income Documents",
      documents: [
        { name: "Salary certificates" },
        { name: "Bank statements (6 months)" },
        { name: "Income tax returns" },
        { name: "Recent passport-sized photograph" },
      ],
    },
  ],

  LoanDocumentsPoints: [
    "Apply through bank or financial institution.",
    "Income and credit score verification.",
    "Processing time: 7-30 days.",
    "Interest rates vary by loan type.",
    "Collateral may be required.",
    "Legal consultation recommended.",
  ],

  fees: 150
};

export default Documents;
