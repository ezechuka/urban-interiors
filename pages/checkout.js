import { Box, Button, Divider, Flex, Input, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { CheckoutValidation } from '../utils/validate'
import firebase from 'firebase/compat/app'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { usePaystackPayment } from 'react-paystack'
import { useRouter } from 'next/router'
import { deleteCart } from '../store/cartReducer'
import { createOrder } from '../firebaseService/createOrder'

const CartItem = ({ item }) => {

    return (
        <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            py={4}
            width={'full'}>

            <Flex
                rounded={'lg'}
                overflow={'hidden'}
                marginEnd={4}
                alignItems={'center'}>

                <Image
                    src={item.images[0]}
                    alt={''}
                    width={50}
                    height={50}
                />

                <VStack
                    alignItems={'start'}
                    marginStart={4}>
                    <Text
                        fontWeight={'normal'}
                        fontSize={'sm'}
                        textColor={'gray.800'}
                        textAlign={'start'}
                        overflow={'hidden'}
                        noOfLines={2}
                        maxWidth={'xs'}
                        textOverflow={'ellipsis'}>
                        {item.title}
                    </Text>

                    <Text
                        fontWeight={'medium'}
                        fontSize={'sm'}
                        textAlign={'start'}
                        textColor={'black'}>
                        {`₦${new Intl.NumberFormat().format(item.productPrice)}`}
                    </Text>

                </VStack>
            </Flex>
            <Text
                textAlign={'end'}
                fontWeight={'thin'}
                fontSize={'xl'}>
                {`x${item.quantity}`}
            </Text>
        </Flex>
    )
}

const Checkout = ({ clearCart }) => {

    const router = useRouter()
    const fullname = useSelector((state) => state.persistFirebase.profile.displayName)
    const email = useSelector((state) => state.persistFirebase.profile.email)
    const hasNotAuth = useSelector((state) => state.persistFirebase.auth.isEmpty)

    const [userData, setUserData] = useState({
        email,
        fullname,
        phone: '',
        state: '',
        city: '',
        address: ''
    })
    const [errors, setErrors] = useState({})

    
    const userId = useSelector((state) => state.persistFirebase.auth.uid)
    const cart = useSelector((state) => state.persistFirebase.profile.cart)
    const [product, setProduct] = useState([])
    const firestore = firebase.firestore()

    const resolvedAmount = 100.0 * (cart?.totalPrice + 100.0) // resolve to kobo
    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: resolvedAmount,
        publicKey: process.env.paystackPublicKey,
    };
    const initializePayment = usePaystackPayment(config);

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setUserData(data => ({ ...data, [name]: value }))
    }

    useEffect(() => {
        if (hasNotAuth) {
            router.replace('/signup')
            return
        }

        let productIds = Object.keys(cart ? cart.items : {})
        let tempCart = []
        const getCartItem = async () => {
            await Promise.all(productIds.map(async (id) => {
                const docRef = doc(firestore, `products/${id}`)
                const docSnap = await getDoc(docRef)
                const quantity = cart.items[id].quantity
                if (docSnap.exists)
                    tempCart.push({ pid: id, quantity, ...docSnap.data() })
            }))
            setProduct(tempCart)
        }
        getCartItem()
    }, [cart])

    const onSuccess = (reference) => {
        clearCart()
        const totalPrice = product.reduce(
            (accumulator, currentProd) => accumulator + Number(currentProd.price), 0
        )
        const modifiedItems = []
        product.forEach(p => modifiedItems.push({
            title: p.productName,
            color: '',
            price: p.productPrice,
            pid: p.pid,
            img: p.images[0],
            quantity: p.quantity
        }))

        createOrder(userId, userData, totalPrice, modifiedItems)
        router.replace('/success')
    }

    if (hasNotAuth) return null // don't render any UI since auth state has not been verified

    return (
        <Flex
            as={'section'}
            paddingX={12}
            paddingY={8}
            flexDirection={'column'}>

            <Text
                color={'gold.500'}
                fontSize={'xl'}
                fontWeight={'semibold'}>
                Checkout
            </Text>

            <Stack
                direction={'row'}>
                <Flex
                    width={'60%'}
                    flexDirection={'column'}>
                    <Text
                        marginTop={8}
                        color={'black'}
                        fontWeight={'normal'}>
                        Shipping Information
                    </Text>

                    <Divider mt={2} orientation='horizontal' h={'.1px'} bgColor={'gray.200'} />

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={6}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Full name
                        </Text>

                        <Input
                            name={'fullname'}
                            placeholder={'Awesome User'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={userData.fullname}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.fullname &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.fullname}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={6}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Phone
                        </Text>

                        <Input
                            name={'phone'}
                            placeholder={'+2348123456789'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={userData.phone}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.phone &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.phone}
                            </Text>
                        }
                    </VStack>

                    <Stack
                        direction={'row'}
                        marginTop={6}
                        spacing={6}>
                        <VStack
                            width={'full'}
                            alignItems={'start'}
                            spacing={'2px'}>
                            <Text
                                textColor={'black'}
                                fontWeight={'medium'}
                                fontSize={'sm'}>
                                State
                            </Text>

                            <Input
                                name={'state'}
                                placeholder={'state of residence'}
                                _placeholder={{ fontSize: 'sm' }}
                                value={userData.state}
                                focusBorderColor={'gold.500'}
                                _focus={{ transform: 'scale(1.01)' }}
                                size={'md'}
                                onChange={handleFormChange}
                            />

                            {errors.state &&
                                <Text
                                    textColor={'red.500'}
                                    fontWeight={'light'}
                                    fontSize={'xs'}>
                                    {errors.state}
                                </Text>
                            }
                        </VStack>

                        <VStack
                            width={'full'}
                            alignItems={'start'}
                            spacing={'2px'}>
                            <Text
                                textColor={'black'}
                                fontWeight={'medium'}
                                fontSize={'sm'}>
                                City
                            </Text>

                            <Input
                                name={'city'}
                                placeholder={'city of residence'}
                                _placeholder={{ fontSize: 'sm' }}
                                value={userData.city}
                                focusBorderColor={'gold.500'}
                                _focus={{ transform: 'scale(1.01)' }}
                                size={'md'}
                                onChange={handleFormChange}
                            />

                            {errors.city &&
                                <Text
                                    textColor={'red.500'}
                                    fontWeight={'light'}
                                    fontSize={'xs'}>
                                    {errors.city}
                                </Text>
                            }
                        </VStack>
                    </Stack>

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={6}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Address
                        </Text>

                        <Input
                            name={'address'}
                            placeholder={'street number, name, landmark, etc'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={userData.address}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.address &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.address}
                            </Text>
                        }
                    </VStack>

                    <Button
                        // isLoading={loading}
                        loadingText={'Please wait'}
                        variant={'solid'}
                        width={'40%'}
                        marginTop={10}
                        paddingY={5}
                        onClick={(e) => {
                            e.preventDefault();
                            let errors = CheckoutValidation(
                                userData.fullname.trim(),
                                userData.phone.trim(),
                                userData.state.trim(),
                                userData.city.trim(),
                                userData.address.trim()
                            )
                            if (Object.keys(errors).length === 0) {
                                setErrors({})
                                initializePayment(onSuccess, null)
                            } else {
                                setErrors(errors);
                            }
                        }}>
                        Continue with payment
                    </Button>
                </Flex>

                <Box>
                    <Divider orientation={'vertical'} mx={8} width={'.3px'} height={'full'} bgColor={'gray.200'} />
                </Box>

                <Flex
                    width={'40%'}
                    flexDirection={'column'}>
                    <Text
                        fontWeight={'normal'}
                        textColor={'black'}
                        marginTop={8}
                        textAlign={'start'}>
                        Summary
                    </Text>
                    <Divider mt={2} orientation={'horizontal'} bgColor={'gray.200'} height={'.1px'} />

                    {
                        product.map((item, i) => (
                            <>
                                <CartItem
                                    key={item.pid}
                                    item={item}
                                />
                                {i !== product.length - 1 &&
                                    <Divider orientation={'horizontal'} bgColor={'gray.200'} h={'.1px'} />
                                }
                            </>
                        ))
                    }

                    <Flex
                        justifyContent={'space-between'}
                        width={'full'}
                        py={2}
                        alignItems={'center'}>
                        <Text
                            fontWeight={'normal'}
                            textColor={'black'}
                            fontSize={'sm'}>
                            Subtotal
                        </Text>
                        <Text
                            fontWeight={'normal'}
                            textColor={'black'}
                            fontSize={'sm'}>
                            {`₦${new Intl.NumberFormat().format(cart?.totalPrice)}`}
                        </Text>
                    </Flex>
                    <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'.1px'} />
                    <Flex
                        justifyContent={'space-between'}
                        width={'full'}
                        py={2}
                        alignItems={'center'}>
                        <Text
                            fontWeight={'normal'}
                            textColor={'black'}
                            fontSize={'sm'}>
                            Shipping
                        </Text>
                        <Text
                            fontWeight={'normal'}
                            textColor={'black'}
                            fontSize={'sm'}>
                            ₦9,000
                        </Text>
                    </Flex>
                    <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'.1px'} />
                    <Flex
                        justifyContent={'space-between'}
                        width={'full'}
                        py={2}
                        alignItems={'center'}>
                        <Text
                            fontWeight={'normal'}
                            textColor={'black'}
                            fontSize={'sm'}>
                            Total
                        </Text>
                        <Text
                            fontWeight={'medium'}
                            textColor={'black'}>
                            ₦99,000
                        </Text>
                    </Flex>

                </Flex>
            </Stack>

        </Flex>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(deleteCart())
    }
}


export default connect(null, matchDispatchToProps)(Checkout)