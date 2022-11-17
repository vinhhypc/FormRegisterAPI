import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import axios from "axios";
function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50).required("You must fill this feild!"),
    phone: Yup.string()
      .required("You must fill this feild!")
      .matches(
        /((\+89)|0)[.\- ]?[0-9][.\- ]?[0-9][.\- ]?[0-9]/,
        "Phone is not available!"
      ),
    email: Yup.string().email().required("You must fill this feild!"),
    userName: Yup.string().required("You must fill this feild!"),
    password: Yup.string().required("You must fill this feild!"),
  });
  // const handleChange =() =>{
  //   setForm({ name: "", email: "", phone: "", userName: "", password: "" });
  // }
  async function handleSubmit(values) {
    console.log(values);
    await axios.post("http://localhost:3001/users", {
      name: values.name,
      email: values.email,
      phone: values.phone,
      userName: values.userName,
      password: values.password,
    })
    .then(res =>{
      setForm([{ name: "", email: "", phone: "", userName: "", password: "" }])
    })
    .catch (err =>{console.log(err)})
   
  };

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center"> Register Form</h2>
      <hr></hr>
      <Formik
        initialValues={form}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <p className="m-0">Enter Your Name</p>
            <Field
              name="name"
              autoComplete="off"
              className="mb-3"
              // value={form.name || ""}
              // onChange={handleChange}
            ></Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="name"
            ></ErrorMessage>

            <p className="m-0">Enter Your Phone</p>
            <Field
              name="phone"
              autoComplete="off"
              className="mb-3"
              // value={form.phone || ""}
              // onChange={handleChange}
            ></Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="phone"
            ></ErrorMessage>

            <p className="m-0">Enter Your Email</p>
            <Field
              name="email"
              autoComplete="off"
              className="mb-3"
              // value={form.email || ""}
              // onChange={handleChange}
            ></Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="email"
            ></ErrorMessage>

            <p className="m-0">Enter Your Username</p>
            <Field
              name="userName"
              autoComplete="off"
              className="mb-3"
              // value={form.userName || ""}
              // onChange={handleChange}
            ></Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="userName"
            ></ErrorMessage>

            <p className="m-0">Enter Your Password</p>
            <Field
              // onChange={handleChange}
              // value={form.password || ""}
              name="password"
              type="password"
              autoComplete="off"
              className="mb-3"
            ></Field>
            <ErrorMessage
              component="div"
              className="text-danger"
              name="password"
            ></ErrorMessage>
            <br />
            <button
              type="submit"
              className="btn btn-success mt-0"
              onClick={handleSubmit}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
