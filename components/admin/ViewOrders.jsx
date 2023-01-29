import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DotsThreeOutlineVertical } from "phosphor-react";

import { useEffect } from "react";
import { connect, useSelector } from "react-redux"
import { retrieveAllOrders } from "../../store/orderReducer"

const OrderItem = () => {
    return (
        <Flex>

        </Flex>
    )
}

const ViewOrders = ({ getAllOrders }) => {

    const { isLoading, isFetching, isLoaded, error, data } =
        useSelector((state) => state.order)

    useEffect(() => {
        getAllOrders()
    }, [])
    { console.log(data) }
    return (
        <Flex
            width={'full'}
            minHeight={'60vh'}
            paddingY={4}
            flexDirection={'column'}>

            <TableContainer fontSize={'sm'}>
                <Table variant={'striped'} colorScheme={'gray'}>
                    <Thead>
                        <Tr>
                            <Th>Customer</Th>
                            <Th>Email</Th>
                            <Th>Phone number</Th>
                            <Th>Order date</Th>
                            <Th>Total price</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {
                            isLoaded && data.map((item) => (
                                <Tr key={item.orderId}>
                                    <Td>{item.fullname}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.phone}</Td>
                                    <Td>{item.date.toDate().toDateString().replace(' ', ', ')}</Td>
                                    <Td>{`₦${new Intl.NumberFormat().format(item.totalPrice)}`}</Td>
                                    <Td color={'gold.500'}>{item.status}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label='Options'
                                                icon={<DotsThreeOutlineVertical size={24} />}
                                                variant='outline'
                                            />
                                            <MenuList>
                                                <MenuItem>
                                                    Pending
                                                </MenuItem>
                                                <MenuItem>
                                                    In progress
                                                </MenuItem>
                                                <MenuItem>
                                                    In transit
                                                </MenuItem>
                                                <MenuItem>
                                                    Delivered
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

        </Flex>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        getAllOrders: () => dispatch(retrieveAllOrders())
    }
}

export default connect(null, matchDispatchToProps)(ViewOrders)