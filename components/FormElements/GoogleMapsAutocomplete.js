import React from 'react';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useDebounce from '~/lib/hooks/useDebounce';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const geocodeService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const GoogleMapsAutocomplete = props => {
  const classes = useStyles();
  const { onAddressFound = () => {}, label = '' } = props;

  const [searchedAddress, setSearchedAddress] = React.useState('');
  const [googlePlaces, setGooglePlaces] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    // TODO: This does not work when another Google Maps is already on the page
    // TODO: Use useScript(_)
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const handleChange = event => {
    setSearchedAddress(event.target.value);
  };

  const getGeocode = placeId => {
    geocodeService.current.geocode({ placeId }, result => {
      const { lat, lng } = result.shift().geometry.location;
      onAddressFound(lat(), lng());
    });
  };
  const debouncedSearchTerm = useDebounce(searchedAddress, 550);

  React.useEffect(() => {
    let active = true;

    if ((!autocompleteService.current || !geocodeService.current) && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocodeService.current = new window.google.maps.Geocoder();
    }
    if (!autocompleteService.current || !geocodeService.current) {
      return undefined;
    }

    if (debouncedSearchTerm === '') {
      setGooglePlaces([]);
      return undefined;
    }

    autocompleteService.current.getPlacePredictions(
      { input: debouncedSearchTerm, componentRestrictions: { country: 'be' } },
      results => {
        if (active) {
          setGooglePlaces(results || []);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [debouncedSearchTerm]);

  return (
    <Autocomplete
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={googlePlaces}
      autoComplete
      includeInputInList
      freeSolo
      onChange={(evt, val) => val && getGeocode(val.place_id)}
      disableOpenOnFocus
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          margin="dense"
          fullWidth
          required
          label={label}
          onChange={handleChange}
        />
      )}
      renderOption={place => {
        const matches = place.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          place.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {place.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
export default GoogleMapsAutocomplete;
