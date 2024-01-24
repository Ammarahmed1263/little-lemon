export const validateName = (userData, setUserData) => {
    const validName = /^[a-zA-Z]+$/;
    console.log(userData);
    if (validName.test(userData.firstName)) {
      setUserData({ ...userData, firstName: userData.firstName });
      return true;
    } else {
      alert("Please enter a name with letters only");
      return false;
    }
};

export const validateMail = (userData, setUserData) => {
    const validMail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    console.log(userData);
    if (validMail.test(userData.email)) {
      setUserData({ ...userData, email: userData.email });
      return true;
    } else {
      alert("Please enter a valid email address");
      return false;
    }
};

