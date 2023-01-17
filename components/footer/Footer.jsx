import { Divider, Flex, Grid, HStack, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link'
import { At, InstagramLogo, MapPinLine, TwitterLogo, WhatsappLogo } from 'phosphor-react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const auth = useSelector(state => state.persistFirebase.profile)

    return (
        <Flex
            py={8}
            bgColor={'gray.900'}
            flexDir={'column'}>

            <Flex
                justifyContent={'space-between'}
                alignItems={'start'}
                w={'full'}
                px={12}>
                <Flex
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    alignItems={'start'}
                    flexGrow={1}>
                    <Text
                        fontWeight={'black'}
                        fontSize={'3xl'}
                        textColor={'white'}
                        textTransform={'capitalize'}>
                        fobath woodwork
                    </Text>

                    <Text
                        fontWeight={'light'}
                        fontSize={'sm'}
                        textColor={'white'}
                        maxWidth={'md'}
                        mt={5}>
                        Fobath Woodwork is a company that specializes in creating high-quality, handcrafted household furniture.
                        We also offer assembly services for IKEA products, ensuring that customers can enjoy their new furniture quickly and easily.
                    </Text>

                    <Stack
                        direction={'row'}
                        spacing={4}
                        mt={5}>

                        <Link
                            href={'https://twitter.com/Fobath_woodwork'} target={'_blank'}>
                            <IconButton
                                aria-label={'twitter social button'}
                                color={'white'}
                                bgColor={'whiteAlpha.200'}
                                variant={'ghost'}
                                icon={
                                    <TwitterLogo size={24} weight={'fill'} alt={'Twitter'} />
                                }
                                _hover={{
                                    color: 'gold.500'
                                }}
                            />
                        </Link>
                        <Link href={'https://www.instagram.com/fobath_woodwork/'} target={'_blank'}>
                            <IconButton
                                aria-label={'instagram social button'}
                                color={'white'}
                                bgColor={'whiteAlpha.200'}
                                variant={'ghost'}
                                icon={
                                    <InstagramLogo size={24} weight={'fill'} alt={'Instagram'} />
                                }
                                _hover={{
                                    color: 'gold.500'
                                }}
                            />

                        </Link>
                    </Stack>
                </Flex>

                <Grid
                    gridTemplateColumns={'repeat(1, 1fr)'}
                    rowGap={4}>
                    <Text
                        color={'white'}
                        fontWeight={'semibold'}
                        fontSize={'xl'}>
                        Company
                    </Text>

                    <Link href={'/'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Home
                        </Text>

                    </Link>
                    <Link href={'/'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            About Us
                        </Text>
                    </Link>
                    <Link href={'/'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Terms and Conditions
                        </Text>
                    </Link>
                </Grid>

                <Grid
                    gridTemplateColumns={'repeat(1, 1fr)'}
                    rowGap={3}
                    ml={20}>
                    <Text
                        color={'white'}
                        fontWeight={'semibold'}
                        fontSize={'xl'}>
                        My Account
                    </Text>

                    {auth.isEmpty &&
                        <Link href={'/login'}>
                            <Text
                                color={'white'}
                                fontWeight={'normal'}
                                fontSize={'sm'}
                                transition={'all 0.4s ease 0s'}
                                _hover={{
                                    color: 'gold.500',
                                    transition: 'all .4s',
                                    transform: 'translateX(6px)',
                                    transitionProperty: ''
                                }}>
                                Login
                            </Text>

                        </Link>
                    }
                    <Link href={'/cart'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Cart
                        </Text>
                    </Link>
                    <Link href={'/wishlist'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Wishlist
                        </Text>
                    </Link>
                    <Link href={'/orders'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Orders
                        </Text>
                    </Link>
                    <Link href={'/account'}>
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}
                            transition={'all 0.4s ease 0s'}
                            _hover={{
                                color: 'gold.500',
                                transition: 'all .4s',
                                transform: 'translateX(6px)'
                            }}>
                            Account
                        </Text>
                    </Link>
                </Grid>

                <Grid
                    gridTemplateColumns={'repeat(1, 1fr)'}
                    rowGap={3}
                    ml={20}>
                    <Text
                        color={'white'}
                        fontWeight={'semibold'}
                        fontSize={'xl'}>
                        Contact Us
                    </Text>

                    <HStack>
                        <Icon
                            as={MapPinLine}
                            color={'white'}
                            boxSize={5}
                            weight={'duotone'}
                        />
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}>
                            Lagos, Nigeria
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon
                            as={WhatsappLogo}
                            color={'white'}
                            boxSize={5}
                            weight={'duotone'}
                        />
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}>
                            +2349123456789
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon
                            as={At}
                            color={'white'}
                            boxSize={5}
                            weight={'duotone'}
                        />
                        <Text
                            color={'white'}
                            fontWeight={'normal'}
                            fontSize={'sm'}>
                            fobath@mail.com
                        </Text>
                    </HStack>
                </Grid>
            </Flex>

            <Divider mt={8} mb={4} orientation={'horizontal'} bgColor={'whiteAlpha.500'} />

            <Text
                color={'white'}
                fontWeight={'light'}
                textAlign={'center'}
                fontSize={'sm'}>
                Copyright &copy; 2023, All Rights Reserved
            </Text>

        </Flex>
    )
}

export default Footer