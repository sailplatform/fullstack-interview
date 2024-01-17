import React, {useEffect, useRef, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import axios from "axios";

/*
    This view deals with adding a new entity to the database.
    It takes in the first name and last name of the person.
    It then sends a post request to the server to add the person to the database.
 */
function AddView() {

    // create hooks for the input values on the form [firstname and lastname]
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    // create a hook for the submit button to be enabled or disabled, for form validation
    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

    // feedback for form validation
    let firstNameErrors = useRef(document.createElement("div"));
    let lastNameErrors = useRef(document.createElement("div"));

    const history = useHistory();

    //had to figure out the syntax for writing this in TS opposed to JS
    /*
    this function handles the change event for the first name input, to update the state
     */
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    /*
    this function handles the change event for the last name input, to update the state
     */
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    // QoL useEffect hook to validate the form and provide appropriate feedback
    // hook runs everytime the input value is updated.
    useEffect(() => {
        if (firstName.length > 1 && lastName.length > 1) {
            // if both inputs are valid, enable the submit button, clear the error messages
            setEnableSubmit(true);
            lastNameErrors.current.innerHTML = "";
            firstNameErrors.current.innerHTML = "";
        } else {
            // if either input is invalid, disable the submit button
            setEnableSubmit(false);
        }
        if (firstName.length < 2) {
            // if the first name is invalid, display error message
            firstNameErrors.current.innerHTML = "&#10060; First Name must be at least 2 characters";
        } else {
            firstNameErrors.current.innerHTML = "";
        }
        if (lastName.length < 2) {
            // if the last name is invalid, display error message
            lastNameErrors.current.innerHTML = "&#10060; Last Name must be at least 2 characters";
        } else {
            lastNameErrors.current.innerHTML = "";
        }
    }, [firstName, lastName]);


    /*
    handle the submit event for the form, post the data to the database on backend.
     */
    const submitForm = () => {
        // when I tried to use the axios to post a json of a person object, the response was null
        axios.post(`http://localhost:8080/add?` +
            `id=${0}&` +
            `firstName=${encodeURIComponent(firstName)}&` +
            `lastName=${encodeURIComponent(lastName)}`
        ).then((response) => {
            // feedback after submission of form
            if (response.status === 200) {
                alert("Person added to database");
                setFirstName("");
                setLastName("");
            } else {
                alert("Error adding to database");
            }
            // added as per requirement of the task.
            history.push("/");
        }).catch((err) => {
            console.warn(err);
        });
    }


    return <>

        <h1>Add Person</h1>

        {/*create a simple form with two inputs, labels and a submit button*/}
        <form>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" placeholder={"First Name"} value={firstName}
                       onChange={handleFirstNameChange}/>

            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" placeholder={"Last Name"} value={lastName}
                       onChange={handleLastNameChange}/>

            </div>
            <div>{enableSubmit && <button type="button" onClick={submitForm}>Add to Database</button>}

            </div>
        </form>

        {/*form validation feedback*/}
        <div ref={firstNameErrors}>
            &#10060; First Name must be at least 2 characters
        </div>
        <div ref={lastNameErrors}>
            &#10060; Last Name must be at least 2 characters
        </div>

        {/*option for user to go back to main page of listview*/}
        <div>
            <Link to={"/"}>View Persons</Link>
        </div>

    </>
        ;
}

export default AddView;