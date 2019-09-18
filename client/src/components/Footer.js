import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { NavLink } from 'react-router-dom';
import {compose} from "redux";

import {withTranslation} from "react-i18next";

class Footer extends Component {


    render() {
        const { t } = this.props;
        return (
            <footer className="page-footer font-small blue">
                <div className="footer-copyright text-center py-3">© 2018 Copyright:
                        <a>Davide Salamino</a>
                    <a>Software sotto licenza MIT</a>
                </div>
                <div className="footer-copyright text-center py-3">
                    <a style={{backgroundColor: 'black', color: 'white', textDecoration: 'none', padding: '4px 6px', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', lineHeight: '1.2', display: 'inline-block', borderRadius: '3px'}} href="https://unsplash.com/@freegraphictoday?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from AbsolutVision"><span style={{display: 'inline-block', padding: '2px 3px'}}><svg xmlns="http://www.w3.org/2000/svg" style={{height: '12px', width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-2px', fill: 'white'}} viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" /></svg></span><span style={{display: 'inline-block', padding: '2px 3px'}}>{t("unsplashbadge")} AbsolutVision</span></a>
                </div>
            </footer>
        )
    }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default compose(connect(mapStateToProps, actions),withTranslation("footer"))(Footer)