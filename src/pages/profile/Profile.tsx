import { Box } from "@chakra-ui/layout";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { Navigate } from "react-router";
import { Avatar } from "@chakra-ui/avatar";
import moment from "moment/min/moment-with-locales";
moment.locale("es");

function Profile() {
  const { authUser } = useContext(UserContext);

  if (!authUser) return <Navigate to="/login" />;

  return (
    <section className="h-full px-4 pt-[68px] flex justify-center items-center">
      <Box className="mx-auto max-w-xl w-full bg-primary-100 h-fit rounded-md">
        <Box className="flex w-full items-center justify-around px-4 py-6 gap-x-2">
          <Avatar name={authUser.nickname} size={"2xl"} />
          <Box className="flex flex-col">
            <h4 className="text-xl font-semibold">{authUser.nickname}</h4>
            <span className="text-primary-600 text-base -mt-1">
              {authUser.email}
            </span>
            <span className="text-primary-600 text-base">
              <strong>Cuenta creada: </strong>
              {moment(authUser.metadata.creationTime).format("LL")}
            </span>
            <span className="text-primary-600 text-base flex items-center gap-x-2">
              <strong>Color favorito: </strong>
              <div
                className="w-20 h-4 border-[1px] border-primary-950"
                style={{ backgroundColor: authUser.color }}
              ></div>
            </span>
          </Box>
        </Box>
        <h2 className="text-center font-semibold mt-4 text-primary-700">
          Más cosas proximamente...
        </h2>
        <div className="p-4">
          <img
            src="https://media.istockphoto.com/id/1288134194/photo/puppy-dog-looking-at-camera-with-copy-space.jpg?s=612x612&w=0&k=20&c=vZjsoYnoPvPzA3qOsgqG931L6_TLriWeRhRCihks6qA="
            className="object-contain rounded-lg"
          />
        </div>
      </Box>
    </section>
  );
}

export default Profile;
