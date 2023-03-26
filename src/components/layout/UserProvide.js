// import React, { useState, useContext, useEffect } from 'react'

// const userContext = React.createContext();
// const userToggleContext = React.createContext();
// export function useUserContext() {
//     return useContext(userContext)
// }
// export function useUserToggleContext() {
//     return useContext(userToggleContext)
// }
// export function UserProvider({ children }) {
//     const [user, setUser] = useState(null);
   
//    useEffect( ()=>{
//         return(
//             let cambiaLogin = () => {
//                 console.log(user);
//                 debugger;
//                 if (user) {
//                     setUser(null)
//                 } else {
//                     setUser({
//                         name: 'luli',
//                         email: 'luli@email.com'
//                     })
//                 }
//             }
//         )
//     },[])

//     cambiaLogin();
    
//     return (
//         <userContext.Provider valor={user}>
//             <userToggleContext.Provider value={cambiaLogin}>
//                 {children}
//             </userToggleContext.Provider>
//         </userContext.Provider>
//     );
// }