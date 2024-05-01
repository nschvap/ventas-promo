import { Box, HStack, Text } from "@chakra-ui/react";
import { Category as CategoryType, Sell } from "../../../types";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
        <Box className="border-b-[1px] border-b-primary-950/40 py-4">
          <Box className="flex items-center justify-center gap-x-4 w-full uppercase">
            <Text className="text-lg xl:text-2xl font-semibold">
              {category.name} |{" "}
              <strong>
                Vendidas: {sells.reduce((a, b) => a + b.quantity, 0)}
                {category.limit > 0 && <span>/{category.limit}</span>}
              </strong>
            </Text>
          </Box>
          <Box className="flex items-center justify-center gap-x-4 w-full uppercase lg:flex-row my-2 px-4">
            <Text className="text-sm xl:text-xl font-semibold text-center p-2 bg-primary-300 rounded-lg">
              Recaudado:{" "}
              <strong>
                $
                {(
                  sells.reduce((a, b) => a + b.quantity, 0) * category.price
                ).toLocaleString()}{" "}
              </strong>
            </Text>
            {category.type === "anticipadas" ? (
              <Text className="text-sm xl:text-xl font-semibold text-center p-2 bg-primary-300 rounded-lg">
                Promo:{" "}
                <strong>
                  $
                  {(
                    sells.reduce((a, b) => a + b.quantity, 0) * category.earned
                  ).toLocaleString()}
                </strong>
              </Text>
            ) : (
              <Text className="text-sm xl:text-xl font-semibold text-center p-2 bg-primary-300 rounded-lg">
                Promo:{" "}
                <strong>
                  $
                  {(
                    Math.min(
                      sells.reduce((a, b) => a + b.quantity, 0),
                      category.limit
                    ) * category.earned
                  ).toLocaleString()}
                </strong>
              </Text>
            )}
            {sells.length > category.limit &&
              category.type != "anticipadas" && (
                <Text className="text-sm xl:text-xl font-semibold text-center p-2 bg-primary-300 rounded-lg">
                  Personal:{" "}
                  <strong>
                    $
                    {(
                      (sells.reduce((a, b) => a + b.quantity, 0) -
                        category.limit) *
                        category.price -
                      (sells.reduce((a, b) => a + b.quantity, 0) -
                        category.limit) *
                        (category.price - category.earned)
                    ).toLocaleString()}
                  </strong>
                </Text>
              )}
          </Box>

          <HStack className="overflow-x-auto px-4 py-2 snap-x ">
            {sells
              .sort(
                (a, b) =>
                  moment(a.sellDate).valueOf() - moment(b.sellDate).valueOf()
              )
              .map((sell) => (
                <SellComponent key={sell.id} sell={sell} setSells={setSells} />
              ))}
          </HStack>
        </Box>
      </>
    );
}

export default Category;
