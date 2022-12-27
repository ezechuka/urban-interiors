import { Box, Breadcrumb, BreadcrumbItem, Button, Flex, HStack, keyframes, Text, Skeleton, VStack, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretRight, Heart, Minus, Plus } from 'phosphor-react'
import { connect, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { addToCart, decreaseQuantity, increaseQuantity } from '../../store/cartReducer'
import { addToWishlist } from '../../store/wishlistReducer'
import { getProduct } from '../../store/productReducer'

const blurKeyframes = keyframes`
    from {
        filter: blur(20px)
    }
    to {
        filter: blur(0)
    }
`

const blurAnimation = `${blurKeyframes} 1s linear`

const LoadingSkeleton = () => {
    return (
        <Flex
            marginY={8}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'full'}>

            <Flex
                maxWidth={'50%'}
                height={'500px'}
                alignItems={'center'}>
                <VStack
                    spacing={3}
                    marginEnd={3}>
                    {
                        [...Array(3).keys()].map(i => (
                            <Skeleton
                                key={i}
                                width={'100px'}
                                height={'100px'} />
                        ))
                    }
                </VStack>

                <Skeleton
                    width={'800px'}
                    height={'450px'} />
            </Flex>

            <Stack
                direction={'column'}
                width={'45%'}
                flexDirection={'column'}
                justifyContent={'start'}
                spacing={3}>
                {/* product title */}
                <Skeleton
                    width={'200px'}
                    height={'30px'} />

                {/* product price */}
                <Skeleton
                    width={'100px'}
                    height={'20px'} />

                {/* product desc */}
                <Skeleton
                    width={'full'}
                    height={'100px'} />

                {/* Dimension caption */}
                <Skeleton
                    width={'60px'}
                    height={'20px'} />

                {/* Dimension values */}
                <Skeleton
                    width={'200px'}
                    height={'20px'} />

                {/* Add to cart button */}
                <Skeleton
                    width={'full'}
                    height={'40px'} />

                {/* Add to wishlist button */}
                <Skeleton
                    width={'full'}
                    height={'40px'} />

            </Stack>

        </Flex>
    )
}

