import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {Slider} from "@mui/material";


export default function DashBoardSliderCard({ textValue, title, iconPic }) {
    return (
        <Card sx={{ maxWidth: 600 }}>
                <CardContent sx={{ textAlign: 'center' }}>

                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>

                    {/* This handles the icon */}
                    {iconPic}

                    <Typography gutterBottom variant="h5" component="div">
                        {textValue}
                    </Typography>

                    <Slider
                        size="big"
                        defaultValue={70}
                        aria-label="Big"
                        valueLabelDisplay="auto"
                    />

                </CardContent>
        </Card>
    );
}