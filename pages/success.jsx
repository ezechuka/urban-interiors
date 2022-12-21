import { Button, Stack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'

import success from '../public/success.png'

const SuccessPage = () => {

    const router = useRouter()

    return (
        <VStack
            alignItems={'center'}
            justifyContent={'center'}
            as={'section'}
            paddingX={12}
            paddingY={8}
            flexDirection={'column'}>

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
                we'll start processing your purchase right away.
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
                    // onClick={() => router.push('/')}
                    >
                    My Orders
                </Button>
                <Button
                    variant={'solid'}
                    paddingY={6}
                    textTransform={'none'}
                    fontSize={'sm'}
                    onClick={() => router.push('/')}>
                    Continue shopping
                </Button>
            </Stack>

        </VStack>
    )
}

export default SuccessPage