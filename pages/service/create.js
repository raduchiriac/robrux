import React, { useState, useContext, useMemo, useEffect, useRef, Fragment, Children } from 'react';
import { AccountLayout } from '~/lib/layouts/AccountLayout';
import withApollo from '~/lib/hocs/withApollo';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import RootRef from '@material-ui/core/RootRef';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import loadable from '@loadable/component';
import ChipInput from 'material-ui-chip-input';
import { useDropzone } from 'react-dropzone';
import ReactMde from 'react-mde';
import DialogHeight from '~/components/FormElements/DialogHeight';
import * as Showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import GoogleMapsAutocomplete from '~/components/FormElements/GoogleMapsAutocomplete';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import Map from '~/components/Map/Map';
import useGeo from '~/lib/hooks/useGeo';
import useForm from '~/lib/hooks/useForm';
import { dynamicSort } from '~/lib/helpers/utils';
import clsx from 'clsx';
import CheckboxWithLink from '~/components/FormElements/CheckboxWithLink';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  error: {
    color: `${theme.palette.error.main} !important`,
  },
  description: {
    marginTop: theme.spacing(3),
    color: theme.palette.grey[700],
  },
  descriptionError: {
    margin: theme.spacing(0, 2, 0),
    fontSize: '0.75rem',
  },
  markdown: {
    border: 'none !important',
    '& .mde-header': {
      border: '0 !important',
    },
    '& button, & textarea, & .mde-preview-content': {
      fontSize: theme.typography.fontSize,
      fontFamily: theme.typography.fontFamily,
      '&:focus': {
        outline: 'none',
      },
    },
  },
  form: {
    marginBottom: theme.spacing(3),
  },
  markdown_textarea: {
    background: 'transparent',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    border: `1px solid ${theme.palette.grey[400]} !important`,
    padding: `${theme.spacing(1.5)}px !important`,
    transition: theme.transitions.create('border'),
    '&.error, &.error:focus': {
      borderColor: `${theme.palette.error.main} !important`,
    },
    '&:focus': {
      border: `2px solid ${theme.palette.primary.main} !important`,
    },
  },
  markdown_preview: {
    background: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[400]} !important`,
  },
  markdown_grip: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: 'none !important',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  dropZone: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.grey[500],
    border: `2px dashed ${theme.palette.grey[200]}`,
  },
  dropZoneActive: { color: theme.palette.primary.main, borderColor: theme.palette.primary.light },
  dropZoneAccept: { color: theme.palette.primary.main, borderColor: theme.palette.primary.light },
  dropZoneReject: { color: theme.palette.error.main, borderColor: theme.palette.error.light },
  thumbs: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  thumb: {
    position: 'relative',
    flex: '1 0 20%',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
    display: 'flex',
    maxWidth: 100,
    maxHeight: 100,
    cursor: 'pointer',
    overflow: 'hidden',
    '& img': {
      padding: theme.spacing(0.5),
      margin: theme.spacing(0.5),
      boxShadow: theme.shadows[1],
    },
    '&:hover': {
      '& .thumb-cancel-close': {
        display: 'block',
      },
    },
  },
  thumbClose: {
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    fill: theme.palette.error.main,
    display: 'none',
  },
  tags: {
    marginTop: theme.spacing(1),
  },
  autocomplete: {
    marginTop: theme.spacing(1),
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  stepContentContainer: {
    paddingRight: 0,
  },
  stepContent: {
    marginBottom: theme.spacing(2),
  },
}));

const Basics = ({ STRINGS, values, errors, handleChange, classes, isMobile }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [selectedTab, setSelectedTab] = useState('write');
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    extensions: [xssFilter],
  });

  return (
    <Fragment>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        required
        label={STRINGS.SERVICE_NEW_TITLE}
        name="title"
        id="title"
        autoFocus
        onChange={evt => handleChange(evt)}
        value={values.title || ''}
        error={(errors.title && true) || false}
        helperText={errors.title}
      />
      <Autocomplete
        multiple
        margin="dense"
        value={values.categories}
        getOptionSelected={el => values.categories.filter(v => v.title === el.title).length}
        className={classes.autocomplete}
        options={STRINGS.SERVICE_NEW_CATEGORIES.map((service, idx) => ({ title: service, id: idx })).sort(
          dynamicSort('title')
        )}
        disableCloseOnSelect
        onChange={(evt, values) => handleChange(values, 'categories')}
        getOptionLabel={option => option.title}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
            {option.title}
          </React.Fragment>
        )}
        renderInput={params => (
          <TextField {...params} variant="outlined" label={STRINGS.SERVICE_NEW_CATEGORY} placeholder="" fullWidth />
        )}
      />
      <Typography className={clsx(classes.description, errors.description ? classes.error : '')} variant="body1">
        {`${STRINGS.SERVICE_NEW_DESCRIPTION} *`}
      </Typography>
      <ReactMde
        generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
        onChange={value => handleChange(value, 'description')}
        value={values.description || ''}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        minEditorHeight={!isMobile ? 300 : 150}
        classes={{
          reactMde: classes.markdown,
          grip: classes.markdown_grip,
          preview: classes.markdown_preview,
          textArea: clsx(classes.markdown_textarea, errors.description ? 'error' : ''),
        }}
        l18n={{
          write: STRINGS.MARKDOWN_WRITE,
          preview: STRINGS.MARKDOWN_PREVIEW,
        }}
      />
      <Typography className={clsx(classes.descriptionError, classes.error)} variant="body2" component="p">
        {errors.description}
      </Typography>
    </Fragment>
  );
};

const Address = ({ STRINGS, values, errors, handleChange, classes, theme }) => {
  const { latitude, longitude, timestamp, accuracy, error } = useGeo(false);
  const [foundLat, setFoundLat] = useState(0);
  const [foundLng, setFoundLng] = useState(0);

  const onAddressFound = (lat, lng) => {
    setFoundLat(lat);
    setFoundLng(lng);
  };

  const gigs = {
    data: [
      {
        _id: 'placeId',
        location: {
          type: 'Point',
          coordinates: [foundLat || latitude, foundLng || longitude],
          address: 'Point',
        },
        title: 'Title',
      },
    ],
  };
  return (
    <Fragment>
      <GoogleMapsAutocomplete onAddressFound={onAddressFound} label={STRINGS.SERVICE_NEW_ADDRESS} />
      {gigs.data[0].location.coordinates[0] && (
        <Map
          defaultZoom={16}
          mapServiceProvider="osm"
          center={gigs.data[0].location.coordinates}
          gigs={gigs}
          styles={{ margin: `${theme.spacing(1)}px 0 0 0` }}
        />
      )}
    </Fragment>
  );
};

const Options = ({ STRINGS, values, errors, handleChange, classes }) => {
  const [tags, setTags] = useState(values.tags || []);
  const [withHourPrice, setWithHourPrice] = useState(values.withHourPrice || false);
  const [withRangePrice, setWithRangePrice] = useState(values.withRangePrice || false);
  const [priceRange, setPriceRange] = useState(values.priceRange || [50, 500]);

  const constructPriceRangeValue = value => `${value}€`;
  const handleDeleteImage = idx => {
    URL.revokeObjectURL(values.images[idx].preview);
    handleChange(
      values.images.filter((image, index) => index !== idx),
      'images'
    );
  };
  const maxImages = 5;
  const maxSize = 1048576 * 3; // 3Mb

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['image/jpeg', 'image/jpg', 'image/png'],
    maxSize,
    onDrop: acceptedFiles => {
      handleChange(
        [
          ...(values.images || []),
          ...acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ].splice(0, maxImages),
        'images'
      );
    },
  });
  const { ref, ...rootProps } = getRootProps();
  const classNamesDropZone = useMemo(
    () =>
      classes.dropZone +
      (isDragActive ? ' ' + classes.dropZoneActive : '') +
      (isDragAccept ? ' ' + classes.dropZoneAccept : '') +
      (isDragReject ? ' ' + classes.dropZoneReject : ''),
    [
      classes.dropZone,
      classes.dropZoneAccept,
      classes.dropZoneActive,
      classes.dropZoneReject,
      isDragAccept,
      isDragActive,
      isDragReject,
    ]
  );

  const thumbnails = (values.images || []).map((image, idx) => (
    <div
      tabIndex={idx}
      onClick={e => handleDeleteImage(idx)}
      onKeyPress={() => {}}
      key={`image${idx}`}
      className={classes.thumb}
      role="button"
    >
      <img src={image.preview} alt="" />
      <CancelIcon className={clsx(classes.thumbClose, 'thumb-cancel-close')} />
    </div>
  ));

  return (
    <Fragment>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={withHourPrice}
              color="primary"
              onChange={(evt, val) => {
                setWithHourPrice(val);
                handleChange(val, 'withHourPrice');
              }}
            />
          }
          label={STRINGS.SERVICE_NEW_PRICE_OPT1}
        />
      </div>
      {withHourPrice && (
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          type="number"
          id="price"
          name="price"
          value={values.price || ''}
          onChange={evt => handleChange(evt)}
          label={STRINGS.SERVICE_NEW_PRICE}
          InputProps={{
            endAdornment: <InputAdornment position="end">{STRINGS.CURRENCY_TIME_PRICE_ENDING}</InputAdornment>,
          }}
        />
      )}
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={withRangePrice}
              color="primary"
              onChange={(evt, val) => {
                setWithRangePrice(val);
                handleChange(val, 'withRangePrice');
              }}
            />
          }
          label={STRINGS.SERVICE_NEW_PRICE_OPT2}
        />
      </div>
      {withRangePrice && (
        <div>
          <Box mt={1} mb={5}>
            <Typography variant="subtitle2">{STRINGS.SERVICE_NEW_PRICE_RANGE}</Typography>
          </Box>
          <Slider
            step={10}
            min={10}
            max={900}
            value={priceRange}
            onChange={(evt, val) => {
              setPriceRange(val);
              handleChange(val, 'priceRange');
            }}
            valueLabelDisplay="on"
            aria-labelledby="price-range-slider"
            getAriaValueText={constructPriceRangeValue}
            valueLabelFormat={constructPriceRangeValue}
          />
        </div>
      )}
      <ChipInput
        label={STRINGS.SERVICE_NEW_TAGS}
        value={tags}
        variant="outlined"
        className={classes.tags}
        fullWidth
        fullWidthInput
        disableUnderline
        onBeforeAdd={tag => tag.length >= 3}
        onAdd={tag => {
          const newTags = [...tags, tag];
          setTags(newTags);
          handleChange(newTags, 'tags');
        }}
        onDelete={(tag, index) => {
          const newTags = tags.filter((tag, idx) => index !== idx);
          setTags(newTags);
          handleChange(newTags, 'tags');
        }}
      />
      <Typography variant="body1" className={classes.description}>
        {STRINGS.SERVICE_NEW_IMAGES}
      </Typography>

      <RootRef rootRef={ref}>
        <Card {...rootProps}>
          <div className={classNamesDropZone}>
            <input {...getInputProps()} />
            <Typography>{STRINGS.SERVICE_NEW_ADD_IMAGES.replace('%s%', maxImages)}</Typography>
          </div>
        </Card>
      </RootRef>
      <aside className={classes.thumbs}>{thumbnails}</aside>
    </Fragment>
  );
};

const Payment = ({ STRINGS, values, errors, handleChange, classes, theme }) => {
  const [openModal, setOpenModal] = useState(false);

  // TODO: Make this dynamic somehow
  const Terms = loadable(() => import('../terms/ro'));

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLinkClick = evt => {
    evt.preventDefault();
    setOpenModal(true);
  };

  return (
    <Fragment>
      <CheckboxWithLink
        required
        id="terms"
        checkboxText={STRINGS.REGISTER_READ_ACC}
        checkboxLink={STRINGS.REGISTER_ACC_TERMS}
        // TODO: Make this dynamic somehow
        checkboxHref="/terms/ro"
        error={errors.terms || false}
        value={values.terms || false}
        handleLinkClick={evt => handleLinkClick(evt)}
        handleChange={value => handleChange(value, 'terms')}
      />
      <DialogHeight
        id="dialogterms"
        open={openModal}
        handleClose={evt => handleClose(evt)}
        title="_TERMS"
        buttonText="_AGREE"
      >
        <Terms />
      </DialogHeight>
    </Fragment>
  );
};

const ServiceCreate = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [activeStep, setActiveStep] = useState(2);
  const { STRINGS } = useContext(TranslationsContext).state;
  const steps = [
    STRINGS.SERVICE_NEW_NEW,
    STRINGS.SERVICE_NEW_ADDRESS_WHERE,
    STRINGS.SERVICE_NEW_OPTIONS,
    STRINGS.SERVICE_NEW_PAYMENT,
  ];

  const _create = () => {
    // TODO: Make sure to revoke the data uris to avoid memory leaks
    // (values.images || []).forEach(image => URL.revokeObjectURL(image.preview));
    if (activeStep === steps.length) {
      console.log('can I create, is everything valid?');
    }
  };
  const _validate = values => {
    let errors = {};
    if (activeStep >= 0 && !values.title) {
      errors.title = STRINGS.FIELD_IS_MANDATORY;
    }
    if (activeStep >= 0 && !values.description) {
      errors.description = STRINGS.FIELD_IS_MANDATORY;
    }
    if (activeStep >= 3 && !values.terms) {
      errors.terms = STRINGS.FIELD_IS_MANDATORY;
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(_create, _validate);

  const isStepCompleted = step => {
    return activeStep > step;
  };

  const isStepFailed = step => {
    if (activeStep > step) {
      if (step === 0 && (errors.title || errors.description)) return true;
      else if (step === 3 && errors.terms) return true;
    } else return false;
  };

  const handleStep = step => () => {
    setActiveStep(step);
    handleSubmit();
  };
  const handleNext = () => {
    handleStep(prevActiveStep => prevActiveStep + 1)();
  };
  const handleBack = () => {
    handleStep(prevActiveStep => prevActiveStep - 1)();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Basics
            STRINGS={STRINGS}
            values={values}
            errors={errors}
            handleChange={handleChange}
            theme={theme}
            classes={classes}
            isMobile={isMobile}
          />
        );
      case 1:
        return (
          <Address
            STRINGS={STRINGS}
            values={values}
            errors={errors}
            handleChange={handleChange}
            theme={theme}
            classes={classes}
          />
        );
      case 2:
        return (
          <Options
            STRINGS={STRINGS}
            values={values}
            errors={errors}
            handleChange={handleChange}
            theme={theme}
            classes={classes}
          />
        );
      case 3:
        return (
          <Payment
            STRINGS={STRINGS}
            values={values}
            errors={errors}
            handleChange={handleChange}
            theme={theme}
            classes={classes}
            theme={theme}
          />
        );
      default:
        return '';
    }
  }

  const createContent = ({ stepsLength }) => {
    return (
      <form className={isMobile ? '' : classes.form}>
        <div className={classes.stepContent}>{getStepContent(activeStep)}</div>
        <ButtonGroup className={classes.buttonGroup}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            {STRINGS.SERVICE_NEW_BACK}
          </Button>

          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === stepsLength - 1 ? STRINGS.SERVICE_NEW_SAVE : STRINGS.SERVICE_NEW_NEXT}
          </Button>
        </ButtonGroup>
      </form>
    );
  };

  return (
    <Container maxWidth="md">
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
          if (isStepFailed(index)) {
            labelProps.error = true;
          }

          return (
            <Step className={classes.step} key={label} {...stepProps}>
              <StepButton onClick={handleStep(index)}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </StepButton>
              {isMobile && (
                <StepContent className={classes.stepContentContainer}>{createContent(steps.length)}</StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Typography>_RESUMIG</Typography>
      ) : (
        <Grid item lg={12} md={12} sm={12}>
          {!isMobile && createContent(steps.length)}
        </Grid>
      )}
    </Container>
  );
};

ServiceCreate.Layout = AccountLayout;

export default withApollo(ServiceCreate);
