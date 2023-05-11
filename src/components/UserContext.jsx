import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState('user');

    const switchUserRole = () => {
        setUserRole((prevRole) => (prevRole === 'user' ? 'admin' : 'user'));
    };

    return (
        <UserContext.Provider value={{ userRole, switchUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
