import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Slider } from "@mui/material";

export default function DashBoardSliderCard({ title, iconPic, value, onChange }) {
    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                {iconPic}

                <Slider
                    size="medium"
                    value={value} // Controlled value from parent state
                    onChange={onChange} // Calls the function in OverviewScreen
                    aria-label="Battery Threshold"
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                />
            </CardContent>
        </Card>
    );
}