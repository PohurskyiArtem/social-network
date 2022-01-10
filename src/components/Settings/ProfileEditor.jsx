import { useForm } from "react-hook-form";
import { maxLenghtCreator } from "../../utils/validators/index.js";
import { CheckBox, Input, Textarea } from "../common/formsControls/FormsControls";
import styles from "./Settings.module.scss";
import cn from "classnames";
import Icon from "../common/Icon/Icon";
import { useState } from "react";

const ProfileEditor = ({saveProfile, profile}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        defaultValues: {...profile}
    })

    const [submitError, setSubmitError] = useState(null);

    const catchError = error => {
        //checking if error is invalid contact URL      
        if(error.includes("Invalid url")) {
            const contactFieldName = error.split(">")[1].slice(0, -1).toLowerCase();
            setSubmitError({
                type: "contact",
                name: contactFieldName
            })
        } else {
            setSubmitError({
                type: "global",
                text: error 
            })
        }
    }
    
    return (
            <form 
                onSubmit={(e) => {
                    handleSubmit(saveProfile)(e)
                        .catch(e => catchError(e))
                }} 
                className={styles.form}
            >
                <div className={styles.mainSettings}>
                    <h2 className={styles.title}>Profile settings:</h2>

                    <div className={styles.fieldContainer}>
                        <label>
                            <span>Full Name:</span>
                            <Input 
                                type={"text"}
                                label={"fullName"}
                                placeholder={"Enter your name"}
                                errors={errors}
                                register={register}
                                required
                                maxLength={maxLenghtCreator(100)}
                                onBlur={() => clearErrors()}
                            />
                        </label>
                    </div>
                    <div className={styles.fieldContainer}>
                        <label>
                            <span>About me:</span>
                            <Textarea
                                label={"aboutMe"}
                                placeholder={"About you info"}
                                errors={errors}
                                register={register}
                                maxLength={maxLenghtCreator(315)}
                            />
                        </label>
                    </div>
                    <div className={cn(styles.fieldContainer, styles.checkbox)}>
                        <label>
                            <span>Looking for a job:</span>
                            <CheckBox 
                                type={"checkbox"}
                                label={"lookingForAJob"}
                                register={register}
                            />
                        </label>
                    </div>
                    <div className={styles.fieldContainer}>
                        <label>
                            <span>My professional skills:</span>
                            <Textarea
                                label={"lookingForAJobDescription"}
                                placeholder={"Your skills"}
                                errors={errors}
                                register={register}
                                maxLength={maxLenghtCreator(100)}
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.contactsContainer}>
                    <h2 className={styles.title}>Contacts:</h2>

                    {profile.contacts && Object.keys(profile.contacts).map(key => {
                        //Checking for a Submit Error and matching an erroneous field
                        let invalidUrl = submitError && (submitError.type === "contact" && submitError.name === key.toLowerCase());

                        return (
                            <div className={cn(styles.fieldContainer)} key={key}>
                                <label>
                                    <span>{key}</span>
                                    <Input 
                                        type={"text"}
                                        label={"contacts." + key}
                                        placeholder={key}
                                        errors={errors}
                                        register={register}
                                        maxLength={maxLenghtCreator(250)}
                                        onBlur={() => clearErrors()}
                                        isErrorStyle={invalidUrl}
                                    />
                                </label>
                                { invalidUrl ? (
                                        <div className={cn({[styles.errorContainer]: true, [styles.activeError]: invalidUrl})}>
                                            <span>Invalid URL format</span>
                                        </div>
                                    )
                                    : null
                                }
                            </div>
                        )
                    })}
                </div>
                {
                    submitError && submitError.type === "global" ? (
                        <div>
                            <span>{submitError.text}</span>
                        </div>
                    ) : null
                }
                <button className={cn("submit_btn", styles.submit)}>Save <Icon name="save"/></button>
            </form>
    )
}

export default ProfileEditor;