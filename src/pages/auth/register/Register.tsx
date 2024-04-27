import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Navigate, Link as RRDLink, useNavigate } from "react-router-dom";
import { es } from "../../../lib/authErrors";
import { auth, database } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { UserContext } from "../../../contexts/User";

function Register() {
  const toast = useToast();
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    color: "#000000",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  if (authUser) return <Navigate to={"/"} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.nickname.trim() == "")
      return toast({
        title: "Ingresa un apodo.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    if (userData.email.trim() == "")
      return toast({
        title: "Ingresa un email.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    if (userData.password1.trim() == "")
      return toast({
        title: "Ingresa una contraseña.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    if (userData.password1 != userData.password2)
      return toast({
        title: "Las contraseñas deben ser iguales.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password1
      );

      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        username: userData.nickname,
        email: userData.email,
        image: null,
        color: userData.color,
      });

      return navigate("/");
    } catch (error) {
      // @ts-ignore
      const errorCode = error.code;

      return toast({
        // @ts-ignore
        title: es[errorCode]?.toClient || "Ocurrio un error creando tu cuenta.",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container className="h-full flex flex-col gap-y-4 justify-center items-center pt-[57px]">
        <Box className="px-4 py-2 rounded-lg border-[1px] border-primary-950 max-w-xl w-full">
          <h3 className="font-semibold text-2xl my-2 text-center">
            Registrarse
          </h3>
          <Divider my={4} />
          <form
            className="flex flex-col items-center justify-center py-4 max-w-xs w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <Box className="w-full">
              <FormControl>
                <FormLabel>Apodo</FormLabel>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, nickname: e.target.value })
                  }
                  value={userData.nickname}
                  placeholder="juancito123"
                  type="text"
                />
              </FormControl>
            </Box>
            <Box className="w-full mt-4">
              <FormControl>
                <FormLabel>Selecciona tu color favorito</FormLabel>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, color: e.target.value })
                  }
                  value={userData.color}
                  placeholder="juancito123"
                  type="color"
                />
              </FormControl>
            </Box>
            <Box className="w-full mt-8">
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  value={userData.email}
                  placeholder="ejemplo@ej.com"
                  type="email"
                />
              </FormControl>
            </Box>

            <Box className="w-full mt-8">
              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, password1: e.target.value })
                  }
                  value={userData.password1}
                  placeholder="***************"
                  type="password"
                />
              </FormControl>
            </Box>

            <Box className="w-full mt-4">
              <FormControl>
                <FormLabel>Confirmar contraseña</FormLabel>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, password2: e.target.value })
                  }
                  value={userData.password2}
                  placeholder="***************"
                  type="password"
                />
              </FormControl>
            </Box>

            <Button type="submit" colorScheme="primary" mt={8}>
              Crear cuenta
            </Button>

            <p className="mt-4 text-sm text-primary-950/40">
              ¿Ya tenes una cuenta?{" "}
              <strong>
                <Link as={RRDLink} to={"/login"}>
                  Inicia sesión acá
                </Link>
              </strong>
            </p>
          </form>
        </Box>
      </Container>

      <div className="hidden lg:block">
        <Box className="size-96 bg-primary-400 rounded-full fixed -right-32 -bottom-32"></Box>
        <Box className="size-72 bg-primary-400 rounded-full fixed right-20 -bottom-32"></Box>
        <Box className="size-72 bg-primary-400 rounded-full fixed right-48 -bottom-56"></Box>
        <Box className="size-72 bg-primary-400 rounded-full fixed -right-48 bottom-16"></Box>
      </div>
    </>
  );
}

export default Register;
