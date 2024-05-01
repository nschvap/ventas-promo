import { AbsoluteCenter, Box, Divider, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateCategoryModal from "./pages/components/CreateCategoryModal";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { Category as CategoryType } from "../../types";
import moment from "moment/min/moment-with-locales";
import Category from "./pages/components/Category";
moment.locale("es");

function AdminPanel() {
  const [modals, setModals] = useState({
    createCategory: false,
  });

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    onValue(ref(database, "/categorias"), (snapshot) => {
      const data = snapshot.val();
      setCategories(Object.values(data));
    });
  }, []);

  return (
    <>
      <section className="h-full w-full pt-[68px] px-8">
        <div>
          <Box position="relative" paddingY="10">
            <Divider borderColor={"primary.950"} />
            <AbsoluteCenter
              className="text-sm font-semibold uppercase text-primary-950"
              bg="white"
              px="4"
            >
              Gestionar ventas disponibles
            </AbsoluteCenter>
          </Box>
          <button
            onClick={() => setModals({ ...modals, createCategory: true })}
            className="px-4 py-2 bg-primary-100 flex justify-center items-center rounded-lg hover:brightness-90 duration-200 flex-shrink-0"
          >
            <p className=" text-primary-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">add</span>
              Crear categoría
            </p>
          </button>
          <HStack className="overflow-x-auto pb-4 mt-2 snap-x">
            {categories
              .sort(
                (a, b) =>
                  moment(b.startDate).valueOf() - moment(a.startDate).valueOf()
              )
              .map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  setCategories={setCategories}
                />
              ))}
          </HStack>
        </div>
      </section>
      {modals.createCategory && (
        <CreateCategoryModal
          close={() => setModals({ ...modals, createCategory: false })}
        />
      )}
    </>
  );
}

export default AdminPanel;
