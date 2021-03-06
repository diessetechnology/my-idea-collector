import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { NavLink } from 'react-router-dom';
import {compose} from "redux";

import {withTranslation} from "react-i18next";

class Header extends Component {

    renderSignButton() {
        const { t } = this.props;
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signout">{t("signout")}</NavLink>
                </li>
            )
        } else {
            return (
                [
                    <li className="nav-item" key="1">
                        <NavLink to="/signin" className="nav-link">{t("signin")}</NavLink>
                    </li>,
                    <li className="nav-item" key="2">
                        <NavLink to="/signup" className="nav-link">{t("signup")}</NavLink>
                    </li>
                ]
            )
        }
    }

    render() {
        const { t } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">My Idea Collector</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/public">{t("dashboard")}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/account">Account</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {this.renderSignButton()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default compose(connect(mapStateToProps, actions),withTranslation("header"))(Header)