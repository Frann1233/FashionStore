import { makeStyles } from '@mui/styles';

const heroStyles = makeStyles(() => ({
  imageContainer: {
    position: 'relative !important',
    display: 'flex !important',
    justifyContent: 'center ',
    alignItems: 'center ',
    height: '100% '
  },
  male: {
    objectPosition: '100% 50%',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  female: {
    objectPosition: '0% 50%',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  grayscale: {
    filter: 'grayscale(100%)',
  },
  hoverButton: {
    position: 'absolute !important',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
  },

}));

export default heroStyles;
