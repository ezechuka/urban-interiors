import { Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ShoppingCart } from "phosphor-react"

const Navbar = () => {
    const router = useRouter()
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

            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                spacing={8}>
                <Button variant={'ghost'} onClick={() => router.push('signup')}>
                    signup
                </Button>
                <Button variant={'ghost'} onClick={() => router.push('login')}>
                    login
                </Button>
                <IconButton
                    aria-label={'shopping cart'}
                    bg={'gold.100'}
                    color={'black'}
                    variant={'ghost'}
                    icon={
                        <ShoppingCart size={20} weight={'regular'} />
                    }
                    _hover={{
                        color: 'gold.500'
                    }}
                />
            </HStack>

        </Flex>
    )
}

export default Navbar