import { Box, Button, Circle, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Heart, MagnifyingGlass, ShoppingCart, User } from "phosphor-react"
import { useSelector } from "react-redux"

const Navbar = () => {
    const router = useRouter()
    const auth = useSelector(state => state.persistFirebase.auth)
    const cart = useSelector((state) => state.persistFirebase.profile.cart)

    return (
        <Flex
            as={'nav'}
            justifyContent={'space-between'}
            alignItems={'center'}
            paddingX={12}
            paddingY={4}
            boxShadow={'sm'}>

            <Text
                fontWeight={'semibold'}
                fontSize={'md'}
                letterSpacing={'widest'}
                textColor={'black'}
                textTransform={'uppercase'}>
                fobath woodwork
            </Text>

            <InputGroup
                size={'lg'}
                width={'50%'}
                m={'auto'}>
                <InputLeftElement>
                    <MagnifyingGlass size={20} weight={'regular'} />
                </InputLeftElement>
                <Input
                    placeholder={'Search entire store here'}
                    fontSize={'sm'}
                    _placeholder={{ fontSize: 'sm' }}
                    focusBorderColor={'blackAlpha.400'}
                    variant={'filled'}
                />
                <InputRightElement mr={'1.8rem'}>
                    <Button size={'sm'} paddingY={'5'}>
                        Search
                    </Button>
                </InputRightElement>
            </InputGroup>

            <HStack
                justifyContent={'center'}
                alignItems={'center'}
            >
                {
                    !auth.isEmpty ?
                        <>
                            <IconButton
                                aria-label={'account'}
                                bg={'gold.100'}
                                color={'black'}
                                variant={'ghost'}
                                icon={
                                    <User size={24} weight={'regular'} alt={'account'} />
                                }
                                _hover={{
                                    color: 'gold.500'
                                }}
                                onClick={() => router.push('/account')}
                            />

                            <IconButton
                                aria-label={'account'}
                                bg={'gold.100'}
                                color={'black'}
                                variant={'ghost'}
                                icon={
                                    <Heart size={24} weight={'regular'} alt={'wishlist'} />
                                }
                                _hover={{
                                    color: 'gold.500'
                                }}
                                onClick={() => router.push('/wishlist')}
                            />

                        </>
                        :
                        <>
                            <Button variant={'ghost'} padding={0} onClick={() => router.push('signup')}>
                                signup
                            </Button>
                            <Button variant={'ghost'} padding={0} onClick={() => router.push('login')}>
                                login
                            </Button>
                        </>

                }

                <Box
                    position={'relative'}>
                    <IconButton
                        aria-label={'shopping cart'}
                        bg={'gold.100'}
                        color={'black'}
                        variant={'ghost'}
                        icon={
                            <ShoppingCart size={24} weight={'regular'} alt={'shopping cart'} />
                        }
                        _hover={{
                            color: 'gold.500'
                        }}
                        onClick={() => router.push('/cart')} />
                    <Circle
                        size='20px'
                        bg='gold.500'
                        color='white'
                        position={'absolute'}
                        top={0}
                        right={0}>
                        <Text
                            fontSize={'xs'}
                            fontWeight={'medium'}>
                            {cart ? cart.totalItems : 0}
                        </Text>
                    </Circle>
                </Box>
            </HStack>

        </Flex>
    )
}

export default Navbar