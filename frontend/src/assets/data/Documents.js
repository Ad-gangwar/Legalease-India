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
};

export default Documents;
