import { Box, Button, Circle, Divider, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import firebase from 'firebase/compat/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { doc, getDoc } from 'firebase/firestore'
import { Trash } from 'phosphor-react'
import Image from 'next/image'

import { addToCart } from '../store/cartReducer'
import emptyFav from '../public/empty_fav.png'
import { deleteFromWishlist } from '../store/wishlistReducer'

const WishlistItem = ({ item, cart, onAddToCart, onDelete }) => {

    const isInCart = Object.keys(cart.items).includes(item.pid)

    const router = useRouter()

    return (
        <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            py={3}
            width={'full'}>

            <Flex
                rounded={'lg'}
                overflow={'hidden'}
                marginEnd={4}
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

                {isInCart ?
                    <Button
                        variant={'ghost'}
                        marginTop={6}
                        borderWidth={1}
                        textTransform={'none'}
                        letterSpacing={'wide'}
                        paddingX={4}
                        fontSize={'sm'}
                        _hover={{ bgColor: 'blackAlpha.100', color: 'gold.500' }}
                        onClick={() => {
                            router.push('/cart')
                        }}>
                        Go to cart
                    </Button>
                    :
                    <Button
                        variant={'solid'}
                        marginTop={6}
                        textTransform={'none'}
                        letterSpacing={'wide'}
                        paddingX={4}
                        fontSize={'sm'}
                        onClick={() => {
                            onAddToCart(item.pid, item, cart)
                        }}>
                        Add to cart
                    </Button>
                }

                <IconButton
                    variant={'ghost'}
                    p={0}
                    onClick={() => {
                        onDelete(item.pid)
                    }}
                    icon={<Trash size={20} color={'#E53E3E'} />}
                />
            </VStack>
        </Flex>
    )
}

const Wishlist = ({ addToCart, deleteFromWishlist }) => {

    const router = useRouter()
    const wishlist = useSelector((state) => state.persistFirebase.profile.wishlist)
    const cart = useSelector((state) => state.persistFirebase.profile.cart)
    const hasNotAuth = useSelector((state) => state.persistFirebase.auth.isEmpty)
    const [product, setProduct] = useState([])
    const firestore = firebase.firestore()

    useEffect(() => {
        if (hasNotAuth) {
            router.replace('/signup')
            return
        }
        let productIds = wishlist ? wishlist : []
        let tempWishlist = []
        const getWishlistItem = async () => {
            await Promise.all(productIds.map(async (id) => {
                const docRef = doc(firestore, `products/${id}`)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists)
                    tempWishlist.push({ pid: id, ...docSnap.data() })
            }))
            setProduct(tempWishlist)
        }
        getWishlistItem()
    }, [hasNotAuth])

    function deleteItem(id) {
        deleteFromWishlist(id, wishlist)
        const newList = product.filter((item) => item.pid !== id)
        setProduct(newList)
    }

    if (hasNotAuth) return null // don't render any UI since auth state has not been verified

    return (
        <>
            {wishlist?.length === 0 || cart === undefined ?
                <VStack
                    width={'full'}
                    height={'60vh'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}>
                    <Circle
                        bgColor={'gray.200'}
                        size={'140px'}>
                        <Image
                            src={emptyFav}
                            alt={'Empty Favorite'}
                            width={100}
                        />
                    </Circle>
                    <Text
                        fontWeight={'medium'}
                        fontSize={'md'}
                        textColor={'black'}>
                        Your wishlist is empty!
                    </Text>
                    <Text
                        fontWeight={'normal'}
                        fontSize={'sm'}
                        textColor={'black'}>
                        See an item you like? Click the &apos;favorite&apos; icon to mark them as favorite.
                    </Text>
                    <Button
                        variant={'solid'}
                        marginTop={10}
                        onClick={() => router.push('/')}>
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
                    height={'60vh'}
                    backgroundColor={'gray.50'}>
                    <ToastContainer />

                    <VStack
                        flexDirection={'column'}
                        rounded={'lg'}
                        justifyContent={'center'}
                        alignItems={'start'}
                        marginEnd={12}
                        width={'45%'}>

                        <HStack
                            alignItems={'baseline'}
                            justifyContent={'space-between'}
                            w={'full'}>
                            <Text
                                fontWeight={'bold'}
                                fontSize={'2xl'}
                                textColor={'black'}>
                                Your Wishlist
                            </Text>

                            <Text
                                fontWeight={'semibold'}
                                fontSize={'xs'}
                                textColor={'gray.500'}>
                                {`${wishlist ? wishlist.length : 'No'} items in wishlist`}
                            </Text>
                        </HStack>

                        {
                            product.map((p, i) => (
                                <Box
                                    key={p.pid}
                                    w={'full'}>
                                    <WishlistItem
                                        item={p}
                                        cart={cart}
                                        onAddToCart={addToCart}
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
                </Flex>
            }
        </>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        addToCart: (productId, cartItem, prevCart) =>
            dispatch(addToCart(productId, cartItem, prevCart)),
        deleteFromWishlist: (productId, wishlist) =>
            dispatch(deleteFromWishlist(productId, wishlist))
    }
}


export default connect(null, matchDispatchToProps)(Wishlist)