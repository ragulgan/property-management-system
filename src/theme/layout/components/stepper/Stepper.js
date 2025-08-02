import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const Stepper = (props) => {
  const {
    completedSteps,
    activeStep,
    stepperArr,
    setActiveStep,
    setCompletedSteps
  } = props

  const arr = [
    {
      stepperLabel: 'Basic Info',
      Optional: 'Optional'
    },
    {
      stepperLabel: 'User Info',
      Optional: 'Optional'
    },
    {
      stepperLabel: 'Merchant Info',
      Optional: 'Optional'
    },
    {
      stepperLabel: 'Package',
      Optional: 'Optional'
    },
    {
      stepperLabel: 'Package',
      Optional: 'Optional'
    },
    {
      stepperLabel: 'Package',
      Optional: 'Optional'
    }
  ]

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
      <div className='stepper-horizontal' id='stepper1'>
        {
         stepperArr.length > 0 && stepperArr.map((item, i) => (
           <div
             className={`step ${arryIncludes(i) ? 'done' : ''} ${activeStep === i ? 'editing' : ''}`}
             key={i}
             onClick={() => { onStepperClick(i) }}
           >
             <div className='step-circle'><span>
               {
                  arryIncludes(i)
                    ? (
                      <i className={`bi bi-check fa-lg m-auto ${activeStep === i ? 'text-dark' : 'text-white'}`} />
                      )
                    : (
                      <span>{i + 1}</span>
                      )
                }
             </span>
             </div>
             <div className='step-title'>{item.stepperLabel}</div>
             <div className='step-optional'>{item.Optional}</div>
             <div className='step-bar-left' />
             <div className='step-bar-right' />
           </div>
         ))
        }
      </div>
    </>
  )
}

Stepper.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  completedSteps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  stepperArr: PropTypes.array.isRequired
}
