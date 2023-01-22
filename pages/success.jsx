import { Button, Stack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'
import Meta from '../components/meta/Meta'

import success from '../public/success.png'

const SuccessPage = () => {

    const router = useRouter()
    const hasNotAuth = useSelector((state) => state.persistFirebase.auth.isEmpty)

    useEffect(() => {
        if (hasNotAuth) {
            router.replace('/signup')
            return
        }
    }, [hasNotAuth])

    if (hasNotAuth) return null // don't render any UI since auth state has not been verified

    return (
        <VStack
            alignItems={'center'}
            justifyContent={'center'}
            as={'section'}
            paddingX={12}
            paddingY={8}
            flexDirection={'column'}>

            <Meta title={'Thank you | Fobath Woodwork'} />

            <Confetti />

            <Image
                src={success} />

            <Text
                fontSize={'4xl'}
                fontWeight={'extrabold'}
                textAlign={'center'}
                textColor={'black'}>
                Thank you for patronizing us!
            </Text>

            <Text
                textColor={'black'}
                fontWeight={'normal'}
                fontSize={'md'}
                maxW={'sm'}
                textAlign={'center'}>
                We have successfully received your order and
                we&apos;ll start processing your purchase right away.
            </Text>

            <Stack
                direction={'row'}>
                <Button
                    variant={'ghost'}
                    borderWidth={1}
                    borderColor={'gray.300'}
                    paddingY={6}
                    textTransform={'none'}
                    fontSize={'sm'}
                    onClick={() => router.replace('/orders')}>
                    My Orders
                </Button>
                <Button
                    variant={'solid'}
                    paddingY={6}
                    textTransform={'none'}
                    fontSize={'sm'}
                    onClick={() => router.replace('/')}>
                    Continue shopping
                </Button>
            </Stack>

        </VStack>
    )
}

export default SuccessPage