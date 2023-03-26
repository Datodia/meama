import React, { createContext, useState } from 'react'

export const LangContext = createContext()

export const LangProvider = ({ children }) => {

    const [selectedLanguage, setSelectedLanguage] = useState('ka');


    return (
        <LangContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LangContext.Provider>
    )
}
