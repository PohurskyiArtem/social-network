import { FC, useState } from "react"
import styles from "./Pagination.module.scss";

const UserInput: FC<{lastPageNumber: number, goToPage: (inputValue: number) => void}> = ({lastPageNumber, goToPage}) => {
    const [inputValue, changeInputValue] = useState("");
    return (
        <div className={styles.userInput}>
            <input type="text" value={inputValue} className={"entry_field"} onChange={e => changeInputValue(e.target.value)}/>
            <button
                className={"submit_btn"}
                disabled={inputValue === "" || +inputValue > lastPageNumber || +inputValue <= 0 || !(+inputValue) }
                onClick={() => {
                    changeInputValue("");
                    goToPage(+inputValue)
                }}
            >Go to</button>
        </div>
    )
}

export default UserInput;