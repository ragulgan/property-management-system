import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { PropertySurveyNoActions } from '../../store/actions'

const SurveyNumber = (props) => {
  const boxShow = useRef()
    const {
        setSurveyNo,
        getPropertySurveyNolistDispatch,
        SurveyNumberlists,
        surveyNo
      } = props
    const [surveyNumber, setSurveyNumber] = useState(surveyNo ? surveyNo : '')
    const [surveyList, setSurveryList] = useState(false)
    const [label, setLabel] = useState(true)

    const handleChange = (e) => {
      setSurveyNumber(e.target.value)
      setSurveryList(true)
      setLabel(true)
    }

    useEffect(() => {
      setSurveyNumber(surveyNo)
    },[surveyNo])

    useEffect(() => {
        const handleOutsideClick = () => {
          setSurveryList(false)
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);

    useEffect(()=> {
      if(surveyNumber && surveyNumber.length > 0 && label) {
        const params = {
            surveyNo: surveyNumber
        }
        const delayDebounceFn = setTimeout(() => {
          getPropertySurveyNolistDispatch(params)
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
      }
    },[surveyNumber])

    const handleOption = (survey) => {
      setLabel(false)
      setSurveyNumber(survey.surveyNo)
      setSurveyNo(survey.surveyNo)
    }

  return (
      <div>
          <label className='font-size-xs font-weight-bold mb-3 form-label label-text-color'>
            Survey Number
          </label>
          <div className='w-75'>
              <input
                  placeholder='Enter survey Number'
                  className='form-control form-control-lg placeHolder p-3 position-relative'
                  onChange={handleChange}
                  value={surveyNumber}
                  type='text'
                  name='surveyNumber'
                  autoComplete='off'
              />
          </div>
          {surveyList ?
              <div className='w-50 survey-list position-absolute top-10'>
                  {SurveyNumberlists && SurveyNumberlists.data ? SurveyNumberlists.data.map((survey, index) => (
                      <div className='p-4 w-100 survey-option' key={index} onClick={() =>handleOption(survey)}>
                          {survey && survey.surveyNo}
                      </div>
                  )) : ''}
              </div> : null}
      </div>
  )
}

const mapStateToProps = (state) => {
    const { PropertySurveyNolistStore } = state;
    return {
      SurveyNumberlists: PropertySurveyNolistStore && PropertySurveyNolistStore.PropertySurveyNolists ? PropertySurveyNolistStore.PropertySurveyNolists : '',
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    getPropertySurveyNolistDispatch: (params) => dispatch(PropertySurveyNoActions.getPropertySurveyNolist(params))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SurveyNumber);