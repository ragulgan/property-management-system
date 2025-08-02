import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import { toAbsoluteUrl } from "../../theme/helpers";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { PROFILE_URL } from "../../utils/constants";
import {
  getApartmentListActions,
  deleteApartmentActions
} from "../../store/actions";
import Card from "react-bootstrap/Card";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ApartmentType(props) {
  const Roles = JSON.parse(localStorage.getItem("roles"));
  const {
    className,
    getAllApartment,
    loading,
    apartmentDelete,
    getApartmentlistDispatch,
    deleteDispatch,
    clearApartmentDelete,
  } = props;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const didMount = React.useRef(false);
  const history = useHistory();

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  });

  useEffect(() => {
    const params = {
      limit: limit,
      pageNo: page
    }
    getApartmentlistDispatch(params)
  }, []);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    const pageNumber = event.selected + 1;
    const params = {
      limit: limit,
      pageNo: pageNumber,
    };
    getApartmentlistDispatch(params);
  };

  const totalPages =
    getAllApartment && getAllApartment.count
      ? Math.ceil(parseInt(getAllApartment && getAllApartment.count) / limit)
      : 1;

  const handleChange = (e) => {
    setLimit(e.target.value);
    const params = {
      limit: e.target.value,
      pageNo: page,
    };
    getApartmentlistDispatch(params);
  };

  const handleShow = () => {
    history.push("/add-apartments");
  };

  const handleOpen = (id) => {
    history.push(`/edit-apartments/${id}`);
  }

  return (
    <div>
      <div className="mb-5 row align-items-center">
        <div className="col-sm-12 text-end">
          <Link
            onClick={handleShow}
            to={`/add-apartments`}
            className="btn btn-lg btn-blue list-add-button px-3 py-2"
          >
            <span className="mr-0">
              <i className="bi bi-plus fs-1 text-white"></i>
            </span>
            Add Apartments
          </Link>
        </div>
      </div>
      <div className="row">
        <>
          {
            !loading
              ? (
                getAllApartment && !_.isEmpty(getAllApartment.data)
                  ? (
                    getAllApartment && getAllApartment?.data?.map((item) => {
                      return (
                        <div className="col-sm-3" key={item.id}>
                        <Card style={{ width: "100%", height: "300px" }} className="rounded m-2"
                          onClick={() => { handleOpen(item.id) }}
                        >
                          {!_.isEmpty(item.apartmentImages) ?
                            <>
                              <Card.Img variant="top" className="rounded card-image-apartment" src={`${PROFILE_URL}${item.apartmentImages[0].filePath}`} />
                            </> : 
                            <>
                              <Card.Img variant="top" className="rounded card-image-apartment" src={toAbsoluteUrl('/media/avatars/apartment/maplegrove.svg')} />
                            </>
                          }
                          <Card.Body className="m-3">
                            <Card.Title className='aptType'>{item.apartmentType && item.apartmentType.apartmentType ? item.apartmentType.apartmentType : '--'}</Card.Title>
                            <Card.Text className='aptTypeadd'>{`${item.address}, ${item.streetName}, ${item.city}, ${item.state}, ${item.country} - ${item.zipCode}`}</Card.Text>
                            <div className="symbol-group symbol-hover flex-nowrap">
                              <>
                                <OverlayTrigger
                                  key={item.owner.id}
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-user-name">{item.owner.name}</Tooltip>
                                  }
                                >
                                  <div className="symbol symbol-35px symbol-circle d-flex justify-content-between">
                                    {item.owner && !_.isEmpty(item.owner.image) ? (
                                      <>
                                        <img src={`${PROFILE_URL}${item.owner.image[0].filePath}`} alt="Pic" />
                                      </>
                                    ) : null}
                                  </div>
                                </OverlayTrigger>
                                <div className="ms-2">
                                  <div className="apt-card-name">{item.owner.name}</div>
                                  <div className="apt-card-type mt-1">{item.owner && item.owner.type === "APARTMENT_ADMIN" ? "Apartment Admin" : '--'}</div>
                                </div>
                              </>
                            </div>
                          </Card.Body>
                        </Card>
                        </div>
                      )
                    })
                  )
                  : (
                    <div className='text-center py-3'>
                      <span colSpan='100%'>No record(s) found</span>
                    </div>
                  )
              )
              :
              (
                <div>
                  <span colSpan='100%' className='text-center'>
                    <div
                      className='spinner-border text-primary m-5'
                      role='status'
                    />
                  </span>
                </div>
              )
          }
        </>
      </div>
      <div className="form-group row mb-4 mt-6">
        <div className="col-lg-1 col-xl-3 col-xxl-5" />
        <div className="col-lg-11 col-xl-9 col-xxl-7 d-flex align-items-center justify-content-end">
          <div className="w-50 d-flex align-items-center justify-content-center">
            <div className="mr-5">Record Per Page</div>
            <select
              name="status"
              style={{ width: "25%" }}
              className="form-select form-select-solid bg-white border-0"
              data-control="select"
              data-placeholder="Select an option"
              data-allow-clear="true"
              onChange={handleChange}
              value={limit || ""}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <span className="w-25">
            {page === 1 ? (
              <>
                <span>
                  {`${limit * (page - 1) + 1}`}
                  {"-"}
                </span>
                {Math.min(limit * page, getAllApartment && getAllApartment.count)} of{" "}
                {getAllApartment && getAllApartment.count}
              </>
            ) : page ===
              Math.ceil(getAllApartment && getAllApartment.count / limit) ? (
              <>
                <span>
                  {`${limit * (page - 1) + 1}`}
                  {"-"}
                </span>
                {getAllApartment && getAllApartment.count} of{" "}
                {getAllApartment && getAllApartment.count}
              </>
            ) : (
              <>
                <span>
                  {`${limit * (page - 1) + 1}`}
                  {"-"}
                </span>
                {Math.min(limit * page, getAllApartment && getAllApartment.count)} of{" "}
                {getAllApartment && getAllApartment.count}
              </>
            )}
          </span>
          <div className="w-50">
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< Prev"
              pageClassName="page-item"
              pageLinkClassName="page-link page-btn"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    getApartmentlistStore, deleteApartmentStore
  } = state;
  return {
    getAllApartment: getApartmentlistStore && getApartmentlistStore.getAllApartment ? getApartmentlistStore.getAllApartment : '',
    loading: getApartmentlistStore && getApartmentlistStore.loading ? getApartmentlistStore.loading : false,
    apartmentDelete: deleteApartmentStore && deleteApartmentStore.deleteApartment ? deleteApartmentStore.deleteApartment : '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  getApartmentlistDispatch: (params) => dispatch(getApartmentListActions.get(params)),
  deleteDispatch: (id) => dispatch(deleteApartmentActions.delete(id)),
  clearApartmentDelete: () =>
    dispatch(deleteApartmentActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentType);
