/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { StepperComponent } from '../../../assets/ts/components'

interface ICreateAccount {
    appName: string
    category: string
    framework: string
    dbName: string
    dbType: string
    nameOnCard: string
    cardNumber: string
    cardExpiryMonth: string
    cardExpiryYear: string
    cardCvv: string
    saveCard: string
}

const inits: ICreateAccount = {
    appName: '',
    category: '1',
    framework: '1',
    dbName: '',
    dbType: '1',
    nameOnCard: 'Max Doe',
    cardNumber: '4111 1111 1111 1111',
    cardExpiryMonth: '1',
    cardExpiryYear: '2025',
    cardCvv: '123',
    saveCard: '1',
}

const createAppSchema = [
    Yup.object({
        appName: Yup.string().required().label('App name'),
        category: Yup.string().required().label('Category'),
    }),
    Yup.object({
        framework: Yup.string().required().label('Framework'),
    }),
    Yup.object({
        dbName: Yup.string().required().label('Database name'),
        dbType: Yup.string().required().label('Database engine'),
    }),
    Yup.object({
        nameOnCard: Yup.string().required().label('Name'),
        cardNumber: Yup.string().required().label('Card Number'),
        cardExpiryMonth: Yup.string().required().label('Expiration Month'),
        cardExpiryYear: Yup.string().required().label('Expiration Year'),
        cardCvv: Yup.string().required().label('CVV'),
    }),
]

const Main: FC = () => {
    const stepperRef = useRef < HTMLDivElement | null > (null)
    const stepper = useRef < StepperComponent | null > (null)
    const [currentSchema, setCurrentSchema] = useState(createAppSchema[0])
    const [initValues] = useState < ICreateAccount > (inits)

    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    }

    const prevStep = () => {
        if (!stepper.current) {
            return
        }

        stepper.current.goPrev()

        setCurrentSchema(createAppSchema[stepper.current.currentStepIndex - 1])
    }

    const submitStep = (values: ICreateAccount, actions: FormikValues) => {
        if (!stepper.current) {
            return
        }

        setCurrentSchema(createAppSchema[stepper.current.currentStepIndex])

        if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
            stepper.current.goNext()
        } else {
            stepper.current.goto(1)
            actions.resetForm()
        }
    }

    useEffect(() => {
        if (!stepperRef.current) {
            return
        }

        loadStepper()
    }, [stepperRef])

    return (
        <div className='modal fade' id='kt_modal_create_app' aria-hidden='true'>

        </div>
    )
}

export { Main }