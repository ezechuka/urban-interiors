import { Box, Breadcrumb, BreadcrumbItem, Button, Flex, HStack, keyframes, Text, Skeleton, VStack, Stack, Circle, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretRight, CheckCircle, Heart, Minus, Plus } from 'phosphor-react'
import { Circle as CircleIcon } from 'phosphor-react'
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
                    <BreadcrumbItem textColor={'gray.600'} transition={'all .2s'} _hover={{ color: 'gold.500' }}>
                        <Link href='/'>Home</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem textColor={'gray.600'} transition={'all .2s'} textTransform={'capitalize'} _hover={{ color: 'gold.500' }}>
                        <Text
                            as={'button'}
                            fontWeight={'medium'}
                            textTransform={'capitalize'}
                            onClick={() => router.back()}>
                            {path[1].replace('-', ' ')}
                        </Text>
                    </BreadcrumbItem>

                    <BreadcrumbItem textColor={'gray.900'} textTransform={'capitalize'} isCurrentPage>
                        <Text>{isLoaded && data.productName}</Text>
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
                                        data.images.map((img, i) => (
                                            <Box
                                                as={motion.div}
                                                key={i}
                                                boxSize={'100px'}
                                                rounded={'lg'}
                                                borderWidth={2}
                                                borderColor={currentImage === img ? 'gold.500' : 'gray.100'}
                                                position={'relative'}
                                                _hover={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setCurrentImage(img)
                                                }
                                                }>
                                                <Image
                                                    className=''
                                                    src={img}
                                                    alt={''}
                                                    fill
                                                />
                                            </Box>
                                        ))
                                    }
                                </VStack>


                                <Image
                                    width={500}
                                    height={500}
                                    src={currentImage ? currentImage : data.images[0]}
                                    alt={data.productName}
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
                                    {data.productName}
                                </Text>

                                <Text
                                    fontWeight={'semibold'}
                                    fontSize={'xl'}
                                    textColor={'gray.900'}
                                    marginTop={2}>
                                    {`₦${new Intl.NumberFormat().format(data.productPrice)}`}
                                </Text>

                                <Text
                                    marginTop={4}
                                    textColor={'gray.800'}
                                    textAlign={'justify'}>
                                    {data.desc}
                                </Text>

                                <Text
                                    marginTop={2}
                                    fontSize={'sm'}
                                    fontWeight={'semibold'}>
                                    Width: <Text as={'span'} fontWeight={'normal'} textColor={'gray.900'}>{`${data.width}ft `}</Text>
                                </Text>
                                <Text
                                    fontSize={'sm'}
                                    fontWeight={'semibold'}>
                                    Length: <Text as={'span'} fontWeight={'normal'} textColor={'gray.900'}>{`${data.length}ft `}</Text>
                                </Text>
                                <Text fontSize={'sm'}
                                    fontWeight={'semibold'}>
                                    Height: <Text as={'span'} fontWeight={'normal'} textColor={'gray.900'}>{`${data.height}ft`}</Text>
                                </Text>

                                <Text
                                    marginTop={4}
                                    fontWeight={'semibold'}
                                    fontSize={'md'}
                                    textColor={'gray.900'}>
                                    Choose color
                                </Text>
                                {console.log(data.color)}
                                <HStack
                                    spacing={1}>
                                    {
                                        data.color.map(color => (
                                            <IconButton
                                                variant={'ghost'}
                                                icon={
                                                    <Circle size={'32px'} borderWidth={1} borderColor={'blackAlpha.500'}>
                                                        { false ?
                                                            <CircleIcon weight={'fill'} color={color} size={32} />
                                                            :
                                                            <CheckCircle weight={'fill'} color={color} size={32} />
                                                        }
                                                    </Circle>
                                                }
                                                />
                                        ))
                                    }
                                </HStack>

                                {
                                    isInCart ?
                                        <HStack
                                            spacing={8}
                                            marginTop={4}>
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
                                                        decreaseItemQuantity(pid, data.productPrice, cart)
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
                                                onClick={() => increaseItemQuantity(pid, data.productPrice, cart)}>
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
                                                if (hasNotAuth) {
                                                    router.push('/signup')
                                                } else
                                                    addToCart(pid, data.productPrice, cart)
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
        addToCart: (productId, productPrice, prevCart) =>
            dispatch(addToCart(productId, productPrice, prevCart)),
        increaseItemQuantity: (productId, productPrice, prevCart) =>
            dispatch(increaseQuantity(productId, productPrice, prevCart)),
        decreaseItemQuantity: (productId, productPrice, prevCart) =>
            dispatch(decreaseQuantity(productId, productPrice, prevCart)),
        addToWishlist: (productId, prevWishlist) =>
            dispatch(addToWishlist(productId, prevWishlist))
    }
}


export default connect(null, matchDispatchToProps)(ProductDetail)