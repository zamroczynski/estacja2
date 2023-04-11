import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="md:text-4xl font-extrabold font-sans sm:text-3xl">
      <Link to="/">
        <Button className="text-4xl font-extrabold font-sans">
          <span className="text-lime-600 lowercase">e</span>
          <span className="text-stone-500 uppercase">STACJA</span>
          <span>
            <LocalGasStationOutlinedIcon className="text-stone-300" />
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default Logo;
