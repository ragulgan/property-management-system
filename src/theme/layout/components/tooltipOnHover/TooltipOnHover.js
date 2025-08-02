import React from 'react'
import PropTypes from 'prop-types'
import classes from './TooltipOnHover.module.scss'

export const TooltipOnHover = (props) => {
  const { string, sliceUpTo } = props
  return (
    <>
      {
      string && string.length > 0
        ? (
            string.length > sliceUpTo
              ? (
                <span className={classes.tooltipOnHover}>
                  {string.substring(0, sliceUpTo) + '...'}
                  <span className={classes.tooltiptext}>{string}</span>
                </span>
                )
              : (
                <span>{string}</span>
                )
          )
        : null
      }
    </>
  )
}

TooltipOnHover.propTypes = {
  string: PropTypes.string.isRequired,
  sliceUpTo: PropTypes.number.isRequired
}
