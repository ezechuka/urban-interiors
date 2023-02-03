import { Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Heart, Trash } from 'phosphor-react'
import { connect, useSelector } from 'react-redux'
import { addToWishlist, deleteFromWishlist } from '../../store/wishlistReducer'

const ProductItem = ({ productId, productTitle, productImg, productPrice, addToWishlist, deleteFromWishlist }) => {
    const router = useRouter()
    const catPath = router.query.products

    const wishlist = useSelector((state) => state.persistFirebase.profile.wishlist)
    const hasNotAuth = useSelector((state) => state.persistFirebase.profile.isEmpty)

    return (
        <Flex
            rounded={'lg'}
            boxShadow={'lg'}
            overflow={'hidden'}
            flexDirection={'column'}
            justifyContent={'center'}
            transition={'all'}
            bgColor={'blackAlpha.200'}
            position={'relative'}
            _hover={{ shadow: 'md', cursor: 'pointer' }}
            onClick={(e) => {
                localStorage.setItem('PRODUCT_REF', productId)
                router.push(`${catPath}/${productId}`)
            }}>

            <Box
                boxSize={{ base: '150px', md: '200px' }}
                rounded={'lg'}
                alignSelf={'center'}
                position={'relative'}>
                <Image
                    src={productImg}
                    fill
                    alt={productTitle} />
            </Box>

            {
                wishlist?.includes(productId) ?
                    <Tooltip hasArrow label={'Delete from wishlist'} placement={'left'} textColor={'white'} bgColor={'gray.900'}>
                        <IconButton
                            variant={'ghost'}
                            position={'absolute'}
                            shadow={'md'}
                            top={2}
                            right={2}
                            bgColor={'white'}
                            rounded={'full'}
                            icon={
                                <Trash size={22} />
                            }
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteFromWishlist(productId, wishlist)
                            }}
                            _hover={{
                                bgColor: 'gold.500',
                                color: 'white'
                            }}
                        />
                    </Tooltip>
                    :
                    <Tooltip hasArrow label={'Add to wishlist'} placement={'left'} textColor={'white'} bgColor={'gray.900'}>
                        <IconButton
                            variant={'ghost'}
                            position={'absolute'}
                            shadow={'md'}
                            top={2}
                            right={2}
                            bgColor={'white'}
                            rounded={'full'}
                            icon={
                                <Heart size={22} />
                            }
                            onClick={(e) => {
                                e.stopPropagation()
                                if (hasNotAuth)
                                    router.push('/signup')
                                else addToWishlist(productId, wishlist)
                            }}
                            _hover={{
                                bgColor: 'gold.500',
                                color: 'white'
                            }}
                        />
                    </Tooltip>
            }

            <Text
                fontWeight={'normal'}
                fontSize={'sm'}
                textColor={'gray.800'}
                textAlign={'start'}
                padding={2}
                w={'full'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}>
                {productTitle}
            </Text>

            <Text
                fontWeight={'medium'}
                fontSize={'md'}
                textAlign={'start'}
                textColor={'black'}
                paddingStart={2}
                paddingBottom={4}>
                {`₦${new Intl.NumberFormat().format(productPrice)}`}
            </Text>
        </Flex>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        addToWishlist: (productId, prevWishlist) =>
            dispatch(addToWishlist(productId, prevWishlist)),
        deleteFromWishlist: (productId, prevWishlist) =>
            dispatch(deleteFromWishlist(productId, prevWishlist))
    }
}

export default connect(null, matchDispatchToProps)(ProductItem)