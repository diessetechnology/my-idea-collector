import React, {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import CenterCard363 from './centerCard363';
import useForm from '../use-form-react';
import {useTranslation} from "react-i18next";
import CenterLoading from "./centerLoading";

const Account = () => {
  // eslint-disable-next-line no-unused-vars
    const {t, i18n} = useTranslation("account");
    const [editing, setEditting] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [profile, setProfile] = useState({});
    const options = {
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        callback: () => {
            updateUserProfile(inputs)
        },
        debug: false
    }
    const {setInputs, onSubmit, onChange, inputs, dirty, reset} = useForm('AdvanceForm', options);
    const tryConnect = () => axios.get(`/auth-ping`).then(r => setStatus(r.data));
    const getUserProfile = () => axios.get(`/user/profile`).then(r => {
        setProfile(r.data)
        setInputs({
            firstName: r.data.name.first,
            lastName: r.data.name.last,
            email: r.data.email
        })
        setErrMsg();
    });
    const updateUserProfile = () => {
        axios.post(`/user/profile`, inputs)
            .then(() => cancelForm())
            .catch(e => setErrMsg(`${e.response.data}. Please try it again.`));
    }
    useEffect(() => {
        tryConnect();
        getUserProfile();
    }, [])
    const switchEditting = () => {
        setEditting(!editing)
    }
    const cancelForm = () => {
        setEditting(false)
        reset();
        getUserProfile();
    }
    const renderButtons = () => {
        if (editing) {
            return (<div className="form-group">
                <button disabled={!dirty} type="submit"
                        className="btn-lg btn btn-light btn-block">{t("savechanges")}</button>
                <button className="btn-lg btn btn-secondary btn-block" onClick={cancelForm}>{t("cancel")}</button>
            </div>)
        } else {
            return (
                <button className="btn btn-light btn-lg btn-block" onClick={switchEditting}>{t("updateinfo")}</button>)
        }
    }
    const renderProfileForm = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>{t("firstname")}</label>
                    <input
                        disabled={!editing}
                        type='text'
                        name="firstName"
                        onChange={onChange}
                        value={inputs.firstName}
                        className="form-control form-control-lg"
                        placeholder="First Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>{t("lastname")}</label>
                    <input
                        disabled={!editing}
                        type='text'
                        name="lastName"
                        onChange={onChange}
                        value={inputs.lastName}
                        className="form-control form-control-lg"
                        placeholder="Last Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        disabled
                        readOnly
                        type='email'
                        name="email"
                        onChange={onChange}
                        value={inputs.email}
                        className="form-control form-control-lg"
                        placeholder="sample@email.com"
                        required
                    />
                </div>
                {dirty && <div className="form-group">
                    <label>Password:</label>
                    <input
                        type='password'
                        name="password"
                        onChange={onChange}
                        value={inputs.password}
                        className={(errMsg) ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                        placeholder="your password"
                        required
                    />
                    {(errMsg) && <div className="invalid-feedback">
                        {errMsg}
                    </div>}
                </div>}
                <div style={{'paddingTop': '30px'}}>
                    {renderButtons()}
                </div>
            </form>);
    }
    return (
        <Suspense fallback={<CenterLoading/>}>
            <CenterCard363>
                <div className='card border-secondary'>
                    <h4 className="card-header">
                        Account
                    </h4>
                    <div className='card-body'>
                        {profile && renderProfileForm()}
                    </div>
                </div>
            </CenterCard363>
        </Suspense>
    );
}

export default Account;
