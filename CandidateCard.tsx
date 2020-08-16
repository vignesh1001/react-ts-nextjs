import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Chip,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper
} from "@material-ui/core";
import {
  Person as PersonIcon,
  LinkedIn as LinkedInIcon
} from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "5px"
  },
  general: {
    position: "relative",
    paddingLeft: theme.spacing(9),
    flexBasis: "350px"
  },
  avatar: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  skills: {
    flex: "1 0 0px",
    display: "flex",
    flexDirection: "column"
  },
  skillsHeader: {
    flex: "1"
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  chipsStyle: {
    backgroundColor: "#83cff6",
    borderRadius: 5
  },
  other: {
    border: "none",
    flexBasis: "260px",
    paddingBottom: theme.spacing(6.5)
  },
  scoreIcon: {
    color: "#000",
    fontSize: 21,
    marginBottom: theme.spacing(0.25),
    width: 44,
    height: 44,
    borderRadius: 5,
    border: "solid 2px #417505",
    backgroundColor: "#bffd7a",
    '& [class*="MuiChip-label-"]': {
      padding: 0
    }
  },
  expansionPanel: {
    width: "100%",
    position: "relative",
    padding: "0",
    border: "none"
  },
  expansionPanelSummary: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    padding: "0",
    "& > div": {
      margin: "0"
    },
    '& span[class*="MuiButton-label"]::before': {
      content: "'View More'"
    },
    '& .Mui-expanded span[class*="MuiButton-label"]::before': {
      content: "'View Less'"
    },
    "& .Mui-expanded": {
      margin: 0
    },
    minHeight: "initial"
  },
  expansionPanelDetails: {
    display: "flex",
    flexDirection: "row"
  },
  firstTab: {
    flexBasis: "350px",
    paddingLeft: theme.spacing(7)
  },
  secondTab: {
    flex: "1 0 0px"
  },
  thirdTab: {
    flexBasis: "260px",
    textAlign: "right",
    paddingBottom: theme.spacing(6.5)
  }
}));

