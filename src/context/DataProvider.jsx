import React, { useEffect, createContext, useState } from 'react'
import axios from 'axios'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('ka')
    const [data, setData] = useState([])


    useEffect(() => {
        axios
            .get(`https://cms.meamacollect.ge/meama-collect/api/client/${selectedLanguage}`)
            .then((res) => setData(res.data))
    }, [selectedLanguage])

    // console.log(selectedLanguage)

    return (
        <DataContext.Provider value={{ data, setData, selectedLanguage, setSelectedLanguage }}>
            {children}
        </DataContext.Provider>
    )
}
