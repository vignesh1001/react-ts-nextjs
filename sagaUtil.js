import {
  professionalExpSlider,
  backSearchSlider,
  availabilitySlider
} from "./constants/dropdown";

export const prepareSaveData = rData => {
  const { data: request } = rData;
  const formData = new FormData();
  const payment = {
    payAmount: request.annualBaseSalary, // w2 benifits
    payRate: request.rate, // Rate
    payRatePeriod: "1.0", //missing
    payType: request.empWorkType, // Radio group (Hourly or Yearly)
    vendorPayType: " ", //missing
    bonusInPercentage: request.annualBonusPct, // w2 benifits
    benifit: request.empBenefits // w2 benifits
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
    if (request.internalDetails && request.internalDetails.length) {
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
  }
  keys.forEach(i => {
    // skip if docId is not having value.
    if (i === "documentId" && !request[fieldMapping[i]]) {
      return;
    }
    formData.append(i, request[fieldMapping[i]]);
  });
  formData.append("source", request.resumeSource);
  formData.append("file", request.candidate_resume[0]);
  formData.append("fileName", request.candidate_resume[0].name);
  formData.append("payment", JSON.stringify(payment));
  formData.append("workAuthorizationForm", request.workAuthForm[0]);
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
    clientName: request.clientName,
    clientContact: request.clientContact
  };
  requestData["location"] = {
    workType: request.location,
    city: request.city,
    state: request.state,
    zip: request.zip,
    country: request.country
  };
  requestData["employmentType"] = request.employeementType;
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
  requestData["recruiters"] = request.recruiters.map(i => i.name);
  if (request.action === "UPDATE") {
    requestData["requisitionNumber"] = request.requisitionNumber;
  }
  if (request.action === "PUBLISH") {
    requestData["requisitionNumber"] = request.requisitionNumber;
    requestData["jobPortal"] = request.jobListingBoard;
  }
  return { jobPosting: [requestData], action: request.action };
};

export const prepareSearchPayload = rData => {
  const { data } = rData;
  const {
    filterSkills,
    filterTitle,
    filterLocation,
    backSearchRange,
    isOnlyActivelyCandidate,
    selectedFilterLegalStatus,
    professionalExpRange,
    selectedFilterJobSites,
    availability
  } = data;
  const title = filterTitle ? filterTitle.value : "";
  const skills = filterSkills ? filterSkills.map(i => i.value).join(",") : "";
  const payLoad = {
    jobTitle: title || undefined,
    skills: skills || undefined,
    fieldName: filterLocation || undefined,
    backSearch: backSearchRange && {
      startMonth: backSearchSlider.find(i => i.value === backSearchRange[0])
        .oValue,
      endMonth: backSearchSlider.find(i => i.value === backSearchRange[1])
        .oValue
    },
    activelyLooking: isOnlyActivelyCandidate ? "yes" : "no",
    legalStatus: selectedFilterLegalStatus,
    professionalExperience: professionalExpRange && {
      startYear: professionalExpSlider.find(
        i => i.value === professionalExpRange[0]
      ).oValue,
      endYear: professionalExpSlider.find(
        i => i.value === professionalExpRange[1]
      ).oValue
    },
    availability: availability && {
      startWeek: 0,
      endWeek: availabilitySlider.find(i => i.value === availability).oValue
    },
    source: selectedFilterJobSites
    //documentId: []
  };
  /*{
    "jobTitle" : "Front End Developer",
    "skills" : "JavaScript,CSS,HTML5,LESS,SASS",
    "fieldName" : "Chicago, IL",
    "backSearch" : {"startMonth" : 1, "endMonth" : 3},
    "activelyLooking" : "yes",
    "legalStatus" : ["US Citizen","Green Card",],
    "professionalExperience" : {"startYear" : 1, "endYear" : 3},
    "availability" : {"startWeek" : 1, "endWeek" : 3},
    "source" : ["Internal Conrep","LinkedIn"],
    "documentId" : ["abcd","xys",]				
  }*/
  return payLoad;
};
