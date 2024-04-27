import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
} from "@chakra-ui/react";
import { Sell as SellType } from "../../../types";
import moment from "moment/min/moment-with-locales";
import { useRef, useState } from "react";
import { ref, remove } from "firebase/database";
import { database } from "../../../firebase";
moment.locale("es");

interface Props {
  sell: SellType;
}

function SellComponent({ sell }: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const cancelRef = useRef(null);

  return (
    <>
      <Box
        key={sell.id}
        className={`h-32 min-w-56 rounded-md border-[1px] border-info-950 bg-info-200 relative p-1`}
      >
        <span className="text-xl font-black text-info-950">
          +{sell.quantity}
        </span>
        <Box className="px-2 py-2">
          <p className="text-info-950 font-semibold text-sm">
            <strong>Comprador: </strong>
            {sell.buyer}
          </p>
          <p className="text-info-950 font-semibold text-sm">
            <strong>Vendido: </strong>
            {moment(sell.sellDate).format("LL")}
          </p>
        </Box>
        <div className="mt-auto px-2">
          <Button
            onClick={() => setShowAlert(true)}
            colorScheme="danger"
            size={"sm"}
            className="flex items-center gap-x-2 border-[1px] border-danger-950"
          >
            <span className="material-symbols-outlined">delete</span>Eliminar
          </Button>
        </div>
      </Box>
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
                    remove(ref(database, `ventas/${sell.id}`)).then(() => {
                      setShowAlert(false);
                    });
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

export default SellComponent;
