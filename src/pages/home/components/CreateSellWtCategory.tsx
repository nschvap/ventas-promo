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
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { database } from "../../../firebase";
import { UserContext } from "../../../contexts/User";
import { Category, Sell } from "../../../types";
import moment from "moment";
import { v4 } from "uuid";

interface Props {
  close: Dispatch<SetStateAction<void>>;
  categories: Category[];
}

function CreateSellModal({ close, categories = [] }: Props) {
  const { authUser } = useContext(UserContext);
  const toast = useToast();
  const [sellData, setSellData] = useState<Sell>({
    id: v4(),
    sellerId: authUser.uid,
    category: categories.filter((c) => moment().diff(c.endDate, "d") < 0)[0]?.id,
    buyer: "",
    quantity: 1,
    sellDate: moment().toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await set(ref(database, `ventas/${sellData.id}`), sellData);
      toast({
        title: `Venta creada correctamente.`,
        isClosable: true,
        position: "top",
        duration: 5000,
        status: "success",
      });
      close();
    } catch (error) {
      console.error(error);
      toast({
        title: `Ocurrio un error creando la venta...`,
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
            Crear nueva venta
          </h2>
        </ModalHeader>
        <ModalBody>
          <form
            className="max-w-xs mx-auto w-full mt-2"
            onSubmit={handleSubmit}
          >
            <FormControl className="mt-2">
              <FormLabel>Tipo de venta</FormLabel>
              <Select
                onChange={(e) =>
                  setSellData({ ...sellData, category: e.target.value })
                }
              >
                {categories.filter((c) => moment().diff(c.endDate, "d") < 0).map((c) => (
                  <option key={c.id} value={c.id} label={c.name}></option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired className="mt-2">
              <FormLabel>Comprador de la venta</FormLabel>
              <Input
                onChange={(e) =>
                  setSellData({ ...sellData, buyer: e.target.value })
                }
                value={sellData.buyer}
                type="text"
                placeholder="Juan Perez"
              />
            </FormControl>

            <FormControl isRequired className="mt-2">
              <FormLabel>Cantidad</FormLabel>
              <Input
                onChange={(e) =>
                  setSellData({
                    ...sellData,
                    quantity: parseFloat(e.target.value),
                  })
                }
                value={sellData.quantity}
                type="number"
                placeholder="1"
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

export default CreateSellModal;
