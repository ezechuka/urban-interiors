import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Circle, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Link as NextLink } from 'next/link'
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
    const menuRef = useRef()

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
                fontSize={{ base: 'sm', md: 'md' }}
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

            <Drawer
                isOpen={isOpen}
                placement={'right'}
                onClose={onClose}
                finalFocusRef={menuRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Fobath Woodwork</DrawerHeader>

                    <DrawerBody>
                        {
                            auth.isEmpty ?
                                <VStack
                                    w={'full'}
                                    h={'full'}
                                    justifyContent={'center'}>
                                    <Text
                                        fontSize={'3xl'}
                                        fontWeight={'bold'}>
                                        Get started
                                    </Text>
                                    <Button
                                        variant={'solid'}
                                        w={'100%'}
                                        mt={8}
                                        fontWeight={'medium'}
                                        shadow={'lg'}
                                        transition={'all .5s'}
                                        textTransform={'uppercase'}
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
                                        borderWidth={1}
                                        borderColor={'gray.300'}
                                        w={'100%'}
                                        transition={'all .5s'}
                                        fontWeight={'medium'}
                                        onClick={() => router.push('/login')}>
                                        login
                                    </Button>
                                </VStack>
                                :
                                <VStack>
                                    <Flex
                                        flexDirection={'column'}
                                        alignItems={'center'}
                                        mb={4}>
                                        <Avatar name={auth.displayName} src={auth.avatarUrl} />
                                        <Text
                                            fontWeight={'medium'}>
                                            {auth.displayName}
                                        </Text>
                                        <Text
                                            fontWeight={'normal'}
                                            fontSize={'sm'}>
                                            {auth.email}
                                        </Text>
                                    </Flex>
                                    <Accordion allowToggle w={'full'}>
                                        <AccordionItem fontSize={'sm'}>
                                            <h2>
                                                <AccordionButton>
                                                    <Text fontWeight={'medium'} flex='1' textAlign='left'>
                                                        Category
                                                    </Text>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel>
                                                <VStack alignItems={'start'}>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/sofa'}>
                                                        Sofa
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/bed'}>
                                                        Bed
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/shoe-rack'}>
                                                        Shoe Rack
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/ward-robe'}>
                                                        Ward Robe
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/shelf'}>
                                                        Shelf
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/tv-console'}>
                                                        TV Console
                                                    </Link>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/table-and-chair'}>
                                                        Table and chair
                                                    </Link>
                                                </VStack>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>

                                    <Accordion defaultIndex={[0]} allowToggle w={'full'}>
                                        <AccordionItem fontSize={'sm'}>
                                            <h2>
                                                <AccordionButton>
                                                    <Text fontWeight={'medium'} flex='1' textAlign='left'>
                                                        Account
                                                    </Text>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <VStack alignItems={'start'}>
                                                    <Link
                                                        as={NextLink}
                                                        href={'/wishlist'}>
                                                        Wishlist
                                                    </Link>

                                                    <Link
                                                        as={NextLink}
                                                        href={'/orders'}>
                                                        Orders
                                                    </Link>
                                                </VStack>

                                                <Button
                                                    variant={'solid'}
                                                    w={'100%'}
                                                    mt={8}
                                                    fontWeight={'medium'}
                                                    shadow={'lg'}
                                                    py={5}
                                                    transition={'all .5s'}
                                                    textTransform={'uppercase'}
                                                    onClick={() => router.push('/cart')}>
                                                    Cart
                                                </Button>

                                                <Button
                                                    variant={'ghost'}
                                                    w={'100%'}
                                                    mt={4}
                                                    py={5}
                                                    fontWeight={'medium'}
                                                    shadow={'sm'}
                                                    textColor={'red.400'}
                                                    borderWidth={'1px'}
                                                    borderColor={'gray.200'}
                                                    transition={'all .5s'}
                                                    textTransform={'uppercase'}
                                                    onClick={() => {
                                                        dispatch(signOut())
                                                        router.replace('/')
                                                    }}>
                                                    logout
                                                </Button>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </VStack>
                        }
                    </DrawerBody>

                </DrawerContent>
            </Drawer>

            {/* Mobile hamburger icon button */}
            <Box
                position={'relative'}
                display={{ base: 'flex', lg: 'none' }}>
                <IconButton
                    aria-label={'mobile menu'}
                    color={'black'}
                    variant={'ghost'}
                    justifyContent={'end'}
                    icon={
                        <Tooltip
                            hasArrow
                            label={'Cart'}
                            placement={'bottom'}
                            textColor={'white'}
                            bgColor={'gray.900'}>
                            <List size={28} weight={'regular'} alt={''} />
                        </Tooltip>
                    }
                    onClick={() => onOpen()} />

                {
                    cart && cart.totalItems > 0 &&
                    <Circle
                        size='20px'
                        bg='gold.500'
                        color='white'
                        position={'absolute'}
                        top={0}
                        right={-1}>

                        <Text
                            fontSize={'xs'}
                            fontWeight={'medium'}>
                            {cart ? cart.totalItems : 0}
                        </Text>
                    </Circle>
                }
            </Box>
        </Flex>
    )
}

export default Navbar