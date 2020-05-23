import React from "react";
import { TemplateId, UserID } from "./config";
import emailjs from "emailjs-com";
import swal from "@sweetalert/with-react";

export const loading = () =>
  swal(
    <div className="d-flex justify-content-center text-success">
      <div className="spinner-border" role="status">
        <span className="sr-only">Sending</span>
      </div>
    </div>,
    { buttons: false }
  );

const Contact = () => {
  const [state, setState] = React.useState({
    formSubmitted: false,
    isSubmitting: true,
    formEmailSent: false,
  });

  const [feedback, setFeedback] = React.useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  //initialize email service
  emailjs.init(UserID);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message, phone } = feedback;
    setState({ ...state, isSubmitting: true });

    const emailParams = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    emailjs.send("default_service", TemplateId, emailParams, UserID).then(
      (result) => {
        console.log(result.text);
        swal(
          "Thanks for reaching out to us. We will talk to you as soon as possible ",
          `${result.text}`,
          "success"
        );
      },
      (error) => {
        swal(
          "Ooops! Something went wrong! Please contact us later! ",
          `${error.text}`,
          "error"
        );
        console.log(error.text);
      }
    );

    setState({ ...state, formSubmitted: true, isSubmitting: false });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "name"
      ? setFeedback({ ...feedback, name: value })
      : name === "email"
      ? setFeedback({ ...feedback, email: value })
      : name === "phone"
      ? setFeedback({ ...feedback, phone: value })
      : setFeedback({ ...feedback, message: value });
  };

  return (
    <div className="container-contact100">
      <div className="wrap-contact100">
        <div
          className="contact100-form-title"
          style={{ backgroundImage: "url(./assets/bg-01.jpg)" }}
        >
          <span className="contact100-form-title-1">Contact Us</span>

          <span className="contact100-form-title-2">
            Feel free to drop us a line below!
          </span>
        </div>

        <form className="contact100-form validate-form" onSubmit={handleSubmit}>
          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span className="label-input100">Full Name:</span>
            <input
              className="input100"
              type="text"
              name="name"
              placeholder="Enter full name"
              onChange={handleChange}
              required
            />
            <span className="focus-input100"></span>
          </div>

          <div
            className="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <span className="label-input100">Email:</span>
            <input
              className="input100"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter email addess"
              required
            />
            <span className="focus-input100"></span>
          </div>

          <div
            className="wrap-input100 validate-input"
            data-validate="Phone is required"
          >
            <span className="label-input100">Phone:</span>
            <input
              className="input100"
              type="tel"
              name="phone"
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
            <span className="focus-input100"></span>
          </div>

          <div
            className="wrap-input100 validate-input"
            data-validate="Message is required"
          >
            <span className="label-input100">Message:</span>
            <textarea
              className="input100"
              name="message"
              onChange={handleChange}
              placeholder="Your Comment..."
              required
            ></textarea>
            <span className="focus-input100"></span>
          </div>

          <div className="container-contact100-form-btn">
            <button className="contact100-form-btn" type="submit">
              <span>
                Submit
                <i
                  className="fa fa-long-arrow-right m-l-7"
                  aria-hidden="true"
                ></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
