import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const VerticalStepper = (props) => {
  const {
    completedSteps,
    activeStep,
    stepperArr,
    setActiveStep,
    setCompletedSteps
  } = props


  const arryIncludes = (currentId) => {
    return completedSteps.includes(currentId)
  }

  const onStepperClick = (currentId) => {
    const id = currentId - 1
    setActiveStep(currentId)
    if (completedSteps && !completedSteps.includes(id)) {
      setCompletedSteps((values) => ([...values, id]))
    }
  }


  return (
    <>

      <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
        <div className='stepper-nav ps-lg-10'>

        {
          stepperArr.length > 0 && stepperArr.map((item, i) => (
            <div
              className={`stepper-item ${arryIncludes(i) ? 'done' : ''} ${activeStep === i ? 'editing' : ''}`}
              key={i}
              onClick={() => { onStepperClick(i) }}
            >
                <div 
                className={`stepper-line w-40px ${activeStep === i ? 'text-dark' : 'text-dark'}`}
                />
              <div className='stepper-icon w-40px h-40px'>
                <span>
                  {
                    arryIncludes(i)
                      ? (
                        <i className={`fas fa-check  ${activeStep === i ? 'text-danger' : 'text-primary'}`} />
                      )
                      : (
                        <span className='stepper-number'>{i + 1}</span>
                      )
                  }
                </span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{item.stepperLabel}</h3>
                <div className='stepper-desc'>{item.stepperLabel}</div>
              </div>
              <div className='step-bar-left' />
              <div className='step-bar-right' />
            </div>
          ))
        }
      </div>
      </div>

    </>
  )
}

VerticalStepper.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  completedSteps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  stepperArr: PropTypes.array.isRequired
}
