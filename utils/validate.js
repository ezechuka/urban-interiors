export const LoginValidation = (email, password) => {
    const errors = {}
    const emailPattern = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
    if (!email.match(emailPattern))
        errors.email = 'Email is not valid!'

    if (password.length < 8)
        errors.password = 'Password must be at least 8 characters!'

    return errors
}

export const SignupValidation = (fullname, email, password) => {
    const errors = {}
    const emailPattern = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );

    if (fullname.length < 5)
        errors.fullname = 'Full name must be at least 5 characters!'
        
    if (!email.match(emailPattern))
        errors.email = 'Email is not valid!'

    if (password.length < 8)
        errors.password = 'Password must be at least 8 characters!'

    return errors
}

export const CheckoutValidation = (fullname, phone, state, city, address) => {
    const errors = {}
    if (fullname.length < 5)
        errors.fullname = 'Full name must be at least 5 characters!'
    
    if (phone.length < 10)
        errors.phone = 'Phone number is invalid!'

    // match phone with regex

    if (state.length < 3)
        errors.state = 'State not recognized!'

    if (city.length < 3)
        errors.city = 'City not recognized!'

    if (address.length < 10)
        errors.address = 'Address info not sufficient!'

    return errors
}