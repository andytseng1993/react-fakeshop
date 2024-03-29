# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**


### scroll lock
```
const lockScroll = React.useCallback(
  () => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
  }, [])

```
### install firebase
add firebase SDK into ```firebase.js```
```
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
```
then follow ther [firebase build document](https://firebase.google.com/docs/auth/web/start)

create ```signup (email,password),login(email,password),logout()``` function in ```UserAuthContext.js```

### Protected Routes
create a ProtectedRoute, when there is a logged in user, the Home component does not run into the if-else condition's block and renders the actual content of the Home component instead.```return children ? children : <Outlet />;```
 If there is no logged in user, the user will experience a redirect from the protected page.```return <Navigate to={redirectPath} replace />;``` 

 ### line-clamp
 ```line-clamp: [none | <integer>];```
  1. <integer>: sets the maximum number of lines before truncating the content and then displays an ellipsis (…) at the end of the last line.
  
  ```
      .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
      }
  ```

  ### axios cancel
  `const cancelToken= axios.CancelToken.source()`
  we can use in useEffect with cleanup function to stop fetch the data.

  ### Address autocomplete
  https://www.npmjs.com/package/react-places-autocomplete#onSelect
  
  ### react-async-script
  https://www.npmjs.com/package/react-async-script
  ### react-phone-number-input
  https://catamphetamine.gitlab.io/react-phone-number-input/

  ### Using hidden file input elements using the click() method
  Use input element with display:none and calling the click() method on the <input> element.

  ### react-query 
  https://tanstack.com