const ProductDetail =
    ({ getProduct, addToCart, increaseItemQuantity, decreaseItemQuantity, addToWishlist }) => {
        const router = useRouter()
        const path = router.asPath.split('/')
        console.log(path)
        const pid = localStorage.getItem('PRODUCT_REF')

        const { isLoading, isFetching, isLoaded, error, data }
        = useSelector((state) => state.product)
        const [currentImage, setCurrentImage] = useState('')

        const hasNotAuth = useSelector((state) => state.persistFirebase.profile.isEmpty)

        const cart = useSelector((state) => state.persistFirebase.profile.cart)

        const wishlist = useSelector((state) => state.persistFirebase.profile.wishlist)

        const cartItems = useSelector((state) => state?.persistFirebase?.profile?.cart?.items)

        const cartProduct = cartItems && cartItems[pid]
        const isInCart = cartItems && cartItems[pid] ? true : false

        useEffect(() => {
            getProduct(pid)
        }, [])

        // if (isLoading) return <Text>Fetching...</Text>

        return (
            <Flex
                as={'section'}
                paddingX={12}
                paddingY={8}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'start'}>
                <ToastContainer />

                <Breadcrumb
                    spacing={2}
                    separator={<CaretRight color={'#3e3e3e'} weight={'bold'} size={14} />}
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textDecoration={'none'}>
                    <BreadcrumbItem textColor={'gray.600'} _hover={{ color: 'gold.500' }}>
                        <Link href='/'>Home</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem textColor={'gray.600'} textTransform={'capitalize'} _hover={{ color: 'gold.500' }}>
                        <Text
                            as={'button'}
                            fontWeight={'medium'}
                            textTransform={'capitalize'}
                            onClick={() => router.back()}>
                            {path[1].replace('-', ' ')}
                        </Text>
                    </BreadcrumbItem>

                    <BreadcrumbItem textColor={'gray.900'} textTransform={'capitalize'} isCurrentPage>
                        <Text>{isLoaded && data.title}</Text>
                    </BreadcrumbItem>
                </Breadcrumb>

                {
                    isLoading ? <LoadingSkeleton />
                        :
                        <Flex
                            marginY={8}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            width={'full'}>

                            <Flex
                                maxWidth={'40%'}
                                height={'500px'}>
                                <VStack
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    marginEnd={5}
                                    spacing={3}>
                                    {
                                        data.img.map((img, i) => (
                                            <Box
                                                as={motion.div}
                                                key={i}
                                                boxSize={'100px'}
                                                rounded={'lg'}
                                                borderWidth={3}
                                                borderColor={currentImage === img ? 'gold.500' : 'gray.100'}
                                                position={'relative'}
                                                _hover={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    setCurrentImage(img)}
                                                }>
                                                <Image
                                                    className=''
                                                    src={img}
                                                    alt={''}
                                                    fill
                                                    objectFit=''
                                                    onLoadingComplete={() => setImgLoaded(true)}
                                                />
                                            </Box>
                                        ))
                                    }
                                </VStack>

                                <Image
                                    width={500}
                                    height={500}
                                    src={currentImage ? currentImage : data.img[0]}
                                    alt={data.title}
                                />
                            </Flex>

                            <Flex
                                width={'45%'}
                                flexDirection={'column'}
                                justifyContent={'start'}>
                                <Text
                                    fontWeight={'bold'}
                                    fontSize={'3xl'}
                                    textColor={'black'}
                                    lineHeight={'36px'}>
                                    {data.title}
                                </Text>

                                <Text
                                    fontWeight={'semibold'}
                                    fontSize={'xl'}
                                    textColor={'gray.900'}
                                    marginTop={2}>
                                    {`₦${new Intl.NumberFormat().format(data.price)}`}
                                </Text>

                                <Text
                                    marginY={2}
                                    textColor={'gray.600'}
                                    textAlign={'justify'}>
                                    {data.desc}
                                </Text>

                                <Text
                                    fontWeight={'semibold'}
                                    fontSize={'md'}
                                    textColor={'gray.900'}>
                                    Dimension
                                </Text>
                                <Text
                                    fontSize={'sm'}>
                                    Length: <Text as={'span'} fontWeight={'semibold'} textColor={'gray.900'}>{`${data.length}ft `}</Text>
                                    • Height: <Text as={'span'} fontWeight={'semibold'} textColor={'gray.900'}>{`${data.height}ft`}</Text>
                                </Text>

                                {
                                    isInCart ?
                                        <HStack
                                            spacing={8}
                                            marginTop={3}>
                                            <Button
                                                variant={'solid'}
                                                rounded={'md'}
                                                bgColor={'transparent'}
                                                p={2}
                                                _hover={{
                                                    bgColor: 'none'
                                                }}
                                                _active={{
                                                    bgColor: 'none'
                                                }}
                                                onClick={() => {
                                                    if (cartProduct.quantity > 1)
                                                        decreaseItemQuantity(pid, product, cart)
                                                }}>
                                                <Minus color={'hsl(38, 58%, 47%)'} size={16} weight={'bold'} alt={'decrease item'} />
                                            </Button>
                                            <Text
                                                fontWeight={'semibold'}
                                                fontSize={'lg'}>
                                                {cartProduct?.quantity}
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
                                                onClick={() => increaseItemQuantity(pid, data, cart)}>
                                                <Plus color={'hsl(38, 58%, 47%)'} size={16} weight={'bold'} alt={'increase item'} />
                                            </Button>
                                        </HStack>
                                        :
                                        <Button
                                            variant={'solid'}
                                            marginTop={6}
                                            textTransform={'uppercase'}
                                            letterSpacing={'wide'}
                                            onClick={() => {
                                                if (hasNotAuth){
                                                    router.push('/signup')
                                                } else
                                                    addToCart(pid, data, cart)
                                            }}>
                                            Add to cart
                                        </Button>
                                }

                                <Button
                                    variant={'ghost'}
                                    marginTop={isInCart ? 6 : 2}
                                    letterSpacing={'wide'}
                                    borderWidth={1}
                                    paddingY={6}
                                    borderColor={'gray.300'}
                                    leftIcon={<Heart size={16} color={'#B4BABE'} weight={'fill'} />}
                                    onClick={() => {
                                        if (hasNotAuth)
                                            router.push('/signup')
                                        else
                                            addToWishlist(pid, wishlist)
                                    }}>
                                    Add to wishlist
                                </Button>
                            </Flex>

                        </Flex>
                }

            </Flex>
        )
    }

export const matchDispatchToProps = dispatch => {
    return {
        getProduct: (productId) =>
            dispatch(getProduct(productId)),
        addToCart: (productId, cartItem, prevCart) =>
            dispatch(addToCart(productId, cartItem, prevCart)),
        increaseItemQuantity: (productId, cartItem, prevCart) =>
            dispatch(increaseQuantity(productId, cartItem, prevCart)),
        decreaseItemQuantity: (productId, cartItem, prevCart) =>
            dispatch(decreaseQuantity(productId, cartItem, prevCart)),
        addToWishlist: (productId, prevWishlist) =>
            dispatch(addToWishlist(productId, prevWishlist))
    }
}


export default connect(null, matchDispatchToProps)(ProductDetail)