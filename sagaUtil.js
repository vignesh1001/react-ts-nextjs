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
    fullName: "fullName",
    phone: "phone",
    city: "city",
    state: "state",
    zip: "zip",
    country: "country",
    immigrationStatus: "immigrationStatus",
    ssn: "SSN",
    dateOfBirth: "dob",
    employmentType: "employmentType",
    availability: "availability",
    securityClearance: "securityClearance",
    travelPreferences: "travelPreferences",
    openToRelocate: "openToRelocate",
    positionTitle: "positionTitle",
    professionalExperience: "professionalExperience",
    additionalNotes: "additionalNotes",
    primarySkills: "primarySkills",
    otherSkills: "otherSkills",
    yearOfCompletion: "yearOfCompletion",
    educations: "educations",
    certifications: "certifications",
    references: "references",
    salesLead: "salesLead",
    recruitingLead: "recruitingLead",
    action: "action",
    documentId: "documentId",
    requisitionNumber: "requisitionNumber"
  };
  var keys = Object.keys(fieldMapping);
  if (request.action === "SAVE") {
    ["documentId", "recruitingLead", "salesLead"].forEach(i => {
      keys.splice(keys.indexOf(i), 1);
    });
  } else if (request.action === "SUBMIT") {
    const selectedInternalDetails = request.internalDetails.find(
      i => i.requisitionNumber === request.requisitionNumber
    );
    formData.append(
      "salesLeadsEmail",
      selectedInternalDetails.internalDetails.salesLeadsEmail
    );
    formData.append(
      "recruitingLeadsEmail",
      selectedInternalDetails.internalDetails.recruitingLeadsEmail
    );
  }
  keys.forEach(i => {
    formData.append(i, request[fieldMapping[i]]);
  });

  formData.append("file", request.candidate_resume[0]);
  formData.append("fileName", request.candidate_resume[0].name);
  formData.append("payment", JSON.stringify(payment));
  formData.append("workAuthorizationForm", request.workAuthForm[0]);
  //formData.append("", request.annualBaseSalary );// missing
  //formData.append("", request.annualBonusPct );// missing
  //formData.append("", request.empBenefits);// missing
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
  return formData;
};

export const prepareSaveJOBListingData = rData => {
  const { data: request } = rData;
  const requestData = {};
  requestData["numberOfPositions"] = request.noOfPosition;
  requestData["priority"] = request.priority;
  requestData["clientInfo"] = {
    clinetName: request.clientName,
    clientContact: request.clientContact
  };
  requestData["location"] = {
    workType: request.location,
    city: request.city,
    state: request.state,
    zip: request.zip,
    country: request.country
  };
  requestData["employmentType"] = request.employmentType;
  requestData["duration"] = request.duration;
  requestData["compensationDetails"] = {
    wages: request.rateBy,
    clientBillRate: request.clientBillRate,
    payRate: request.payRate
  };
  requestData["positionDetails"] = {
    positionTitle: request.positionTitle,
    skills: request.skills,
    requirementDescription: request.requirementDescription,
    workAuthorizationStatus: request.workAuthorizationStatus,
    securityClearanceLevel: request.securityClearanceLevel
  };
  requestData["internalDetails"] = {
    internalContact: request.internalContact,
    coOrdinator: request.coordinator,
    recruitingLead: request.recruitingLead,
    salesLead: request.salesLead,
    recruitingLeadsEmail: request.recruitingLeadsEmail,
    salesLeadsEmail: request.salesLeadsEmail
  };
  //requestData["recruiters"] = ["Jay", "Chandra"]; //request.recruiters.join(",");

  if (request.action === "PUBLISH") {
    requestData["requisitionNumber"] = request.requisitionNumber;
    requestData["jobPortal"] = request.jobListingBoard; //["dice", "glassdoor", "monster"];
  }
  return { jobPosting: [requestData], action: request.action };
};
