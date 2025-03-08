import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import BasicMenu from '../elements/BasicMenu';

export default function Header() {
    const navigate = useNavigate();
    const handleTechExploreClick = () => {
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}> 
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={handleTechExploreClick}
                        sx={{
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        技術探検
                    </Button>
                    <BasicMenu />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
