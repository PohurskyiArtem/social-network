import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import { login } from '../../redux/auth-reducer.ts';
import { CheckBox, Input } from "../common/formsControls/FormsControls";
import styles from "./Login.module.scss";
import cn from "classnames";
import Icon from "../common/Icon/Icon";
import { useState } from "react";

const LoginForm = ({onSubmit, captchaUrl}) => {
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
                    label={"email"} 
                    placeholder={"Login"}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <div className={styles.fieldContainer}>
                <Input 
                type="password" 
                label={"password"} 
                placeholder={"Password"}
                register={register}
                errors={errors}
                required
                onKeyPress={event => event.key === 'Enter' && handleSubmit(onSubmit)()}
                />
            </div>
            <label className={styles.remember_label}>
                <span>Remember me</span>
                <CheckBox type="checkbox" label={"rememberMe"} register={register} />
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
                            label={"captcha"} 
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

const Login = ({login, captchaUrl, isAuth}) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = ({auth: {captchaUrl, isAuth}}) => ({ captchaUrl, isAuth })

export default connect(mapStateToProps, { login })(Login);