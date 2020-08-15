export const prepareSaveData = rData => {
  const { data: request } = rData;
  const formData = new FormData();
  const payment = {
    payAmount: request.annualBaseSalary,
    payRate: request.rate,
    payRatePeriod: "1.0",
    payType: request.empWorkType,
    vendorPayType: " ",
    bonusInPercentage: request.annualBonusPct,
    benifit: request.empBenefits
  };
  const fieldMapping = {
    fullName,
    phone,
    city,
    state,
    zip,
    country,
    immigrationStatus,
    ssn: "SSN",
    dateOfBirth: "dob",
    employmentType,
    availability,
    securityClearance,
    travelPreferences,
    openToRelocate,
    positionTitle,
    professionalExperience,
    additionalNotes,
    primarySkills,
    otherSkills,
    yearOfCompletion,
    educations,
    certifications,
    references,
    salesManager: "salesLead",
    recruitingManager: "recruittingLead"
  };
  var keys = Object.keys(fieldMapping);
  keys.forEach(i => {
    formData.append(i, fieldMapping[i]);
  });
  formData.append("file", request.candidate_resume[0]);
  formData.append("fileName", request.candidate_resume[0].name);
  formData.append("payment", payment);
  formData.append("workAuthorizationForm", request.workAuthForm[0]);
  //formData.append("", request.annualBaseSalary );// missing
  //formData.append("", request.annualBonusPct );// missing
  //formData.append("", request. empBenefits);// missing
  //formData.append("", request.empWorkType );// missing
  //formData.append("", request.rate );// missing
  const references = [];
  request.references.forEach(
    ({ fullName, position, relationship, email, phone }) => {
      references.push({
        fullName,
        position,
        relationship,
        communication: { email, phone }
      });
    }
  );
  // formData.append("", request.submitToRequirement ); // missing
  return formData;
};

export const prepareSaveJOBListingData = rData => {
  const { data: request } = rData;
  const formData = new FormData();
  formData.append("requisitionNumber", request.requisitionNo);
  formData.append("numberOfPositions", request.noOfPosition);
  formData.append("priority", request.priority);
  formData.append("clientInfo", {
    clinetName: request.clientName,
    clientContact: request.clientContact
  });
  formData.append("location", {
    workType: request.location,
    city: request.city,
    state: request.state,
    zip: request.zip,
    country: request.country
  });
  formData.append("employmentType", request.employmentType);
  formData.append("duration", request.duration);
  formData.append("compensationDetails", {
    wages: request.rateBy,
    clientBillRate: request.clientBillRate,
    payRate: request.payRate
  });
  formData.append("positionDetails", {
    positionTitle: request.positionTitle,
    skills: request.skills,
    requirementDescription: request.requirementDescription,
    workAuthorizationStatus: request.workAuthorizationStatus,
    securityClearanceLevel: request.securityClearanceLevel
  });
  formData.append("internalDetails", {
    internalContact: request.internalContact,
    coOrdinator: request.coordinator,
    recruitingLead: request.recruitingLead,
    salesLead: request.salesLead
  });
  formData.append("recruiters", request.recruiters.join(","));
  formData.append("action", "ADD");
  //     {
  //   "requisitionNumber": "15",
  //   "numberOfPositions": "1",
  //   "priority": "high",
  //   "clientInfo": {"clinetName": "Peterson Technology partners", "clientContact" : "999-999-9999"},
  //   "location" : {"workType" : "onsite/remote", "city" : "chicago", "state" : "illinois", "zip" : "60169", "country" : "USA"},
  //   "employmentType" : "Fulltime/ContractContract to Hire",
  //   "duration" : "",
  //   "compensationDetails" : {"wages" : "Annualy", "clientBillRate" : "", "payRate" : ""},
  //   "positionDetails" : {"positionTitle" : "", "skills" : "", "requirementDescription" : "", "workAuthorizationStatus"  : "", "securityClearanceLevel" : ""},
  //   "internalDetails" : {"internalContact" : "", "coOrdinator" : "", "recruitingLead" : "", "salesLead": ""},
  //   "recruiters" : ["nick","jay"],
  //   "action" : "ADD"
  // }
  return formData;
};
