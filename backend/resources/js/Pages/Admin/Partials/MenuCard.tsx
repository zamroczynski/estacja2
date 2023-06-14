import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface MenuCardProps {
    Icon: any;
    ButtonText: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ Icon, ButtonText }) => {
    return (
        <Card sx={{ minWidth: 270, minHeight: 280, cursor: "pointer" }}>
            <CardContent>
                <div className="flex justify-center items-center">
                    <Icon sx={{ minWidth: 180, minHeight: 180 }} />
                </div>
                <div className="flex justify-center items-center">
                    <Button sx={{ fontSize: 19 }}>{ButtonText}</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default MenuCard;
