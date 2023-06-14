import { useState,useEffect, createContext } from "react";
import { useSelector ,shallowEqual,useDispatch} from "react-redux";
import { getAccountsData } from "../DashBoard/AppBar/Accounts";
import { useMemo } from "react";
import { getAccounts } from "../../Redux/DashBoard/Accounts/AccountsAction";
export const AccountContext = createContext()

export function AccountsContext({children}) {
    const reduxAccount = useSelector((state) => state.account, shallowEqual) || {};
    const dispatch = useDispatch();
    const accountsData = useMemo(() => getAccountsData(reduxAccount), [reduxAccount]);
    const [account, setAccount] = useState({});
 
    useEffect(()=>{
      dispatch(getAccounts())
    },[])
    useEffect(() =>{
        if(accountsData && accountsData.length > 0) {
            setAccount(accountsData[0]);
         }
    },[accountsData])
    return (
      <AccountContext.Provider value={{account,setAccount}}>
       {children}
      </AccountContext.Provider>
    );
  }