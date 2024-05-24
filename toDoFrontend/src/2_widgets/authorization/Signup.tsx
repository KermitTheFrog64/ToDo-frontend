import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../5_shared/hooks/redux"

import * as Yup from "yup"
import YupPassword from 'yup-password'
import { SignUpPayload } from "../../5_shared/types"
import { signUp } from "./auth-slice"
YupPassword(Yup)

const SignUp: React.FC = () => {

    let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/

    const dispatch = useAppDispatch()

    const initialValues: SignUpPayload = {
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    const onSubmit = (values: SignUpPayload) => {
        dispatch(signUp(values))
    }

    return (
        <div className="block row">
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(40, 'Имя не должно превышать 40 знаков')
                        .required('Это поле обязательно'),
                    phoneNumber: Yup.string()
                        .max(11, 'Номер телефона не должен превышать 11 знаков')
                        .required('Это поле обязательно'),
                    email: Yup.string()
                        .email('Недопустимый Email адрес')
                        .matches(email_regx, 'Недопустимый Email адрес')
                        .required('Это поле обязательно'),
                    password: Yup.string()
                        .min(8, 'Пароль не должен быть меньше 15 знаков')
                        .minLowercase(1, 'Пароль должен содержать по крайней мере 1 букву в нижнем регистре')
                        .minUppercase(1, 'Пароль должен содержать по крайней мере 1 букву в верхнем регистре')
                        .minNumbers(1, 'Пароль должен содержать по крайней мере 1 цифру')
                        .minSymbols(1, 'Пароль должен содержать по крайней мере 1 сивол')
                        .required('Это поле обязательно'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
                })}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name="name" type="text" placeholder="Имя" autoFocus={true} />
                    <ErrorMessage name="name" />

                    <Field name="phoneNumber" type="text" placeholder="Номер телефона" />
                    <ErrorMessage name="phoneNumber" />

                    <Field name="email" type="text" placeholder="E-mail" />
                    <ErrorMessage name="email" />

                    <Field name="password" type="password" placeholder="Пароль" />
                    <ErrorMessage name="password" />

                    <Field name="passwordConfirmation" type="password" placeholder="Подтверждение пароля" />
                    <ErrorMessage name="passwordConfirmation" />

                    <button type="submit" className="authorization-button" >
                        Зарегестрироваться
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUp