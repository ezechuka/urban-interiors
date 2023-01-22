import { Badge, Box, Button, Circle, Flex, Grid, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import noProduct from '../../public/no_product.png'

import { addToCart } from '../../store/cartReducer'
import { getProductsBySubCategory } from '../../store/productsReducer'

const LoadingSkeleton = () => {
    return (
        <Grid
            gridTemplateColumns={'repeat(5, 1fr)'}
            gap={8}
            marginY={8}>
            {
                [...Array(10).keys()].map(item => (
                    <VStack
                        key={item}
                        justifyContent={'start'}
                        alignItems={'start'}>
                        <Skeleton
                            width={'220px'}
                            height={'200px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                        <Skeleton
                            width={'140px'}
                            height={'10px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                        <Skeleton
                            width={'70px'}
                            height={'10px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                    </VStack>
                ))
            }
        </Grid>
    )
}

const FeaturedItem = ({ productId, productName, productPrice,
    productImg, productCat }) => {

    const router = useRouter()

    return (
        <Flex
            rounded={'lg'}
            boxShadow={'lg'}
            overflow={'hidden'}
            flexDirection={'column'}
            justifyContent={'center'}
            transition={'all'}
            p={2}
            bgColor={'blackAlpha.200'}
            position={'relative'}
            _hover={{ shadow: 'md' }}>

            <Badge
                top={2}
                right={2}
                colorScheme='red'
                fontSize={'sm'}
                px={2}
                position={'absolute'}>
                {productCat}
            </Badge>

            <Box
                boxSize={'200px'}
                rounded={'lg'}
                alignSelf={'center'}
                position={'relative'}>
                <Image
                    src={productImg}
                    fill
                    alt={productName} />
            </Box>

            <Text
                fontWeight={'normal'}
                fontSize={'sm'}
                textColor={'black'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                paddingTop={2}
                textOverflow={'ellipsis'}>
                {productName}
            </Text>

            <Text
                fontWeight={'semibold'}
                fontSize={'md'}
                textColor={'gray.900'}
                paddingStart={2}
                paddingBottom={2}>
                {`₦${new Intl.NumberFormat().format(productPrice)}`}
            </Text>

            <Button
                variant={'secondary'}
                rounded={'lg'}
                paddingY={6}
                w={'full'}
                fontWeight={'bold'}
                backgroundColor={'#291E0B'}
                textTransform={'uppercase'}
                letterSpacing={'wider'}
                _hover={{
                    bgColor: '#827A6E'
                }}
                onClick={() => router.push(`/${productCat}/${productId}`)}>
                View item
            </Button>

        </Flex>
    )
}

const ProductCollection = ({ productState }) => {
    const { isLoading, isFetching, isLoaded, error, data }
        = productState

    if (isFetching) return <LoadingSkeleton />

    if (isLoaded && Object.values(data).length === 0) {
        return (
            <VStack
                width={'full'}
                height={'60vh'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}>

                <Circle
                    bgColor={'gray.200'}
                    size={'150px'}>
                    <Image
                        src={noProduct}
                        alt={'Not match found'}
                        width={100}
                    />
                </Circle>

                <Text
                    fontWeight={'bold'}
                    fontSize={'2xl'}
                    textColor={'black'}>
                    No products found!
                </Text>

                <Text
                    fontWeight={'medium'}
                    fontSize={'md'}
                    textColor={'gray.800'}
                    noOfLines={3}
                    maxW={'md'}>
                    Unfortunately, we couldn&apos;t find any products for this collection at the moment. Please come back later for updated inventory.
                </Text>

            </VStack>
        )
    }

    return (
        <Grid
            gridTemplateColumns={'repeat(5, 1fr)'}
            gap={8}
            marginTop={8}>

            {
                Object.values(data).map((product, index) => (
                    <FeaturedItem
                        key={index}
                        productId={product.pid}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        productImg={product.images[0]}
                        productCat={product.category}
                    />
                ))
            }
        </Grid>
    )
}

const Featured = ({ getProductsBySubCategory }) => {
    const subCategory = ['Trending', 'Featured', 'On Sale', 'New Arrival']

    const productState = useSelector((state) => state.products)

    const fetchSubCategory = (index) => {
        switch (index) {
            case 0:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 1:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 2:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 3:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
        }
    }

    useEffect(() => {
        fetchSubCategory(0)
    }, [])

    return (
        <Flex
            as={'section'}
            paddingX={12}
            paddingY={16}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>
            <ToastContainer />

            <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={'3xl'}
                    textAlign={'center'}
                    textColor={'black'}>
                    Our Products
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textColor={'gray.700'}
                    marginTop={1}>
                    Discover varieties of selected amazing products collection
                </Text>

                <Tabs
                    align={'center'}
                    marginTop={4}
                    colorScheme={'orange'}
                    variant={'soft-rounded'}
                    onChange={(index) => fetchSubCategory(index)}>
                    <TabList>
                        {
                            subCategory.map((item, index) =>
                                <Tab key={index}>{item}</Tab>
                            )
                        }
                    </TabList>
                    <TabPanels>
                        {
                            subCategory.map((item, index) =>
                                <TabPanel key={index}>
                                    <ProductCollection
                                        productState={productState}
                                    />
                                </TabPanel>
                            )}
                    </TabPanels>
                </Tabs>
            </Flex>

        </Flex>
    )
}


export const matchDispatchToProps = dispatch => {
    return {
        getProductsBySubCategory: (subCategory) =>
            dispatch(getProductsBySubCategory(subCategory))
    }
}

export default connect(null, matchDispatchToProps)(Featured)