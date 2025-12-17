import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { CiBatteryCharging } from "react-icons/ci";

export default function DashboardCard( {textValue,title, iconPic  }) {
    return (

        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    {iconPic}
                    <Typography gutterBottom variant="h5" component="div">
                        {textValue}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}