export default function CandidateCard(props) {
  const classes = useStyles();
  const { _source } = props;
  // const elements = [
  //   "Javascript",
  //   "HTML",
  //   "CSS",
  //   "Material UI",
  //   "React",
  //   "Next.js",
  //   "Immutable",
  //   "Redux",
  //   "Saga",
  //   "Axios",
  // ];

  return (
    <TableRow
      key={props.name}
      className={`${
        classes.card
      } MuiPaper-root MuiPaper-rounded MuiPaper-outlined MuiPaper-elevation3`}
    >
      <TableCell style={{ border: "none" }} className={classes.general}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          {_source.fullName}
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          {_source.address.city}, {_source.address.state}
        </Typography>

        <Link
          style={{ display: "block", marginBottom: "4px" }}
          href={`tel:${_source.communication.phone}`}
        >
          {_source.communication.phone}
        </Link>
        <Link
          style={{ display: "block", marginBottom: "4px" }}
          href={`mailto:${_source.communication.email}`}
        >
          {_source.communication.email}
        </Link>
        {_source.linkedInProfile && (
          <Button
            variant="text"
            style={{
              padding: 0,
              textTransform: "unset",
              marginBottom: "4px",
              fontWeight: "400"
            }}
            color="primary"
            startIcon={<LinkedInIcon />}
            href={_source.linkedInProfile}
          >
            LinkedIn
          </Button>
        )}
        {/* <Link
          style={{ display: "block", marginBottom: "4px" }}
          href="/not-a-valid-path"
        >
          View Resume
        </Link> */}
      </TableCell>
      <TableCell style={{ border: "none" }} className={classes.skills}>
        <div className={classes.skillsHeader}>
          <Typography color="primary" variant="h6" component="h2" gutterBottom>
            {_source.positionTitle} - {_source.currentCompany}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Experience:{" "}
            <span style={{ fontWeight: "bold" }}>
              {_source.professionalExperience}
            </span>
          </Typography>
        </div>
        <div className={classes.skillsFooter}>
          <Paper>
            <Box p={2}>
              <Typography variant="subtitle1" component="h3">
                Relevant Skills
              </Typography>
              <div className={classes.skillsList}>
                {_source.candidateConfidence &&
                  _source.candidateConfidence.labels &&
                  _source.candidateConfidence.labels.map(({ name }, index) => {
                    return (
                      <Chip
                        label={name}
                        className={classes.chipsStyle}
                        size="medium"
                        key={index}
                      />
                    );
                  })}
              </div>
            </Box>
          </Paper>
        </div>
      </TableCell>
      <TableCell align="right" className={classes.other}>
        <Chip label={_source.score * 100} className={classes.scoreIcon} />
        <Typography variant="subtitle1" component="p" gutterBottom>
          Actively Looking: {_source.activelyLooking ? "Yes" : "No"}
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Availability:{" "}
          <span style={{ fontWeight: "bold" }}>{_source.availability}</span>
        </Typography>
      </TableCell>
      <TableCell className={classes.expansionPanel}>
        <ExpansionPanel style={{ boxShadow: "none" }}>
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Button color="primary" variant="contained" />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <div className={classes.firstTab}>
              {/* <Link
                style={{ display: "block", marginBottom: "4px" }}
                href={`tel:${props.phone}`}
              >
                Github
              </Link>
              <Link
                style={{ display: "block", marginBottom: "4px" }}
                href={`tel:${props.phone}`}
              >
                Portfolio Site
              </Link>
              <Link
                style={{ display: "block", marginBottom: "4px" }}
                href={`tel:${props.phone}`}
              >
                Dice Profile
              </Link> */}
            </div>
            <div className={classes.secondTab}>
              <Box mb={2}>
                <Paper>
                  <Box p={2}>
                    <Typography variant="subtitle1" component="h3">
                      Other Skills
                    </Typography>
                    <div
                      className={classes.skillsList}
                      style={{ marginBottom: "16px" }}
                    >
                      {_source.otherSkills &&
                        _source.otherSkills.split(",").map((value, index) => {
                          return (
                            <Chip
                              label={value}
                              key={index}
                              className={classes.chipsStyle}
                              size="medium"
                            />
                          );
                        })}
                    </div>
                  </Box>
                </Paper>
              </Box>
              <Paper>
                <Box p={2}>
                  <Typography variant="subtitle1" component="h3" gutterBottom>
                    Notes
                  </Typography>
                  <Typography component="p">
                    {_source.additionalNotes}
                  </Typography>
                </Box>
              </Paper>
            </div>
            <div className={classes.thirdTab}>
              <Typography variant="subtitle1" gutterBottom>
                Legal Status:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {_source.immigrationStatus}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Open to Relocation: {_source.openToRelocate ? "Yes" : "No"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Source:
                <span style={{ fontWeight: "bold" }}>{_source.source}</span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Pay Rate:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {_source.payDetail.payRate}
                </span>
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </TableCell>
    </TableRow>
  );
}

CandidateCard.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  _source: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired
    }),
    communication: PropTypes.shape({
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }),
    linkedInProfile: PropTypes.string.isRequired,
    currentJobTitle: PropTypes.string.isRequired,
    currentCompany: PropTypes.string.isRequired,
    totalExp: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    immigrationStatus: PropTypes.string.isRequired,
    relocation: PropTypes.string.isRequired,
    payDetails: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    activelyLooking: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    positionTitle: PropTypes.string,
    source: PropTypes.string,
    additionalNotes: PropTypes.string,
    openToRelocate: PropTypes.bool,
    professionalExperience: PropTypes.string,
    otherSkills: PropTypes.string,
    candidateConfidence: PropTypes.shape({
      labels: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      )
    }),
    payDetail: PropTypes.shape({
      payRate: PropTypes.string
    }),
    resume: PropTypes.shape({
      score: PropTypes.shape({
        classes: PropTypes.arrayOf(
          PropTypes.shape({
            score: PropTypes.string.isRequired
          })
        )
      })
    })
  })
};
