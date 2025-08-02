import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const Can = (props) => {
  const { permissons, children , componentPermissions } = props;

  const checkArrayEquals = (arr) => {
    let valid = false;
    _.forEach(arr, (x) => {
      if (_.includes(componentPermissions, x)) {
        valid = true;
      }
    });
    return valid;
  };

  return (
    <>
      {permissons && permissons.length > 0 && checkArrayEquals(permissons) ? (
        <>{children}</>
      ) : null}
    </>
  );
};

Can.propTypes = {
  children: PropTypes.element.isRequired,
  permissons: PropTypes.array.isRequired,
  componentPermissions: PropTypes.array.isRequired,
};