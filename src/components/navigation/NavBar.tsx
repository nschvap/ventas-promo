import {
  Avatar,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

function NavBar() {
  const { authUser } = useContext(UserContext);

  return (
    <header className="px-4 py-3 w-full bg-primary-400 border-b-[1px] border-primary-950 fixed z-50">
      <nav className="flex items-center justify-between">
        <Link
          to={"/"}
          className="-mt-1 flex flex-col justify-center items-center"
        >
          <h2 className="font-semibold text-lg">Gestor Ventas </h2>
          <Badge colorScheme="primary">SEXTO PROMO 2024</Badge>
        </Link>

        {authUser ? (
          <Menu>
            <MenuButton as={Button} colorScheme="transparent">
              <div className="flex gap-x-2 items-center bg-white px-4 py-1 rounded-md border-[1px] border-primary-950">
                <span className="text-primary-950 hidden md:block">
                  {authUser.nickname}
                </span>
                <Avatar
                  width={"40px"}
                  height={"40px"}
                  name={authUser.nickname}
                />
              </div>
            </MenuButton>

            <MenuList>
              <MenuItem as={Link} to={"/"}>
                <p className="font-semibold flex gap-x-2 items-center">
                  <span className="material-symbols-outlined">house</span>{" "}
                  Pagina Principal
                </p>
              </MenuItem>
              <MenuDivider />
              {authUser.email === "schvapnicolas@gmail.com" && (
                <MenuItem as={Link} to={"/admin-panel"}>
                  <p className="font-semibold flex gap-x-2 items-center">
                    <span className="material-symbols-outlined">
                      construction
                    </span>{" "}
                    Herramientas <Badge colorScheme="danger">ADMIN</Badge>
                  </p>
                </MenuItem>
              )}

              <MenuItem as={Link} to={"/profile"}>
                <p className="font-semibold flex gap-x-2 items-center">
                  <span className="material-symbols-outlined">person</span>{" "}
                  Perfil
                </p>
              </MenuItem>
              {/* <MenuItem>
                  <p className="font-semibold flex gap-x-2 items-center">
                    <span className="material-symbols-outlined">
                      payments
                    </span>{" "}
                    Gestionar Ventas
                  </p>
                </MenuItem> */}
              {/* <MenuItem>
                  <p className="font-semibold flex gap-x-2 items-center">
                    <span className="material-symbols-outlined">
                      monitoring
                    </span>{" "}
                    Estadisticas
                  </p>
                </MenuItem> */}
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  signOut(auth);
                  return location.reload();
                }}
              >
                <p className="text-danger-500 font-semibold flex gap-x-2 items-center">
                  <span className="material-symbols-outlined">logout</span>{" "}
                  Cerrar Sesión
                </p>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <div></div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
