import Person from "../models/Person";
import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

/*
❗There is no form validation on this view
 */

/*
    This view deals with updation of a current entity in the database.
    It takes in the old name of the person, and the new name of the person.
    It then sends a post request to the server to update the person in the database.
 */
const EditView = () => {

    const [oldName, setOldName] = useState<Person>({});
    const [newName, setNewName] = useState<Person>({});

    //handle the change event for old name
    const handleOldName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "oldFirstName") {
            setOldName({firstName: e.target.value, lastName: oldName.lastName});
        }
        if (e.target.id === "oldLastName") {
            setOldName({lastName: e.target.value, firstName: oldName.firstName});
        }
    }

    //handle the change event for new name
    const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "newFirstName") {
            setNewName({firstName: e.target.value, lastName: newName.lastName});
        }
        if (e.target.id === "newLastName") {
            setNewName({lastName: e.target.value, firstName: newName.firstName});
        }
    }

    //handle the submit event and handle axios post request
    const handleSubmit = () => {
        const personPackage = {
            old: oldName,
            latest: newName
        }
        console.log(personPackage);
        axios.post("http://localhost:8080/update", personPackage, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200 && response.data === true) {
                alert("Person edited");
            } else {
                alert("Person not found in database");
            }
        }).catch((err) => {
            console.warn(err);
        });
    }

    return <div>
        <h1>Edit View</h1>
        <form>
            <div className={"old"}>
                <div>
                    <label htmlFor={"oldFirstName"}>Old First Name</label>
                    <input type={"text"} name={"oldFirstName"} id={"oldFirstName"} placeholder={"Old First Name"}
                           onChange={handleOldName}/>
                </div>
                <div>
                    <label htmlFor={"oldLastName"}>Old Last Name</label>
                    <input type={"text"} name={"oldLastName"} id={"oldLastName"} placeholder={"Old Last Name"}
                           onChange={handleOldName}/>
                </div>
            </div>
            <div className={"new"}>
                <div>
                    <label htmlFor={"newFirstName"}>New First Name</label>
                    <input type={"text"} name={"newFirstName"} id={"newFirstName"} placeholder={"New First Name"}
                           onChange={handleNewName}/>
                </div>
                <div>
                    <label htmlFor={"newLastName"}>New Last Name</label>
                    <input type={"text"} name={"newLastName"} id={"newLastName"} placeholder={"New Last Name"}
                           onChange={handleNewName}/>
                </div>

            </div>
            <div>
                <button type={"button"} onClick={handleSubmit}>Submit Changes</button>
            </div>
        </form>
        <div>
            <Link to={"/"}>View Persons</Link>
        </div>
    </div>;
}

export default EditView;