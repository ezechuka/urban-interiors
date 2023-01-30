import { Box, Button, Circle, Divider, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/compat/app'
import { Minus, Plus, Trash } from 'phosphor-react'
import { increaseQuantity, decreaseQuantity, deleteFromCart } from '../store/cartReducer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useRouter } from 'next/router'

import emptyCart from '../public/empty_cart.png'
import Meta from '../components/meta/Meta'

const CartItem = ({ item, cart, onDelete }) => {

    const cartProduct = cart.items[item.pid]

    const dispatch = useDispatch()

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
                position={'relative'}
                alignItems={'center'}>

                <Box
                    boxSize={'100px'}
                    rounded={'lg'}
                    position={'relative'}>
                    <Image
                        src={item.images[0]}
                        alt={''}
                        fill
                    />
                </Box>

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
                        {item.productName}
                    </Text>

                    <Text
                        fontWeight={'medium'}
                        fontSize={'md'}
                        textAlign={'start'}
                        textColor={'black'}>
                        {`₦${new Intl.NumberFormat().format(item.productPrice)}`}
                    </Text>

                </VStack>
            </Flex>

            <VStack
                alignItems={'end'}
                justifyContent={'space-between'}
                spacing={3}>
                <HStack
                    spacing={3}>
                    <Button
                        variant={'solid'}
                        rounded={'md'}
                        bgColor={'transparent'}
                        p={1}
                        _hover={{
                            bgColor: 'none'
                        }}
                        _active={{
                            bgColor: 'none'
                        }}
                        onClick={() => {
                            if (cartProduct.quantity > 1)
                                dispatch(decreaseQuantity(item.pid, item.productPrice, cart))
                        }}>
                        <Minus color={'hsl(38, 58%, 47%)'} size={16} weight={'bold'} alt={'decrease item'} />
                    </Button>
                    <Text
                        fontWeight={'semibold'}>
                        {cartProduct.quantity}
                    </Text>
                    <Button
                        variant={'solid'}
                        rounded={'md'}
                        bgColor={'transparent'}
                        borderWidth={1}
                        p={2}
                        _hover={{
                            bgColor: 'none'
                        }}
                        _active={{
                            bgColor: 'none'
                        }}
                        onClick={() => dispatch(increaseQuantity(item.pid, item.productPrice, cart))}>
                        <Plus color={'hsl(38, 58%, 47%)'} size={16} weight={'bold'} alt={'increase item'} />
                    </Button>
                </HStack>

                <IconButton
                    variant={'ghost'}
                    p={0}
                    onClick={() => {
                        dispatch(deleteFromCart(item.pid, item.productPrice, cartProduct.quantity, cart))
                        onDelete(item.pid)
                    }}
                    icon={<Trash size={20} color={'#E53E3E'} />}
                />
            </VStack>
        </Flex>
    )
}

const Cart = () => {

    const router = useRouter()
    const cart = useSelector((state) => state.persistFirebase.profile.cart)
    const [product, setProduct] = useState([])
    const firestore = firebase.firestore()

    useEffect(() => {
        let productIds = Object.keys(cart ? cart.items : {})
        let tempCart = []
        const getCartItem = async () => {
            await Promise.all(productIds.map(async (id) => {
                const docRef = doc(firestore, `products/${id}`)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists)
                    tempCart.push({ pid: id, ...docSnap.data() })
            }))
            setProduct(tempCart)
        }
        getCartItem()
    }, [cart])

    function deleteItem(id) {
        const newList = product.filter((item) => item.pid !== id)
        setProduct(newList)
    }

    return (
        <>
            {
                product.length === 0 || cart === undefined ?
                    <VStack
                        width={'full'}
                        height={'60vh'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}>
                        <Meta title={'Cart | Fobath Woodwork'} />
                        <ToastContainer />

                        <Circle
                            bgColor={'gray.200'}
                            size={'140px'}>
                            <Image
                                src={emptyCart}
                                alt={'Empty cart'}
                                width={100}
                            />
                        </Circle>
                        <Text
                            fontWeight={'medium'}
                            fontSize={'md'}
                            textColor={'black'}>
                            Your shopping cart is empty!
                        </Text>
                        <Text
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            textColor={'black'}>
                            Discover our best offers by exploring our categories
                        </Text>
                        <Button
                            variant={'solid'}
                            marginTop={10}
                            onClick={() => router.replace('/')}>
                            Continue shopping
                        </Button>
                    </VStack>
                    :
                    <Flex
                        as={'section'}
                        width={'full'}
                        justifyContent={'center'}
                        alignItems={'start'}
                        paddingY={8}
                        height={'70vh'}
                        backgroundColor={'gray.50'}>
                        <Meta title={'Cart | Fobath Woodwork'} />

                        <VStack
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'start'}
                            marginEnd={12}
                            width={'45%'}>

                            <HStack
                                alignItems={'baseline'}
                                justifyContent={'space-between'}
                                w={'full'}
                                py={2}>
                                <Text
                                    fontWeight={'bold'}
                                    fontSize={'2xl'}
                                    textColor={'black'}>
                                    Your Cart
                                </Text>

                                <Text
                                    fontWeight={'semibold'}
                                    fontSize={'xs'}
                                    textColor={'gray.500'}>
                                    {`${cart ? cart.totalItems : 'No'} items in cart`}
                                </Text>
                            </HStack>

                            {
                                product.map((p, i) => (
                                    <Box
                                        key={p.pid}
                                        w={'full'}>
                                        <CartItem
                                            item={p}
                                            cart={cart}
                                            onDelete={deleteItem}
                                        />
                                        {
                                            i !== product.length - 1 &&
                                            <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'1px'} />
                                        }
                                    </Box>
                                ))
                            }
                        </VStack>

                        <VStack
                            backgroundColor={'gray.100'}
                            rounded={'lg'}
                            width={'25%'}
                            paddingX={6}
                            paddingTop={4}
                            alignItems={'start'}
                            paddingBottom={6}>
                            <Text
                                fontWeight={'bold'}
                                textColor={'black'}
                                fontSize={'md'}
                                textAlign={'start'}>
                                Summary
                            </Text>
                            <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'1px'} />
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
                                    textColor={'black'}>
                                    {`₦${new Intl.NumberFormat().format(cart?.totalPrice)}`}
                                </Text>
                            </Flex>
                            <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'1px'} />
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
                                    textColor={'black'}>
                                    ₦9,000
                                </Text>
                            </Flex>
                            <Divider orientation={'horizontal'} bgColor={'gray.200'} height={'1px'} />
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

                            <Button
                                variant={'solid'}
                                w={'full'}
                                marginY={10}
                                textTransform={'uppercase'}
                                onClick={() => router.push('/checkout')}>
                                Checkout
                            </Button>
                            <Button
                                variant={'ghost'}
                                borderWidth={1}
                                borderColor={'gray.300'}
                                w={'full'}
                                paddingY={6}
                                textTransform={'uppercase'}
                                onClick={() => router.push('/')}>
                                Continue shopping
                            </Button>
                        </VStack>
                    </Flex>
            }
        </>
    )
}

export default Cart