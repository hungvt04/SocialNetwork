import { LOCAL_STORAGE_USERNAME } from '../constants/BaseApi';

const PrivateRoute = ({children}) => {

    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME);
    
    return username && children
}

export default PrivateRoute
