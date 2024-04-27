import { Box, HStack, Text } from "@chakra-ui/react";
import { Category as CategoryType, Sell } from "../../../types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import CreateSellModal from "./CreateSellModal";
import moment from "moment/min/moment-with-locales";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebase";
import { UserContext } from "../../../contexts/User";
import SellComponent from "./Sell";
moment.locale("es");

interface Props {
  category: CategoryType;
  setHideBtn: Dispatch<SetStateAction<boolean>>;
}

function Category({ category }: Props) {
  const [createModal, setCreateModal] = useState(false);
  const { authUser } = useContext(UserContext);
  const [sells, setSells] = useState<Sell[]>([]);

  useEffect(() => {
    onValue(ref(database, "/ventas"), (snapshot) => {
      const usableSells = Object.values(snapshot.val());
      if (usableSells) {
        const mySells = (usableSells as Sell[]).filter(
          (x) => x.sellerId == authUser.uid && x.category == category.id
        );

        if (mySells.length > 0) {
          setSells(mySells);
        }
      }
    });
  }, []);

  if (sells.length > 0)
    return (
      <>
        <Box className="px-10">
          <Box className="flex items-center justify-center gap-x-4 w-full py-2 uppercase border-t-[1px] border-t-primary-950">
            <Text className="text-lg xl:text-2xl font-semibold">
              {category.name} |{" "}
              <strong>
                Vendidas: {sells.reduce((a, b) => a + b.quantity, 0)}/
                {category.limit}
              </strong>
            </Text>
          </Box>
          {/* {moment().diff(category.endDate, "d") < 0 && (
            <button
              onClick={() => setCreateModal(true)}
              className="px-4 py-2 mb-4 mx-10 bg-primary-200 rounded-md hover:bg-primary-300 duration-200"
            >
              <p className=" text-primary-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">add</span>
                Agregar nueva
              </p>
            </button>
          )} */}
          <HStack className="overflow-x-auto px-4 py-2">
            {sells.sort((a,b) => moment(a.sellDate).valueOf() - moment(b.sellDate).valueOf()).map((sell) => (
              <SellComponent key={sell.id} sell={sell} />
            ))}
          </HStack>
        </Box>
        {createModal && (
          <CreateSellModal
            close={() => setCreateModal(false)}
            category={category}
          />
        )}
      </>
    );
}

export default Category;
