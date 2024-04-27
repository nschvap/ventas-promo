import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ref, set } from "firebase/database";
import React, { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../../../firebase";
import { Category } from "../../../../types";

interface Props {
  close: Dispatch<SetStateAction<void>>;
}

function CreateCategoryModal({ close }: Props) {
  const toast = useToast();
  const [categoryData, setCategoryData] = useState<Category>({
    id: uuidv4(),
    name: "",
    type: "comida",
    earned: 0,
    price: 0,
    priceExplained: "",
    startDate: "",
    endDate: "",
    limit: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await set(ref(database, `categorias/${categoryData.id}`), categoryData);
      toast({
        title: `Categoria creada correctamente.`,
        description: `Ahora puedes agregar ventas a ${categoryData.name}`,
        isClosable: true,
        position: "top",
        duration: 5000,
        status: "success",
      });
      close();
    } catch (error) {
      console.error(error);
      toast({
        title: `Ocurrio un error creando la categoria...`,
        description: `Para mas informacion revisa la consola`,
        isClosable: true,
        position: "top",
        duration: 5000,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex items-center px-4 border-b-[1px] border-primary-950">
          <CloseButton onClick={() => close()} />
          <h2 className="text-lg font-semibold uppercase mx-auto">
            Crear Categoría de Venta
          </h2>
        </ModalHeader>
        <ModalBody>
          <form
            className="max-w-xs mx-auto w-full mt-2"
            onSubmit={handleSubmit}
          >
            <FormControl isRequired className="mt-2">
              <FormLabel>Nombre de categoría</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
                value={categoryData.name}
                type="text"
                placeholder="Venta de ..."
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Tipo</FormLabel>
              <Select
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    type: e.target.value as
                      | "numeritos"
                      | "comida"
                      | "anticipadas",
                  })
                }
                value={categoryData.type}
              >
                <option value={"numeritos"} label="Numeros (Tickets)"></option>
                <option value={"comida"} label="Comida"></option>
                <option
                  value={"anticipadas"}
                  label="Anticipadas (Entradas)"
                ></option>
              </Select>
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Ganancia</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    earned: parseFloat(e.target.value),
                  })
                }
                value={categoryData.earned}
                type="number"
                placeholder="3000"
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Precio</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    price: parseFloat(e.target.value),
                  })
                }
                value={categoryData.price}
                type="number"
                placeholder="3000"
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Precio Explicado</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    priceExplained: e.target.value,
                  })
                }
                value={categoryData.priceExplained}
                type="text"
                placeholder="2x$5500 o 3x$8000"
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Cantidad obligatoria p/alumno</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    limit: parseFloat(e.target.value),
                  })
                }
                value={categoryData.limit}
                type="number"
                placeholder="5"
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Fecha de inicio</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    startDate: e.target.value,
                  })
                }
                value={categoryData.startDate}
                type="date"
              />
            </FormControl>
            <FormControl isRequired className="mt-2">
              <FormLabel>Fecha de finalización</FormLabel>
              <Input
                onChange={(e) =>
                  setCategoryData({ ...categoryData, endDate: e.target.value })
                }
                value={categoryData.endDate}
                type="date"
              />
            </FormControl>
            <div className="flex gap-x-4 mx-auto justify-center mt-4">
              <Button onClick={() => close()} colorScheme="danger">
                Cancelar
              </Button>
              <Button type="submit" colorScheme="primary">
                Crear
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateCategoryModal;
