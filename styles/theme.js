import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        body: `'Plus Jakarta Sans', sans-serif`,
    },
    colors: {
        gold: { 
            500: 'hsl(38, 58%, 47%)' 
        }
    },
    components: {
        Button: {
            variants: {
                'solid': {
                    borderRadius: 'md',
                    fontSize: 'md',
                    fontWeight: 'semibold',
                    bg: 'hsl(38, 58%, 47%)',
                    color: 'white',
                    paddingX: 12,
                    paddingY: 6,
                    textAlign: 'center',
                    border: '1px',
                    borderColor: 'gold.500',
                    shadow: 'lg',
                    _hover: {
                        cursor: 'pointer',
                        bg: 'transparent',
                        color: 'gold.500',
                    },
                    _active: {
                        bg: 'gray.50',
                        transform: 'scale(0.95)'
                    },
                    _focus: {
                        boxShadow: '0 0 1px 4px hsl(38, 58%, 47%, 0.35)'
                    }
                },
                'secondary': {
                    fontWeight: 'normal',
                    fontSize: 'sm',
                    bg: 'hsla(38, 58%, 47%, 0.95)',
                    color: 'white',
                    paddingX: 12,
                    borderColor: 'hsla(38, 58%, 47%)',
                    textAlign: 'center',
                    _hover: {
                        cursor: 'pointer',
                        bg: 'transparent',
                        color: 'black',
                        border: '1px',
                        borderColor: 'hsla(38, 58%, 47%)'
                    },
                    _active: {
                        transform: 'scale(0.95)'
                    }
                },
                'ghost': {
                    fontWeight: 'medium',
                    fontSize: 'sm',
                    textTransform: 'uppercase',
                    transition: 'all .2s',
                    _hover: {
                        cursor: 'pointer',
                        color: 'gold.500',
                        bg: 'transparent'
                    },
                    _active: {
                        bg: 'transparent'
                    }
                }
            }
        }
    }
})