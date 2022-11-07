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
                    borderRadius: '',
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
                'ghost': {
                    fontWeight: 'medium',
                    fontSize: 'sm',
                    padding: '0',
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