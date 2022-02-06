import style from "./FormsControls.module.scss"
import cn from "classnames";
import Icon from "../Icon/Icon";
import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { maxLenghtCreator } from "../../../utils/validators";

// type ErrorType = {

// }
interface InputType extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    register: any
    required?: boolean
    errors?: any
    maxLength?: number
    isErrorStyle?: boolean | null
}

interface TextareaType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    register: any
    required?: boolean
    errors?: any
    maxLength?: number
}

type CheckBoxType = Omit<InputType, 'maxLength' & 'isErrorStyle'>

export const Textarea:FC<TextareaType> = ({name, register, required, maxLength, errors, ...props}) => {
    let isError = errors.hasOwnProperty(name);
    let maxLengthCreated = maxLenghtCreator(maxLength);
    return (
        <div className={cn({[style.error]: isError})}>
            <textarea className={cn(style.textarea, style.entry_field)} {...register(name, {required, maxLengthCreated})} {...props}/>
            {isError
                ? (
                    <div className={style.errorContainer}>
                        <Icon name="form_error"/>
                        <span>{errors[name].message}</span>
                    </div>
                )
                : null   
            }             
        </div>
    )
}

export const Input:FC<InputType> = ({name, register, required, maxLength, errors, isErrorStyle, ...props}) => {
    console.log(errors)
    let isError = errors.hasOwnProperty(name);
    let maxLengthCreated = maxLenghtCreator(maxLength);
    console.log(maxLengthCreated)
    return (
        <div className={cn({[style.error]: isError || isErrorStyle})}>
            <input {...props} className={cn(style.input, style.entry_field)} {...register(name, {required, maxLength: maxLengthCreated})}/>
            {isError && errors[name].type !== "required"
                ? (
                    <div className={style.errorContainer}>
                        <Icon name="form_error"/>
                        <span>{errors[name].message}</span>
                    </div>
                )
                : null   
            }       
        </div>
    )
}

export const CheckBox:FC<CheckBoxType> = ({ register, name, required, errors }) => {
    let isError;
    if(required) {
        isError = errors.hasOwnProperty(name);
    }
    return (
        <div className={cn({[style.error]: isError})}>
            <input type={"checkbox"} className={cn(style.checkbox)} {...register(name, {required})}/>
            { isError
                ? (
                    <div className={style.errorContainer}>
                        <span>Field is required</span>
                    </div>
                )
                : null   
            }       
        </div>
    )
}