import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Footer from './footer/Footer'
import Meta from './meta/Meta'
import Navbar from './nav/Navbar'

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <>
            {(router.route !== '/login' && router.route !== '/signup') &&
                <Box
                    as={'header'}
                    position={'sticky'}
                    zIndex={'dropdown'}
                    top={0}
                    bg={'white'}>
                    <Navbar />
                </Box>
            }

            <Meta />
            <Box
                as={'main'}
                zIndex={'base'}>
                {children}
            </Box>

            {(router.route !== '/login' && router.route !== '/signup') &&
                <Box
                    as={'footer'}>
                    <Footer />
                </Box>
            }
        </>
    )
}

export default Layout