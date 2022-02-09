import styles from "./Contacts.module.scss";
import Icon from "../../../common/Icon/Icon";
import { FC } from "react";
import { ContactsType } from "../../../../redux/types";

const Contacts: FC<{contacts: Partial<ContactsType>}> = ({contacts}) => {
    return (
        <div className={styles.contacts}>
            <span className={styles.contactsTitle}>Contacts:</span>
            <ul className={styles.contactsList}>
                {
                    Object.keys(contacts)
                    .map((key) => {
                        return <Contact key={key} contactTitle={key} contactValue={contacts[key as keyof ContactsType]!} />
                    })
                }
            </ul>
        </div>
    )
}

const Contact: FC<{contactTitle: string, contactValue: string}> = ({contactTitle, contactValue}) => {
    return <li className={styles.contactsItem}><a rel="noreferrer" href={contactValue} target="_blank"><Icon name={contactTitle}/></a></li>
}

export default Contacts