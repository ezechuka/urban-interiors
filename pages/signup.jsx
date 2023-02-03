import { Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Eye, EyeClosed } from 'phosphor-react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useFirebase } from 'react-redux-firebase'
import firebaseCompat from 'firebase/compat/app'

import { motion } from 'framer-motion'

import sofa from '../public/sofa.png'
import { SignupValidation } from '../utils/validate'
import Meta from '../components/meta/Meta'

const imagePaneVariant = {
    fromTop: {
        y: '-100vh'
    },
    toBottom: {
        y: 0,
        transition: { delay: 0.5, type: 'spring', stiffness: 100 }
    }
}

const formPaneVariant = {
    fromRight: {
        x: '150vw'
    },
    toLeft: {
        x: 0,
        transition: { delay: 0.8, type: 'spring', stiffness: 30, damping: 8 }
    }
}

const Login = () => {
    const [authErr, setAuthErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const router = useRouter()
    const firebase = useFirebase()

    const firestore = firebaseCompat.firestore()

    const cart = {
        totalItems: 0,
        totalPrice: 0,
        items: {}
    }

    const wishlist = []

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setUserData(data => ({ ...data, [name]: value }))
    }
    const handleShowClick = () => setShow(prev => !prev)

    const signUpWithEmail = ({ fullname, email, password }) => {
        setLoading(true)
        setAuthErr('')
        setErrors({})

        firebase.createUser({ email, password }, { fullname, email, cart, wishlist })
            .then(() => {
                setLoading(false)
                router.push('/')
            })
            .catch((err) => {
                setLoading(false)
                setAuthErr(err.message)
            })
    }

    const signUpWithGoogle = () => {
        setAuthErr('')
        setErrors({})

        firebase.login({
            provider: 'google',
            type: 'popup',
        }).then((res) => {
            firestore
                .collection('users')
                .doc(res.user.uid)
                .update({ cart, wishlist })
            router.push('/')
        }).catch(err => {
            setAuthErr(err.message)
        })
    }
    return (
        <Flex
            w={'full'}
            h={'100vh'}
            overflow={'hidden'}>

            <Flex
                w={'60%'}
                h={'100vh'}
                bgColor={'gold.500'}
                display={{base: 'none', lg: 'flex'}}>

                <Flex
                    as={motion.div}
                    w={'full'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    variants={imagePaneVariant}
                    initial={'fromTop'}
                    animate={'toBottom'}>
                    <Image src={sofa} alt={''} />

                    <Text
                        fontSize={'5xl'}
                        fontWeight={'extrabold'}
                        textAlign={'center'}
                        textColor={'white'}>
                        Hello There!
                    </Text>

                    <Text
                        textColor={'white'}
                        fontWeight={'normal'}
                        fontSize={'sm'}>
                        Please create an account
                    </Text>
                </Flex>

            </Flex>

            <Flex
                w={{base: '100%', lg: '40%'}}
                h={'100vh'}
                justifyContent={'center'}
                alignItems={'center'}>

                <Flex
                    as={motion.div}
                    paddingX={4}
                    paddingY={12}
                    spacing={4}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={{base: '85%', md: '70%', lg: '70%'}}
                    variants={formPaneVariant}
                    initial={'fromRight'}
                    animate={'toLeft'}>
                    <Meta title={'Signup | Fobath Woodwork'} />

                    <Text
                        fontSize={'4xl'}
                        fontWeight={'extrabold'}
                        textAlign={'center'}
                        textColor={'black'}>
                        Create Account
                    </Text>

                    <Text
                        textColor={'red.500'}
                        fontWeight={'light'}
                        fontSize={'sm'}
                        textAlign={'center'}>
                        {authErr}
                    </Text>

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Fullname
                        </Text>

                        <Input
                            name={'fullname'}
                            placeholder={'Awesome User'}
                            value={userData.fullname}
                            _placeholder={{ fontSize: 'sm' }}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange} />

                        {errors.fullname &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.fullname}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Email
                        </Text>

                        <Input
                            name={'email'}
                            placeholder={'user@mail.com'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange} />

                        {errors.email &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.email}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        width={'full'}
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Password
                        </Text>

                        <InputGroup
                            size={'md'}>
                            <Input
                                name={'password'}
                                placeholder={'Password (min 8 characters)'}
                                _placeholder={{ fontSize: 'sm' }}
                                value={userData.password}
                                focusBorderColor={'gold.500'}
                                type={show ? 'text' : 'password'}
                                onChange={handleFormChange}
                                _focus={{ transform: 'scale(1.01)' }}
                            />
                            <InputRightElement>
                                <IconButton variant={'ghost'} onClick={handleShowClick}
                                    icon={
                                        show ? <Eye color={'black'} size={20} weight={'regular'} /> : <EyeClosed color={'black'} size={20} weight={'regular'} />
                                    }>
                                </IconButton>
                            </InputRightElement>
                        </InputGroup>

                        {errors.password &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.password}
                            </Text>
                        }
                    </VStack>

                    <Button
                        isLoading={loading}
                        loadingText={'Please wait'}
                        variant={'solid'}
                        width={'full'}
                        marginTop={6}
                        paddingY={5}
                        onClick={(e) => {
                            e.preventDefault();
                            let errors = SignupValidation(userData.fullname.trim(), userData.email.trim(), userData.password)
                            if (Object.keys(errors).length === 0) {
                                signUpWithEmail(
                                    {
                                        fullname: userData.fullname.trim(),
                                        email: userData.email.trim(),
                                        password: userData.password
                                    }
                                )
                            } else {
                                setErrors(errors);
                            }
                        }}>
                        Sign up
                    </Button>

                    <Text
                        fontWeight={'normal'}
                        fontSize={'sm'}
                        marginY={4}
                        textColor={'black'}
                        textTransform={'lowercase'}>
                        or sign up with
                    </Text>

                    <Button
                        bgColor={'blackAlpha.200'}
                        borderWidth={'0'}
                        shadow={'sm'}
                        color={'black'}
                        width={'full'}
                        paddingY={5}
                        leftIcon={<FcGoogle weight={'duotone'} size={20} />}
                        _hover={{ color: 'black' }}
                        _focus={{
                            boxShadow: '0 0 1px 4px hsla(221, 83%, 53%, 0.3)'
                        }}
                        onClick={signUpWithGoogle}>
                        Google
                    </Button>

                    <Text
                        fontWeight={'normal'}
                        fontSize={'xs'}
                        marginY={2}
                        textColor={'black'}>
                        {"Already have an account? "}
                        <Text
                            as={'button'}
                            color={'gold.500'}
                            fontWeight={'medium'}
                            variant={'ghost'}
                            textTransform={'none'}
                            onClick={() => router.replace('/login')}>
                            Login
                        </Text>
                    </Text>

                </Flex>

            </Flex>
        </Flex>
    )
}

export default Login