import React from 'react';
import "./settingsPage.css"
import {useNavigate} from "react-router";

const SettingsPage = () => {

    const navigate = useNavigate();
    return (
        <div className="settings-container">
            <div className="wrapper">
                <div className="input-data">
                    <input type="password" required autoComplete="off"/>
                    <div className="underline"></div>
                    <label form="name">Enter current password</label>
                </div>

                <div className="input-data">
                    <input type="password" required autoComplete="off"/>
                    <div className="underline"></div>
                    <label form="name">Enter new password</label>
                </div>

                <div className="input-data">
                    <input type="password" required autoComplete="off"/>
                    <div className="underline"></div>
                    <label form="name">Re-enter new password</label>
                </div>

                <div className="button-group">
                <button className="custom-btn cancel" onClick={() => {
                    navigate("/home");
                }}>Cancel</button>
                <button className="custom-btn">Save</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;