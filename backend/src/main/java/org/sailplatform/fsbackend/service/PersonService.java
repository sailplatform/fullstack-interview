package org.sailplatform.fsbackend.service;

import java.util.List;
import java.util.Optional;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    public Person add(Person toAdd) {

        return personRepository.save(toAdd);
    }

    public List<Person> getAll() {
        return personRepository.findAll();
    }

    /***
     * Searches for a person in the database by first and last name; Helper method
     * @param toSearch Person object
     * @return Person object if found, null if not found
     */
    private Person searchPerson(Person toSearch){
        // create new person with original first and last name then use as example to find it in database
        Person t = new Person();
        t.setFirstName(toSearch.getFirstName());
        t.setLastName(toSearch.getLastName());
        Optional<Person> searchedPerson = personRepository.findOne(Example.of(t));

        if (searchedPerson.isPresent()) {
            return searchedPerson.get();
        }
        return null;
    }

    /***
     * Searches for a person in the database by first name; Helper method
     * @param firstName String
     * @return Person object if found, null if not found
     */
    private Person searchPerson(String firstName){
        Person searchPerson = new Person();
        searchPerson.setFirstName(firstName);
        return searchPerson(searchPerson);
    }

    /***
     * Updates a person in the database
     * @param original Entry of person object in database
     * @param toUpdate Person object with updated information
     * @return Updated object if found, null if not found
     */
    public Person update(Person original, Person toUpdate) {
//        https://thorben-janssen.com/spring-data-findbyid-getone-getbyid-and-findone/


        Person searchedPerson = searchPerson(original);
        // if search is valid, then update.
        if (searchedPerson!=null) {
            searchedPerson.setFirstName(toUpdate.getFirstName());
            searchedPerson.setLastName(toUpdate.getLastName());
            return personRepository.save(searchedPerson);
        }
        return null;
    }

    /***
     * Deletes a person in the database
     * @param toDelete Person object to delete
     * @return Deleted object if found, null if not found
     */
    public Person delete(Person toDelete){
        Person searchedPerson = searchPerson(toDelete);
        // if search is valid, then delete.
        if (searchedPerson!=null) {
            personRepository.delete(searchedPerson);
            return new Person();
        }
        return null;
    }

    /***
     * Searches for a person in the database by first name
     * @param firstName String
     * @return Searched Person object if found, null if not found
     */
    public Person searchPersonFirstName(String firstName){
        return searchPerson(firstName);
    }
}
