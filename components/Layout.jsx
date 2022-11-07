import { Box } from '@chakra-ui/react'
import Navbar from './nav/Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Box 
                as={'header'}
                position={'sticky'}
                zIndex={'docked'}
                top={0}
                bg={'white'}>
                <Navbar />
            </Box>

            <Box 
                as={'main'}
                zIndex={'base'}>
                {children}
            </Box>
        </>
    )
}

export default Layout