// // Hook (auth.js)
// import React, { useState, useEffect, useContext, createContext } from "react";

// const authContext = createContext();

// // Provider component that wraps your app and makes auth object ...
// // ... available to any child component that calls useAuth().
// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// // Hook for child components to get the auth object ...
// // ... and re-render when it changes.
// export const useAuth = () => {
//   return useContext(authContext);
// };

// // Provider hook that creates auth object and handles state
// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   // signin method
//   const signin = (email, password) => {
//     let params = {
//       email,
//       password,
//     };
//     return fetch("http://localhost:3001/login/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     }).then((res) => {
//       console.log(res.text());
//       setUser(res.user);
//       return res.user;
//     });
//   };

//   const signup = (username, email, password) => {
//     let params = {
//       email,
//       username,
//       password,
//     };

//     return fetch("http://localhost:3001/login/signup/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     })
//       .then((res) => res.text())
//       .then((body) => {
//         try {
//           return JSON.parse(body);
//         } catch {
//           return { error: "Error: Try again" };
//         }
//       })
//       .then((res) => {
//         if (res.error) this.setState({ apiResponse: res.error });
//         else this.setState({ apiResponse: res.message });
//       });
//   };

//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//       });
//   };

// //   const sendPasswordResetEmail = (email) => {
// //     return firebase
// //       .auth()
// //       .sendPasswordResetEmail(email)
// //       .then(() => {
// //         return true;
// //       });
// //   };

// //   const confirmPasswordReset = (code, password) => {
// //     return firebase
// //       .auth()
// //       .confirmPasswordReset(code, password)
// //       .then(() => {
// //         return true;
// //       });
// //   };

//   // Subscribe to user on mount
//   // Because this sets state in the callback it will cause any ...
//   // ... component that utilizes this hook to re-render with the ...
//   // ... latest auth object.
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(false);
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   // Return the user object and auth methods
//   return {
//     user,
//     signin,
//     signup,
//     signout,
//     sendPasswordResetEmail,
//     confirmPasswordReset,
//   };
// }
