import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconBook,
  IconLogout,
  IconSwitchHorizontal,
  IconCheckupList,
  IconAppsFilled,
  IconUserCircle
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import AddListingModal from './AddListingModal';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick, path }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={path} onClick={onClick}>
        <UnstyledButton className={cx(classes.link, { [classes.active]: active })}>
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', path:"/home" },
  { icon: IconBook, label: 'My Bookings', path:"/bookings" },
  { icon: IconCheckupList, label: 'Listings', path:"/listings" },
//   { icon: IconAppsFilled, label: 'Add Listing', path:"/add_listing" },
//   { icon: IconDeviceDesktopAnalytics, label: 'Analytics', path:"/" },
//   { icon: IconCalendarStats, label: 'Releases', path:"/" },
//   { icon: IconUser, label: 'Account', path:"/" },
//   { icon: IconFingerprint, label: 'Security', path:"/" },
//   { icon: IconSettings, label: 'Settings', path:"/" },
];

export function NavbarMinimal({opened, open, close}) {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    const navigate = useNavigate();

    const links = mockdata.map((link) => (
        <NavbarLink
          {...link}
          key={link.label}
          active={link.path === activePath}
          onClick={() => setActivePath(link.path)}
        />
      ));

  return (
    <>
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
          <NavbarLink
          key={"addListing"}
          icon={ IconAppsFilled}
          label= 'Add Listing'
          onClick={() => {open(); console.log("opening modal")}}
        />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
            {
                localStorage.getItem('token')==null?(
                    // not logged in
                    <NavbarLink path="/login" icon={IconSwitchHorizontal} label="Login" />
                ):(
                    <NavbarLink path="/profile" icon={IconUserCircle} label="Profile" />
                )
            }
          
          <NavbarLink path="/logout" icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
    </>
  );
}