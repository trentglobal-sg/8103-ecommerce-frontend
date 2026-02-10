import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import * as Yup from 'yup';

import { useFlashMessage } from './FlashMessageStore';

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("The email address is invalid").required("Please enter your email"),
    password: Yup.string().min(8, "Password must be at least 8 characters")
        .required("A password is required"),
    confirmPassword: Yup.string().required("Please re-enter your password")
        .oneOf(
            [Yup.ref('password'), null], "Passwords must match"
        ),
    salutation: Yup.string().required("Please select a salutation"),
    country: Yup.string().required('Country is required'),
    marketingPreferences: Yup.array()
        .min(1, "Please choose at least one marketing preference")
})

export default function RegisterPage() {

    const [marketingPreferences, setMarketingPreferences] = useState([]);
    const {showMessage} = useFlashMessage();
    const [, setLocation] = useLocation();

    // set the starting values for all the form elements
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        salutation: "",
        marketingPreferences: [],
        country: "sg"

    }

    // function is called when the submit button is pressed
    const handleSubmit = (values, formikHelpers) => {
        console.log("values =", values);
        showMessage("You have registered successfully!", "success")
        setLocation('/');
    }

    useEffect(() => {
        const fetchMarketingPreferences = async () => {
            const response = await axios.get('/marketingPreferences.json');
            setMarketingPreferences(response.data);
        }
        fetchMarketingPreferences();
    }, [])

    return (<div className="container">
        <h1>Register Page</h1>
        {/* Begin Formik */}
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}

        >
            {
                // function that renders the form
                (formik) => {
                    return (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field type="text" className="form-control" id="name" name="name" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Email</label>
                                <Field type="text" className="form-control" id="email" name="email" />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Password</label>
                                <Field type="password" className="form-control" id="password" name="password" />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Password</label>
                                <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-danger" />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Salutation</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="mr"
                                            value="Mr"
                                        />
                                        <label className="form-check-label" htmlFor="mr">Mr</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="ms"
                                            value="ms"
                                        />
                                        <label className="form-check-label" htmlFor="ms">Ms</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="mrs"
                                            value="mrs"
                                        />
                                        <label className="form-check-label" htmlFor="mrs">Mrs</label>
                                    </div>
                                </div>
                                  <ErrorMessage
                                    name="salutation"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Marketing Preferences</label>

                                {
                                    marketingPreferences.map(p => (
                                        <div key={p.id} className="form-check">
                                            <Field
                                                type="checkbox"
                                                name="marketingPreferences"
                                                value={String(p.id)}
                                                className="form-check-input"
                                                id={"marketingPreferences-" + p.id}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={"marketingPreferences-" + p.id}
                                            >{p.name}</label>
                                        </div>
                                    )
                                    )

                                }
                                  <ErrorMessage
                                    name="marketingPreferences"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <Field
                                    as="select"
                                    className="form-select"
                                    id="country"
                                    name="country"
                                >
                                    <option value="">Select Country</option>
                                    <option value="sg">Singapore</option>
                                    <option value="my">Malaysia</option>
                                    <option value="in">Indonesia</option>
                                    <option value="th">Thailand</option>
                                </Field>
                                  <ErrorMessage
                                    name="country"
                                    component="div"
                                    className="text-danger" />
                            </div>

                            <input className="btn btn-primary mt-1 mb-3" type="submit" />
                        </Form>


                    )
                }
            }
        </Formik>
    </div>)
}