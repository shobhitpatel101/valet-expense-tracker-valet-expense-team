import React from "react";
import '../Styles/Pages/UserAuthPage.scss'



function UserAuthPage({children}) {
  return (
    <div className="user-auth-page">
      <div>
        <h1>Valet</h1>
      </div>
      <div></div>
      <div className="user-auth-page-content">
        <div>
         {children}
        </div>
      </div>
    </div>
  );
}

export default UserAuthPage;
