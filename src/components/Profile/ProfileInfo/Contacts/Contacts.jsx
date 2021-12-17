import styles from "./Contacts.module.scss";
import Icon from "../../../common/Icon/Icon";

const Contacts = ({contacts}) => {
    const contactsArray = [];
    for(let key of Object.keys(contacts)) {
        if(contacts[key] !== null) contactsArray.push(<Contact key={key} contactTitle={key} contactValue={contacts[key]}/>)
    }
    return contactsArray.length > 0 ? (
        <div className={styles.contacts}>
            <span className={styles.contactsTitle}>Contacts:</span>
            <ul className={styles.contactsList}>
                {contactsArray.map(contact => contact)}
            </ul>
        </div>
    ) : null
}

const Contact = ({contactTitle, contactValue}) => {
    return <li className={styles.contactsItem}><a rel="noreferrer" href={contactValue} target="_blank"><Icon name={contactTitle}/></a></li>
}

export default Contacts;