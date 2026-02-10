import { Formik, Field, Form } from 'formik'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {

    const [marketingPreferences, setMarketingPreferences] = useState([]);

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

        >
            {
                // function that renders the form
                (formik) => {
                    return (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field type="text" className="form-control" id="name" name="name" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Email</label>
                                <Field type="text" className="form-control" id="email" name="email" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Password</label>
                                <Field type="password" className="form-control" id="password" name="password" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Password</label>
                                <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
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
                            </div>

                            <input className="btn btn-primary mt-1 mb-3" type="submit" />
                        </Form>


                    )
                }
            }
        </Formik>
    </div>)
}