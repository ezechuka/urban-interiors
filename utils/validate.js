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