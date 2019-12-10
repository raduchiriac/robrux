import React, { useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const GigCreateContainer = props => {
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { STRINGS } = useContext(LanguagesContext).state;
  const steps = [
    STRINGS.SERVICE_NEW_NEW,
    STRINGS.SERVICE_NEW_ADDRESS,
    STRINGS.SERVICE_NEW_OPTIONS,
    STRINGS.SERVICE_NEW_PAYMENT,
  ];

  const Basics = props => {
    return (
      <div>
        <TextField variant="outlined" margin="dense" fullWidth required label={STRINGS.SERVICE_NEW_TITLE} />
        <TextField
          rows="4"
          rowsMax="8"
          variant="outlined"
          margin="dense"
          fullWidth
          label={STRINGS.SERVICE_NEW_DESCRIPTION}
          multiline
        />
      </div>
    );
  };

  const Address = props => {
    return <div></div>;
  };

  const Options = props => {
    const [tags, setTags] = useState(props.tags);
    const handleAddChip = chip => setTags([...props.tags, chip]);
    const handleDeleteChip = (chip, index) => {};

    return (
      <ChipInput
        label={STRINGS.SERVICE_NEW_TAGS}
        value={tags}
        variant="outlined"
        fullWidth
        disableUnderline
        onAdd={chip => handleAddChip(chip)}
        onDelete={(chip, index) => handleDeleteChip(chip, index)}
      />
    );
  };

  const Payment = props => {
    return <div></div>;
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Basics />;
      case 1:
        return <Address />;
      case 2:
        return <Options />;
      case 3:
        return <Payment />;
      default:
        return '';
    }
  }

  const isStepCompleted = step => {
    return activeStep > step;
  };

  const isStepOptional = step => {
    return false;
  };

  const isStepFailed = step => {
    return step === 0;
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const content = (
    <Fragment>
      <div className={classes.instructions}>{getStepContent(activeStep)}</div>
      <ButtonGroup className={classes.buttonGroup}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          {STRINGS.SERVICE_NEW_BACK}
        </Button>

        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? STRINGS.SERVICE_NEW_SAVE : STRINGS.SERVICE_NEW_NEXT}
        </Button>
      </ButtonGroup>
    </Fragment>
  );

  return (
    <Grid container>
      <Stepper
        nonLinear
        className={classes.root}
        activeStep={activeStep}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          if (isStepCompleted(index)) {
            stepProps.completed = true;
          }

          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">{STRINGS.SERVICE_NEW_OPTIONAL}</Typography>;
          }
          if (isStepFailed(index)) {
            labelProps.error = true;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepButton onClick={handleStep(index)}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </StepButton>
              {isMobile && <StepContent>{content}</StepContent>}
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}></Typography>
        </div>
      ) : (
        <Grid item lg={12} md={12} sm={12}>
          {!isMobile && content}
        </Grid>
      )}
    </Grid>
  );
};

export default GigCreateContainer;
