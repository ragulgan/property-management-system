import React from "react";

const ErrorWrapper = (props) => {
  return (
    <>
      {props?.error?.message ? (
        <div className="rr mt-1">
          <style>{".rr{color:red}"}</style>
          {props?.error?.message}
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default ErrorWrapper;