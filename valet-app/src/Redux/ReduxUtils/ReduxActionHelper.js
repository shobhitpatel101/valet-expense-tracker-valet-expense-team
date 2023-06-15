import axios from 'axios';
import { handleInputError, handleResponseSuccess } from '../../Utils/HelperFunction';
import { handleApiError } from '../../Utils/HelperFunction';
import { useNavigate } from 'react-router-dom';


export const asyncActionTypeCreator = actionName =>({
     pending:`${actionName}_PENDING`,
     fulfilled:`${actionName}_FULFILLED`,
     rejected:`${actionName}_REJECTED`
})

export const normalActionCreator = type =>({
    type,
})

export const payloadActionCreator = (type,payload) =>({
    type,
    payload,
})

export const asyncActionCreator =(actionType)=>{
    
    const pending =()=>(normalActionCreator(actionType.pending));
    const fulfilled =(payload)=>(payloadActionCreator(actionType.fulfilled,payload));
    const rejected =(error)=>(payloadActionCreator(actionType.rejected,error));

    const action=(axiosConfig,successCallback,errorCallback) =>((dispatch)=>{
         dispatch(pending());
         return axios(axiosConfig).then((response)=>{
            dispatch(fulfilled(response.data));
            handleResponseSuccess(response.data)
            if(successCallback)successCallback(response.data)
         }).catch((error)=>{
            
            switch(error.response.status) {
               case 403:
                localStorage.removeItem('valet-auth-token')
                window.location.href = '/'
                break;
               default:
                handleInputError("Something went wrong , please try again later.")
            } 
            dispatch(rejected(error))
            if(errorCallback)errorCallback(error)
         })
    });

    return {
        pending,
        fulfilled,
        rejected,
        action
    }
}