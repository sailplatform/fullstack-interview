package org.sailplatform.fsbackend.model;

public class PersonUpdate {
    private Person old;
    private Person latest;

    public PersonUpdate(Person old, Person latest){
        this.old = old;
        this.latest = latest;
    }

    public Person getOld(){
        return old;
    }

    public Person getLatest(){
        return latest;
    }
}
