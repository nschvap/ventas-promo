import {
  CircularProgress,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

function Loading({ loading }: { loading: boolean }) {
  return (
    <Modal isCentered isOpen={loading} onClose={() => false}>
      <ModalOverlay></ModalOverlay>
      <ModalContent
        backgroundColor={"transparent"}
        shadow={"none"}
        className="w-32 flex justify-center items-center text-2xl font-semibold py-4 gap-y-2"
      >
        <CircularProgress color="primary.400" isIndeterminate />
      </ModalContent>
    </Modal>
  );
}

export default Loading;
