import { Box, Link } from '@chakra-ui/layout';
import React from 'react'

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> =({}) =>{
    return (
      <Box p={4} ml={'auto'} bg="#718096">
        <Link p={4} href="/login">Login</Link>
        <Link p={4} href="/register">Register</Link>
      </Box>
    );
}