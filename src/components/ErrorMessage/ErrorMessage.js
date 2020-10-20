import React from 'react';

import './ErrorMessage.css';

const ErrorMessage = () => {
  return ( 
    <div className="ErrorMessageContainer">
      <p className="ErrorMessage">Sorry we couldn't find that location! Try searching again.</p>
    </div>
   );
}
 
export default ErrorMessage;