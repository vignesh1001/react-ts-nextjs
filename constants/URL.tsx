// eslint-disable-next-line no-undef
let baseURL = process.env.BASEURL;
const URLS = {
  loadJobListing: baseURL + "/V1/candidatejobrequisition",
  loadCandidates: baseURL + "/V1/candidate/search",
  uploadResume: baseURL + "/V1/candidateprofileupload",
  saveCandidate: baseURL + "/V2/candidate",
  saveJobListing: baseURL + "/V1/candidatejobrequisition",
  getInternalDetails: baseURL + "/V1/candidatejobrequisition",
  closeRequisition: baseURL + "/V1/candidatejobrequisition"
};

export default URLS;
