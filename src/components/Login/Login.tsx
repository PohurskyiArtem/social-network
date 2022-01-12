import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import { login } from '../../redux/auth-reducer';
import { CheckBox, Input } from "../common/formsControls/FormsControls";
import styles from "./Login.module.scss";
import cn from "classnames";
import Icon from "../common/Icon/Icon";
import { FC, useState } from "react";
import { AppStateType } from "../../redux/store";
import { FormDataType } from "../../redux/auth-reducer";

type LoginFormPropsType = {
    onSubmit: (formData: FormDataType) => void,
    captchaUrl: string | null
}

const LoginForm:FC<LoginFormPropsType> = ({onSubmit, captchaUrl}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [submitError, setSubmitError] = useState(null);

    return (
        <form onSubmit={(e) => {
            handleSubmit(onSubmit)(e)
                .catch(e => setSubmitError(e))
            }}  
            className={styles.form}
        >
            <div className={styles.fieldContainer}>
                <Input 
                    type="text" 
                    name={"email"} 
                    placeholder={"Login"}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <div className={styles.fieldContainer}>
                <Input 
                type="password" 
                name={"password"} 
                placeholder={"Password"}
                register={register}
                errors={errors}
                required
                onKeyPress={event => event.key === 'Enter' && handleSubmit(onSubmit)()}
                />
            </div>
            <label className={styles.remember_label}>
                <span>Remember me</span>
                <CheckBox type="checkbox" name={"rememberMe"} register={register} />
            </label>
            {
                submitError && (
                    <div className={styles.formSummaryError}>
                        <Icon name="error_info"/>
                        {submitError}
                    </div>
                )
            }
            {
                captchaUrl && (
                    <div className={styles.captchaContainer}>
                        <img src={captchaUrl} alt={"Captcha"}/>
                        <Input 
                            type={"text"} 
                            name={"captcha"} 
                            placeholder={"Enter symbols from image"}
                            register={register}
                            errors={errors}
                            required
                            onKeyPress={event => event.key === 'Enter' && handleSubmit(onSubmit)()}
                        />
                    </div>
                )
            }
            <button className={cn("submit_btn", styles.submit)}>Login</button>
        </form>
    )
}

type MapStatePropsType = {
    captchaUrl: string | null,
    isAuth: boolean
}

type MapDispatchPropsType  ={
    login: (formData: FormDataType) => void
}

const Login:FC<MapStatePropsType & MapDispatchPropsType> = ({login, captchaUrl, isAuth}) => {
    const onSubmit = (formData: FormDataType) => {
        return login({...formData})
    }

    if(isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div className={styles.login}>
            <div className={styles.container}>
            <span className={styles.header}>Login</span>
                <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
            </div>  
        </div>
    )
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => ({ 
    captchaUrl: state.auth.captchaUrl, 
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);