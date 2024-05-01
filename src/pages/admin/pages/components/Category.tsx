import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { Category as CategoryType } from "../../../../types";
import moment from "moment";
import CreateCategoryModal from "./CreateCategoryModal";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ref, remove } from "firebase/database";
import { database } from "../../../../firebase";

interface Props {
  category: CategoryType;
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}

function Category({ category, setCategories }: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [editCategory, setOpenEditCategoryModal] = useState<boolean>(false);
  const cancelRef = useRef(null);

  return (
    <>
      <Box
        className={`${
          category.type === "comida"
            ? "bg-info-200"
            : category.type === "numeritos"
            ? "bg-primary-200"
            : "bg-danger-200"
        } min-h-32 min-w-72 rounded-md py-2 px-4 snap-center`}
      >
        <Text className="font-semibold text-base uppercase">
          {category.name}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Tipo: </strong>
          {category.type}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Iniciado:</strong> {moment(category.startDate).format("LL")}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Entrega:</strong> {moment(category.endDate).format("LL")}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Precio:</strong> {category.priceExplained}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Ganancia:</strong> ${category.earned.toLocaleString()}
        </Text>
        <Text className="font-semibold text-sm uppercase">
          <strong>Obligatorias:</strong> {category.limit}
        </Text>
        <div className="mt-4 flex gap-x-2">
          <Button
            onClick={() => setShowAlert(true)}
            colorScheme="danger"
            size={"sm"}
            className="flex items-center gap-x-2 border-[1px] border-danger-950"
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
          <Button
            onClick={() => setOpenEditCategoryModal(true)}
            colorScheme="primary"
            size={"sm"}
            className="flex items-center gap-x-2 border-[1px] border-danger-950"
          >
            <span className="material-symbols-outlined">edit</span>
          </Button>
        </div>
      </Box>
      {editCategory && (
        <CreateCategoryModal
          close={() => setOpenEditCategoryModal(false)}
          category={category}
        />
      )}
      {showAlert && (
        <AlertDialog
          isOpen={showAlert}
          leastDestructiveRef={cancelRef}
          onClose={() => setShowAlert(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Eliminar venta
              </AlertDialogHeader>

              <AlertDialogBody>
                ¿Estás seguro/a de hacer esto? Esta acción no se puede revertir.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setShowAlert(false)}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="danger"
                  onClick={() => {
                    remove(ref(database, `categorias/${category.id}`)).then(
                      () => {
                        setShowAlert(false);
                      }
                    );
                    setCategories((prev) =>
                      prev.filter((x) => x.id != category.id)
                    );
                  }}
                  ml={3}
                >
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
}

export default Category;
