export function emailValidation(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}
export function passwordValidation(password){
  return password.length>0;
}

export function phoneNoValidation(phoneNo){
  return phoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
}

export function dobValidation(dob){
  if(dob.length===0)
    return false;
  const d = new Date();
  let currYear = d.getFullYear();
  let birthyear = parseInt(dob.substring(0,4));
  let age = currYear-birthyear;
  if((age)<8||(age)>100)
    return false;
return true;
}

export function bankAccountNoValidation(accNo){
  return accNo.match(/^1?(\d{11,16})$/);
}

export function ifscCodeValidation(ifsc){
  return ifsc.match(/^[A-Z]{4}\d{7}$/);
}

export function lengthValidation(item){
  return item.length>0;
}
export function professionValidation(item){
return !(item.length === 0 || item.includes( "Select"));
}

export function  fileValidation(file){
return file;
}

export function noValidation(field){
 return true;
}
export function selectValidation(field){
  return field>0;
}