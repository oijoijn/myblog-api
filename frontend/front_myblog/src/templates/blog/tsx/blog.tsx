import { Typography, Box } from '@mui/material';
import { containerStyle } from '../containerStyle';

export const blog: React.FC = () => {
    return (
        <>
            <Box style={containerStyle}>
                <Typography variant="h3" align="center">サイトについて</Typography>
                <Typography component="p">
                    このサイトでは,筆者が興味深いと感じた技術や実際に触れたことのある技術についてご紹介させていただいております.可能な限り正確な情報をお届けできるよう努めておりますが,万一誤りがございましたら,下記のコメント欄にてご指摘いただけますと幸いです.
                </Typography>
            </Box>
        </>
    )
}

export default blog;