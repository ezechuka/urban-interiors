import { Flex, Grid, IconButton, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { InstagramLogo, TwitterLogo, WhatsappLogo } from 'phosphor-react'

const Footer = () => {
    return (
        <Flex
            padding={12}
            bgColor={'gray.900'}
            justifyContent={'space-between'}
            alignItems={'start'}>

            <Stack
                direction={'column'}
                spacing={10}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'start'}>
                <Text
                    fontWeight={'semibold'}
                    fontSize={'sm'}
                    letterSpacing={'widest'}
                    textColor={'white'}
                    textTransform={'uppercase'}>
                    fobath woodwork
                </Text>

                <Stack
                    direction={'row'}
                    spacing={4}>

                    <Link
                        href={'https://twitter.com/OTUNBA_TIZ'} target={'_blank'}>
                        <IconButton
                            aria-label={'twitter social button'}
                            color={'white'}
                            bgColor={'whiteAlpha.200'}
                            variant={'ghost'}
                            icon={
                                <TwitterLogo size={24} weight={'fill'} alt={'twitter logo'} />
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
                                <InstagramLogo size={24} weight={'fill'} alt={'instagram logo'} />
                            }
                            _hover={{
                                color: 'gold.500'
                            }}
                        />

                    </Link>
                    <Link href={'/'} target={'_blank'}>
                        <IconButton
                            aria-label={'whatsapp social button'}
                            color={'white'}
                            bgColor={'whiteAlpha.200'}
                            variant={'ghost'}
                            icon={
                                <WhatsappLogo size={24} weight={'fill'} alt={'whatsapp lgo'} />
                            }
                            _hover={{
                                color: 'gold.500'
                            }}
                        />
                    </Link>
                </Stack>
            </Stack>

            <Grid
                gridTemplateColumns={'repeat(2, 1fr)'}
                gap={4}>
                <Link href={'/'}>
                    <Text
                        color={'white'}
                        fontWeight={'medium'}
                        fontSize={'sm'}
                        _hover={{
                            color: 'gold.500',
                            transition: 'all .2s',
                            transform: 'translateX(8px)'
                        }}>
                        Home
                    </Text>

                </Link>
                <Link href={'/'}>
                    <Text
                        color={'white'}
                        fontWeight={'medium'}
                        fontSize={'sm'}
                        _hover={{
                            color: 'gold.500',
                            transition: 'all .2s',
                            transform: 'translateX(8px)'
                        }}>
                        Contact
                    </Text>
                </Link>
                <Link href={'/'}>
                    <Text
                        color={'white'}
                        fontWeight={'medium'}
                        fontSize={'sm'}
                        _hover={{
                            color: 'gold.500',
                            transition: 'all .2s',
                            transform: 'translateX(8px)'
                        }}>
                        About Us
                    </Text>
                </Link>
                <Link href={'/'}
                    target={'_blank'}>
                    <Text
                        color={'white'}
                        fontWeight={'medium'}
                        fontSize={'sm'}
                        _hover={{
                            color: 'gold.500',
                            transition: 'all .2s',
                            transform: 'translateX(8px)'
                        }}>
                        Privacy Policy
                    </Text>
                </Link>
            </Grid>

            <Text
                color={'white'}
                fontWeight={'semibold'}
                fontSize={'sm'}>
                Copyright &copy; 2022, All Rights Reserved
            </Text>

        </Flex>
    )
}

export default Footer