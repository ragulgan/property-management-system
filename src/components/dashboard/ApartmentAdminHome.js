import React from 'react'
import { toAbsoluteUrl } from '../../theme/helpers'
import { Link, useHistory } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import { DashboardActions } from '../../store/actions';
import { connect } from 'react-redux'


const ApartmentAdminHome = (props) => {
    const Roles = JSON.parse(localStorage.getItem('roles'))
    const history = useHistory();
    const {
        Dashboardlists
    } = props

    const handleOpen = (id) => {
        history.push(`/dashboard`);
      }

    const apartmentHomeData = [
        {
          residenceName: "Maple Grove Residences",
          address: "3/16,appu 2nd St, Mylapore Chennai, Tamil Nadu, 600004",
          members: [
            {
              name: 'Jaylon Culhane',
              avatar: '/media/avatars/apartment/aptAdmin1.svg',
              type:'Apartment Admin'
    
            }
          ],
          image:"/media/avatars/apartment/maplegrove.svg",
        },
        {
          residenceName: "Harborview Heights Apartments",
          address: "27, Sydoji Street Triplicane Chennai, Tamil Nadu, 600005",
          members: [
            {
              name: 'Ruben Aminoff',
              avatar: '/media/avatars/apartment/aptAdmin2.svg',
              type:'Apartment Admin'
            }
          ],
          image:
            "/media/avatars/apartment/harborview.svg",
        }
      ];

    return (
        <>
            <div className="p-5 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
              <>
                  {apartmentHomeData.map((item, i) => (
                      <Card style={{ width: "278px", height: "300px" }} key={i} className="rounded m-8"
                      onClick={() => { handleOpen(i+1) }}
                      >
                          <Card.Img variant="top" className="rounded card-image" src={toAbsoluteUrl(item.image)} />
                          <Card.Body className="m-5">
                              <Card.Title className='aptType'>{item.residenceName}</Card.Title>
                              <Card.Text className='aptTypeadd'>{item.address}</Card.Text>
                          </Card.Body>
                      </Card>
                  ))}
              </>
          </div>
        </>
    )
}

const mapStateToProps = (state) => {
    const { DashboardlistStore } = state;
    return {
        Dashboardlists: DashboardlistStore && DashboardlistStore.Dashboardlists ? DashboardlistStore.Dashboardlists : '',
        loading: DashboardlistStore && DashboardlistStore.loading ? DashboardlistStore.loading : false,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getdispatchlistDispatch: (params) => dispatch(DashboardActions.getdashboardlist(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentAdminHome)