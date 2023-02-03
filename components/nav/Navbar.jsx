import { Avatar, Box, Button, Circle, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AngularLogo, Heart, List, MagnifyingGlass, Package, ShoppingCart, SignOut, SquaresFour, User, UserCircle } from 'phosphor-react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/logoutReducer'

const Navbar = () => {
    const router = useRouter()
    const auth = useSelector(state => state.persistFirebase.profile)
    const cart = useSelector((state) => state.persistFirebase.profile.cart)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <Flex
            as={'nav'}
            justifyContent={'space-between'}
            alignItems={'center'}
            paddingX={{ base: 6, lg: 12 }}
            paddingY={4}
            boxShadow={'sm'}>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Account</DrawerHeader>

                    <DrawerBody>
                        <Flex
                            flexDirection={'column'}
                            alignItems={'center'}>
                            <Avatar name={auth.displayName} src={auth.avatarUrl} />
                            <Text
                                fontWeight={'medium'}>
                                {auth.displayName}
                            </Text>
                            <Text
                                fontWeight={'normal'}>
                                {auth.email}
                            </Text>
                        </Flex>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>

            <Text
                fontWeight={'semibold'}
                fontSize={{base: 'sm', md: 'md'}}
                letterSpacing={'widest'}
                textColor={'black'}
                textTransform={'uppercase'}
                transition={'all .4s'}
                onClick={() => router.replace('/')}
                _hover={{ cursor: 'pointer', color: 'gold.500' }}>
                fobath woodwork
            </Text>

            <InputGroup
                size={'lg'}
                width={'40%'}
                m={'auto'}
                display={{ base: 'none', lg: 'block' }}>
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
                display={{ base: 'none', lg: 'flex' }}>
                {
                    auth.isEmpty ?
                        <HStack spacing={4}>
                            <Button variant={'ghost'}
                                fontWeight={'medium'}
                                shadow={'sm'}
                                borderWidth={1}
                                borderColor={'gray.300'}
                                transition={'all .5s'}
                                _hover={{
                                    boxShadow: 'lg',
                                    backgroundColor: 'gold.500',
                                    borderColor: 'gold.500',
                                    color: 'white',
                                    transform: 'scale(1.05)'
                                }}
                                onClick={() => router.push('/signup')}>
                                Signup
                            </Button>
                            <Button
                                variant={'ghost'}
                                padding={0}
                                transition={'all .5s'}
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
                                        <MenuItem onClick={() => router.push('/sofa')}>
                                            Sofa
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/bed')}>
                                            Bed
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/shoe-rack')}>
                                            Shoe Rack
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/ward-robe')}>
                                            Ward Robe
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/shelf')}>
                                            Shelf
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/tv-console')}>
                                            TV Console
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/table-and-chair')}>
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
                                    <MenuItem ref={btnRef} icon={<UserCircle size={24} weight={'regular'} />}
                                        onClick={onOpen}>
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
                                            router.replace('/')
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

            {/* Mobile hamburger icon button */}
            <IconButton
                aria-label={'mobile menu'}
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
                        <List size={24} weight={'regular'} alt={''} />
                    </Tooltip>
                }
                onClick={() => {} } />
        </Flex >
    )
}

export default Navbar