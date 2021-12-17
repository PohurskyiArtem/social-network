import style from "./FormsControls.module.scss"
import cn from "classnames";
import Icon from "../Icon/Icon";

export const Textarea = ({label, register, required, maxLength, errors, ...props}) => {
    let isError = errors.hasOwnProperty(label);
    return (
        <div className={cn({[style.error]: isError})}>
            <textarea className={cn(style.textarea, style.entry_field)} {...register(label, {required, maxLength})} {...props}/>
            {isError
                ? (
                    <div className={style.errorContainer}>
                        <Icon name="form_error"/>
                        <span>{errors[label].message}</span>
                    </div>
                )
                : null   
            }             
        </div>
    )
}

export const Input = ({label, register, required, maxLength, errors, isErrorStyle, ...props}) => {
    let isError = errors.hasOwnProperty(label);
    return (
        <div className={cn({[style.error]: isError || isErrorStyle})}>
            <input {...props} className={cn(style.input, style.entry_field)} {...register(label, {required, maxLength})}/>
            {isError && errors[label].type !== "required"
                ? (
                    <div className={style.errorContainer}>
                        <Icon name="form_error"/>
                        <span>{errors[label].message}</span>
                    </div>
                )
                : null   
            }       
        </div>
    )
}

export const CheckBox = ({ register, label, required, errors }) => {
    let isError;
    if(required) {
        isError = errors.hasOwnProperty(label);
    }
    return (
        <div className={cn({[style.error]: isError})}>
            <input type={"checkbox"} className={cn(style.checkbox)} {...register(label, {required})}/>
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