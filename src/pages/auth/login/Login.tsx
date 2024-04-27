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
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { es } from "../../../lib/authErrors";
import { UserContext } from "../../../contexts/User";

function Login() {
  const toast = useToast();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  if (authUser) return <Navigate to={"/"} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.email.trim() == "")
      return toast({
        title: "Ingresa tu email.",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });

    if (userData.password.trim() == "")
      return toast({
        title: "Ingresa una contraseña.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);

      return navigate("/");
    } catch (error) {
      // @ts-ignore
      const errorCode = error.code;

      return toast({
        // @ts-ignore
        title: es[errorCode].toClient,
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
            Iniciar Sesión
          </h3>
          <Divider my={4} />
          <form
            className="flex flex-col items-center justify-center py-4 max-w-xs w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <Box className="w-full">
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
                    setUserData({ ...userData, password: e.target.value })
                  }
                  value={userData.password}
                  placeholder="***************"
                  type="password"
                />
              </FormControl>
            </Box>

            <Button type="submit" colorScheme="primary" mt={8}>
              Entrar
            </Button>

            <p className="mt-4 text-sm text-primary-950/40">
              ¿No tenes una cuenta?{" "}
              <strong>
                <Link as={RRDLink} to={"/register"}>
                  Registrate acá
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

export default Login;
