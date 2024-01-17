import Person from "../models/Person";
import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

/*
❗There is no form validation on this view
*/

/*
    This view deals with deletion of a current entity in the database.
    It takes in the name of the person.
    And sends a post request to the server to delete the person in the database.

 */
const DeleteView = () => {

    const [person, setPerson] = useState<Person>({});

    // handle the change event for person's name updation on the form
    const handlePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "firstName") {
            setPerson({firstName: e.target.value, lastName: person.lastName});
        }
        if (e.target.id === "lastName") {
            setPerson({lastName: e.target.value, firstName: person.firstName});
        }
    }

    //handle the submit event and handle axios post request
    const handleSubmit = () => {
        axios.post("http://localhost:8080/delete", person).then((response) => {
            if (response.status === 200 && response.data === true) {
                alert("Person deleted");
            } else {
                alert("Person not found in database");
            }
        }).catch((err) => {
            console.warn(err);
        });
    }

    return <div>
        <h1>Delete View</h1>
        <form>
            <div>
                <label htmlFor={"firstName"}>First Name</label>
                <input type={"text"} value={person.firstName} name={"firstName"} id={"firstName"}
                       placeholder={"First Name"} onChange={handlePerson}/>
            </div>
            <div>
                <label htmlFor={"lastName"}>Last Name</label>
                <input type={"text"} value={person.lastName} name={"lastName"} id={"lastName"} placeholder={"Last Name"}
                       onChange={handlePerson}/>
            </div>
            <div>
                <button type={"button"} onClick={handleSubmit}>Delete from Database</button>
            </div>
        </form>
        <div>
            <Link to={"/"}>View Persons</Link>
        </div>
    </div>;
}

export default DeleteView;