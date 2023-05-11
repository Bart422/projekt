import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const About = () => {
    const { userRole, switchUserRole } = useContext(UserContext);


    return (
        <div>
            <div>
                <h1>Azil za zivotinje</h1>
                <div>
                    {userRole == "admin"
                        ? <div> <p>Imate ulogu admina</p> <button onClick={switchUserRole}>Izadi iz admin nacina</button></div>
                        : <div><p>Nemate ulogu admina</p> <button onClick={switchUserRole}>Udite u admin mode</button></div>}
                </div>
            </div>



        </div>
    );
};

export default About;
