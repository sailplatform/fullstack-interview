package org.sailplatform.fsbackend.controller;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.model.PersonUpdate;
import org.sailplatform.fsbackend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = { "*"})
public class PersonController {

    @Autowired PersonService personService;

    @GetMapping("/all")
	public List<Person> getAll() {
		return personService.getAll();
	}

    @PostMapping("/add")
	public Person add(Person toAdd) {
		return personService.add(toAdd);
	}

	/***
	 * Update endpoint for updating a person in database
	 * @param toUpdate Person object with updated information
	 * @return Updated object if found, null otherwise
	 */
	@PostMapping("/update")
	public Person update(@RequestBody PersonUpdate toUpdate) {
		// had to change the request to be in body than url params
		return personService.update(toUpdate.getOld(), toUpdate.getLatest());
	}

	/***
	 * Delete endpoint for deleting a person in database
	 * @param toDelete Person object to delete
	 * @return Empty Person object if found and deleted, null otherwise
	 */
	@PostMapping("/delete")
	public Person delete(Person toDelete){
		return personService.delete(toDelete);
	}

	/***
	 * Search endpoint for searching a person in database by first name
	 * @param toSearch String
	 * @return Person object if found, null otherwise
	 */
	@GetMapping("/search")
	public Person search(String toSearch){
		return personService.searchPersonFirstName(toSearch);
	}

}
