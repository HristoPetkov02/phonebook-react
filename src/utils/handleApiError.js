const handleApiError = (error, navigate) => {
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 500) {
        //ако е само една проверка за null влиза винаги във if а не в else
        if (localStorage.getItem('jwtToken')!==null && localStorage.getItem('jwtToken') !== 'null'){
          alert('Session expired. Please log in again.\nYou will be redirected automatically');
        }
        else
          alert('You are not logged in. Please log in to continue.');
          
        navigate('/account/login');
      } else if (statusCode === 403) {
        alert("You don't have the authority to view this information. Returning to home page.");
        navigate('/account/login');
      } else {
        console.error('API request failed with status code:', statusCode);
      }
    } else {
      console.error('API request failed:', error.message);
    }
  };
  
  export default handleApiError;