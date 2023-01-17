import { Box, Button, Circle, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AngularLogo, Heart, MagnifyingGlass, Package, ShoppingCart, SignOut, SquaresFour, User, UserCircle } from 'phosphor-react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/logoutReducer'

const Navbar = () => {
    const router = useRouter()
    const auth = useSelector(state => state.persistFirebase.profile)
    const cart = useSelector((state) => state.persistFirebase.profile.cart)
    const dispatch = useDispatch()

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
                width={'40%'}
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
                alignItems={'center'}>
                {
                    auth.isEmpty ?
                        <HStack spacing={4}>
                            <Button variant={'ghost'}
                                fontWeight={'medium'}
                                shadow={'sm'}
                                borderWidth={1}
                                borderColor={'gray.300'}
                                _hover={{
                                    boxShadow: 'lg',
                                    backgroundColor: 'gold.500',
                                    borderColor: 'gold.500',
                                    color: 'white',
                                    transition: 'all .3s',
                                    transform: 'scale(1.05)'
                                }}
                                onClick={() => router.push('/signup')}>
                                Signup
                            </Button>
                            <Button
                                variant={'ghost'}
                                padding={0}
                                fontWeight={'medium'}
                                onClick={() => router.push('/login')}>
                                login
                            </Button>
                        </HStack>
                        :
                        <>
                            <IconButton
                                aria-label={'shopping cart'}
                                bg={'gold.100'}
                                color={'black'}
                                variant={'ghost'}
                                icon={
                                    <Tooltip
                                        hasArrow
                                        label={'Admin'}
                                        placement={'bottom'}
                                        textColor={'white'}
                                        bgColor={'gray.900'}>
                                        <AngularLogo size={24} weight={'regular'} />
                                    </Tooltip>
                                }
                                _hover={{
                                    color: 'gold.500'
                                }}
                                onClick={() => router.push('/admin')} />

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={
                                        <Tooltip
                                            hasArrow
                                            label={'Category'}
                                            placement={'bottom'}
                                            textColor={'white'}
                                            bgColor={'gray.900'}>
                                            <SquaresFour size={24} weight={'regular'} />
                                        </Tooltip>}
                                    variant='ghost'
                                />
                                <MenuList fontSize={'sm'}>
                                    <MenuGroup title={'Category'}>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Sofa
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Bed
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Shoe Rack
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Ward Robe
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Shelf
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            TV Console
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/account')}>
                                            Table and chair
                                        </MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={
                                        <Tooltip
                                            hasArrow
                                            label={'My Account'}
                                            placement={'bottom'}
                                            textColor={'white'}
                                            bgColor={'gray.900'}>
                                            <User size={24} weight={'regular'} alt={''} />
                                        </Tooltip>
                                    }
                                    variant='ghost'
                                />
                                <MenuList fontSize={'sm'}>
                                    <MenuItem icon={<UserCircle size={24} weight={'regular'} />}
                                        onClick={() => router.push('/account')}>
                                        Account
                                    </MenuItem>
                                    <MenuItem icon={<Heart size={24} weight={'regular'} />}
                                        onClick={() => router.push('/wishlist')}>
                                        Wishlist
                                    </MenuItem>
                                    <MenuItem icon={<Package size={24} weight={'regular'} />}
                                        onClick={() => router.push('/orders')}>
                                        Orders
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem color={'red.500'} icon={<SignOut size={24} weight={'regular'} />}
                                        onClick={() => {
                                            dispatch(signOut())
                                        }}>
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
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
                            <Tooltip
                                hasArrow
                                label={'Cart'}
                                placement={'bottom'}
                                textColor={'white'}
                                bgColor={'gray.900'}>
                                <ShoppingCart size={24} weight={'regular'} alt={''} />
                            </Tooltip>
                        }
                        _hover={{
                            color: 'gold.500'
                        }}
                        onClick={() => router.push('/cart')} />

                    {
                        cart && cart.totalItems > 0 &&
                        <Circle
                            size='16px'
                            bg='gold.500'
                            color='white'
                            position={'absolute'}
                            top={1}
                            right={1}>

                            <Text
                                fontSize={'xs'}
                                fontWeight={'medium'}>
                                {cart ? cart.totalItems : 0}
                            </Text>
                        </Circle>
                    }
                </Box>
            </HStack>

        </Flex >
    )
}

export default Navbar