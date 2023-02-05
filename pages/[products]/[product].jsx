import { Box, Breadcrumb, BreadcrumbItem, Button, Flex, HStack, keyframes, Text, Skeleton, VStack, Stack, Circle, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, ModalBody, Badge, SkeletonCircle } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretRight, Heart, Minus, Plus } from 'phosphor-react'
import { Circle as CircleIcon } from 'phosphor-react'
import { connect, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { addToCart, decreaseQuantity, increaseQuantity } from '../../store/cartReducer'
import { addToWishlist } from '../../store/wishlistReducer'
import { getProduct } from '../../store/productReducer'
import Meta from '../../components/meta/Meta'

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
            width={'full'}
            flexDirection={{ base: 'column', lg: 'row' }}>

            <Flex
                width={{ base: 'full', lg: '50%' }}
                height={'500px'}
                alignItems={'center'}
                flexDirection={{ base: 'column-reverse', lg: 'row' }}>
                <Stack
                    direction={{ base: 'row', lg: 'column' }}
                    spacing={3}
                    marginEnd={{ base: 0, lg: 3 }}
                    marginY={{ base: 5, lg: 0 }}>
                    {
                        [...Array(3).keys()].map(i => (
                            <Skeleton
                                key={i}
                                width={{ base: '80px', lg: '100px' }}
                                height={{ base: '80px', lg: '100px' }} />
                        ))
                    }
                </Stack>

                <Skeleton
                    width={{ base: 'full', lg: '800px' }}
                    height={'450px'} />
            </Flex>

            <Stack
                direction={'column'}
                width={{ base: '100%', lg: '45%' }}
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

                {/* Colors values */}
                <SkeletonCircle
                    size={10} />

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

const ModalDialogItem = ({ productName, productPrice, colorValue, colorName, pid, cart, onAdd }) => {
    return (
        <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={4}>
            <VStack
                alignItems={'start'}>
                <Text
                    fontWeight={'semibold'}
                    fontSize={'md'}
                    textColor={'black'}>
                    {productName}
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textColor={'gray.900'}>
                    {`₦${new Intl.NumberFormat().format(productPrice)}`}
                </Text>
            </VStack>

            <VStack
                justifyContent={'center'}>

                <Circle size={'32px'} borderWidth={1} borderColor={'blackAlpha.500'}>
                    <CircleIcon weight={'fill'} color={colorValue} size={32} />
                </Circle>

                <Text textTransform={'capitalize'} fontSize={'sm'}>
                    {colorName}
                </Text>

            </VStack>

            <Button
                variant={'ghost'}
                textTransform={'uppercase'}
                letterSpacing={'wide'}
                borderWidth={1}
                paddingY={3}
                borderColor={'gray.300'}
                px={5}
                transition={'all .3s'}
                _active={{ transform: 'scale(0.9)' }}
                onClick={() => onAdd(pid, productPrice, colorName, colorValue, cart)}>
                add
            </Button>
        </Flex>
    )
}

const ProductDetail =
    ({ getProduct, addToCart, increaseItemQuantity, decreaseItemQuantity, addToWishlist }) => {
        const router = useRouter()
        const path = router.asPath.split('/')
        const pid = path[2]

        const { isLoading, isFetching, isLoaded, error, data }
            = useSelector((state) => state.product)
        const [currentImage, setCurrentImage] = useState('')

        const hasNotAuth = useSelector((state) => state.persistFirebase.profile.isEmpty)

        const cart = useSelector((state) => state.persistFirebase.profile.cart)

        const wishlist = useSelector((state) => state.persistFirebase.profile.wishlist)

        const cartItems = useSelector((state) => state?.persistFirebase?.profile?.cart?.items)

        const { isOpen, onOpen, onClose } = useDisclosure()

        const cartProduct = cartItems && cartItems[pid]
        const isInCart = cartItems && cartItems[pid] ? true : false

        useEffect(() => {
            getProduct(pid)
        }, [])

        // if (isLoading) return <Text>Fetching...</Text>

        return (
            <Flex
                as={'section'}
                paddingX={{ base: 6, lg: 12 }}
                paddingY={{ base: 4, lg: 8 }}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'start'}>

                <Meta
                    title={isLoading ? 'Please wait... | Fobath Woodwork' :
                        `${data.productName} | Fobath Woodwork`}
                />
                <ToastContainer />

                <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInRight'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add to cart (choose color)</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                isLoaded && Object.values(data.colorValue).map((colorValue, i) => (
                                    <ModalDialogItem
                                        key={colorValue}
                                        productName={data.productName}
                                        productPrice={data.productPrice}
                                        colorValue={colorValue}
                                        colorName={data.color[i]}
                                        pid={pid}
                                        cart={cart}
                                        onAdd={addToCart}
                                    />
                                ))

                            }
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                px={0}
                                py={2}
                                variant={'solid'}
                                textTransform={'uppercase'}
                                onClick={() => router.push('/cart')}>
                                Go to cart
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

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
                            marginY={{ base: 3, lg: 8 }}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            width={'full'}
                            flexDirection={{ base: 'column', lg: 'row' }}>

                            <Flex
                                maxWidth={{ base: '100%', lg: '40%' }}
                                height={'500px'}
                                flexDirection={{ base: 'column-reverse', lg: 'row' }}>
                                <Stack
                                    direction={{ base: 'row', lg: 'column' }}
                                    justifyContent={'center'}
                                    marginY={{ base: 5, lg: 0 }}
                                    marginEnd={{ base: 0, lg: 5 }}
                                    spacing={3}>
                                    {
                                        data.images.map((img, i) => (
                                            <Box
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
                                </Stack>

                                <Image
                                    width={500}
                                    height={500}
                                    src={currentImage ? currentImage : data.images[0]}
                                    alt={data.productName}
                                />

                            </Flex>

                            <Flex
                                maxWidth={{ base: '100%', lg: '45%' }}
                                flexDirection={'column'}
                                justifyContent={'start'}>
                                <Text
                                    fontWeight={'bold'}
                                    fontSize={{base: '2xl', lg: '3xl'}}
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
                                    Available colors
                                </Text>

                                <HStack
                                    spacing={1}>
                                    {
                                        Object.values(data.colorValue).map(color => (
                                            <Circle key={color} size={'32px'} borderWidth={1} borderColor={'blackAlpha.500'}>
                                                <CircleIcon weight={'fill'} color={color} size={32} />
                                            </Circle>
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
                                                    return
                                                }
                                                onOpen()
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
        addToCart: (productId, productPrice, colorName, colorValue, prevCart) =>
            dispatch(addToCart(productId, productPrice, colorName, colorValue, prevCart)),
        increaseItemQuantity: (productId, productPrice, prevCart) =>
            dispatch(increaseQuantity(productId, productPrice, prevCart)),
        decreaseItemQuantity: (productId, productPrice, prevCart) =>
            dispatch(decreaseQuantity(productId, productPrice, prevCart)),
        addToWishlist: (productId, prevWishlist) =>
            dispatch(addToWishlist(productId, prevWishlist))
    }
}


export default connect(null, matchDispatchToProps)(ProductDetail)