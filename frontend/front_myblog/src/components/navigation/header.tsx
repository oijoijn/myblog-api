import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import BasicMenu from '../elements/BasicMenu';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const handleTechExploreClick = () => {
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleTechExploreClick}>
            技術探検
          </Typography>
          <BasicMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
