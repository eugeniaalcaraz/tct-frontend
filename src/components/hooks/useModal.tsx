import { useAppDispatch } from "@/state/app/hooks";
import { handleModalData } from "@/state/features/modal";
import { ModalTypes } from "@/types";
import { useMemo } from "react";

export const useModal = () => {
    const dispatch = useAppDispatch();

    const modalActions = useMemo(
        () => ({
            closeModal() {
                dispatch(
                    handleModalData({
                        modalOpen: false,
                        modalType: null,
                    })
                );
            },

            openModal(modalType) {
                dispatch(handleModalData({ modalOpen: true, modalType }));
            },
        }),
        [dispatch]
    );

    return modalActions;
};
