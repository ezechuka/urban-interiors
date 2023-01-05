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

export const AddProductValidation = (productName, productPrice, category, subcategory, color,
        width, length, height, images, desc) => {
    const errors = {}
    
    if (productName.length < 5)
        errors.productName = 'Product name must be at least 5 characters!'

    if (productPrice <= 0)
        errors.productPrice = 'Product price must be higher than zero'

    if (category.length === 0)
        errors.category = 'Category has not been selected'

    if (subcategory.length === 0)
        errors.subcategory = 'Choose at least one sub category'

    if (Object.keys(color).length === 0)
        errors.color = 'Choose at least one color'

    if (width <= 0)
        errors.width = 'Specify dimension value for width'
    if (length <= 0)
        errors.length = 'Specify dimension value for length'
    if (height <= 0)
        errors.height = 'Specify dimension value for height'

    if (images.length < 0)
        errors.image = 'Please choose at least one image'

    if (desc.length < 10)
        errors.desc = 'Provide succifient product description'

    return errors
}