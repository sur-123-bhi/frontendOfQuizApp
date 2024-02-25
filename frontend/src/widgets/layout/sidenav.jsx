import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import verve from "../../assets/verve.png";
import logoutIcon from "../../assets/logout.png";
import {useDispatch} from 'react-redux';
import {setDataIntoStore} from '../../redux/userActionAndReducer/actions';

export function Sidenav({  routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  //logout functionality---------------

  const usedispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    const emptyObj = {
      token: "",
      userDetails: {}
    }
    usedispatch(setDataIntoStore(emptyObj));
    window.location.href = '/login';
  }
  //logout functionality---------------

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
       <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
  <Link to="/" className="py-6 px-8 text-center">
    <img style={{ height: "80px", width: "80px" }} src={verve} alt="Logo"/>
    {/* <Typography
      variant="h6"
      color={sidenavType === "dark" ? "white" : "blue-gray"}
    >
      BYTE-BLITZ
    </Typography> */}
  </Link>
</div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
            <Button 
              className="flex items-center gap-4 px-4 capitalize bg-gradient-to-br from-gray-800 to-gray-900" 
              fullWidth 
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="Logout" style={{ height: "20px", width: "20px" }} />
              <Typography color="inherit" className="font-medium capitalize">
                Logout
              </Typography>
            </Button>

            
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
