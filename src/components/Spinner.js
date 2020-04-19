import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//#FE6B8B 30%, #FF8E53
const useStylesFacebook = makeStyles({
    root: {
      position: 'relative',
    },
    top: {
      color: '#FE6B8B',
    },
    bottom: {
      color: '#FF8E53',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
  });
const Spinner = () => {
    const classes = useStylesFacebook();
    return (
        <div className={classes.root}>
          <CircularProgress
            variant="determinate"
            value={100}
            className={classes.top}
            size={24}
            thickness={4}
            //{...props}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.bottom}
            size={24}
            thickness={4}
            //{...props}
          />
        </div>
    );
}
 
export default Spinner;