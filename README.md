# Memories
Backend
    npm i body-parser cors express mongoose dotenv nodemon
        Body-parser = to send post requests
        cors = enables cross origin requests

Frontend
    npm i axios moment react-file-base64 redux redux-thunk react-redux @material-ui/core
        axios = For api requests
        moment = Library for working with time and date
        react-file-base = To convert images
        redux = For managing and centralizing application state
        redux-thunk = For asynchronous actions using redux

    import Provider in index.js
        Provider keeps a track of the store acts as global state so the state can be accessed from anywhere inside the app
    Import createStore, applyMiddleware, compose
    Import thunk

    When action gets dispatched in App.js the flow goes to post reducer where the logic is done
