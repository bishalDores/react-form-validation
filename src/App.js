import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formError, ...rest}) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formError).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName : null,
            lastName:null,
            email:null,
            password:null,
            formError:{
                firstName: "",
                lastName:"",
                email: "",
                password:""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        // console.log(e.target.name)
        const { name,value } = e.target;
        let formErrors = {...this.state.formError};
        // console.log(name);
        // console.log(value)
        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 3 ? 'minimum 3 character required':'';
                break;
            case 'lastName':
                formErrors.lastName = value.length < 3 ? 'minimum 3 character required':'';
                break;

            case 'email':
                formErrors.email = emailRegex.test(value) ? '':'invalid email address';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'minimum 6 character required':'';
                break;
            default:
                break;
        }

        this.setState({formError:formErrors,[name]:value},()=>console.log(this.state));

    }

    render(){
        const { formError } = this.state;
        return(
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create Account</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className={formError.firstName.length > 0 ? "error":'null'}
                                placeholder="First Name"
                                name="firstName"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formError.firstName.length > 0 && (
                                <span className="errorMessage">{formError.firstName}</span>
                            )}
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className={formError.lastName.length > 0 ? "error":'null'}
                                placeholder="Last Name"
                                name="lastName"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formError.lastName.length > 0 && (
                                <span className="errorMessage">{formError.lastName}</span>
                            )}
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={formError.email.length > 0 ? "error":'null'}
                                placeholder="Email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formError.email.length > 0 && (
                                <span className="errorMessage">{formError.email}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={formError.password.length > 0 ? "error":'null'}
                                placeholder="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formError.password.length > 0 && (
                                <span className="errorMessage">{formError.password}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Create Account</button>
                            <small>Already Have An Account?</small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;
