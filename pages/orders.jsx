import { Box, Button, Circle, color, Divider, Flex, Skeleton, Stack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Circle as CircleIcon } from 'phosphor-react'
import { retrieveOrders } from '../store/orderReducer'

import emptyOrder from '../public/package.png'
import { useRouter } from 'next/router'
import Meta from '../components/meta/Meta'

const InfoText = ({ subtitle, info, color }) => {
    return (
        <VStack spacing={0}
            alignItems={'start'}>
            <Text
                fontWeight={'medium'}
                fontSize={'xs'}
                textColor={'gray.500'}
                textAlign={'start'}>
                {subtitle}
            </Text>
            <Text
                fontWeight={'semibold'}
                fontSize={'sm'}
                textColor={color}>
                {info}
            </Text>
        </VStack>
    )
}

const OrderItem = ({ order }) => {
    const router = useRouter()
    
    return (
        <Flex
            justifyContent={'start'}
            alignItems={'start'}
            padding={8}
            width={'full'}
            flexDirection={'column'}>

            <Flex
                justifyContent={'space-between'}
                width={'full'}>
                <Flex
                    rounded={'lg'}
                    overflow={'hidden'}
                    marginEnd={4}
                    alignItems={'center'}>

                    <Image
                        src={order.img}
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
                            {order.title}
                        </Text>

                        <Text
                            fontWeight={'medium'}
                            fontSize={'sm'}
                            textAlign={'start'}
                            textColor={'black'}>
                            {`₦${new Intl.NumberFormat().format(order.price)}`}
                        </Text>
                    </VStack>
                </Flex>

                <VStack
                    justifyContent={'center'}>

                    <Circle size={'32px'} borderWidth={1} borderColor={'blackAlpha.500'}>
                        <CircleIcon weight={'fill'} color={order.color.value} size={32} />
                    </Circle>

                    <Text textTransform={'capitalize'}>
                        {order.color.name}
                    </Text>

                </VStack>

                <Text
                    textAlign={'end'}
                    fontWeight={'normal'}
                    fontSize={'xl'}>
                    {`x${order.quantity}`}
                </Text>
            </Flex>

            <Flex>
                <Button
                    variant={'ghost'}
                    fontWeight={'semibold'}
                    textTransform={'none'}
                    color={'gray.500'}
                    p={0}
                    _hover={{
                        color: 'gold.500'
                    }}
                    onClick={() => {
                        localStorage.setItem('PRODUCT_REF', order.pid)
                        router.push(`${order.category}/${order.pid}`)
                    }}
                >
                    View Product
                </Button>
            </Flex>
        </Flex>
    )
}

const OrderLayout = ({ order }) => {
    return (
        <Stack
            direction={'row'}
            boxShadow={'sm'}
            rounded={'md'}
            width={'full'}
            borderWidth={1}
            spacing={0}
            my={8}>
            <Stack
                direction={'column'}
                spacing={8}
                bgColor={'gray.50'}
                padding={8}>
                <InfoText
                    subtitle={'Order ID'}
                    info={`#${order.pid}`}
                    color={'black'}
                />
                <InfoText
                    subtitle={'Date'}
                    info={`${order.date.toDate().toDateString().replace(' ', ', ')}`}
                    color={'black'}
                />
                <InfoText
                    subtitle={'Total Amount'}
                    info={`₦${new Intl.NumberFormat().format(order.totalPrice)}`}
                    color={'black'}
                />
                <InfoText
                    subtitle={'Status'}
                    info={`${order.status}`}
                    color={'gold.500'}
                />
            </Stack>
            <Stack
                width={'full'}
                direction={'column'}>
                {
                    order.items.map((item, i) => (
                        <Box key={item.pid}>
                            <OrderItem order={item} />
                            {
                                i !== order.items.length - 1 &&
                                <Divider orientation={'horizontal'} bgColor={'gray.100'}
                                    h={'1px'} />
                            }
                        </Box>
                    ))
                }
            </Stack>
        </Stack>
    )
}

const LoadingSkeleton = () => {
    return (
        <Flex
            marginTop={8}
            width={'100%'}>
            <Stack
                direction={'row'}
                width={'full'}
                alignItems={'center'}>
                <Skeleton
                    width={'250px'}
                    height={'250px'}
                    bgColor={'gray.50'} />
                <Stack
                    direction={'column'}
                    spacing={6}>
                    <Skeleton
                        width={'1000px'}
                        height={'40px'}
                    />
                    <Skeleton
                        width={'1000px'}
                        height={'40px'}
                    />
                    <Skeleton
                        width={'1000px'}
                        height={'40px'}
                    />
                    <Skeleton
                        width={'1000px'}
                        height={'40px'}
                    />
                </Stack>
            </Stack>
        </Flex>
    )
}

const Orders = ({ getOrders }) => {

    const router = useRouter()
    const { isLoading, isFetching, isLoaded, error, data }
        = useSelector((state) => state.order)
    const hasNotAuth = useSelector((state) => state.persistFirebase.auth.isEmpty)

    useEffect(() => {
        if (hasNotAuth) {
            router.replace('/signup')
            return
        }

        getOrders()
    }, [])

    if (isLoaded && data?.length === 0)
        return (
            <VStack
                width={'full'}
                height={'60vh'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}>
                <Meta title={'Orders | Fobath Woodwork'} />
                <Circle
                    bgColor={'gray.200'}
                    size={'140px'}>
                    <Image
                        src={emptyOrder}
                        alt={'Empty order'}
                        width={100}
                    />
                </Circle>
                <Text
                    fontWeight={'medium'}
                    fontSize={'md'}
                    textColor={'black'}>
                    You have made no orders yet!
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
                    onClick={() => router.push('/')}>
                    Continue shopping
                </Button>
            </VStack>
        )

    return (
        <>
            {
                <Flex
                    as={'section'}
                    paddingX={12}
                    paddingY={8}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'start'}
                    width={'full'}>
                    <Meta title={'Orders | Fobath Woodwork'} />
                    <Text
                        fontWeight={'bold'}
                        fontSize={'2xl'}
                        textColor={'black'}>
                        Order Details
                    </Text>
                    <Text
                        fontWeight={'semibold'}
                        fontSize={'sm'}
                        textColor={'gray.500'}>
                        Check the status of recent and old orders & discover more products
                    </Text>

                    <Box
                        width={'full'}>
                        {
                            isLoading ? <LoadingSkeleton /> :

                                data.map((order) =>
                                    <OrderLayout
                                        key={order.pid}
                                        order={order}
                                    />
                                )
                        }
                    </Box>
                </Flex>
            }
        </>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(retrieveOrders())
    }
}
export default connect(null, matchDispatchToProps)(Orders)