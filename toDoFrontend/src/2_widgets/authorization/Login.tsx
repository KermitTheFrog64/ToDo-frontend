import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import * as Yup from "yup"
import { logIn } from "./auth-slice"
import { LogInPayload } from "../../5_shared/types"

const LogIn: React.FC = () => {

    const dispatch = useAppDispatch()

    const initialValues: LogInPayload = {
        email: '',
        password: ''
    }

    const onSubmit = (values: LogInPayload) => {
        dispatch(logIn(values))
        
    }

    return (
        <div className="block row">
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().required('Это поле обязательно'),
                    password: Yup.string().required('Это поле обязательно'),
                })}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name="email" type="text" placeholder="E-mail" autoFocus={true} />
                    <br />
                    <ErrorMessage name="email" />

                    <Field name="password" type="password" placeholder="Пароль" />
                    <br />
                    <ErrorMessage name="password" />

                    <button type="submit" className="authorization-button" >
                        Log in
                    </button>

                </Form>
            </Formik>
        </div>
    )
}

export default LogIn