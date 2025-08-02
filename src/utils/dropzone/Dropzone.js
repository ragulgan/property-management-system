import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import {
  DROPZONE_IMAGE_NAME_TYPES,
  // DELETE_THUMBNAIL_IMAGE,
  EMPTY_DROPZONE,
  DROPZONE_MESSAGES,
  ENV,
} from "../constants";
import { UploadActions } from "../../store/actions/index";
import { toAbsoluteUrl } from '../../theme/helpers'

const Dropzone = (props) => {
  const {
    defaultImages,
    multiple,
    thumbnail,
    width,
    height,
    type,
    dispatch,
    name,
    id,
    maxFileSize,
    formatType,
    showRemove,
    dropzoneError,
    dropzoneImage,
    escriptMasterDataType,
    loading,
    placeHolderImg,
    placeHolderWidth,
    placeHolderHeight
  } = props;

  const imagesArray =
    defaultImages && defaultImages.length > 0
      ? _.filter(defaultImages, (i) => {
        return i.key;
      })
      : [];
  const [files, setFiles] = useState(imagesArray);
  // const [uploadingSize, setUploadingSize] = useState(0);
  // const [totalSize, setTotalSize] = useState(0);
  const [status, setStatus] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );
  const [error, setError] = useState(false);
  const isJsonFormat = _.includes(formatType, "application/json");

  const setFormatTypeError = (type, setStatus) => {
    switch (type) {
      case DROPZONE_IMAGE_NAME_TYPES.IMAGE:
        return setStatus(DROPZONE_MESSAGES.IMAGE_INVALID);
      case DROPZONE_IMAGE_NAME_TYPES.VIDEO:
        return setStatus(DROPZONE_MESSAGES.VIDEO_INVALID);
      case DROPZONE_IMAGE_NAME_TYPES.AUDIO:
        return setStatus(DROPZONE_MESSAGES.AUDIO_INVALID);
      case DROPZONE_IMAGE_NAME_TYPES.DOCUMENTS:
        return setStatus(DROPZONE_MESSAGES.DOCUMENT_INVALID);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setError(false);
    // setStatus("Uploading...");
    let isValidFileFormat = false;
    const formData = new FormData();
    if (thumbnail) {
      formData.append("width", width);
      formData.append("height", height);
    }
    acceptedFiles.forEach((item) => {
      const fileType = item && item.type;
      const uploadedFileSize = item && item.size;
      isValidFileFormat = _.includes(formatType, fileType);
      const fileSize = Number(maxFileSize) * 1024 * 1024;
      // setTotalSize(uploadedFileSize);
      if (isValidFileFormat) {
        if (uploadedFileSize < fileSize) {
          formData.append("file", item);
        } else {
          setError(true);
          setStatus(
            `Note Upload png, jpg, jpeg, Max:${fileSize / 1048576
            } MB!. You file size is : ${Math.round(uploadedFileSize / 1024)}KB`
          );
        }
      } else {
        setError(true);
        setFormatTypeError(type, setStatus);
      }
      // ({ type: 'UPLOAD_IMAGE', payload: { formData, escriptMasterDataType } });
    });

    // const config = {
    //   onUploadProgress: (progressEvent) => {
    //     setUploadingSize(progressEvent.loaded);
    //   },
    // };

    if (isValidFileFormat) {
      if (multiple) {
        dispatch(UploadActions.uploadImage(formData, escriptMasterDataType));
      } else {
        dispatch(UploadActions.uploadImage(formData, escriptMasterDataType));
      }
    }
  }, []);

  // const getProgressPercentage = (currentSize, ttlSize) => {
  //   return (currentSize / ttlSize) * 100;
  // };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const removeDropzoneImage = (key, flag) => {
  //   const array = _.filter(files, (x) => {
  //     if (key !== x.key) {
  //       return x;
  //     }
  //   });
  //   setFiles(array);
  //   setStatus(EMPTY_DROPZONE.MSG);
  //   dispatch({
  //     type: DELETE_THUMBNAIL_IMAGE.RESPONSE_SUCCESS,
  //     flag,
  //     imageName: array,
  //   });
  // };

  const previewFiles = files.map((file, i) => (
    <div
      className={
        multiple
          ? `col-3 col-sm-3 col-md-3 p-2`
          : ` col-12 col-sm-12 col-md-12 p-2 mx-auto`
      }
      key={i}
    >
      <i
        className="zmdi zmdi-close-circle zmdi-hc-fw cursor-pointer position-top-rigth text-danger icon-2"
      // onClick={() => {
      //   removeDropzoneImage(file.key, flag);
      // }}
      />
      {type === DROPZONE_IMAGE_NAME_TYPES.IMAGE ? (
        <img
          className="preview-image img-fit"
          src={`${"https://property.shenll.in/api/v1/admin"}/${dropzoneImage && dropzoneImage.data && dropzoneImage.data.filePath}`}
          alt={dropzoneImage && dropzoneImage.data && dropzoneImage.data.name || ""}
          // onError={(e) => {
          //   e.target.src = userPlaceholder;
          // }}
          key={file.location}
          width="100%"
          height="100%"
        />
      ) : (
        <div className="bg-dark d-flex justify-content-center">
          {type === DROPZONE_IMAGE_NAME_TYPES.AUDIO ? (
            <audio
              className=""
              style={{ backgroundColor: "transparent" }}
              controls
              id=""
              key={file.location}
              width="100%"
              height="100%"
              autoPlay={false}
              src={file.location}
            />
          ) : (
            <>
              {type === DROPZONE_IMAGE_NAME_TYPES.DOCUMENTS ? (
                <>
                  <div className="docs-icon-card d-flex justify-content-center align-items-center">
                    <div className="text-center">
                      <i
                        data-toggle="dropdown"
                        className="zmdi zmdi-file-text text-danger icon-5"
                      />
                      <p
                        className="text-muted mb-0"
                        controls
                        id=""
                        key={file.location}
                        width="100%"
                        height="100%"
                        src={file.location}
                      >
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <video
                  className=""
                  controls
                  id=""
                  key={file.location}
                  width="100%"
                  height="100%"
                  autoPlay={false}
                  src={file.location}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  ));

  useEffect(() => {
    const imagesArray =
      defaultImages && defaultImages.length > 0
        ? _.filter(defaultImages, (i) => {
          return i.key;
        })
        : [];
    if (_.isEmpty(imagesArray)) {
      setStatus(
        `${isJsonFormat ? EMPTY_DROPZONE.FILE_MSG : ''}`
      );
    }
    setFiles([...imagesArray]);
  }, [defaultImages]);

  useEffect(() => {
    if (files && files.length > 0) {
      setStatus(
        `${isJsonFormat ? EMPTY_DROPZONE.FILE_MSG : ''}`
      );
    }
  }, [files]);

  useEffect(() => {
    if (dropzoneError) {
      setStatus(dropzoneError);
    }
  }, [dropzoneError]);

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: DELETE_THUMBNAIL_IMAGE.RESPONSE_SUCCESS, flag });
  //     setFiles([]);
  //   };
  // }, []);

  // const percent = getProgressPercentage(uploadingSize, totalSize);
  // const showProgress = () => {
  //   const sp = Math.floor(percent - 100);
  //   return Math.abs(sp);
  // };

  return (
    <div className="dropzone-container">
      <div className="row">{previewFiles}</div>
      {!multiple && files && files.length === 0 ? (
        <div
          {...getRootProps({
            className: `dropzone ${error && "dropzone-error"}`,
          })}
        >
          <input id={id} {...getInputProps({ multiple })} />
          {
            loading ? (
              <div colSpan='100%' className='text-center'>
                <div
                  className='spinner-border text-primary m-5'
                  role='status'
                />
              </div>
            ) : (
              defaultImages &&
                defaultImages.length > 0 ? <>
                <p className="m-0 text-center mx-3">
                  <img
                    src={`https://property.shenll.in/api/v1/admin${defaultImages[0].filePath}`}
                    alt="Profile picture"
                    style={{ borderRadius: '13px' }}
                    className="mb-2"
                    width='163px'
                    height='148px'
                  />
                  {" "}
                  {status}
                </p></> :
                <p className="m-0 text-center mx-1">
                  <img
                    src={placeHolderImg || toAbsoluteUrl('/media/avatars/blank.png')}
                    alt="Profile picture"
                    style={{ borderRadius: '13px' }}
                    className="mb-2"
                    width={placeHolderWidth || '163px'}
                    height={placeHolderHeight || '148px'}
                  />
                  {" "}
                  {status}
                </p>)}
        </div>
      ) : null}
      {multiple && (
        <div
          {...getRootProps({
            className: `dropzone ${error && "dropzone-error"}`,
          })}
        >
          <input {...getInputProps({ multiple })} />
          <p className="m-0 text-center mx-3">
            <img
              src={placeHolderImg || toAbsoluteUrl('/media/avatars/blank.png')}
              alt="Profile picture"
              style={{ borderRadius: '13px' }}
              className="img-fluid mb-2"
              width={placeHolderWidth || '163px'}
              height={placeHolderHeight ||'148px'}
            />
            {" "}
            {status}
          </p>
        </div>
      )}
      {/* {
        showProgress() ? (
          <>
            <div className="row ">
              <div className="col-12 col-sm-12 col-md-12">
                <div className="progress mt-3">
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    label={`${Math.floor(percent)}%`}
                    style={{ width: `${Math.floor(percent)}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <span className="percentage">{`${Math.floor(percent) < 100 ? Math.floor(percent) : 100}%`}</span>
                </div>
              </div>
            </div>
          </>
        ) : null} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapStateToProps = (state) => {
  const { dropzoneStore } = state;

  return {
    dropzoneImage:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : [],
    dropzoneImageThumbNail:
      dropzoneStore && dropzoneStore.imageThumbNail
        ? dropzoneStore.imageThumbNail
        : [],
    dropzoneStatus:
      dropzoneStore && dropzoneStore.dropzoneImage ? dropzoneStore.dropzoneImage : "",
    loading: dropzoneStore && dropzoneStore.loadingIM ? dropzoneStore.loadingIM : false

  };
};

Dropzone.propTypes = {
  dropzoneImage: PropTypes.array,
  dropzoneImageThumbNail: PropTypes.array,
  dropzoneStatus: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);